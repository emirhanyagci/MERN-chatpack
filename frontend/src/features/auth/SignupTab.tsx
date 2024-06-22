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
export default function SignupTab() {
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
            <Input id="username" type="text" required placeholder="emirhan" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="avatar">Avatar</Label>
            <Input id="avatar" type="file" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full">Create an account</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
