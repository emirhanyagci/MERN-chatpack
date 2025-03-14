import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSocketContext } from "@/Context/SocketContext";
import TextItem from "@/features/chat/TextItem";
import {
  chatApi,
  useGetMessagesQuery,
  useSetAsReadMutation,
} from "@/services/chatApi";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function ChatMessagesWrapper() {
  const { chatId } = useParams();
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const [setAsRead] = useSetAsReadMutation();
  const { data, isLoading } = useGetMessagesQuery(chatId as string, {
    skip: !chatId,
  });

  const messages = data?.messages;
  useEffect(() => {
    setAsRead(chatId as string)
      .unwrap()
      .then((response) => {
        console.log("Message readed",response);
        socket?.emit("message-read", { chatId });
      });
    socket?.on("send-message",() => {
      dispatch(chatApi.util.invalidateTags([{ type: "messages", id: "LIST" }]))
      setAsRead(chatId as string)
        .unwrap()
        .then((response) => {
          console.log(response);
          socket?.emit("message-read", { chatId });
        });
    });
  }, []);
  useEffect(() => {
    if (!messages) return;

    messageContainerRef.current?.scrollIntoView({
      block: "end",
    });
  }, [messages]);

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
