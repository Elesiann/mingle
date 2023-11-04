import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { styled } from "styled-components";
import Container from "../components/Container";
import { ProductProps } from "../components/Product";

const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalPrice = cart.reduce(
    (total: number, item: ProductProps) => total + item.price,
    0
  );
  return (
    <Container>
      <Title>Seu carrinho</Title>
      <Content>
        <Left>
          <TableContainer>
            <Table>
              <Thead>
                <Th>Produto</Th>
                <Th>Preço un.</Th>
                <Th>Qtde.</Th>
                <Th>Total</Th>
              </Thead>
              <Tbody>
                {cart.map((item: ProductProps) => (
                  <Tr key={item.id}>
                    <CustomCell>
                      <img src={item.image} alt={item.title} />
                      <div>{item.title}</div>
                    </CustomCell>
                    <Td>{item.price}</Td>
                    <Td>{item.quantity ?? 1}</Td>
                    <Td>{item.price * (item.quantity ?? 1)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Left>
        <Right>
          <SummaryContainer>
            <h1>Resumo do pedido</h1>
            <div>
              <h3>
                <span>Subtotal</span> R$ {totalPrice},00
              </h3>
              <h3>
                Frete <b>Grátis</b>
              </h3>
            </div>
            <h2>
              Total <span>R$ {totalPrice},00</span>
            </h2>
          </SummaryContainer>
          <button>Checkout</button>
        </Right>
      </Content>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: var(--dark);
  margin-block: 2rem;
  margin-top: 5%;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-block: 0 10%;
`;

const Left = styled.div`
  width: 65%;
  position: relative;

  img {
    width: 125px;
  }

  td,
  th {
    text-align: start;
    vertical-align: middle;
    color: var(--dark);
  }

  th {
    color: var(--firefly);
  }
  div {
    font-weight: bold;
    color: var(--dark);
  }
`;

const CustomCell = styled(Td)`
  display: flex;
  align-items: center;
  div {
    white-space: break-spaces;
    word-break: normal;
    margin-left: 1rem;
  }
`;

const SummaryContainer = styled.div`
  width: 100%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  height: fit-content;
  border-radius: 0.5rem;
  background-color: var(--bgWhite);

  h1 {
    font-size: 1.25rem;
    padding-block: 1rem;
    padding-inline: 2rem;
    margin-block: 2rem 1rem;
    border-bottom: 1px solid var(--papaya);
  }

  div {
    margin: 1.5rem 2rem;
  }

  h2,
  h3 {
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
  }

  h3 {
    b {
      color: var(--green);
    }
  }

  h2 {
    border-top: 1px solid var(--papaya);
    padding: 1rem 2rem;
    font-size: 1.1rem;

    span {
      font-weight: bold;
    }
  }
`;

const Right = styled.div`
  width: 30%;
  position: sticky;
  right: 0;
  top: 0;
  height: fit-content;

  button {
    width: 100%;
    height: 3rem;
    margin-top: 1rem;
    background-color: var(--green);
    border-radius: 0.5rem;
    color: var(--bgWhite);
    font-weight: bold;
    font-size: 1.15rem;
  }
`;

export default Cart;
