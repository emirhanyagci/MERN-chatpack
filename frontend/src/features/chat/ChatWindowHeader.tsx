import Avatar from "@/components/Avatar";
import UserActiveStatus from "@/features/user/UserActiveStatus";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInfoModal from "./ChatInfoModal";
import { useParams } from "react-router-dom";
import { useGetChatQuery } from "@/services/chatApi";
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
export default function ChatWindowHeader() {
  const { chatId } = useParams();
  const currentUser = useSelector(selectUser);
  const { data } = useGetChatQuery(chatId as string);

  const chat = data?.chat;

  if (!chat) return;
  const receiverUser = chat.members.find(({ _id }) => _id !== currentUser._id);
  return (
    <header className="flex items-center justify-between border-b border-border p-5">
      <div className="flex items-center gap-3">
        <Avatar src={receiverUser?.avatar as string} fallback="EY" />
        <div className="flex flex-col">
          <h2>{receiverUser?.username}</h2>
          <UserActiveStatus />
        </div>
      </div>
      <div className="flex">
        <Button disabled variant="ghost" className="flex gap-2 text-primary">
          <Phone size={18} className="fill-primary text-primary" />
          <span className="text-primary"> Call</span>
        </Button>
        <ChatInfoModal chat={chat} />
      </div>
    </header>
  );
}
