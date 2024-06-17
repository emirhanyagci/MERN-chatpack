import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
export default function UserBadge() {
  return (
    <Badge
      className="inline-flex cursor-pointer justify-between gap-1"
      variant="secondary"
    >
      <Avatar className="h-5 w-5">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span>username</span>
      <X size={16} />
    </Badge>
  );
}
