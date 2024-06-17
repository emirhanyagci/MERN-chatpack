import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserCard from "@/features/user/UserCard";
import UserBadge from "@/features/user/UserBadge";
import { useState } from "react";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NewGroupTab() {
  const [selectedUsers, setSelectedUsers] = useState();
  function selectHandler(user: any) {
    console.log(user);
  }
  return (
    <div className="space-y-3">
      <h1 className="text-xl">Create New Group</h1>
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="groupName">Group Name</Label>
          <Input
            id="groupName"
            type="text"
            placeholder="Name your group... 'Fantastic Four'?"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="groupMember">Group Member</Label>
          <Input
            id="groupMember"
            type="text"
            placeholder="Name or id of one of the Fantastic Four!"
          />
          <ScrollArea>
            <div className="mt-1 flex max-h-32 flex-wrap gap-2">
              {Array.from({ length: 5 }, (_, i) => i).map((item) => {
                return <UserBadge key={item} />;
              })}
            </div>
          </ScrollArea>
          <ScrollArea>
            <div className="grid max-h-80 grid-cols-2">
              {Array.from({ length: 10 }, (_, i) => i).map((item) => {
                return (
                  <UserCard
                    key={item}
                    userId="1"
                    selectHandler={selectHandler}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex justify-end gap-1">
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button>Create Group</Button>
      </div>
    </div>
  );
}
