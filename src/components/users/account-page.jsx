import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContext, useEffect, useState } from 'react';
import { UserContext, UserUpdateContext } from '@/components/Context';
import { Link } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { login, logout } = useContext(UserUpdateContext);

  useEffect(() => {
    user && Object.keys(user).length ? setIsLoading(false) : setIsLoading(true);
  }, [user]);
  return (
    <>
      <main className="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Welcome, {user.username}!</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="text-muted-foreground grid gap-4 text-sm"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="text-primary font-semibold">
              General
            </Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.avatar_url}
                      alt={`${user.username}'s (${user.name}) avatar`}
                    />
                    <AvatarFallback>
                      {user.name
                        .split(' ')
                        .map((name) => name[0].toUpperCase())
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.username}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={logout}>Log out</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
