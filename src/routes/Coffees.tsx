import { useEffect, useState } from "react";
import { api } from "../libs/axios";
import Product, { ProductProps } from "../components/Product";
import Container from "../components/Container";
import { useCartUtils } from "../hooks/useCart";
import { styled } from "styled-components";

const Coffees = () => {
  const [coffees, setCoffees] = useState<ProductProps[]>([]);
  const { isFavorite, isInCart, handleAddToCart, handleAddToFavorite } =
    useCartUtils();

  useEffect(() => {
    document.title = "Cafés | Mingle";

    const getCoffees = async () => {
      const response = await api.get("products");
      const data = await response.data.filter(
        (it: ProductProps) => it.type === "coffee"
      );
      setCoffees(data);
    };

    getCoffees();
  }, []);

  return (
    <Container style={{ paddingInline: "unset" }}>
      <Content>
        <h1>
          Cafés <span>para seus momentos especiais</span>
        </h1>
        <CoffeeContainer>
          {coffees.map((coffee) => (
            <Product
              {...coffee}
              quantity={1}
              totalPrice={coffee.price}
              key={coffee.id}
              onClickCart={() => handleAddToCart(coffee)}
              onClickFavorite={() => handleAddToFavorite(coffee)}
              isFavorite={isFavorite(coffee.id)}
              isInCart={isInCart(coffee.id)}
            />
          ))}
        </CoffeeContainer>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  margin-top: 18%;
  width: 100%;

  h1 {
    span {
      font-size: 1rem;
      color: var(--gray);
    }
  }
`;
const CoffeeContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 2rem;
  justify-content: space-between;
  margin-block: 2rem 4rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  div {
    justify-self: center;
  }
`;

export default Coffees;
