import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({
  size,
  src,
  fallback,
}: {
  size?: number;
  src: string;
  fallback: string;
}) {
  return (
    <Avatar className={size ? `h-${size} w-${size}` : ""}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
