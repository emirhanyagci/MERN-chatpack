import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserCard({
  userId,
  isActive,
  selectHandler,
}: {
  userId: string;
  isActive: boolean;
  selectHandler: (userId: string) => void;
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-muted ${isActive ? "border-2 border-primary" : ""}`}
      onClick={() => selectHandler(userId)}
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>EY</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <h3 className="text-base text-foreground">Emirhan Yagci</h3>
      </div>
    </div>
  );
}
// ${active ? 'bg-'}
