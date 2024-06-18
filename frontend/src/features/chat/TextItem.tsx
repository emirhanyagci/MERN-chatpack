import UserAvatar from "@/features/user/UserAvatar";

export default function TextItem({
  standLeft,
  withImage,
}: {
  standLeft: boolean;
  withImage: boolean;
}) {
  return (
    <li
      className={`flex items-center justify-end gap-3 ${standLeft ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`rounded-lg p-2 text-sm ${standLeft ? "bg-muted text-foreground" : "bg-primary text-muted"}`}
      >
        asd
      </div>
      <div className="h-9 w-9">
        {withImage && (
          <UserAvatar
            size={9}
            src="https://github.com/shadcn.png"
            fallback="EY"
          />
        )}
      </div>
    </li>
  );
}
