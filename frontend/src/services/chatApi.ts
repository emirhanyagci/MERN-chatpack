import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Chat } from "@/features/chat/chatSlice";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "@/stores/store";
import { logOut, setSession } from "@/features/user/userSlice";
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };

      api.dispatch(
        setSession({
          accessToken,
          isAuthed: true,
        }),
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};
export interface ApiResponse {
  message: string;
  chats: Chat[];
}
export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["chats"],
  endpoints: (builder) => ({
    getChatHistory: builder.query<ApiResponse, void>({
      query: () => "/chat/history",
      providesTags: (result) =>
        result
          ? result.chats.map(({ _id }) => ({ type: "chats", id: _id }))
          : [{ type: "chats", id: "LIST" }],
    }),
  }),
});

export const { useGetChatHistoryQuery } = chatApi;
