import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Chat, Message } from "@/features/chat/chatSlice";
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
  messages: Message[];
  message: string;
  chatId: string;
  chats: Chat[];
  chat: Chat;
}
interface SendMessage {
  chatId: string;
  message: string;
}
interface CreateChat {
  userId: string;
}
interface CreateGroup {
  groupName: string;
  userIds: string[];
}
interface getUnreadMessagesByChatId{
  chatId: string;
  messageId: string;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["chats", "messages", "unread-messages"],
  endpoints: (builder) => ({
    getChatHistory: builder.query<ApiResponse, void>({
      query: () => "/chat/history",
      providesTags: (result) =>
        result
          ? result.chats.map(({ _id }) => ({ type: "chats", id: _id }))
          : [{ type: "chats", id: "LIST" }],
    }),
    getChat: builder.query<ApiResponse, string>({
      query: (chatId) => `/chat/${chatId}`,
      providesTags: (result) =>
        result
          ? [{ type: "chats", id: result.chat._id }]
          : [{ type: "chats", id: "LIST" }],
    }),
    getUnreadMessagesByChatId: builder.query<ApiResponse, getUnreadMessagesByChatId>({
      query: ({ chatId }) => ({
        url: `/chat/${chatId}/read`,
      }),
      providesTags: (result) =>
        result?.messages
          ? [
              ...result.messages.map(({ _id }) => ({
                type: "unread-messages" as const,
                id: _id,
              })),
              { type: "unread-messages", id: "LIST" },
            ]
          : [{ type: "unread-messages", id: "LIST" }],
    }),
    getUnreadMessagesByUserId: builder.query<ApiResponse, void>({
      query: () => ({
        url: `/chat/read`,
      }),
      providesTags: (result) =>
        result?.messages
          ? [
              ...result.messages.map(({ _id }) => ({
                type: "unread-messages" as const,
                id: _id,
              })),
              { type: "unread-messages", id: "LIST" },
            ]
          : [{ type: "unread-messages", id: "LIST" }],
    }),
    createChat: builder.mutation<ApiResponse, CreateChat>({
      query: ({ userId }) => ({
        url: "chat/create-chat",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: () => ["chats"],
    }),
    createGroup: builder.mutation<ApiResponse, CreateGroup>({
      query: ({ userIds, groupName }) => ({
        url: "chat/create-group",
        method: "POST",
        body: { userIds, groupName },
      }),
      invalidatesTags: () => ["chats"],
    }),
    getMessages: builder.query<ApiResponse, string>({
      query: (chatId) => `/chat/${chatId}/messages`,
      providesTags: (result) =>
        result?.messages
          ? [
              ...result.messages.map(({ _id }) => ({
                type: "messages" as const,
                id: _id,
              })),
              { type: "messages", id: "LIST" },
            ]
          : [{ type: "messages", id: "LIST" }],
    }),
    sendMessage: builder.mutation<ApiResponse, SendMessage>({
      query: ({ chatId, message }) => ({
        url: `/chat/${chatId}/messages`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: (result) => [
        { type: "messages", id: "LIST" },
        { type: "chats", id: result?.chatId },
      ],
    }),
    setAsRead: builder.mutation<ApiResponse, string>({
      query: (chatId) => ({
        url: `/chat/${chatId}/read`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetChatHistoryQuery,
  useGetChatQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useCreateChatMutation,
  useCreateGroupMutation,
  useSetAsReadMutation,
  useGetUnreadMessagesByChatIdQuery,
  useGetUnreadMessagesByUserIdQuery
} = chatApi;
