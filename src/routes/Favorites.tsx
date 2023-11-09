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
import { Heart, XCircle } from "@phosphor-icons/react";
import { colors } from "../styles/colors";
import { useCartUtils } from "../hooks/useCart";
import { toast } from "react-toastify";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

const Favorites = () => {
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

export default Favorites;
