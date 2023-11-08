import { X } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import RegisterForm from "./RegisterForm";
import SocialLoginForm from "./SocialLoginForm";
import { User } from "firebase/auth";
import { isEmpty } from "lodash";
import { Spinner } from "@chakra-ui/spinner";
import { colors } from "../../styles/colors";
interface SidebarProps {
  showSidebar: boolean;
  callback: () => void;
  user: User;
}

const RegisterSidebar = (props: SidebarProps) => {
  const [formState, setFormState] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);
  const isRegister = formState === "register";

  useEffect(() => {
    isLoading === false && !isEmpty(props.user) && props.callback();
  }, [!isLoading]);

  const handleFormState = () => {
    setFormState(!isRegister ? "register" : "signin");
  };

  const renderToggleText = () => {
    if (!isRegister) {
      return (
        <p>
          Não tem uma conta? Crie <b onClick={handleFormState}>aqui</b>
        </p>
      );
    } else {
      return (
        <p>
          <b onClick={handleFormState}>Entre</b> na sua conta
        </p>
      );
    }
  };

  return (
    <>
      {props.showSidebar && <Mask />}
      <Container $show={props.showSidebar}>
        <Signin>
          <h2>{isRegister ? "Registro" : "Entrar"}</h2>
          <Close onClick={props.callback}>
            <span>
              <X size={18} />
            </span>
            <h2>Fechar</h2>
          </Close>
        </Signin>
        {!isLoading ? (
          <Content>
            <FormContainer>
              <RegisterForm
                setIsLoading={(v) => setIsLoading(v)}
                type={formState}
              />
              <SocialLoginForm />
            </FormContainer>
            <div>{renderToggleText()}</div>
          </Content>
        ) : (
          <SpinnerContainer>
            <Spinner
              speed="0.5s"
              boxSize="54"
              size="xl"
              color={colors.firefly}
            />
          </SpinnerContainer>
        )}
      </Container>
    </>
  );
};

const Container = styled.div<{ $show: boolean }>`
  z-index: 11;
  top: 0;
  position: fixed;
  right: ${(props) => (props.$show ? "0" : "-400px")};
  width: 400px;
  height: 100%;
  background-color: var(--bgWhite);

  @media screen and (max-width: 768px) {
    width: 100%;
    right: ${(props) => (props.$show ? "0" : "-100%")};
  }
`;
const Content = styled.div`
  padding: 3rem 2rem;

  p,
  b {
    font-size: 1rem;
  }

  b {
    cursor: pointer;
    color: var(--firefly);
  }
`;

const FormContainer = styled.div``;

const Mask = styled.div`
  z-index: 10;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: var(--firefly);
  opacity: 0.5;
`;

const Signin = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.25rem;
  border-bottom: 1px solid var(--gray);

  h2 {
    color: var(--firefly);
  }
`;

const Close = styled.div`
  display: flex;
  max-width: fit-content;
  align-items: center;
  width: 100%;
  cursor: pointer;

  h2 {
    font-size: 0.875rem;
  }
  svg {
    margin-top: 4.5px;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  margin-top: 5rem;
`;

export default RegisterSidebar;
