import ChatWindowHeader from "@/features/chat/ChatWindowHeader";
import ChatMessagesWrapper from "./ChatMessagesWrapper";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  return (
    <section>
      <ChatWindowHeader />
      <ChatMessagesWrapper />
      <ChatInput />
    </section>
  );
}
