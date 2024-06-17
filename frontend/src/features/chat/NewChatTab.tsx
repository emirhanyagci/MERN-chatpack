import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserCard from "@/features/user/UserCard";
import { DialogClose } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NewChatTab() {
  const [selectedUserId, setSelectedUserId] = useState("1");
  function selectHandler(userId: string) {
    setSelectedUserId(userId);
  }
  return (
    <div className="space-y-4">
      <h1 className="text-xl">Create New Chat</h1>
      <Input type="text" placeholder="Type id or username" />
      <ScrollArea>
        <div className="grid max-h-96 grid-cols-2">
          {Array.from({ length: 20 }, (_, index) => index + 1).map((item) => (
            <UserCard
              key={item}
              userId={item.toString()}
              selectHandler={selectHandler}
              isActive={selectedUserId === item.toString()}
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
