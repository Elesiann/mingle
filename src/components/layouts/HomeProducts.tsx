import { styled } from "styled-components";
import { Products } from "../../constants/products";
import { useCartUtils } from "../../hooks/useCart";
import Container from "../Container";
import Product, { ProductProps } from "../Product";

const HomeProducts = () => {
  const { isFavorite, isInCart, handleAddToCart, handleAddToFavorite } =
    useCartUtils();

  return (
    <Container>
      <Description>
        <h1>Mais vendidos</h1>
        <p> Nossos pacotes mais vendidos.</p>
      </Description>
      <Content>
        {Products.slice(0, 3).map((item: ProductProps) => (
          <Product
            quantity={1}
            totalPrice={item.price}
            key={item.id}
            {...item}
            onClickCart={handleAddToCart}
            onClickFavorite={handleAddToFavorite}
            isFavorite={isFavorite(item.id)}
            isInCart={isInCart(item.id)}
          />
        ))}
      </Content>
    </Container>
  );
};

const Content = styled.div`
  width: 100%;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  div {
    justify-self: center;
  }
`;

const Description = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: clamp(1.5rem, 2.5vw, 3rem);
    color: var(--firefly);
  }
  p {
    margin-block: 2rem;
    color: var(--gray);
  }
`;

export default HomeProducts;
