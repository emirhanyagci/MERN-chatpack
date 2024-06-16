import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavItems from "./NavItems";

export default function MenuDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-primary" />
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
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>EY</AvatarFallback>
                  </Avatar>
                  <span className="text-base text-foreground">
                    Emirhan Yagci
                  </span>
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
