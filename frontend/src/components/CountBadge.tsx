import { Badge } from "./ui/badge";

export default function CountBadge({
  count,
  variant = "default",
}: {
  count: number;
  variant?: "primary" | "secondary" | "default";
}) {
  return <Badge variant={variant as never}>{count}</Badge>;
}
