import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import UserAvatar from "@/features/user/UserAvatar";

export default function UserInfoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex aspect-square gap-2 rounded-full p-1 text-primary"
        >
          <Info size={20} className="text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="1313131">
        <DialogHeader>
          <DialogTitle className="text-xl">User Info</DialogTitle>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col items-center justify-center space-y-3">
              <UserAvatar
                size={24}
                src="https://github.com/shadcn.png"
                fallback="EY"
              />
              <span className="text-base text-foreground">Emirhan Yagci</span>
              <span className="">#111111111</span>
            </div>
            <div>
              <div className="flex flex-col">
                <span>Status:</span>
                <span className="text-foreground">Fullstack developer</span>
              </div>
            </div>
            <div className="space-x-2">
              <Button variant="outline">Report User</Button>
              <Button variant="destructive">Block User</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
