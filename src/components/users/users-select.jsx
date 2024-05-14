import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContext, useState, useEffect } from 'react';
import { getUsers } from '@/utils/apis';
import { UserUpdateContext } from '../Context';
import { DropdownMenuSeparator } from '../ui/dropdown-menu';
import { useLocation } from 'react-router-dom';

export default function SelectUser() {
  const { logout, login } = useContext(UserUpdateContext);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [displayValue, setDisplayValue] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    getUsers().then(({ users }) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    if (user) {
      login(user);
      setDisplayValue(user.username);
    } else {
      setDisplayValue('Select a user');
    }
  }, [user]);

  const handleSelect = (e) => {
    if (e === 'logout') {
      setUser(null);
      logout();
    } else {
      setUser(e);
    }
  };

  return (
    <>
      <Select
        onValueChange={(e) => {
          handleSelect(e);
        }}
        id="user"
      >
        <SelectTrigger>
          <SelectValue placeholder={displayValue} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select user</SelectLabel>
            {users.map((user) => {
              return (
                <SelectItem key={user.username} value={user}>
                  {user.username}
                </SelectItem>
              );
            })}
            {user && (
              <>
                <DropdownMenuSeparator />
                <SelectItem key="logout" value="logout">
                  Logout
                </SelectItem>
              </>
            )}
            {!user && pathname !== '/account' && (
              <SelectItem key="logged-out" value="logout" disabled>
                Logged Out
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
