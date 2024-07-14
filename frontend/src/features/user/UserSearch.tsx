/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import UserCardSkeleton from "./UserCardSkeleton";
import { User } from "./userSlice";
import useDebounceInput from "@/hooks/useDebounceInput ";
import UserCard from "./UserCard";
import { useLazySearchUserQuery } from "@/services/userApi";

export default function UserSearch({
  selected,
  selectHandler,
  children,
}: {
  selectHandler: (user: User) => void;
  selected: string | null | User[];
  children?: React.ReactElement;
}) {
  const [users, setUsers] = useState<User[] | []>([]);
  const { eventHandler, isDebouncing } = useDebounceInput(
    searchUserHandler,
    3000,
  );
  const [searchUser, result] = useLazySearchUserQuery();

  async function searchUserHandler(inputValue: string) {
    try {
      const resultSearch = await searchUser(inputValue);
      if (resultSearch.data?.users) {
        setUsers(resultSearch.data?.users);
      } else {
        setUsers([]);
      }
    } catch (e) {
      console.log(e);
      //TOAST
    }
  }

  const isActiveGroup = (userId: string) => {
    if (Array.isArray(selected)) {
      const index = selected.findIndex((u) => u._id === userId);
      if (index != -1) return true;
      else return false;
    }
    return false;
  };
  return (
    <>
      <Input
        onChange={eventHandler}
        type="text"
        placeholder="Type email or username"
      />
      {children}
      <ScrollArea>
        <div className="grid max-h-96 grid-cols-2">
          {isDebouncing || result.isLoading || result.isFetching ? (
            <>
              <UserCardSkeleton />
              <UserCardSkeleton />
              <UserCardSkeleton />
              <UserCardSkeleton />
            </>
          ) : users.length ? (
            users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                selectHandler={selectHandler}
                isActive={
                  selected === user._id || isActiveGroup(user._id as string)
                }
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-xl">
              User not found 😢
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  );
}
