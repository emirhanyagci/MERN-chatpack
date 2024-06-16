import React from "react";
import { Button } from "@/components/ui/button";
const iconSize = 20;

export default function NavItem({
  Icon,
  title,
  children = null,
}: {
  Icon: React.ElementType;
  title: string;
  children?: React.ReactElement | null;
}) {
  return (
    <li>
      <Button
        variant="ghost"
        className="flex w-full items-center justify-between"
        asChild
      >
        <div>
          <span className="flex gap-2">
            <Icon size={iconSize} />
            <span>{title}</span>
          </span>
          {children}
        </div>
      </Button>
    </li>
  );
}
