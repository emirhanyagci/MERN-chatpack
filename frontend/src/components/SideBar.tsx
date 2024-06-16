import Chats from "@/features/chat/Chats";
import { Badge } from "@/components/ui/badge";
import NewChat from "@/features/chat/NewChat";
import MenuDrawer from "./MenuDrawer";

export default function SideBar() {
  return (
    <aside className="col-span-3 border-r px-3">
      <header className="flex items-center justify-between pt-3">
        <div className="flex items-center gap-3">
          <MenuDrawer />
          <span className="text-xl">Messages</span>
          <Badge className="px-2 py-1" variant="secondary">
            12
          </Badge>
        </div>
        <NewChat />
      </header>
      <Chats />
    </aside>
  );
}
