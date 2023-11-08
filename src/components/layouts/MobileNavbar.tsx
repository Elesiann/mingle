import { X } from "@phosphor-icons/react";
import { styled } from "styled-components";

interface MobileNavbarProps {
  onClose: () => void;
}

const MobileNavbar = (props: MobileNavbarProps) => {
  return (
    <MobileNavbarContainer>
      <ModalHeader>
        <div>
          <h2>Olá, usuário</h2>
        </div>
        <div onClick={props.onClose}>
          <X size={32} />
        </div>
      </ModalHeader>
      <ModalBody>
        <ul>
          <a href="/">
            <li>Home</li>
          </a>
          <a href="/coffees">
            <li>Cafés</li>
          </a>
          <a href="/equipments">
            <li>Equipamentos</li>
          </a>
          <a href="/drinks">
            <li>Bebidas prontas</li>
          </a>
          <a href="/promo">
            <li>Promoções</li>
          </a>
          <a href="/local">
            <li>Onde estamos</li>
          </a>
        </ul>
      </ModalBody>
    </MobileNavbarContainer>
  );
};

const MobileNavbarContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--gray);

  svg {
    cursor: pointer;

    &:hover {
      color: var(--firefly);
      transform: rotate(90deg);
      background-color: var(--papaya);
    }
  }
`;

const ModalBody = styled.div`
  width: 100%;
  padding: 1rem;

  ul {
    li {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      font-family: var(--secondary-font);
      font-weight: 400;
      cursor: pointer;
      padding: 0.5rem 1rem;
      &:hover {
        color: var(--papaya);
        background-color: var(--firefly);
        border-radius: 0.25rem;
      }
    }
  }
`;

export default MobileNavbar;
