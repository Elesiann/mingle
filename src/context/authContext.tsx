import { User } from "firebase/auth";
import { PropsWithChildren, createContext, useState } from "react";

interface AuthContextProps {
  user: User;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const Auth = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({} as User);

  const handleLogout = () => {
    // logout logic
  };

  const setUserHandler = () => {
    // set user logic
  };

  const context = {
    user,
    login: () => {},
    logout: () => {}
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default Auth;
