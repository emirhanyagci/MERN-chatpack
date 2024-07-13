import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserCard from "@/features/user/UserCard";
import { DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "../user/userSlice";
const mockUser = [
  {
    _id: "12912939121231",
    username: "emirhan",
    email: "emirhan.yacis@gmail.com",
    avatarUrl: "",
    status: "Free",
    blockList: [],
  },
  {
    _id: "23342352345235",
    username: "emirhan",
    email: "emirhan.yacis@gmail.com",
    avatarUrl: "",
    status: "Free",
    blockList: [],
  },
  {
    _id: "45324123123123",
    username: "emirhan",
    email: "emirhan.yacis@gmail.com",
    avatarUrl: "",
    status: "Free",
    blockList: [],
  },
];
export default function NewChatTab() {
  const [selectedUserId, setSelectedUserId] = useState("1");
  function selectHandler(user: User) {
    setSelectedUserId(user._id as string);
  }
  return (
    <div className="space-y-4">
      <DialogDescription className="text-xl">Create New Chat</DialogDescription>
      <Input type="text" placeholder="Type id or username" />
      <ScrollArea>
        <div className="grid max-h-96 grid-cols-2">
          {mockUser.map((item) => (
            <UserCard
              key={item._id}
              user={item}
              selectHandler={selectHandler}
              isActive={selectedUserId === item._id}
            />
          ))}

          <div className="flex w-full items-center space-x-2 px-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[120px]" />
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="flex justify-end gap-1">
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button>Create Chat</Button>
      </div>
    </div>
  );
}
