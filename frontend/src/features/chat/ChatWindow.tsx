import ChatWindowHeader from "@/features/chat/ChatWindowHeader";
import ChatMessagesWrapper from "./ChatMessagesWrapper";
import ChatInput from "./ChatInput";
import MainNavBar from "@/components/MainNavBar";
import GroupWindowHeader from "./GroupWindowHeader";
import { useNavigate, useParams } from "react-router-dom";
import { chatApi, useGetChatQuery, useSetAsReadMutation } from "@/services/chatApi";
import Loader from "@/components/Loader";
import { useSocketContext } from "@/Context/SocketContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function ChatWindow() {
  const { chatId } = useParams();
  const { socket } = useSocketContext();
  const navigate = useNavigate();
  const [setAsRead] = useSetAsReadMutation();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetChatQuery(chatId as string);

  useEffect(() => {
    function onReadMessage(chatId: string) {
      console.log(chatId);
      dispatch(chatApi.util.invalidateTags([{ type: "messages", id: "LIST" }]))
    }

    socket?.on("read-message", ({ chatId }) => {
      onReadMessage(chatId);
    });

    return () => {
      socket?.off("read-message", onReadMessage);
    };
  }, []);
  useEffect(() => {
    console.log("chatid", chatId);

    setAsRead(chatId as string)
      .unwrap()
      .then(() => {
        dispatch(chatApi.util.invalidateTags([{ type: "chats", id: chatId }]));
        socket?.emit("message-read", { chatId });
      });

  }, [chatId]);

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
