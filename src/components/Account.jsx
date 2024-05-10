import { useContext } from 'react';
import { UserContext } from './Context';

import AccountPage from './users/account-page';
import LoginPage from './users/login-page';

export default function Account() {
  const { username, isUserLoading } = useContext(UserContext);

  return (
    <div>{!isUserLoading && username ? <AccountPage /> : <LoginPage />}</div>
  );
}
