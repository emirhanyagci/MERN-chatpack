import Avatar from "@/components/Avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "./userSlice";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ConfirmDialog";

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
  if (!user.username) return null;
  const uname = user.username.slice(0, 2);
  return (
    <div
      className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-muted ${isActive ? "bg-muted" : ""}`}
      onClick={() => selectHandler && selectHandler!(user)}
    >
      <div className="flex w-full items-center gap-3">
        <Avatar src={user.avatar as string} fallback={uname} />
        <div className="flex w-full flex-col items-start">
          <h3 className="text-base text-foreground">{user.username}</h3>
          <span
            className="max-w-[22ch] overflow-hidden text-xs text-muted-foreground"
            title=" emirhan.yacis@gmail.com"
          >
            {user.email}
          </span>
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
