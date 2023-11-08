import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { CaretDown, SignIn, UserCircleGear } from "@phosphor-icons/react";
import { isEmpty } from "lodash";
import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/authContext";
import { CartContext } from "../context/cartContext";
import { colors } from "../styles/colors";
import { capitalizeFirstName, getFromLocalStorage } from "../utils/utils";
import RegisterSidebar from "./layouts/RegisterSidebar";
import UserSidebar from "./layouts/UserSidebar";

const NavBar = () => {
  const { openNavbar, setOpenNavbar } = useContext(CartContext);
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
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <Menu>
          <MenuButton
            _expanded={{ bg: colors.gunmetal }}
            as={Button}
            rightIcon={<CaretDown />}
          >
            Categorias
          </MenuButton>
          <MenuList>
            <CustomMenuItem as="a" href="/coffees">
              Cafés
            </CustomMenuItem>
            <CustomMenuItem as="a" href="/equipments">
              Equipamentos
            </CustomMenuItem>
            <CustomMenuItem as="a" href="/drinks">
              Bebidas prontas
            </CustomMenuItem>
          </MenuList>
        </Menu>
        <NavItem>
          <NavLink href="/promo">Promoções</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/local">Onde estamos</NavLink>
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
  position: absolute;
  max-width: 1200px;
  width: 100%;
  top: 2rem;
  z-index: 9;
  left: 50%;
  transform: translateX(-50%);
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

  li,
  button {
    margin-right: 0.33rem;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;

  button {
    background: unset;

    &:hover {
      background: unset;
      background-color: var(--gunmetal);
      color: var(--babyPowder);

      span {
        color: var(--babyPowder);
      }
    }
  }

  button > span {
    color: var(--navajo);
    font-size: 1.1rem;
    font-family: var(--secondary-font);
    font-weight: 400;
  }
`;

const CustomMenuItem = styled(MenuItem)`
  padding: 0.4rem;
  color: var(--gunmetal);
  font-size: 1.1rem;
  font-family: var(--secondary-font);
  font-weight: regular;
  cursor: pointer;
  display: block;

  &:hover {
    background-color: var(--gunmetal);
    color: var(--babyPowder);
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.45rem;
  border-radius: 8px;

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
  padding: 0.4rem;
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
  padding: 0.33rem;
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
