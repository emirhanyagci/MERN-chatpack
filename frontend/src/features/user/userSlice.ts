import { RootState } from "@/stores/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface User {
  status: string | null;
  email: string | null;
  blockedUser: string[] | [];
  avatarUrl: string | null;
}
export interface UserSlice {
  accessToken: string | null;
  isAuthed: boolean | null;
  user: User;
}
const initialState: UserSlice = {
  accessToken: null,
  isAuthed: false,
  user: {
    status: null,
    email: null,
    blockedUser: [],
    avatarUrl: null,
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSession(
      state,
      action: PayloadAction<Pick<UserSlice, "accessToken" | "isAuthed">>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.isAuthed = action.payload.isAuthed;
      localStorage.setItem("jwt", JSON.stringify(action.payload.accessToken));
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logOut() {
      localStorage.removeItem("jwt");
      return initialState;
    },
  },
});

export const { setUser, setSession, logOut } = userSlice.actions;
export default userSlice.reducer;
export const selectIsAuthed = (state: RootState) => state.user.isAuthed;
