import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import UserAvatar from "@/features/user/UserAvatar";
export default function UserBadge() {
  return (
    <Badge
      className="inline-flex cursor-pointer justify-between gap-1"
      variant="secondary"
    >
      <UserAvatar size={5} src="https://github.com/shadcn.png" fallback="EY" />
      <span>username</span>
      <X size={16} />
    </Badge>
  );
}
