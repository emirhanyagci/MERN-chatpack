import { Input } from "@/components/ui/input";
import ChatCard from "./ChatCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Chats() {
  return (
    <div className="space-y-2">
      <div className="px-5">
        <Input type="text" placeholder="Search in chats" />
      </div>
      <ChatCard />
      <ChatCard />
      <div className="flex w-full items-center space-x-2 px-5">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    </div>
  );
}
