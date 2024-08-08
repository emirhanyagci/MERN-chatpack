import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user/userSlice";

export interface Message {
  sender: string;
  message: string;
  sendedAt: string;
}
export interface Chat {
  _id: string;
  members: User[];
  messages: Message[];
  lastMessage: string;
  isGroupChat: boolean;
  owner: string;
  managers: string[];
  groupName: string;
  groupDescription: string;
  groupImage: string;
  createdAt: string;
}
export interface ChatSlice {
  activeChat: string | null;
  notifications: [];
}
const initialState: ChatSlice = {
  activeChat: null,
  notifications: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat(state, action: PayloadAction<string>) {
      state.activeChat = action.payload;
    },
  },
});

export const { setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;
