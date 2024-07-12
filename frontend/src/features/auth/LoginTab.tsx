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
import { useLoginMutation } from "@/services/authApi";
import { useState } from "react";
import { setSession } from "../user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function LoginTab() {
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function onLogin() {
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      localStorage.setItem("jwt", JSON.stringify(accessToken));
      dispatch(
        setSession({ accessToken: accessToken as string, isAuthed: true }),
      );
      navigate("/home");
      //TOAST
    } catch (e) {
      //TOAST
      console.log(e);
    }
  }
  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid gap-2">
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
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex">
          <Button
            disabled={isLoading}
            onClick={() => {
              setEmail("emirhan.yacis@gmail.com");
              setPassword("123456");
            }}
            variant="link"
            className="w-full"
          >
            Set Credentials
          </Button>
          <Button disabled={isLoading} onClick={onLogin} className="w-full">
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
