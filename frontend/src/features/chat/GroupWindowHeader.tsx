import Avatar from "@/components/Avatar";

import GroupInfoModal from "@/features/chat/GroupInfoModal";
import { useGetChatQuery } from "@/services/chatApi";
import { useParams } from "react-router-dom";

export default function GroupWindowHeader() {
  const { chatId } = useParams();

  const { data } = useGetChatQuery(chatId as string);

  const group = data?.chat;
  if (!group) return;
  return (
    <header className="flex items-center justify-between border-b border-border p-5">
      <div className="flex items-center gap-3">
        <Avatar src="https://github.com/shadcn.png" fallback="FF" />
        <div className="flex flex-col">
          <h2>Fantastic Four</h2>
          <span className="max-w-[50ch] overflow-hidden text-ellipsis text-nowrap text-sm text-muted-foreground">
            ahmet,mehmet,you
          </span>
        </div>
      </div>
      <div className="flex">
        <GroupInfoModal group={group} />
      </div>
    </header>
  );
}
