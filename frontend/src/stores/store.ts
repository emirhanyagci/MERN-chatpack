import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/features/user/userSlice";
import chatSlice from "@/features/chat/chatSlice";
import { authApi } from "@/services/authApi";
export const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
