import { Heart, ShoppingCart, SignOut, X } from "@phosphor-icons/react";
import { User } from "firebase/auth";
import { styled } from "styled-components";
import { capitalizeFirstName } from "../../utils/utils";

interface SidebarProps {
  showSidebar: boolean;
  callbacks: {
    close: () => void;
    logout: () => void;
  };
  user: User;
}

const UserSidebar = (props: SidebarProps) => {
  const renderUserCards = () => {
    return (
      <>
        <UserCard href="/carrinho">
          <ShoppingCart size={48} />
          <h2>Seu carrinho</h2>
        </UserCard>
        <UserCard href="/favoritos">
          <Heart size={48} />
          <h2>Seus favoritos</h2>
        </UserCard>
        <UserCard onClick={props.callbacks.logout}>
          <SignOut size={48} />
          <h2>Sair</h2>
        </UserCard>
      </>
    );
  };

  return (
    <>
      {props.showSidebar && <Mask />}
      <Container show={props.showSidebar}>
        <UserData>
          <h2>Olá, {capitalizeFirstName(props.user.displayName || "")}</h2>
          <Close onClick={props.callbacks.close}>
            <span>
              <X size={18} />
            </span>
            <h2>Fechar</h2>
          </Close>
        </UserData>
        <Content>{renderUserCards()}</Content>
      </Container>
    </>
  );
};

const Container = styled.div<{ show: boolean }>`
  z-index: 11;
  top: 0;
  position: fixed;
  right: ${(props) => (props.show ? "0" : "-400px")};
  width: 400px;
  height: 100%;
  background-color: var(--bgWhite);
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

const UserCard = styled.a`
  text-decoration: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem 2rem;
  border-radius: 6px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;

  h2 {
    color: var(--firefly);
  }

  svg {
    fill: var(--firefly);
    margin-bottom: 1rem;
  }

  &:hover {
    scale: 1.05;
    cursor: pointer;

    svg {
      fill: var(--green);
    }

    svg {
      scale: 1.2;
    }
  }
`;

const Mask = styled.div`
  z-index: 10;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: var(--firefly);
  opacity: 0.5;
`;

const UserData = styled.div`
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

export default UserSidebar;
