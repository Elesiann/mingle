import styled from "styled-components";
import { SignIn, CaretDown } from "@phosphor-icons/react";
import { colors } from "../styles/colors";
import RegisterSidebar from "./layouts/RegisterSidebar";
import { useState } from "react";

// the categories will be
// gold blend
// combos
// platinum blend
// colombia
// peru
// costa rica
// brasil
// guatemala
// descafeinados

const NavBar = () => {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <CustomContainer>
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
          <LoginContainer onClick={() => setOpenLogin(true)}>
            <NavLink href="#">Entrar</NavLink>
            <SignIn color={colors.navajo} width={24} height={24} />
          </LoginContainer>
        </NavContainer>
      </CustomContainer>
      <RegisterSidebar
        onOutsideClick={() => setOpenLogin(false)}
        showSidebar={openLogin}
        callback={() => setOpenLogin(false)}
      />
    </>
  );
};

const CustomContainer = styled.div`
  position: sticky;
  top: 2rem;
  z-index: 9;
  display: flex;
  justify-content: center;
`;

const NavContainer = styled.nav`
  max-width: 1200px;
  width: 100%;
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
