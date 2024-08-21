import Avatar from "@/components/Avatar";
import { Message } from "./chatSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function TextItem({
  message,
  isContinue,
}: {
  message: Message;
  isContinue: boolean;
}) {
  const currentUser = useSelector(selectUser);
  const isSender = message?.sender._id === currentUser._id;
  return (
    <li
      className={cn(
        "flex items-start justify-end gap-3",
        !isSender ? "flex-row-reverse" : "",
      )}
    >
      <div
        className={cn(
          "flex max-w-64 flex-col rounded-lg p-2 text-sm",
          !isSender ? "bg-muted" : "bg-primary text-primary-foreground",
        )}
      >
        <span>{message.message}</span>
        <span className="text-end">{format(message.createdAt, "kk:mm")}</span>
      </div>
      {!isSender && (
        <div className="h-9 w-9">
          {!isContinue && (
            <Avatar
              size={9}
              src={message.sender.avatar as string}
              fallback="EY"
            />
          )}
        </div>
      )}
    </li>
  );
}
