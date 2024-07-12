import { Loader as LoaderIcon } from "lucide-react";
export default function Loader({ size }: { size: number }) {
  return (
    <LoaderIcon
      className="duration-3000 animate-spin text-primary"
      size={size}
    />
  );
}
