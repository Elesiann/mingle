import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Container from "../components/Container";
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

  const renderModal = () => {
    return (
      <Modal
        size={"xl"}
        isCentered
        motionPreset="none"
        isOpen={!!selectedDrink}
        onClose={handleCloseModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedDrink?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <LoadingContainer>
                <Spinner size={"lg"} color="green.500" />
              </LoadingContainer>
            ) : (
              <ModalCoffeeContent>
                <div>
                  <img src={selectedDrink?.image} alt="" />
                </div>
                <div>
                  <p>{translatedDescription}</p>
                </div>
              </ModalCoffeeContent>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Container style={{ paddingInline: "unset" }}>
      {!!selectedDrink && renderModal()}
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

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  margin-block: 2rem;
`;

const ModalCoffeeContent = styled.div`
  display: flex;
  padding: 0 0 2rem 0;
  justify-content: space-between;
  align-items: center;

  img {
    min-width: 250px;
    max-width: 250px;
  }

  p {
    color: var(--dark);
    font-weight: bold;
    margin-left: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    img {
      margin-bottom: 2rem;
      width: 100%;
      min-width: unset;
      max-width: unset;
    }

    p {
      margin-left: 0;
      text-align: center;
    }
  }
`;
