import styled from "styled-components";
import Container from "./Container";
import { SignIn, CaretDown } from "@phosphor-icons/react";
import { colors } from "../styles/colors";

const NavBar = () => {
  return (
    <Container>
      <NavContainer>
        <NavList>
          <NavItem>
            <NavLink href="#">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Categorias</NavLink>
            <CaretDown color={colors.navajo} size={18} />
          </NavItem>
          <NavItem>
            <NavLink href="/promo">Promoções</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Onde estamos</NavLink>
          </NavItem>
        </NavList>
        <LoginContainer>
          <NavLink href="#">Entrar</NavLink>
          <SignIn color={colors.navajo} width={24} height={24} />
        </LoginContainer>
      </NavContainer>
    </Container>
  );
};

const NavContainer = styled.nav`
  position: sticky;
  max-width: 1200px;
  width: 100%;
  margin: 2rem;
  z-index: 1;
  background-color: var(--firefly);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 4px;

  svg {
    margin-left: 0.5rem;
    transform: rotate(-90deg);
    margin-top: 1.5px;
  }

  &:hover {
    cursor: pointer;
    background-color: var(--gunmetal);
    * {
      color: var(--babyPowder);
      fill: var(--babyPowder);
    }
    svg {
      margin-left: 2rem;
      transform: rotate(0deg);
    }
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--navajo);
  font-family: var(--secondary-font);
  font-size: 1.1rem;
  font-weight: regular;
  cursor: pointer;
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 4px;

  &:hover {
    background-color: var(--gunmetal);
    * {
      color: var(--babyPowder);
      fill: var(--babyPowder);
    }
  }
`;

export default NavBar;
