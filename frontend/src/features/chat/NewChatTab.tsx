import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserCard from "@/features/user/UserCard";
import { DialogClose } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function NewChatTab() {
  const [selectedUserId, setSelectedUserId] = useState("1");
  function selectHandler(userId: string) {
    setSelectedUserId(userId);
  }
  return (
    <div className="space-y-3">
      <Input type="text" placeholder="Search for new user" />
      <div className="grid grid-cols-2">
        <UserCard
          userId={"1"}
          selectHandler={selectHandler}
          isActive={selectedUserId === "1"}
        />
        <UserCard
          userId={"2"}
          selectHandler={selectHandler}
          isActive={selectedUserId === "2"}
        />

        <div className="flex w-full items-center space-x-2 px-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-1">
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button>Create Chat</Button>
      </div>
    </div>
  );
}
