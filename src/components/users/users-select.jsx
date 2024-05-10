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

export default function SelectUser() {
  const { logout, login } = useContext(UserUpdateContext);
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  console.log(user, 'select');

  useEffect(() => {
    getUsers().then(({ users }) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    login(user);
  }, [user]);

  const handleSelect = (e) => {
    if (e === 'logout') {
      setUser();
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
            <SelectItem key="logout" value="logout">
              {user === undefined ? 'Logged out' : 'Logout'}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
