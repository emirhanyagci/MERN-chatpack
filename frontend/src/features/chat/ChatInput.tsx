import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smile, SendHorizontal, Paperclip } from "lucide-react";
export default function ChatInput() {
  return (
    <div className="flex items-center gap-1 p-5">
      <Button variant="ghost" size="sm">
        <Paperclip className="cursor-pointer text-primary" />
      </Button>
      <Button variant="ghost" size="sm">
        <Smile className="cursor-pointer text-primary" />
      </Button>
      <Input type="text" />
      <Button variant="ghost" size="sm">
        <SendHorizontal className="cursor-pointer text-primary" />
      </Button>
    </div>
  );
}
