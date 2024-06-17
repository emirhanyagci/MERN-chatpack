export default function UserActiveStatus() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-green-500 p-1"></div>
      <span className="text-muted-foreground">Online</span>
    </div>
  );
}
