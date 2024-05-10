import { useContext, useEffect, useState } from 'react';
import { UserContext, UserUpdateContext } from './Context';

import { UserAuthForm } from './UserAuthForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Account(props) {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { login, logout } = useContext(UserUpdateContext);

  useEffect(() => {
    user && Object.keys(user).length ? setIsLoading(false) : setIsLoading(true);
  }, [user]);

  return (
    <div>
      {!isLoading && user ? (
        <div>
          <Avatar>
            <AvatarImage
              src={user.avatar_url}
              alt={`${user.username}'s (${user.name}) avatar`}
            />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <UserAuthForm></UserAuthForm>
      )}
    </div>
  );
}
