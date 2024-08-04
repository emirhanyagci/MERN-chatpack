import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Avatar from "@/components/Avatar";
import { User } from "./userSlice";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
export default function UserBadge({
  user,
  unSelectUser,
}: {
  user: User;
  unSelectUser: (user: User) => void;
}) {
  if (!user.username) return null;
  const uname = user.username.slice(0, 2);

  return (
    <div>
      <HoverCard>
        <HoverCardTrigger>
          <Badge
            className="inline-flex cursor-pointer justify-between gap-1"
            variant="secondary"
          >
            <Avatar size={5} src={user.avatarUrl as string} fallback={uname} />
            <span>{user.username}</span>
            <X onClick={() => unSelectUser(user)} size={16} />
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-around space-x-2">
            <Avatar size={16} src={user.avatarUrl as string} fallback="EY" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@{user.username}</h4>
              <p className="text-sm">
                <span>{user.email}</span>
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
