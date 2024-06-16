import Chats from "@/features/chat/Chats";
import NewChat from "@/features/chat/NewChat";
import MenuDrawer from "@/components/MenuDrawer";
import CountBadge from "@/components/CountBadge";

export default function SideBar() {
  return (
    <aside className="col-span-5 space-y-3 border-r border-border xl:col-span-3">
      <header className="flex items-center justify-between px-5 pt-3">
        <div className="flex items-center gap-3">
          <MenuDrawer />
          <span className="text-xl text-foreground">Messages</span>
          <CountBadge count={12} variant="secondary" />
        </div>
        <NewChat />
      </header>
      <Chats />
    </aside>
  );
}
