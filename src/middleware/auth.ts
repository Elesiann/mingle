import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { RegisterInputs } from "../components/layouts/RegisterForm";

export const handleLogin = async (data: RegisterInputs) => {
  const { email, password } = data;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userData) => {
      console.log(userData.user);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};

export const handleRegister = async (data: RegisterInputs) => {
  const { email, password } = data;
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      handleUpdateUserName(data);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};

export const handleUpdateUserName = async (data: RegisterInputs) => {
  const { name } = data;

  const currentUser = auth.currentUser;
  if (currentUser) {
    await updateProfile(currentUser, {
      displayName: name
    });
  }
};
