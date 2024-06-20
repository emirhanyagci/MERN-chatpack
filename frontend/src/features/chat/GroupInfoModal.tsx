import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import Avatar from "@/components/Avatar";
import UserCard from "@/features/user/UserCard";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GroupInfoModal() {
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Group Info</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col items-center justify-center">
            <Avatar
              size={24}
              src="https://github.com/shadcn.png"
              fallback="EY"
            />
            <span className="text-base text-foreground">Fantastic Four</span>
          </div>
          <div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Created:</span>
              <span className="text-foreground">15/03/2024 16:15</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                Description:
              </span>
              <span className="text-foreground">Fullstack developer</span>
            </div>
          </div>
          <div>
            <h2 className="text-bold font-bold">Members</h2>
            <ScrollArea>
              <ul className="max-h-60">
                <li className="flex items-center">
                  <div className="w-full">
                    <UserCard userId="3" withRole={true} role={"ADMIN"} />
                  </div>
                  <Button variant="ghost">Make Manager</Button>
                  <ConfirmDialog
                    onConfirm={() => {
                      console.log("kicked");
                    }}
                  >
                    <Button variant="destructive">Kick</Button>
                  </ConfirmDialog>
                </li>
                <li className="flex items-center">
                  <div className="w-full">
                    <UserCard userId="3" withRole={true} role={"ADMIN"} />
                  </div>
                  <Button variant="ghost">Make Manager</Button>
                  <ConfirmDialog
                    onConfirm={() => {
                      console.log("kicked");
                    }}
                  >
                    <Button variant="destructive">Kick</Button>
                  </ConfirmDialog>
                </li>
                <li className="flex items-center">
                  <div className="w-full">
                    <UserCard userId="3" withRole={true} role={"ADMIN"} />
                  </div>
                  <Button variant="ghost">Make Manager</Button>
                  <ConfirmDialog
                    onConfirm={() => {
                      console.log("kicked");
                    }}
                  >
                    <Button variant="destructive">Kick</Button>
                  </ConfirmDialog>
                </li>
                <li className="flex items-center">
                  <div className="w-full">
                    <UserCard userId="3" withRole={true} role={"ADMIN"} />
                  </div>
                  <Button variant="ghost">Make Manager</Button>
                  <ConfirmDialog
                    onConfirm={() => {
                      console.log("kicked");
                    }}
                  >
                    <Button variant="destructive">Kick</Button>
                  </ConfirmDialog>
                </li>
              </ul>
            </ScrollArea>
          </div>
          <div className="space-x-2">
            <Button variant="outline">Report Group</Button>
            <ConfirmDialog
              onConfirm={() => {
                console.log("confirmed leave");
              }}
            >
              <Button variant="destructive">Leave Group</Button>
            </ConfirmDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
