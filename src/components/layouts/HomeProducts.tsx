import { useContext, useState, useEffect } from "react";
import { styled } from "styled-components";
import { CartContext } from "../../context/cartContext";
import Container from "../Container";
import Product, { ProductProps } from "../Product";
import { api } from "../../libs/axios";
import { ProductDTO } from "../../types/Product";

const HomeProducts = () => {
  const [files, setFiles] = useState<ProductDTO[]>([]);
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

  useEffect(() => {
    const getProducts = async () => {
      await api
        .get("/products")
        .then((res) => setFiles(res.data.slice(0, 3)))
        .catch((err) => console.log(err));
    };

    getProducts();
  }, []);

  return (
    <Container>
      <Description>
        <h1>Mais vendidos</h1>
        <p> Nossos pacotes mais vendidos.</p>
      </Description>
      <Content>
        {files &&
          files.map((item) => (
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
