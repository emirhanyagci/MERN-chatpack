import Avatar from "@/components/Avatar";
import { Badge } from "@/components/ui/badge";
import { selectUser, User } from "./userSlice";
import { useSelector } from "react-redux";

export default function UserCard({
  user,
  isActive = false,
  withRole = false,
  selectHandler,
}: {
  user: User;
  isActive?: boolean;
  withRole?: boolean;
  selectHandler?: (user: User) => void;
}) {
  const activeUser = useSelector(selectUser);
  if (!user.username) return null;
  const isCurrentUser = activeUser._id === user._id;
  const uname = user.username.slice(0, 2);
  return (
    <div
      className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-muted ${isActive ? "bg-muted" : ""}`}
      onClick={() => selectHandler && selectHandler!(user)}
    >
      <div className="flex w-full items-center gap-3">
        <Avatar src={user.avatar as string} fallback={uname} />
        <div className="flex w-full flex-col items-start">
          <h3 className="text-base text-foreground">
            {isCurrentUser ? "you" : user.username}
          </h3>
          {!isCurrentUser && (
            <span
              className="max-w-[22ch] overflow-hidden text-xs text-muted-foreground"
              title={user.email as string}
            >
              {user.email}
            </span>
          )}
          {withRole && (
            <Badge
              variant="secondary"
              className="text-xs text-muted-foreground"
            >
              {user.role}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
// ${active ? 'bg-'}
