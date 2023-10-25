import { CaretDown, SignIn, UserCircleGear } from "@phosphor-icons/react";
import { isEmpty } from "lodash";
import { useState, useContext } from "react";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { capitalizeFirstName, getFromLocalStorage } from "../utils/utils";
import RegisterSidebar from "./layouts/RegisterSidebar";
import UserSidebar from "./layouts/UserSidebar";
import { AuthContext } from "../context/authContext";

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
  const [openNavbar, setOpenNavbar] = useState<"user" | "login" | "">("");
  const user = getFromLocalStorage("user");
  const authContext = useContext(AuthContext);

  const renderUserData = () => {
    return (
      <UserName onClick={() => setOpenNavbar("user")}>
        {capitalizeFirstName(user.displayName)}
        <UserCircleGear size={32} />
      </UserName>
    );
  };

  const renderLoginData = () => {
    return (
      <LoginContainer onClick={() => setOpenNavbar("login")}>
        <NavLink href="#">Entrar</NavLink>
        <SignIn color={colors.navajo} width={24} height={24} />
      </LoginContainer>
    );
  };

  const renderLoginOrUser = () => {
    return <>{isEmpty(user) ? renderLoginData() : renderUserData()}</>;
  };

  const renderNavLinksList = () => {
    return (
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
    );
  };

  return (
    <>
      <CustomContainer>
        <NavContainer>
          {renderNavLinksList()}
          {renderLoginOrUser()}
        </NavContainer>
      </CustomContainer>
      <RegisterSidebar
        user={user}
        showSidebar={openNavbar === "login"}
        callback={() => setOpenNavbar("")}
      />
      <UserSidebar
        user={user}
        showSidebar={openNavbar === "user"}
        callbacks={{
          close: () => setOpenNavbar(""),
          logout: () => authContext.logout()
        }}
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
  padding: 0.5rem;
  border-radius: 4px;

  &:hover {
    background-color: var(--gunmetal);
    * {
      color: var(--babyPowder);
      fill: var(--babyPowder);
    }
  }
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  color: var(--navajo);
  font-family: var(--secondary-font);
  font-size: 1.1rem;
  font-weight: regular;
  padding: 0.5rem;
  cursor: pointer;

  svg {
    margin-left: 0.5rem;
  }

  &:hover {
    border-radius: 4px;
    background-color: var(--gunmetal);
    color: var(--babyPowder);
  }
`;

export default NavBar;
