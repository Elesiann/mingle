import { useState } from "react";
import { Heart, MagnifyingGlass, ShoppingCart } from "@phosphor-icons/react";
import { styled } from "styled-components";
import { Tooltip } from "react-tooltip";

interface ProductProps {
  price: number;
  type: string;
  title: string;
  image: string;
  secondImage?: string;
}

const Product = (product: ProductProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [randomID] = useState(String(Math.random()));

  return (
    <Container>
      <ImageContainer
        onMouseOver={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <img
          src={
            "https://woodmart.xtemos.com/wp-content/uploads/2020/12/product-8-2-430x487.jpg"
          }
          alt=""
        />
        <ProductOptionsContainer>
          <ProductOptions show={showOptions}>
            <>
              <Tooltip id={randomID} />
              <ShoppingCart
                data-tooltip-id={randomID}
                data-tooltip-content="Adicionar ao carrinho"
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
              <Heart
                data-tooltip-id={randomID}
                data-tooltip-content="Favoritar"
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

const ProductOptions = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  bottom: ${(props) => (props.show ? "1rem" : "-3rem")};
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

export default Product;
