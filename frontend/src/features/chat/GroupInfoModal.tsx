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
import { DialogDescription } from "@radix-ui/react-dialog";
import { Chat, Role, rolePriority } from "./chatSlice";

export default function GroupInfoModal({ group }: { group: Chat }) {
  const groupMembers = group.members.map((member) => {
    if (member._id === group.owner) {
      return { ...member, role: Role.ADMIN };
    }
    if (group.managers.includes(member._id as string)) {
      return { ...member, role: Role.MANAGER };
    } else {
      return { ...member, role: Role.MEMBER };
    }
  });
  groupMembers.sort((a, b) => {
    return rolePriority[a.role] - rolePriority[b.role];
  });
  console.log(group);

  const createdAt = new Date(group.createdAt).toLocaleString();

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
        <DialogDescription></DialogDescription>
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
              <span className="text-foreground">{createdAt}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                Description:
              </span>
              <span className="text-foreground">{group.groupDescription}</span>
            </div>
          </div>
          <div>
            <h2 className="text-bold font-bold">Members</h2>
            <ScrollArea>
              <ul className="max-h-60">
                {groupMembers.map((user) => (
                  <li className="flex items-center" key={user._id}>
                    <UserCard user={user} withRole={true} />
                  </li>
                ))}
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
