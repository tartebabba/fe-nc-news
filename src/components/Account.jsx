import { useContext, useEffect, useState } from 'react';
import { UserContext, UserUpdateContext } from './Context';

import { UserAuthForm } from './UserAuthForm';

export default function Account(props) {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { login, logout } = useContext(UserUpdateContext);

  useEffect(() => {
    Object.keys(user).length ? setIsLoading(false) : setIsLoading(true);
  }, [user]);

  return (
    <div>
      {!isLoading ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <UserAuthForm></UserAuthForm>
      )}
    </div>
  );
}
