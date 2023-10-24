import { useForm } from "react-hook-form";
import { handleLogin, handleRegister } from "../../middleware/auth";
import Input from "../Input";
import InputButton from "../InputButton";

export interface RegisterInputs {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface RegisterFormProps {
  type: string;
}

export default function RegisterForm(props: RegisterFormProps) {
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

  const onSubmit = (data: RegisterInputs) => {
    props.type === "register" ? handleRegister(data) : handleLogin(data);
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
    </form>
  );
}
