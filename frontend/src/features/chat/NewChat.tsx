// open a new modal and show 2 tab create group or find user
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewChatTab from "./NewChatTab";
import NewGroupTab from "./NewGroupTab";
export default function NewChat() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="aspect-square rounded-full p-1">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent disableDefaultClose={true}>
          <Tabs defaultValue="newChat">
            <DialogHeader>
              <TabsList className="w-full">
                <TabsTrigger className="w-1/2" value="newChat">
                  New Chat
                </TabsTrigger>
                <TabsTrigger className="w-1/2" value="newGroup">
                  New Group
                </TabsTrigger>
              </TabsList>
            </DialogHeader>
            <TabsContent value="newChat">
              <NewChatTab />
            </TabsContent>
            <TabsContent value="newGroup">
              <NewGroupTab />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
