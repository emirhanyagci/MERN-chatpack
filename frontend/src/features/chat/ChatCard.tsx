import CountBadge from "@/components/CountBadge";
import Avatar from "@/components/Avatar";
import { Chat } from "./chatSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";

export default function ChatCard({ chat }: { chat: Chat }) {
  const user = useSelector(selectUser);
  console.log(chat);

  const { lastMessage, members, isGroupChat, groupImage, groupName } = chat;
  // if this chat not group chat
  const receiverUser = members.find(({ _id }) => _id !== user._id);

  const title = chat.isGroupChat ? groupName : receiverUser?.username;
  const avatarFallback = title?.slice(0, 2);
  function onSelect() {
    console.log(chat);
  }
  return (
    <div className="flex gap-3 p-5 hover:bg-muted" onClick={onSelect}>
      <Avatar
        src={
          !isGroupChat
            ? (receiverUser?.avatar as string)
            : (groupImage as string)
        }
        fallback={avatarFallback as string}
      />

      <div className="w-full space-y-1">
        <div className="flex justify-between">
          <h3 className="text-base text-foreground">{title}</h3>
          <span className="text-sm text-muted-foreground">12m</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="inline-block max-w-[20ch] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
            {lastMessage}
          </span>

          <CountBadge count={3} />
        </div>
      </div>
    </div>
  );
}
