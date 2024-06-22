import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTab from "@/features/auth/LoginTab";
import SignupTab from "@/features/auth/SignupTab";

export default function Auth() {
  return (
    <main className="flex justify-center pt-5">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <LoginTab />
        <SignupTab />
      </Tabs>
    </main>
  );
}
