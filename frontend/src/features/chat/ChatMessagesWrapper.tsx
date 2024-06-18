import { ScrollArea } from "@/components/ui/scroll-area";
import TextItem from "@/features/chat/TextItem";

export default function ChatMessagesWrapper() {
  return (
    <ScrollArea className="h-full">
      <div className="flex justify-center">
        <ul className="h-[1050px] w-full space-y-1 p-5 xl:w-4/5 2xl:w-4/6">
          <TextItem standLeft={true} withImage={true} />
          <TextItem standLeft={false} withImage={true} />
          <TextItem standLeft={true} withImage={true} />
          <TextItem standLeft={true} withImage={false} />
        </ul>
      </div>
    </ScrollArea>
  );
}
