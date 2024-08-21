import ChatWindowHeader from "@/features/chat/ChatWindowHeader";
import ChatMessagesWrapper from "./ChatMessagesWrapper";
import ChatInput from "./ChatInput";
import MainNavBar from "@/components/MainNavBar";
import GroupWindowHeader from "./GroupWindowHeader";
import { useParams } from "react-router-dom";
import { useGetChatQuery } from "@/services/chatApi";
import Loader from "@/components/Loader";
import { useState } from "react";

export default function ChatWindow() {
  const { chatId } = useParams();
  const { data, isLoading, isFetching } = useGetChatQuery(chatId as string);
  const [newMessage, setNewMessage] = useState("");
  const chat = data?.chat;
  function sendMessageHandler(message: string) {
    setNewMessage(message);
  }
  return (
    <section className="flex h-full flex-col">
      <MainNavBar />
      {isLoading || isFetching ? (
        <div className="grid h-full w-full place-content-center">
          <Loader size={64} />
        </div>
      ) : (
        <>
          {chat?.isGroupChat ? <GroupWindowHeader /> : <ChatWindowHeader />}
          <ChatMessagesWrapper newMessage={newMessage} />
          <ChatInput onSendMessage={sendMessageHandler} />
        </>
      )}
    </section>
  );
}
// CHAT YOKSA NO CHAT PLACEHOLDER BURADA GOSTER
