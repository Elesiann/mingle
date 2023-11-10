import { GoogleLoginButton } from "react-social-login-buttons";
import { styled } from "styled-components";

interface ISocialLoginProps {
  onLogin: () => void;
}

const SocialLoginForm = (props: ISocialLoginProps) => {
  return (
    <Container>
      <h3>OU</h3>
      <GoogleLoginButton onClick={props.onLogin} text="Entrar com o Google" />
    </Container>
  );
};

const Container = styled.div`
  h3 {
    margin: 0.5rem 0;
    text-align: center;
    font-weight: 900;
    font-size: 1.15rem;
    color: var(--firefly);
  }
  button {
    margin: 2rem 0 !important;
    font-weight: bold;
    color: var(--firefly) !important;

    div {
      display: flex;
      justify-content: center;
    }
  }
`;

export default SocialLoginForm;
