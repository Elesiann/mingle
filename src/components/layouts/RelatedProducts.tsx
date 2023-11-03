import { useEffect, useState } from "react";
import Container from "../Container";
import { styled } from "styled-components";
import Product, { ProductProps } from "../Product";
import { api } from "../../libs/axios";
import { useCartUtils } from "../../hooks/useCart";

const RelatedProducts = () => {
  const { isFavorite, isInCart, handleAddToCart, handleAddToFavorite } =
    useCartUtils();
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await api.get("/products");
      const slice = Math.floor(Math.random() * (response.data.length - 3));
      setProducts(response.data.slice(slice, slice + 3));
    };

    getProducts();
  }, []);

  return (
    <Container>
      <Content>
        <h2>Produtos relacionados</h2>
        <ProductsContainer>
          {products.map((item) => (
            <Product
              isInCart={isInCart(item.id)}
              isFavorite={isFavorite(item.id)}
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              category={item.category}
              onClickFavorite={handleAddToFavorite}
              onClickCart={handleAddToCart}
              onClick={(product) =>
                window.location.replace(`/products/${product.id}`)
              }
            />
          ))}
        </ProductsContainer>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;

  h2 {
    display: block;
    margin-bottom: 2rem;

    font-size: 1.5rem;
    color: var(--firefly);
  }
`;

const ProductsContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-bottom: 10%;
`;

export default RelatedProducts;
