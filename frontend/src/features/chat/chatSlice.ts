import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user/userSlice";

export interface Message {
  _id: string;
  sender: User;
  message: string;
  createdAt: Date;
}
export interface Chat {
  _id: string;
  members: User[];
  messages: Message[];
  lastMessage: Message;
  unreadMessages: Message[];
  isGroupChat: boolean;
  owner: string;
  managers: string[];
  groupName: string;
  groupDescription: string;
  groupImage: string;
  createdAt: string;
}
export enum Role {
  ADMIN = "admin",
  MANAGER = "manager",
  MEMBER = "member",
}

export const rolePriority = {
  admin: 1,
  manager: 2,
  member: 3,
};
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
