import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const iconSize = 20;
import { SheetClose } from "@/components/ui/sheet";
export default function NavItemWithLink({
  Icon,
  title,
  to,
  children = null,
}: {
  Icon: React.ElementType;
  title: string;
  to: string;
  children?: React.ReactElement | null;
}) {
  return (
    <SheetClose asChild>
      <Link to={to}>
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
      </Link>
    </SheetClose>
  );
}
