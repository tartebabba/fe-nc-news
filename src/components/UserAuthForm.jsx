import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext, useState } from 'react';
import { UserUpdateContext } from './Context';

export function UserAuthForm() {
  const { login } = useContext(UserUpdateContext);
  const [user, setUser] = useState(null);

  const handleClick = (e) => {
    login(user);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        {/* <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div> */}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleClick}>
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
