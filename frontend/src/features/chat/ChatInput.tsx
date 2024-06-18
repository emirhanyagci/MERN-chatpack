import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smile, SendHorizontal } from "lucide-react";
export default function ChatInput() {
  return (
    <div className="flex items-center gap-1 p-5">
      <Button variant="ghost">
        <Smile className="cursor-pointer text-primary" />
      </Button>
      <Input type="text" />
      <Button variant="ghost">
        <SendHorizontal className="cursor-pointer text-primary" />
      </Button>
    </div>
  );
}
