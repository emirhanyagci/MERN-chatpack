import {
  Avatar as ShadAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function Avatar({
  size,
  src,
  fallback,
}: {
  size?: number;
  src: string;
  fallback: string;
}) {
  return (
    <ShadAvatar className={size ? `h-${size} w-${size}` : ""}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </ShadAvatar>
  );
}
