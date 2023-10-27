import { useEffect, useState } from "react";
import { Heart, MagnifyingGlass, ShoppingCart } from "@phosphor-icons/react";
import { css, keyframes, styled } from "styled-components";
import { Tooltip } from "react-tooltip";

export interface ProductProps {
  price: number;
  type: string;
  title: string;
  image: string;
  id: number;
  secondImage?: string;
  isFavorite: boolean;
  isInCart: boolean;
  onClickFavorite?: (product: ProductProps) => void;
  onClickCart?: (product: ProductProps) => void;
}

const beatAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;

const Product = (product: ProductProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [animations, setAnimations] = useState({
    heartAnimation: false,
    cartAnimation: false
  });
  const [randomID] = useState(String(Math.random()));

  const handleAnimation = (animationType: "cart" | "heart") => {
    const updatedAnimations = {
      ...animations,
      [`${animationType}Animation`]: true
    };

    setAnimations(updatedAnimations);

    if (animationType === "heart") {
      product.onClickFavorite && product.onClickFavorite(product);
    } else if (animationType === "cart") {
      product.onClickCart && product.onClickCart(product);
    }
  };

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      const resetAnimations = {
        ...animations,
        heartAnimation: false,
        cartAnimation: false
      };
      setAnimations(resetAnimations);
    }, 500);

    // Make sure to clear the timeout when the component unmounts to prevent memory leaks
    return () => clearTimeout(animationTimeout);
  }, [animations]);

  return (
    <Container>
      <ImageContainer
        onMouseOver={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <img src={product.image} alt="" />
        <ProductOptionsContainer>
          <ProductOptions $show={showOptions}>
            <>
              <Tooltip id={randomID} />
              <CartIcon
                $isincart={product.isInCart}
                $animation={animations.cartAnimation}
                onClick={() => handleAnimation("cart")}
                data-tooltip-id={randomID}
                data-tooltip-content={`${
                  product.isInCart ? "Remover do " : "Adicionar ao"
                } carrinho`}
                data-tooltip-place="top"
                size={24}
              />
            </>
            <>
              <Tooltip id={randomID} />
              <MagnifyingGlass
                data-tooltip-id={randomID}
                data-tooltip-content="Visualizar"
                data-tooltip-place="top"
                size={24}
              />
            </>
            <>
              <Tooltip id={randomID} />
              <HeartIcon
                $isfavorite={product.isFavorite}
                $animation={animations.heartAnimation}
                onClick={() => handleAnimation("heart")}
                data-tooltip-id={randomID}
                data-tooltip-content={`${
                  product.isFavorite ? "Remover dos" : "Adicionar aos"
                } favoritos`}
                data-tooltip-place="top"
                size={24}
              />
            </>
          </ProductOptions>
        </ProductOptionsContainer>
      </ImageContainer>
      <InfoContainer>
        <h3>{product.title}</h3>
        <span>{product.type}</span>
        <Price>R$ {product.price}</Price>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  img {
    width: 100%;
  }
  span {
    display: block;
    margin-block: 0.75rem;
    color: var(--gray);

    &:hover {
      color: var(--bgBlack);
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const Price = styled.div`
  font-weight: bolder;
  font-size: 1rem;
  color: var(--green);
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const InfoContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProductOptions = styled.div<{ $show: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  bottom: ${(props) => (props.$show ? "1rem" : "-3rem")};
  width: 60%;
  height: 3rem;
  background-color: var(--babyPowder);
  border-radius: 0.25rem;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;

  div {
    transition: unset;
  }

  svg {
    cursor: pointer;
  }
`;

const CartIcon = styled(ShoppingCart)<{
  $isincart: boolean;
  $animation: boolean;
}>`
  font-size: 150px;
  color: ${(props) => props.$isincart && "var(--green)"};

  animation: ${(props) =>
    props.$animation &&
    css`
      ${beatAnimation} 0.5s alternate
    `};
  transform-origin: center;
`;

const HeartIcon = styled(Heart)<{
  $isfavorite: boolean;
  $animation: boolean;
}>`
  font-size: 150px;
  color: ${(props) => props.$isfavorite && "var(--red)"};

  animation: ${(props) =>
    props.$animation &&
    css`
      ${beatAnimation} 0.5s alternate
    `};
  transform-origin: center;
`;

export default Product;
