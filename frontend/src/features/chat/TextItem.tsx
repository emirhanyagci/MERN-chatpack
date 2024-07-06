import Avatar from "@/components/Avatar";

export default function TextItem({
  standLeft,
  withImage,
}: {
  standLeft: boolean;
  withImage: boolean;
}) {
  return (
    <li
      className={`flex items-start justify-end gap-3 ${standLeft ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`flex max-w-64 flex-col rounded-lg p-2 text-sm ${standLeft ? "bg-muted text-foreground" : "bg-primary text-foreground"}`}
      >
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aut
          distinctio dolorem quis hic dolores laborum totam nisi soluta eum!
        </span>
        <span className="text-end">21:32</span>
      </div>
      <div className="h-9 w-9">
        {withImage && (
          <Avatar size={9} src="https://github.com/shadcn.png" fallback="EY" />
        )}
      </div>
    </li>
  );
}
