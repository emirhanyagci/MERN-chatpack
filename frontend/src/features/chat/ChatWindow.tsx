import ChatWindowHeader from "@/features/chat/ChatWindowHeader";
import ChatMessagesWrapper from "./ChatMessagesWrapper";
import ChatInput from "./ChatInput";
import MainNavBar from "@/components/MainNavBar";
import GroupWindowHeader from "./GroupWindowHeader";
import { useNavigate, useParams } from "react-router-dom";
import { chatApi, useGetChatQuery } from "@/services/chatApi";
import Loader from "@/components/Loader";
import { useSocketContext } from "@/Context/SocketContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function ChatWindow() {
  const { chatId } = useParams();
  const { socket } = useSocketContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetChatQuery(chatId as string);
  useEffect(() => {
    function onReadMessage(chatId: string) {
        dispatch(chatApi.util.invalidateTags([{ type: "messages", id: "LIST" }]))
      
      console.log("message readed");
      console.log(chatId);
    }

    socket?.on("read-message", ({ chatId }) => {
      onReadMessage(chatId);
    });

    return () => {
      socket?.off("read-message", onReadMessage);
    };
  }, []);
  if (!data && isError) navigate("/home");
  if (!data) return null;
  const chat = data?.chat;

  function sendMessageHandler(message: string) {
    console.log(message);
    socket?.emit("new-message", { chatId });
  }

  return (
    <section className="flex h-full flex-col">
      <MainNavBar />
      {isLoading ? (
        <div className="grid h-full w-full place-content-center">
          <Loader size={64} />
        </div>
      ) : (
        <>
          {chat?.isGroupChat ? <GroupWindowHeader /> : <ChatWindowHeader />}
          <ChatMessagesWrapper />
          <ChatInput onSendMessage={sendMessageHandler} />
        </>
      )}
    </section>
  );
}
