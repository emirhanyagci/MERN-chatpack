import { Input } from "@/components/ui/input";
import ChatCard from "./ChatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetChatHistoryQuery } from "@/services/chatApi";
export default function Chats() {
  const { data, isLoading } = useGetChatHistoryQuery();
  console.log(data);

  return (
    <div className="space-y-2">
      <div className="px-5">
        <Input type="text" placeholder="Search in chats" />
      </div>
      {isLoading ? (
        <div className="flex w-full items-center space-x-2 px-5">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      ) : data?.chats.length === 0 ? (
        <span>Chat not found</span>
      ) : (
        data?.chats.map((chat) => <ChatCard chat={chat} key={chat._id} />)
      )}
    </div>
  );
}
