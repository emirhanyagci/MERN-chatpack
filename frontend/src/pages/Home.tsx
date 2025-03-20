import SideBar from "@/components/SideBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { chatApi, useSetAsReadMutation } from "@/services/chatApi";
import { useSocketContext } from "@/Context/SocketContext";
export default function Home() {
  const { chatId } = useParams();
  const { socket } = useSocketContext();
  const dispatch = useDispatch()
  const [setAsRead] = useSetAsReadMutation();

  useEffect(() => {
    console.log("chatid", chatId);


    function onSendMessage(args: { chatId: string }) {
      dispatch(chatApi.util.invalidateTags([{ type: "chats", id: args.chatId }]))
      console.log("args.chatId", args.chatId)
      console.log("chatId", chatId)
      console.log(args.chatId == chatId);

      if (args.chatId == chatId) {

        setAsRead(chatId as string)
          .unwrap()
          .then(() => {
            dispatch(chatApi.util.invalidateTags([{ type: "messages", id: "LIST" }, { type: "chats", id: chatId }]));
            socket?.emit("message-read", { chatId });
          });
      }
    }
    socket?.on("send-message", onSendMessage);

    return () => {
      socket?.off("send-message", onSendMessage);
    }

  }, [chatId]);
  return (
    <div className="grid h-svh grid-cols-12 bg-card">
      <div className="col-span-5 hidden h-full md:block xl:col-span-3">
        <SideBar />
      </div>
      <main className="col-span-12 h-svh md:col-span-7 xl:col-span-9">
        <Outlet />
      </main>
    </div>
  );
}
