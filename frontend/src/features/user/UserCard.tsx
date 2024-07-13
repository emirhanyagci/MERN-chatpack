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
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-muted ${isActive ? "bg-muted" : ""}`}
      onClick={() => selectHandler!(user)}
    >
      <Avatar src="https://github.com/shadcn.png" fallback="EY" />
      <div className="flex w-full flex-col items-start">
        <h3 className="text-base text-foreground">Emirhan Yagci</h3>
        <span
          className="max-w-[22ch] overflow-hidden text-xs text-muted-foreground"
          title=" emirhan.yacis@gmail.com"
        >
          emirhan.yacis@gmail.com
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
