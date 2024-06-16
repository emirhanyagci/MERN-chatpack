// open a new modal and show 2 tab create group or find user
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export default function NewChat() {
  return (
    <Button className="aspect-square rounded-full p-1">
      <Plus />
    </Button>
  );
}
