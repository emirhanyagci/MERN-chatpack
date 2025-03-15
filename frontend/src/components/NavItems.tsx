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
import { useDispatch } from "react-redux";
import { logOut } from "@/features/user/userSlice";
export default function NavItems() {
  const { setTheme, theme } = useTheme();
  const dispatch = useDispatch();
  function darkModeHandler(isDark: boolean) {
    setTheme(isDark ? "dark" : "light");
  }
  function onSignOut() {
    dispatch(logOut());
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
      <NavItemWithLink Icon={Moon} to="/" title="Sign out" onClickHandler={onSignOut}></NavItemWithLink>
    </ul>
  );
}
