import { Heart } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { css, styled } from "styled-components";
import Button from "../components/Button";
import Container from "../components/Container";
import { ProductProps } from "../components/Product";
import RelatedProducts from "../components/layouts/RelatedProducts";
import { beatAnimation } from "../constants/animations";
import { useCartUtils } from "../hooks/useCart";
import { api } from "../libs/axios";
import { colors } from "../styles/colors";
import { toast } from "react-toastify";

const Product = () => {
  const [product, setProduct] = useState<ProductProps>({} as ProductProps);
  const [heartAnimation, setHeartAnimation] = useState(false);
  const { isFavorite, handleAddToFavorite, handleAddToCart } = useCartUtils();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = () =>
      api.get(`/products/${id}`).then(
        (response) => {
          setProduct(response.data);
        },
        (error) => {
          console.log(error);
        }
      );

    getProduct();
  }, []);

  return (
    <Container>
      <Content>
        <Left>
          <img src={product.image} alt="Imagem do produto" />
        </Left>
        <Right>
          <h1>{product.title}</h1>
          <span>R$ {product.price},00</span>
          <p>{product.description}</p>
          <Button
            text="Adicionar ao carrinho"
            hover={{
              color: colors.gunmetal
            }}
            onClick={() => {
              handleAddToCart(product);
              toast.success("Produto adicionado ao carrinho!");
            }}
          />
          <div
            onClick={() => {
              handleAddToFavorite(product);
              setHeartAnimation(true);
              setTimeout(() => setHeartAnimation(false), 500);
            }}
          >
            <HeartIcon
              $animation={heartAnimation}
              $isfavorite={isFavorite(product.id)}
            />{" "}
            {isFavorite(product.id) ? "Remover dos " : "Adicionar aos "}{" "}
            favoritos
          </div>
        </Right>
      </Content>
      <RelatedProducts />
    </Container>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10%;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--gray);
  padding-bottom: 2rem;
`;

const Left = styled.div`
  position: relative;
  img {
    width: 400px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  }
`;

const Right = styled.div`
  position: relative;
  width: 60%;
  margin-left: 2rem;

  h1,
  div {
    width: fit-content;
    color: var(--dark);
  }
  p {
    color: var(--gray);
  }

  *:not(svg) {
    margin-bottom: 2rem;
  }
  span {
    display: block;
    color: var(--green);
    font-weight: bold;
    font-size: 1.5rem;
  }

  h1 {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
  }

  div {
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.25rem;
    }
  }
`;

const HeartIcon = styled(Heart)<{ $animation: boolean; $isfavorite: boolean }>`
  transition: all 0.5s ease-in-out;
  color: ${(props) => props.$isfavorite && "var(--red)"};
  margin-top: 3px;
  animation: ${(props) =>
    props.$animation &&
    css`
      ${beatAnimation} 0.5s alternate
    `};
`;

export default Product;
