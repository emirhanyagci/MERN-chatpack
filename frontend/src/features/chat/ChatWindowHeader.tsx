import UserAvatar from "@/features/user/UserAvatar";
import UserActiveStatus from "@/features/user/UserActiveStatus";
import { Phone, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ChatWindowHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border p-5">
      <div className="flex items-center gap-3">
        <UserAvatar src="https://github.com/shadcn.png" fallback="EY" />
        <div className="flex flex-col">
          <h2>Emirhan Yagci</h2>
          <UserActiveStatus />
        </div>
      </div>
      <div className="flex">
        <Button variant="ghost" className="flex gap-2 text-primary">
          <Phone size={18} className="fill-primary text-primary" />
          <span className="text-primary"> Call</span>
        </Button>
        <Button
          variant="ghost"
          className="flex aspect-square gap-2 rounded-full p-1 text-primary"
        >
          <EllipsisVertical size={18} className="fill-primary text-primary" />
        </Button>
      </div>
    </header>
  );
}
