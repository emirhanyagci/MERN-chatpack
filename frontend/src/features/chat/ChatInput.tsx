import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendMessageMutation } from "@/services/chatApi";
import { Smile, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
export default function ChatInput({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) {
  const [message, setMessage] = useState("");
  const chatId = useParams().chatId;
  const [sendMessage, result] = useSendMessageMutation();
  async function sendMessageHandler() {
    if (chatId && message) {
      try {
        await sendMessage({ chatId, message }).unwrap();
        onSendMessage(message);
        setMessage("");
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="flex items-center gap-1 p-5">
      <Button disabled={result.isLoading} variant="ghost" size="icon">
        <Paperclip className="h-5 w-5 cursor-pointer text-primary" />
      </Button>
      <Button disabled={result.isLoading} variant="ghost" size="icon">
        <Smile className="h-5 w-5 cursor-pointer text-primary" />
      </Button>
      <Input
        disabled={result.isLoading}
        className="flex-1"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        disabled={result.isLoading}
        onClick={sendMessageHandler}
        variant="ghost"
        size="icon"
      >
        {result.isLoading ? (
          <Loader size={16} />
        ) : (
          <Send className="h-5 w-5 cursor-pointer text-primary" />
        )}
      </Button>
    </div>
  );
}
