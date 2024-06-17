import { Button } from "@/components/ui/button";
import UserAvatar from "@/features/user/UserAvatar";
import { Undo2 } from "lucide-react";
import MenuDrawer from "./MenuDrawer";
import { Link } from "react-router-dom";
export default function MainNavBar() {
  return (
    <nav className="flex justify-between border-b border-border px-4 py-2 md:hidden">
      <Link to={"/home"}>
        <Button className="aspect-square rounded-full p-1" variant="ghost">
          <Undo2 className="text-primary" />
        </Button>
      </Link>
      <div className="flex items-center gap-2">
        <UserAvatar
          size={9}
          src="https://github.com/shadcn.png"
          fallback="EY"
        />
        <MenuDrawer />
      </div>
    </nav>
  );
}
