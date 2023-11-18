import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import InputButton from "../InputButton";
import { AuthContext } from "../../context/authContext";
import SocialLoginForm from "./SocialLoginForm";

export interface RegisterInputs {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface RegisterFormProps {
  type: string;
  setIsLoading: (value: boolean) => void;
}

export default function RegisterForm(props: RegisterFormProps) {
  const authContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  useEffect(() => {
    if (authContext.user) {
      props.setIsLoading(false);
    }
  }, [authContext.user]);

  const handleSubmitForm = async (data: RegisterInputs) => {
    props.setIsLoading(true);
    props.type === "register"
      ? await authContext.register(data)
      : await authContext.login(data);
    props.setIsLoading(false);
  };

  const onSubmit = (data: RegisterInputs) => {
    handleSubmitForm(data);
  };

  const handleGoogleLogin = async () => {
    props.setIsLoading(true);
    await authContext.handleGoogleLogin().finally(() => {
      props.setIsLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {props.type === "register" && (
        <>
          <Input
            type="text"
            placeholder="Nome completo"
            register={{ ...register("name", { required: true }) }}
          />
          {errors.name && <span>Campo obrigatório</span>}
        </>
      )}
      <Input
        type="email"
        placeholder="Email"
        register={{ ...register("email", { required: true }) }}
      />
      {errors.email && <span>Campo obrigatório</span>}
      <Input
        type="password"
        placeholder="Senha"
        register={{ ...register("password", { required: true }) }}
      />
      {errors.password && <span>Campo obrigatório</span>}

      {props.type === "register" && (
        <>
          <Input
            type="password"
            placeholder="Confirmar senha"
            register={{ ...register("confirmPassword", { required: true }) }}
          />
          {errors.confirmPassword && <span>Campo obrigatório</span>}
        </>
      )}

      <InputButton type="submit" text="Enviar" />

      <SocialLoginForm onLogin={handleGoogleLogin} />
    </form>
  );
}
