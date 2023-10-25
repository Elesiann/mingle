import { User } from "firebase/auth";
import { PropsWithChildren, createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { RegisterInputs } from "../components/layouts/RegisterForm";
import { auth } from "../firebase";
import { toast } from "react-toastify";

interface AuthContextProps {
  user: User;
  login: (data: RegisterInputs) => Promise<void> | unknown;
  register: (data: RegisterInputs) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const Auth = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({} as User);

  const handleLogin = async (data: RegisterInputs) => {
    const { email, password } = data;
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userData) => {
        setUser(userData.user);
        localStorage.setItem("user", JSON.stringify(userData.user));
        toast.success("Login realizado com sucesso!");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          return toast.error("Usuário não encontrado");
        }
        if (error.code === "auth/wrong-password") {
          return toast.error("Senha incorreta");
        }
        if (error.code === "auth/too-many-requests") {
          return toast.error("Muitas tentativas. Tente novamente mais tarde");
        }
        toast.error(
          "Erro ao realizar login. Verifique seus dados e tente novamente"
        );
      });
  };

  const handleRegister = async (data: RegisterInputs) => {
    const { email, password } = data;
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        handleUpdateUserName(data);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const handleUpdateUserName = async (data: RegisterInputs) => {
    const { name } = data;

    const currentUser = auth.currentUser;
    if (currentUser) {
      await updateProfile(currentUser, {
        displayName: name
      });
    }
  };

  const handleLogout = async () => {
    await auth.signOut().then(() => {
      toast.success("Você saiu da sua conta com sucesso!");
      localStorage.removeItem("user");
      setUser({} as User);
      window.location.reload();
    });
  };

  const context = {
    user,
    login: (data: RegisterInputs) => handleLogin(data),
    register: (data: RegisterInputs) => handleRegister(data),
    logout: handleLogout
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default Auth;
