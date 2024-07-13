import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserCard from "@/features/user/UserCard";
import UserBadge from "@/features/user/UserBadge";
import { useState } from "react";
import { DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/features/user/userSlice";
const mockUser = [
  {
    _id: "12912939121231",
    username: "emirhanyac1",
    email: "emirhan.yacis@gmail.com",
    avatarUrl: "",
    status: "Free",
    blockList: [],
  },
  {
    _id: "23342352345235",
    username: "emirhanyac2",
    email: "emirhan.yacis@gmail.com",
    avatarUrl: "",
    status: "Free",
    blockList: [],
  },
  {
    _id: "45324123123123",
    username: "emirhanyac3",
    email: "emirhan.yacis@gmail.com",
    avatarUrl: "",
    status: "Free",
    blockList: [],
  },
];
export default function NewGroupTab() {
  const [selectedUsers, setSelectedUsers] = useState<User[] | []>([]);
  function selectHandler(user: User) {
    setSelectedUsers((oldUsers) => {
      const uIndex = oldUsers.findIndex((u) => u._id === user._id);
      if (uIndex === -1) {
        return [...oldUsers, user];
      }
      return [...oldUsers];
    });
  }
  function unSelectUser(user: User) {
    setSelectedUsers((oldUsers) => oldUsers.filter((u) => u._id !== user._id));
  }
  return (
    <div className="space-y-3">
      <DialogDescription className="text-xl">
        Create New Group
      </DialogDescription>
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
              {selectedUsers.map((item) => {
                return (
                  <UserBadge
                    user={item}
                    unSelectUser={unSelectUser}
                    key={item._id}
                  />
                );
              })}
            </div>
          </ScrollArea>
          <ScrollArea>
            <div className="grid max-h-80 grid-cols-2">
              {mockUser.map((item) => {
                return (
                  <UserCard
                    key={item._id}
                    user={item}
                    selectHandler={selectHandler}
                    isActive={
                      selectedUsers.findIndex((u) => u._id === item._id) !== -1
                    }
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
