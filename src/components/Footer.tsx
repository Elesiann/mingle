import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #0a232f;
  color: #ffefd4;
  padding: 20px;
  text-align: center;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLinks = styled.div`
  margin-top: 10px;
`;

const StyledLink = styled.a`
  color: #ffe2ae;
  text-decoration: none;
  margin: 0 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const CopyrightText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <StyledLink href="/">Home</StyledLink>
          <StyledLink href="/coffees">Cafés</StyledLink>
          <StyledLink href="/equipments">Equipamentos</StyledLink>
          <StyledLink href="/drinks">Bebidas</StyledLink>
          <StyledLink href="/about">Sobre nós</StyledLink>
        </FooterLinks>
        <CopyrightText>&copy; Mingle - Giovani Machado Corrêa </CopyrightText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
