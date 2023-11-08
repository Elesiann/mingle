import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
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
    const translated = await getTranslation(drink.description || "");
    setTranslatedDescription(translated.data.translations[0].translatedText);
    setSelectedDrink(drink);
  };

  const renderModal = () => {
    return (
      <Modal
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
            <div>
              <img
                style={{ maxHeight: "50vh" }}
                src={selectedDrink?.image}
                alt=""
              />
            </div>
            <div>{translatedDescription}</div>
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
        <EquipmentContainer>
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
        </EquipmentContainer>
      </Content>
    </Container>
  );
}

const Content = styled.div`
  margin-top: 18%;
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
  grid-template-columns: repeat(4, auto);
  margin-block: 2rem 4rem;
`;

const DrinkContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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
