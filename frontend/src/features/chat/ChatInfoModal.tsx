import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import Avatar from "@/components/Avatar";
import { Chat } from "./chatSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";

export default function ChatInfoModal({ chat }: { chat: Chat }) {
  const currentUser = useSelector(selectUser);

  const participant = chat.members.find(
    (member) => member._id !== currentUser._id,
  );
  if (!participant) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex aspect-square gap-2 rounded-full p-1 text-primary"
        >
          <Info size={20} className="text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="User info">
        <DialogHeader>
          <DialogTitle className="text-xl">User Info</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col items-center justify-center">
            <Avatar
              size={24}
              src={participant.avatar as string}
              fallback="EY"
            />
            <span className="text-base text-foreground">
              {participant.username}
            </span>
            <span className="text-muted-foreground">#{participant._id}</span>
          </div>
          <div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Email:</span>
              <span className="text-foreground">{participant.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className="text-foreground">{participant.status}</span>
            </div>
          </div>
          <div className="space-x-2">
            <Button variant="outline">Report User</Button>
            <Button variant="destructive">Block User</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
