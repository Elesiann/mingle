import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { PropsWithChildren, createContext, useState } from "react";

import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { RegisterInputs } from "../components/layouts/RegisterForm";
import { auth } from "../firebase";

interface AuthContextProps {
  user: User;
  login: (data: RegisterInputs) => Promise<void> | unknown;
  register: (data: RegisterInputs) => Promise<void>;
  logout: () => void;
  handleGoogleLogin: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const Auth = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({} as User);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
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

  const handleLogin = async (data: RegisterInputs) => {
    const { email, password } = data;
    await signIn(email, password);
  };

  const handleRegister = async (data: RegisterInputs) => {
    const { email, password } = data;
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await handleUpdateUserName(data);
        await signIn(email, password);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user as User);
        return toast.success("Login realizado com sucesso!");
      })
      .catch((error) => {
        console.log(error.code);
        toast.error(error.message);
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
      localStorage.clear();
      setUser({} as User);
      window.location.reload();
    });
  };

  const context = {
    user,
    login: (data: RegisterInputs) => handleLogin(data),
    register: (data: RegisterInputs) => handleRegister(data),
    logout: handleLogout,
    handleGoogleLogin
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default Auth;
