import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavItems from "./NavItems";
import Avatar from "@/components/Avatar";
import { useSelector } from "react-redux";
import { selectIsAuthed, selectUser } from "@/features/user/userSlice";

export default function MenuDrawer() {
  const user = useSelector(selectUser);
  const isAuthed = useSelector(selectIsAuthed);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="cursor-pointer text-primary" />
      </SheetTrigger>
      <SheetContent side="left" className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-5 text-2xl text-primary">
            ChatPack
          </SheetTitle>
        </SheetHeader>
        {isAuthed && (
          <SheetDescription asChild>
            <div>
              <div className="space-y-5">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Avatar size={24} src={user.avatar as string} fallback="EY" />

                  <div className="flex flex-col items-center">
                    <span className="text-base text-foreground">
                      {user.username}
                    </span>
                    <span className="text-sms lette text-muted-foreground">
                      #{user._id}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 border-b border-border pb-3">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">E-mail</span>
                    <span className="text-foreground">{user.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-foreground">
                      {user.status || "Hey there! I am using ChatPack."}
                    </span>
                  </div>
                </div>
                <NavItems />
              </div>
            </div>
          </SheetDescription>
        )}
      </SheetContent>
    </Sheet>
  );
}
