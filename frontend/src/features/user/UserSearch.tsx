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
  setSelected,
}: {
  selectHandler: (user: User) => void;
  selected: string | null;
  setSelected: (id: string | null) => void;
}) {
  const [users, setUsers] = useState<User[] | []>([]);
  const { eventHandler, isDebouncing } = useDebounceInput(
    searchUserHandler,
    3000,
  );
  const [searchUser, result] = useLazySearchUserQuery();

  async function searchUserHandler(inputValue: string) {
    setSelected(null);
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
    <>
      {" "}
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
                isActive={selected === user._id}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </>
  );
}
