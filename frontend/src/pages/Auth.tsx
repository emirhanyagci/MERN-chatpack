import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTab from "@/features/auth/LoginTab";
import SignupTab from "@/features/auth/SignupTab";
import { useState } from "react";

export default function Auth() {
  const [tab, setTab] = useState("login");

  return (
    <main className="flex justify-center pt-5">
      <Tabs value={tab} defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger onClick={() => setTab("login")} value="login">
            Login
          </TabsTrigger>
          <TabsTrigger onClick={() => setTab("signup")} value="signup">
            Signup
          </TabsTrigger>
        </TabsList>
        <LoginTab />
        <SignupTab setTab={setTab} />
      </Tabs>
    </main>
  );
}
