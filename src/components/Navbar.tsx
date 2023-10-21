import styled from "styled-components";

const NavContainer = styled.nav`
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #fff;
`;

const NavBar = () => {
  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <NavLink href="#">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Categorias</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Promoções</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Onde estamos</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Contato</NavLink>
        </NavItem>
      </NavList>
      <div>
        <NavLink href="#">Login</NavLink> / <NavLink href="#">Registro</NavLink>
      </div>
    </NavContainer>
  );
};

export default NavBar;
