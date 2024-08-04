import Avatar from "@/components/Avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "./userSlice";

export default function UserCard({
  user,
  isActive = false,
  withRole = false,
  role,
  selectHandler,
}: {
  user: User;
  isActive?: boolean;
  withRole?: boolean;
  role?: string;
  selectHandler?: (user: User) => void;
}) {
  if (!user.username) return null;
  const uname = user.username.slice(0, 2);
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-muted ${isActive ? "bg-muted" : ""}`}
      onClick={() => selectHandler!(user)}
    >
      <Avatar src={user.avatarUrl as string} fallback={uname} />
      <div className="flex w-full flex-col items-start">
        <h3 className="text-base text-foreground">{user.username}</h3>
        <span
          className="max-w-[22ch] overflow-hidden text-xs text-muted-foreground"
          title=" emirhan.yacis@gmail.com"
        >
          {user.email}
        </span>
        {withRole && (
          <Badge variant="secondary" className="text-xs text-muted-foreground">
            {role}
          </Badge>
        )}
      </div>
    </div>
  );
}
// ${active ? 'bg-'}
