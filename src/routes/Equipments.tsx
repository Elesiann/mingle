import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Container from "../components/Container";
import Product, { ProductProps } from "../components/Product";
import { Products } from "../constants/products";
import { useCartUtils } from "../hooks/useCart";

const Equipments = () => {
  const [equipments, setEquipments] = useState<ProductProps[]>([]);
  const { isFavorite, isInCart, handleAddToCart, handleAddToFavorite } =
    useCartUtils();

  useEffect(() => {
    document.title = "Equipamentos | Mingle";

    setEquipments(
      Products.filter((it: ProductProps) => it.type === "equipment")
    );
  }, []);

  return (
    <Container style={{ paddingInline: "unset" }}>
      <Content>
        <h1>
          Equipamentos <span>para um café de qualidade</span>
        </h1>
        <EquipmentContainer>
          {equipments.map((equip) => (
            <Product
              {...equip}
              quantity={1}
              totalPrice={equip.price}
              key={equip.id}
              onClickCart={() => handleAddToCart(equip)}
              onClickFavorite={() => handleAddToFavorite(equip)}
              isFavorite={isFavorite(equip.id)}
              isInCart={isInCart(equip.id)}
            />
          ))}
        </EquipmentContainer>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  margin-top: 20vh;
  width: 100%;

  h1 {
    span {
      font-size: 1rem;
      color: var(--gray);
    }
  }
`;
const EquipmentContainer = styled.div`
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

export default Equipments;
