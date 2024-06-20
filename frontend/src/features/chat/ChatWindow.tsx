import ChatWindowHeader from "@/features/chat/ChatWindowHeader";
import ChatMessagesWrapper from "./ChatMessagesWrapper";
import ChatInput from "./ChatInput";
import MainNavBar from "@/components/MainNavBar";
import GroupWindowHeader from "./GroupWindowHeader";

export default function ChatWindow() {
  return (
    <section className="flex h-full flex-col">
      <MainNavBar />
      <GroupWindowHeader />
      <ChatWindowHeader />
      <ChatMessagesWrapper />
      <ChatInput />
    </section>
  );
}
// CHAT YOKSA NO CHAT PLACEHOLDER BURADA GOSTER
