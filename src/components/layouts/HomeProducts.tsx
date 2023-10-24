import { styled } from "styled-components";
import Container from "../Container";
import Product from "../Product";

const HomeProducts = () => {
  return (
    <Container>
      <Content>
        <Product price={199} type={"Café"} title={"Nome do café"} image={""} />
        <Product price={199} type={"Café"} title={"Nome do café"} image={""} />
        <Product price={199} type={"Café"} title={"Nome do café"} image={""} />
        <Product price={199} type={"Café"} title={"Nome do café"} image={""} />
        <Product price={199} type={"Café"} title={"Nome do café"} image={""} />
        <Product price={199} type={"Café"} title={"Nome do café"} image={""} />
      </Content>
    </Container>
  );
};

const Content = styled.div`
  width: 100%;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export default HomeProducts;
