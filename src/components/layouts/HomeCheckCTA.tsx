import { styled } from "styled-components";
import Container from "../Container";
import Button from "../Button";
import { colors } from "../../styles/colors";

const HomeCheckCTA = () => {
  return (
    <Container>
      <Content>
        <Left>
          <img
            src={
              "https://images.unsplash.com/photo-1560463230-1d6803589edf?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
          />
          <Checkout>
            <h2>
              Encontre nossa <br /> cafeteria
            </h2>
            <p>
              Venha conhecer nosso espaço e saborear nossos incríveis cafés.
            </p>
            <a href="/about">
              <Button
                style="filled"
                text="Descubra"
                onClick={() => null}
                hover={{
                  color: colors.gunmetal
                }}
              />
            </a>
          </Checkout>
        </Left>
        <Right>
          <div>
            <h2>Experimente nossos cafés</h2>
            <p>Dúvidas em qual comprar?</p>
            <a href="/drinks">
              <Button
                text="Conheça nossas bebidas"
                onClick={() => null}
                hover={{
                  color: colors.gunmetal
                }}
              />
            </a>
          </div>
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </Right>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  display: flex;
  width: 100%;
  margin-block: 4rem;

  h1,
  h2 {
    font-weight: bold;
    color: var(--firefly);
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  position: relative;
  width: 60%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Checkout = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: var(--papaya);
  border-top-right-radius: 0.5rem;
  width: 60%;
  padding: 2rem;
  h2,
  p {
    color: var(--firefly);
  }
  p {
    display: block;
    margin-block: 1rem;
    color: var(--gray);
  }
  h2 {
    font-size: 2rem;
    font-weight: 700;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    position: relative;
    margin-bottom: 2rem;

    h2 {
      font-size: 1.5rem;
    }

    button {
      width: 100%;
    }
  }
`;

const Right = styled.div`
  position: relative;
  padding-left: 2rem;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  div {
    flex-direction: column;
    align-items: center;
    display: flex;

    h2 {
      display: block;
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
    p {
      margin-bottom: 2rem;
      color: var(--gray);
    }
  }
  img {
    width: 100%;
    margin-top: 2rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: unset;

    text-align: center;

    div {
      h2 {
        margin-bottom: 1rem;
      }
    }
  }
`;

export default HomeCheckCTA;
