import Avatar from "@/components/Avatar";
import UserActiveStatus from "@/features/user/UserActiveStatus";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserInfoModal from "@/features/user/UserInfoModal";
export default function ChatWindowHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border p-5">
      <div className="flex items-center gap-3">
        <Avatar src="https://github.com/shadcn.png" fallback="EY" />
        <div className="flex flex-col">
          <h2>Emirhan Yagci</h2>
          <UserActiveStatus />
        </div>
      </div>
      <div className="flex">
        <Button disabled variant="ghost" className="flex gap-2 text-primary">
          <Phone size={18} className="fill-primary text-primary" />
          <span className="text-primary"> Call</span>
        </Button>
        <UserInfoModal />
      </div>
    </header>
  );
}
