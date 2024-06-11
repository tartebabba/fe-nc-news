import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SelectUser from './users/users-select';
import { useState } from 'react';
import { CircleUserIcon, Menu, Newspaper } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserContext, UserUpdateContext } from './Context';
import { useContext } from 'react';
import { ModeToggle } from './main/mode-toggle';

export default function Navbar() {
  const { login, logout } = useContext(UserUpdateContext);
  const { avatar_url, username, name, isUserLoading } = useContext(UserContext);
  const [showInput, setShowInput] = useState(false);

  const logOutUser = () => {
    logout();
    navigate('/account');
  };

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const navigateToLink = (url) => {
    navigate(`${url}`);
  };

  const NavigationPages = [
    'Home',
    'Articles',
    'Topics',
    'Users',
    'Account',
  ];

  return (
    <>
      <header className="sticky top-0 flex h-16 w-full items-center gap-4 border-b bg-slate-200 px-4 dark:bg-[#0D1113] md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Newspaper className="h-6 w-6" />
            <span className="sr-only">Fakeddit</span>
          </Link>
          {NavigationPages.map((page) => {
            return (
              <Link
                key={page}
                to={`${page === 'Home' ? '/' : page.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {page}
              </Link>
            );
          })}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              {NavigationPages.map((page) => {
                return (
                  <Link
                    key={page}
                    to={`${page === 'Home' ? '/' : page.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {page}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="relative ml-auto flex-1 sm:flex-initial">
            <SelectUser />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {!isUserLoading && avatar_url ? (
                  <Avatar>
                    <AvatarImage
                      src={avatar_url}
                      alt={`${username}'s (${name}) avatar`}
                    />
                    <AvatarFallback>
                      {name
                        .split(' ')
                        .map((name) => name[0].toUpperCase())
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarFallback>
                      <CircleUserIcon className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => navigateToLink('account')}>
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logOutUser}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle></ModeToggle>
        </div>
      </header>
    </>
  );
}