import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Avatar from "@/components/Avatar";
import { User } from "./userSlice";
export default function UserBadge({
  user,
  unSelectUser,
}: {
  user: User;
  unSelectUser: (user: User) => void;
}) {
  return (
    <Badge
      className="inline-flex cursor-pointer justify-between gap-1"
      variant="secondary"
    >
      <Avatar size={5} src={user.avatarUrl as string} fallback="EY" />
      <span>{user.username}</span>
      <X onClick={() => unSelectUser(user)} size={16} />
    </Badge>
  );
}
