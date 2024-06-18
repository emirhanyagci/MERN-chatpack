import { Input } from "@/components/ui/input";
import { Smile, SendHorizontal } from "lucide-react";
export default function ChatInput() {
  return (
    <div className="flex items-center gap-3 p-5">
      <Smile className="text-foreground" />
      <Input type="text" />
      <SendHorizontal className="text-foreground" />
    </div>
  );
}
