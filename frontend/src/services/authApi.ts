import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
import { setSession, logOut } from "@/features/user/userSlice";

interface Auth {
  email: string;
  password: string;
  username: string;
}
export interface ApiResponse {
  message: string;
  accessToken: string;
}
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      Partial<ApiResponse>,
      Pick<Auth, "email" | "password">
    >({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation<
      Partial<ApiResponse>,
      Pick<Auth, "email" | "password" | "username">
    >({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<Partial<ApiResponse>, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          //complete this when yo fill chatApi and userApi
          // setTimeout(() => {
          //   dispatch(noteApi.util.resetApiState());
          //   dispatch(userApi.util.resetApiState());
          // }, 1000);
        } catch (e) {
          console.log(e);
        }
      },
    }),
    refresh: builder.mutation<Partial<ApiResponse>, void>({
      query: () => ({
        url: "/refresh",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(
            setSession({ accessToken: accessToken as string, isAuthed: true }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApi;
