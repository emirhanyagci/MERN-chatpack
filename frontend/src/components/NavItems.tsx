import {
  MessageSquareText,
  ShieldAlert,
  Settings,
  Languages,
  Moon,
} from "lucide-react";
import CountBadge from "@/components/CountBadge";

import NavItem from "./NavItem";
import { Switch } from "@/components/ui/switch";

export default function NavItems() {
  return (
    <ul>
      <NavItem Icon={MessageSquareText} title="Messages">
        <CountBadge count={12} />
      </NavItem>
      <NavItem Icon={ShieldAlert} title="Privacy & Security" />
      <NavItem Icon={Settings} title="Settings" />
      <NavItem Icon={Languages} title="Language" />
      <NavItem Icon={Moon} title="Dark Mode">
        <Switch />
      </NavItem>
    </ul>
  );
}
