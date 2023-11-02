import { styled } from "styled-components";
import Container from "../Container";
import Button from "../Button";

const HomeAboutBeans = () => {
  return (
    <Container>
      <Content>
        <Left>
          <h1>Grãos selecionados e da melhor qualidade</h1>
          <p>
            Nóssos grãos são selecionados e torrados com a mais alta qualidade
            para que você possa ter a melhor experiência possível ao saborear
            seu café.
          </p>
          <Button text={"Conhecer"} onClick={() => null} />
        </Left>
        <Right>
          <img
            src="https://images.unsplash.com/photo-1591313021857-5672bf110803?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </Right>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
`;
const Left = styled.div`
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;

  h1 {
    font-size: clamp(1.5rem, 2.5vw, 3rem);
    color: var(--firefly);
  }
  p {
    margin-block: 2rem;
    color: var(--gray);
  }
`;
const Right = styled.div`
  width: 60%;

  img {
    width: 100%;
  }
`;

export default HomeAboutBeans;
