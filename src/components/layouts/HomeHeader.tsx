import { styled } from "styled-components";
import { colors } from "../../styles/colors";
import Button from "../Button";

const HomeHeader = () => {
  return (
    <Container>
      <img
        src="https://images.unsplash.com/photo-1542181961-9590d0c79dab?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <Mask />
      <Content>
        <h1>
          Comece seu dia com <br />
          um café delicioso
        </h1>
        <Button
          uppercase
          color={colors.firefly}
          textColor={colors.navajo}
          // todo
          onClick={() => console.log("click")}
          text="Quero Conhecer"
        />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  position: relative;
  margin-bottom: 4rem;
  img {
    height: 100vh;
    width: 100%;
    top: 0;
    object-fit: cover;
    position: absolute;
  }
`;
const Mask = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  z-index: 0;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: var(--bgWhite);
    font-family: var(--secondary-font);
    text-align: center;
    font-weight: 800;
    text-shadow: 0px 8px 8px rgba(0, 0, 0, 0.5);
  }

  button {
    margin-top: 2rem;

    &:hover {
      background-color: var(--babyPowder);
      color: var(--firefly);
    }
  }
`;

export default HomeHeader;
