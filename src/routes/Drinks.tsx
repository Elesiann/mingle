import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Container from "../components/Container";
import ModalProduct from "../components/ModalProduct";
import { ProductProps } from "../components/Product";
import { useTranslation } from "../hooks/useTranslation";
import { api } from "../libs/axios";

interface IDrink {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
}

export default function Drinks() {
  const [drinks, setDrinks] = useState<IDrink[]>([]);
  const [translatedDescription, setTranslatedDescription] = useState("");
  const [selectedDrink, setSelectedDrink] = useState<IDrink | null>(null);
  const [loading, setLoading] = useState(false);
  const { getTranslation } = useTranslation();

  const getCoffees = async () => {
    const res = await api.get("https://api.sampleapis.com/coffee/hot");

    setDrinks(res.data);
  };

  useEffect(() => {
    getCoffees();
  }, []);

  const handleCloseModal = () => {
    setSelectedDrink(null);
  };

  const handleOpenModal = async (drink: IDrink) => {
    setSelectedDrink(drink);
    setLoading(true);
    const translated = await getTranslation(drink.description || "");
    setLoading(false);
    setTranslatedDescription(translated.data.translations[0].translatedText);
  };

  return (
    <Container style={{ paddingInline: "unset" }}>
      <ModalProduct
        selectedProduct={selectedDrink as ProductProps | null}
        handleCloseModal={handleCloseModal}
        loading={loading}
        description={translatedDescription}
      />
      <Content>
        <h1>
          Bebidas <span>descubra nossas especialidades</span>
        </h1>
        <DrinksContainer>
          {drinks.map((drink) => (
            <DrinkContainer key={drink.id}>
              <Drink>
                <img
                  src={drink.image}
                  onClick={() => handleOpenModal(drink)}
                  alt=""
                />
                <h2>{drink.title}</h2>
              </Drink>
            </DrinkContainer>
          ))}
        </DrinksContainer>
      </Content>
    </Container>
  );
}

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
const DrinksContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 2rem;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-block: 2rem 4rem;
`;

const DrinkContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
      scale: 1.1;
    }
  }

  h2 {
    font-size: 1rem;
    margin-block: 1rem;
    font-weight: bold;
    color: var(--dark);
  }
`;
const Drink = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
