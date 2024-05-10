import { createContext, useState, useContext, useEffect } from 'react';

export const UserContext = createContext();
export const UserUpdateContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

// export function useUserUpdate() {
//   return useContext(UserUpdateContext);
// }

export function UserProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    setIsUserLoading(false);
    console.log(userLogin);
  }, [userLogin]);

  const login = (userData) => {
    setUserLogin(userData);
  };

  const logout = () => {
    setUserLogin(null);
  };
  return (
    <UserContext.Provider value={{ ...userLogin, isUserLoading }}>
      <UserUpdateContext.Provider value={{ login, logout }}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
