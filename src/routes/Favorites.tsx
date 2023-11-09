import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import Container from "../components/Container";
import { ProductProps } from "../components/Product";
import { styled } from "styled-components";
import { Heart, ShoppingCart, XCircle } from "@phosphor-icons/react";
import { colors } from "../styles/colors";
import { useCartUtils } from "../hooks/useCart";
import { toast } from "react-toastify";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useMediaQuery } from "react-responsive";

const Favorites = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { handleAddToCart, handleRemoveFromFavorites } = useCartUtils();
  const [favorites, setFavorites] = useState<ProductProps[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const removeFromFavorites = (itemToRemove: ProductProps) => {
    const newFavorites = handleRemoveFromFavorites(itemToRemove);
    setFavorites(newFavorites);

    toast.success("Produto removido dos favoritos!");
  };

  const addToCart = (item: ProductProps) => {
    handleAddToCart(item);
    toast.success("Produto adicionado ao carrinho!");
  };

  const renderMobileFavorites = () => {
    return (
      <MobileFavoritesContainer>
        {favorites.map((item: ProductProps) => (
          <MobileFavoriteItem key={item.id}>
            <img src={item.image} alt={item.title} />
            <span>{item.title}</span>
            <ButtonsContainer>
              <button onClick={() => addToCart(item)}>
                <ShoppingCart size={24} />
              </button>
              <button onClick={() => removeFromFavorites(item)}>
                <XCircle size={24} />
              </button>
            </ButtonsContainer>
          </MobileFavoriteItem>
        ))}
      </MobileFavoritesContainer>
    );
  };

  return (
    <Container>
      <Content>
        <div
          style={{
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "2rem"
          }}
        >
          <Heart color={colors.red} size={48} style={{ margin: "0 auto" }} />
          <h1>Seus favoritos</h1>
        </div>
        {!isMobile ? (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Produto</Th>
                  <Th>Valor un.</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <CustomTBody>
                {favorites.map((item: ProductProps) => (
                  <Tr key={item.id}>
                    <Td>
                      <div style={{ display: "flex" }}>
                        <img src={item.image} alt={item.title} />
                        <span>{item.title}</span>
                      </div>
                    </Td>
                    <Td>R$ {item.price},00</Td>
                    <Td>
                      <button onClick={() => addToCart(item)}>
                        Adicionar ao carrinho
                      </button>
                    </Td>
                    <Td>
                      <Tooltip id={item.id.toString()} />
                      <XCircle
                        data-tooltip-id={item.id}
                        data-tooltip-content="Remover dos favoritos"
                        data-tooltip-place="top"
                        onClick={() => removeFromFavorites(item)}
                        size={32}
                        color={colors.red}
                      />
                    </Td>
                  </Tr>
                ))}
              </CustomTBody>
            </Table>
          </TableContainer>
        ) : (
          renderMobileFavorites()
        )}
      </Content>
    </Container>
  );
};

const Content = styled.div`
  margin-top: 20vh;
  width: 100%;
  h1 {
    font-size: 2rem;
  }
`;

const CustomTBody = styled(Tbody)`
  width: 100%;
  img {
    width: 150px;
  }

  div {
    display: flex;
    align-items: center;
    max-width: 500px;
    span {
      margin-left: 2rem;
      display: block;
      white-space: break-spaces;
      word-break: break-all;
    }
  }

  td {
    vertical-align: middle;
    font-weight: bold;
    color: var(--dark);

    button {
      background: var(--green);
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        background: var(--greenHover);
      }
    }

    svg {
      cursor: pointer;

      &:hover {
        transform: scale(1.05) rotate(90deg);
      }
    }
  }
`;

const MobileFavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    img {
      width: 70%;
      margin-bottom: 1rem;

      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    button {
      color: #fff;
      padding: 0.5rem 0.5rem;
      border-radius: 0.5rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      margin-block: 0.5rem;
      font-size: 0.9rem;
      padding: 0.5rem 1rem;

      &:hover {
        background: var(--greenHover);
      }
    }

    button:first-of-type {
      background: var(--green);
    }
    button:last-of-type {
      background: var(--red);
    }

    svg {
      cursor: pointer;

      &:hover {
        transform: scale(1.05) rotate(90deg);
      }
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
`;

const MobileFavoriteItem = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--gray);
`;

export default Favorites;
