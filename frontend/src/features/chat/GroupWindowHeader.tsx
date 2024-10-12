import Avatar from "@/components/Avatar";

import GroupInfoModal from "@/features/chat/GroupInfoModal";
import { useGetChatQuery } from "@/services/chatApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../user/userSlice";

export default function GroupWindowHeader() {
  const { chatId } = useParams();

  const { data } = useGetChatQuery(chatId as string);
  const user = useSelector(selectUser);
  const group = data?.chat;
  if (!group) return;
  console.log(user);

  console.log(group);

  return (
    <header className="flex items-center justify-between border-b border-border p-5">
      <div className="flex items-center gap-3">
        <Avatar src={group.groupImage} fallback="FF" />
        <div className="flex flex-col">
          <h2>{group.groupName}</h2>
          <span className="max-w-[50ch] overflow-hidden text-ellipsis text-nowrap text-sm text-muted-foreground">
            {group.members
              .map((member) =>
                member._id !== user._id ? member.username : "you",
              )
              .join(", ")}
          </span>
        </div>
      </div>
      <div className="flex">
        <GroupInfoModal group={group} />
      </div>
    </header>
  );
}
