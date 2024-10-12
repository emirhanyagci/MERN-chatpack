import { Button } from "@/components/ui/button";
import { DialogClose, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

import UserSearch from "../user/UserSearch";
import { User } from "../user/userSlice";
import { useCreateChatMutation } from "@/services/chatApi";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "@/Context/SocketContext";

export default function NewChatTab({
  setOpenHandler,
}: {
  setOpenHandler: (open: boolean) => void;
}) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [createChat, result] = useCreateChatMutation();
  const { socket } = useSocketContext();
  const navigate = useNavigate();
  function selectHandler(user: User) {
    if (selectedUserId === user._id) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(user._id as string);
    }
  }
  async function createChatHandler() {
    try {
      const chat = await createChat({
        userId: selectedUserId as string,
      }).unwrap();

      socket?.emit("new-chat", { userId: selectedUserId, chatId: chat.chatId });
      socket?.emit("join-room", chat.chatId);
      navigate(`/home/${chat.chatId}`);
      setOpenHandler(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="space-y-4">
      <DialogDescription className="text-xl">Create New Chat</DialogDescription>
      {result.isLoading ? (
        <Loader size={36} />
      ) : (
        <UserSearch selected={selectedUserId} selectHandler={selectHandler} />
      )}

      <div className="flex justify-end gap-1">
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button onClick={createChatHandler} disabled={!selectedUserId}>
          Create Chat
        </Button>
      </div>
    </div>
  );
}
