import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@/features/user/userSlice";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "@/stores/store";
import { logOut, setSession } from "@/features/user/userSlice";
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
export interface ApiResponse {
  message: string;
  users: User[];
}
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
    console.log(refreshResult);

    if (refreshResult.data) {
      api.dispatch(
        setSession({
          accessToken: refreshResult.data.accessToken,
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
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["users"],
  endpoints: (builder) => ({
    searchUser: builder.query<ApiResponse, string>({
      query: (search) => ({
        url: `/user/search?search=${search}`,
      }),
      providesTags: [{ type: "users", id: "LIST" }],
    }),
    getUserById: builder.query<User[], string>({
      query: (userId) => ({ url: "/user/details", body: userId }),
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "users", id: _id as string }))
          : ["users"],

      //tags
    }),
  }),
});

export const { useLazySearchUserQuery, useGetUserByIdQuery } = userApi;
