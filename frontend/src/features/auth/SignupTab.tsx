import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { useSignupMutation } from "@/services/authApi";
import { toast } from "@/components/ui/use-toast";

export default function SignupTab({
  setTab,
}: {
  setTab: (tab: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [signup, { isLoading }] = useSignupMutation();
  async function onSignup() {
    const avatarFile = avatar as File;
    try {
      await signup({
        username,
        email,
        password,
        avatarFile,
      }).unwrap();
      setTab("login");
    } catch (e) {
      const err = e as {
        data?: { message?: string };
        error?: string;
        status?: number;
      };
      const message =
        err?.data?.message ?? err?.error ?? "Signup failed. Please try again.";
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: message,
      });
    }
  }
  return (
    <TabsContent value="signup">
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
              required
              placeholder="emirhan"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="avatar">Avatar</Label>
            <Input
              id="avatar"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAvatar(file as File);
                }
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button disabled={isLoading} onClick={onSignup} className="w-full">
            Create an account
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
