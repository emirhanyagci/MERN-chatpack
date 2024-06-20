import Avatar from "@/components/Avatar";
import { Badge } from "@/components/ui/badge";

export default function UserCard({
  userId,
  isActive = false,
  withRole = false,
  role,
  selectHandler,
}: {
  userId: string;
  isActive?: boolean;
  withRole?: boolean;
  role: string;
  selectHandler?: (userId: string) => void;
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-muted ${isActive ? "border-2 border-ring" : ""}`}
      onClick={() => selectHandler!(userId)}
    >
      <Avatar src="https://github.com/shadcn.png" fallback="EY" />
      <div className="flex w-full flex-col items-start">
        <h3 className="text-base text-foreground">Emirhan Yagci</h3>
        <span className="text-sm text-muted-foreground">#11111111111</span>
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
