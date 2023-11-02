import { ReactNode } from "react";
import { styled } from "styled-components";

type ContainerProps = {
  backgroundColor?: string;
  children: ReactNode;
};

const Container = ({ children, backgroundColor }: ContainerProps) => {
  return (
    <AppContainer style={{ backgroundColor: backgroundColor }}>
      {children}
    </AppContainer>
  );
};

const AppContainer = styled.section`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Container;
