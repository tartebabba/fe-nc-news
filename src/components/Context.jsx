import { createContext, useState } from 'react';

export const UserContext = createContext();
export const UserUpdateContext = createContext();

// export function useUser() {
//   return useContext(UserContext);
// }

// export function useUserUpdate() {
//   return useContext(UserUpdateContext);
// }

export function UserProvider({ children }) {
  const [userLogin, setUserLogin] = useState();

  const login = (userData) => {
    setUserLogin(userData);
  };

  const logout = () => {
    setUserLogin(null);
  };
  return (
    <UserContext.Provider value={userLogin}>
      <UserUpdateContext.Provider value={{ login, logout }}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
