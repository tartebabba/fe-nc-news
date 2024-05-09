import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext, useEffect, useState } from 'react';
import { UserUpdateContext } from './Context';
import { getUsers } from '@/utils/apis';

export function UserAuthForm() {
  const { login } = useContext(UserUpdateContext);
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(({ users }) => {
      setUsers(users);
    });
  }, []);

  const handleClick = (e) => {
    login(user);
  };
  const handleSelect = (e) => {
    setUser(e);
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
          <Label htmlFor="user">User</Label>
          {/* <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            onChange={(e) => setUser(e.target.value)}
          /> */}
          <Select
            onValueChange={(e) => {
              handleSelect(e);
            }}
            id="user"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Available users" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available users</SelectLabel>
                {users.map((user) => {
                  return (
                    <SelectItem key={user.username} value={user}>
                      {user.username}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
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
