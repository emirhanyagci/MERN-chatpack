import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserBadge from "@/features/user/UserBadge";
import { useState } from "react";
import { DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/features/user/userSlice";
import UserSearch from "../user/UserSearch";
import { useCreateGroupMutation } from "@/services/chatApi";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "@/Context/SocketContext";

export default function NewGroupTab({
  setOpenHandler,
}: {
  setOpenHandler: (open: boolean) => void;
}) {
  const [selectedUsers, setSelectedUsers] = useState<User[] | []>([]);
  const [groupName, setGroupName] = useState("");
  const { socket } = useSocketContext();
  const [createGroup, result] = useCreateGroupMutation();
  const navigate = useNavigate();
  function selectHandler(user: User) {
    setSelectedUsers((oldUsers) => {
      const uIndex = oldUsers.findIndex((u) => u._id === user._id);
      if (uIndex === -1) {
        return [...oldUsers, user];
      }
      console.log(uIndex);
      console.log(oldUsers);

      const newUsers = oldUsers.filter((u) => u._id !== user._id);

      return newUsers;
    });
  }
  function unSelectUser(user: User) {
    setSelectedUsers((oldUsers) => oldUsers.filter((u) => u._id !== user._id));
  }
  async function createGroupHandler() {
    try {
      const userIds = selectedUsers.map((user) => user._id as string);
      const chat = await createGroup({ userIds, groupName }).unwrap();
      socket?.emit("new-group", { selectedUsers, chatId: chat.chatId });
      socket?.emit("join-room", chat.chatId);

      navigate(`/home/${chat.chatId}`);
      setOpenHandler(false);
    } catch (err) {
      console.log(err);
    }
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
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            id="groupName"
            type="text"
            placeholder="Name your group... 'Fantastic Four'?"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="groupMember">Group Member</Label>
          <UserSearch selected={selectedUsers} selectHandler={selectHandler}>
            <ScrollArea>
              <div className="mt-1 flex max-h-32 flex-wrap gap-2">
                {selectedUsers &&
                  selectedUsers.map((user) => {
                    return (
                      <UserBadge
                        user={user}
                        unSelectUser={unSelectUser}
                        key={user._id}
                      />
                    );
                  })}
              </div>
            </ScrollArea>
          </UserSearch>
        </div>
      </div>
      <div className="flex justify-end gap-1">
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button
          onClick={createGroupHandler}
          disabled={!selectedUsers || selectedUsers.length <= 0}
        >
          Create Group
        </Button>
      </div>
    </div>
  );
}
