import Chats from "@/features/chat/Chats";
import NewChat from "@/features/chat/NewChat";
import MenuDrawer from "@/components/MenuDrawer";
import CountBadge from "@/components/CountBadge";
import { useEffect } from "react";
import { useSocketContext } from "@/Context/SocketContext";
import { useDispatch } from "react-redux";
import { chatApi } from "@/services/chatApi";

export default function SideBar() {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("create-chat", ({ chatId }) => {
      socket.emit("join-room", chatId);
      dispatch(chatApi.util.invalidateTags([{ type: "chats", id: "LIST" }]));
    });
    socket?.on("create-group", ({ chatId }) => {
      console.log("new group created");

      socket.emit("join-room", chatId);
      dispatch(chatApi.util.invalidateTags([{ type: "chats", id: "LIST" }]));
    });
  }, []);

  return (
    <aside className="h-full space-y-3 border-r border-border">
      <header className="flex items-center justify-between px-5 pt-3">
        <div className="flex items-center gap-3">
          <MenuDrawer />
          <span className="text-xl text-foreground">Messages</span>
          <CountBadge count={12} variant="secondary" />
        </div>
        <NewChat />
      </header>
      <Chats />
    </aside>
  );
}
