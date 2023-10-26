import { useContext } from "react";
import { styled } from "styled-components";
import { CartContext } from "../../context/cartContext";
import Container from "../Container";
import Product, { ProductProps } from "../Product";

const HomeProducts = () => {
  const cartContext = useContext(CartContext);
  const isFavorite = (id: number) =>
    cartContext.favorites.some((prod) => prod.id === id);
  const isInCart = (id: number) =>
    cartContext.cart.some((prod) => prod.id === id);

  const handleAddToFavorite = (product: ProductProps) => {
    cartContext.setFavorites(product);
  };

  const handleAddToCart = (product: ProductProps) => {
    cartContext.setCart(product);
  };

  const items = [
    {
      id: 1,
      price: 199,
      type: "Café",
      title: "Nome do café",
      image: ""
    },
    {
      id: 2,
      price: 199,
      type: "Café",
      title: "Nome do café",
      image: ""
    },
    {
      id: 3,
      price: 199,
      type: "Café",
      title: "Nome do café",
      image: ""
    },
    {
      id: 4,
      price: 199,
      type: "Café",
      title: "Nome do café",
      image: ""
    }
  ];

  return (
    <Container>
      <Content>
        {items.map((item) => (
          <Product
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
`;

export default HomeProducts;
