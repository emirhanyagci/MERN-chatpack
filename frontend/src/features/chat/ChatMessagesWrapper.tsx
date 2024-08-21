import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import TextItem from "@/features/chat/TextItem";
import { useGetMessagesQuery } from "@/services/chatApi";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function ChatMessagesWrapper({
  newMessage,
}: {
  newMessage: string;
}) {
  const { chatId } = useParams();
  const messageContainerRef = useRef(null);
  const { data, isLoading } = useGetMessagesQuery(chatId as string, {
    skip: !chatId,
  });
  const messages = data?.messages;
  useEffect(() => {
    messageContainerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [newMessage]);

  return (
    <ScrollArea className="h-full">
      {isLoading ? (
        <div className="grid place-content-center pt-5">
          <Loader size={24} />
        </div>
      ) : (
        <div ref={messageContainerRef} className="flex justify-center">
          <ul className="w-full space-y-1 p-5 xl:w-4/5 2xl:w-4/6">
            {messages?.length === 0 || !messages ? (
              <div className="flex justify-center">
                <Badge>Start chat</Badge>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <Badge>Start chat</Badge>
                </div>
                {messages?.map((msg, index) => {
                  const isContinue =
                    index > 0 &&
                    messages[index - 1].sender._id === msg.sender._id;
                  return (
                    <TextItem
                      message={msg}
                      isContinue={isContinue}
                      key={msg._id}
                    />
                  );
                })}
              </>
            )}
          </ul>
        </div>
      )}
    </ScrollArea>
  );
}
