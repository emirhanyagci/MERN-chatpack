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
    function onCreateChat(chatId: string) {
      socket?.emit("join-room", chatId);
      dispatch(chatApi.util.invalidateTags(["chats"]));
    }
    function onCreateGroup(chatId: string) {
      console.log("new group created", chatId);

      socket?.emit("join-room", chatId);
      dispatch(chatApi.util.invalidateTags(["chats"]));
    }

    socket?.on("create-chat", ({ chatId }) => {
      onCreateChat(chatId);
    });
    socket?.on("create-group", ({ chatId }) => {
      onCreateGroup(chatId);
    });
    return () => {
      socket?.off("create-chat", onCreateChat);
      socket?.off("create-group", onCreateGroup);
    };
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
