import {
  MessageSquareText,
  ShieldAlert,
  Settings,
  Languages,
  Moon,
} from "lucide-react";
import CountBadge from "@/components/CountBadge";

import NavItem from "./NavItem";
import NavItemWithLink from "@/components/NavItemWithLink";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/Context/ThemeProvider";
export default function NavItems() {
  const { setTheme, theme } = useTheme();
  function darkModeHandler(isDark: boolean) {
    setTheme(isDark ? "dark" : "light");
  }
  return (
    <ul>
      <NavItemWithLink to="/home" Icon={MessageSquareText} title="Messages">
        <CountBadge count={12} />
      </NavItemWithLink>
      <NavItemWithLink
        to="/home/privacy"
        Icon={ShieldAlert}
        title="Privacy & Security"
      />
      <NavItemWithLink to="/home/settings" Icon={Settings} title="Settings" />
      <NavItem Icon={Languages} title="Language" />
      <NavItem Icon={Moon} title="Dark Mode">
        <Switch
          checked={theme === "dark" ? true : false}
          onCheckedChange={darkModeHandler}
        />
      </NavItem>
      <NavItem Icon={Moon} title="Sign out"></NavItem>
    </ul>
  );
}
