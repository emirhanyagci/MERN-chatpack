import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MessageInterface {
  sender: string;
  message: string;
  sendedAt: string;
}
export interface ChatInterface {
  chadId: string;
  members: string[];
  messages: MessageInterface[];
  lastMessage: string;
  isGroupChat: boolean;
  owner: string;
  managers: string[];
  groupName: string;
  groupDescription: string;
  createdAt: string;
}
export interface ChatSliceInterface {
  chats: ChatInterface[] | [];
  activeChat: string | null;
  notifications: [];
}
const initialState: ChatSliceInterface = {
  chats: [],
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
