import { useContext } from 'react';
import { UserContext, UserUpdateContext } from './Context';

import { UserAuthForm } from './UserAuthForm';

export default function Account(props) {
  const user = useContext(UserContext);
  const { login, logout } = useContext(UserUpdateContext);

  return (
    <div>
      <h1>{user}</h1>
      {user ? (
        <div>
          <h2>Welcome, {user}!</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <UserAuthForm></UserAuthForm>
      )}
    </div>
  );
}
