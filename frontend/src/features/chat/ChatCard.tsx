import CountBadge from "@/components/CountBadge";
import Avatar from "@/components/Avatar";

export default function ChatCard() {
  return (
    <div className="flex gap-3 p-5 hover:bg-muted">
      <Avatar src="https://github.com/shadcn.png" fallback="EY" />

      <div className="w-full space-y-1">
        <div className="flex justify-between">
          <h3 className="text-base text-foreground">Emirhan Yagci</h3>
          <span className="text-sm text-muted-foreground">12m</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="inline-block max-w-[20ch] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
            Hahahha , this amazingddddddd
          </span>

          <CountBadge count={4} />
        </div>
      </div>
    </div>
  );
}
