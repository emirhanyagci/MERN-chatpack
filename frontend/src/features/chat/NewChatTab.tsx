import { Button } from "@/components/ui/button";
import { DialogClose, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

import UserSearch from "../user/UserSearch";
import { User } from "../user/userSlice";

export default function NewChatTab() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  function selectHandler(user: User) {
    if (selectedUserId === user._id) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(user._id as string);
    }
  }

  return (
    <div className="space-y-4">
      <DialogDescription className="text-xl">Create New Chat</DialogDescription>
      <UserSearch
        selected={selectedUserId}
        setSelected={setSelectedUserId}
        selectHandler={selectHandler}
      />

      <div className="flex justify-end gap-1">
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button disabled={!selectedUserId}>Create Chat</Button>
      </div>
    </div>
  );
}
