import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SelectUser from './users/users-select';
import { useState } from 'react';
import {
  CircleUserIcon,
  HomeIcon,
  Menu,
  NewspaperIcon,
  Search,
  SettingsIcon,
  TelescopeIcon,
  UserIcon,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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
import { Input } from './ui/input';

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

  const NavigationPages = {
    Home: <HomeIcon className="h-4 w-4 " />,
    Articles: <NewspaperIcon className="h-4 w-4" />,
    Topics: <TelescopeIcon className="h-4 w-4" />,
    Users: <UserIcon className="h-4 w-4" />,
    Account: <SettingsIcon className="h-4 w-4" />,
  };

  return (
    <>
      <header className="container sticky top-0 flex items-center justify-between gap-2 py-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Menu />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px]  sm:w-[540px]">
            <SheetTitle>Navigation</SheetTitle>
            <hr class="h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
            <nav className="my-2 grid gap-1">
              {Object.entries(NavigationPages).map(([page, icon]) => {
                return (
                  <div
                    className="flex items-center gap-1 rounded-sm px-2 py-1 hover:bg-slate-100"
                    key={page}
                  >
                    {icon}
                    <Link to={`${page === 'Home' ? '/' : page.toLowerCase()}`}>
                      {page}
                    </Link>
                  </div>
                );
              })}
            </nav>
            <hr class="h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Input placeholder="Search Fakeddit"></Input>
          <Search />
        </div>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
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
              <SelectUser />
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