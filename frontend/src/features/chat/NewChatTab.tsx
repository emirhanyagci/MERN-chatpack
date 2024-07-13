import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserCard from "@/features/user/UserCard";
import { DialogClose, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "../user/userSlice";
import { useLazySearchUserQuery } from "@/services/userApi";
import useDebounceInput from "@/hooks/useDebounceInput ";
import UserCardSkeleton from "../user/UserCardSkeleton";
// const mockUser = [
//   {
//     _id: "12912939121231",
//     username: "emirhan",
//     email: "emirhan.yacis@gmail.com",
//     avatarUrl: "",
//     status: "Free",
//     blockList: [],
//   },
//   {
//     _id: "23342352345235",
//     username: "emirhan",
//     email: "emirhan.yacis@gmail.com",
//     avatarUrl: "",
//     status: "Free",
//     blockList: [],
//   },
//   {
//     _id: "45324123123123",
//     username: "emirhan",
//     email: "emirhan.yacis@gmail.com",
//     avatarUrl: "",
//     status: "Free",
//     blockList: [],
//   },
// ];
export default function NewChatTab() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[] | []>([]);
  const [searchUser, result] = useLazySearchUserQuery();
  const { eventHandler, isDebouncing } = useDebounceInput(
    searchUserHandler,
    3000,
  );
  function selectHandler(user: User) {
    setSelectedUserId(user._id as string);
  }

  async function searchUserHandler(inputValue: string) {
    setSelectedUserId(null);
    try {
      const resultSearch = await searchUser(inputValue);
      if (resultSearch.data?.users) {
        setUsers(resultSearch.data?.users);
      }
    } catch (e) {
      console.log(e);
      //TOAST
    }
  }

  return (
    <div className="space-y-4">
      <DialogDescription className="text-xl">Create New Chat</DialogDescription>
      <Input
        onChange={eventHandler}
        type="text"
        placeholder="Type email or username"
      />
      <ScrollArea>
        <div className="grid max-h-96 grid-cols-2">
          {isDebouncing || result.isLoading || result.isFetching ? (
            <>
              <UserCardSkeleton />
              <UserCardSkeleton />
              <UserCardSkeleton />
              <UserCardSkeleton />
            </>
          ) : (
            users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                selectHandler={selectHandler}
                isActive={selectedUserId === user._id}
              />
            ))
          )}
        </div>
      </ScrollArea>
      <div className="flex justify-end gap-1">
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button disabled={!selectedUserId}>Create Chat</Button>
      </div>
    </div>
  );
}
