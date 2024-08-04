import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/features/user/userSlice";
import chatSlice from "@/features/chat/chatSlice";
import { authApi } from "@/services/authApi";
import { userApi } from "@/services/userApi";
import { chatApi } from "@/services/chatApi";
export const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      chatApi.middleware,
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
