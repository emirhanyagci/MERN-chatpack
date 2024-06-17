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
import UserAvatar from "@/features/user/UserAvatar";

export default function MenuDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="cursor-pointer text-primary" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="mb-5 text-2xl text-primary">
            ChatPack
          </SheetTitle>
          <SheetDescription asChild>
            <div>
              <div className="space-y-5">
                <div className="flex flex-col items-center justify-center gap-2">
                  <UserAvatar
                    size={24}
                    src="https://github.com/shadcn.png"
                    fallback="EY"
                  />

                  <div className="flex flex-col items-center">
                    <span className="text-base text-foreground">
                      Emirhan Yagci
                    </span>
                    <span className="text-sms lette text-muted-foreground">
                      #11111111111
                    </span>
                  </div>
                </div>

                <div className="space-y-3 border-b border-border pb-3">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">E-mail</span>
                    <span className="text-foreground">
                      emirhan.yacis@gmail.com
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-foreground">Fullstack Developer</span>
                  </div>
                </div>
                <NavItems />
              </div>
              <div></div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
