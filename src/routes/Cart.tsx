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
import { useEffect, useState } from "react";
import { MinusCircle, PlusCircle, ShoppingCart } from "@phosphor-icons/react";
import ModalComponent from "../components/Modal";
import { toast } from "react-toastify";
import EmptyCartImage from "../assets/images/empty-cart.png";
import { colors } from "../styles/colors";
import { useCartUtils } from "../hooks/useCart";
import { useMediaQuery } from "react-responsive";

const Cart = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { handleRemoveFromCart } = useCartUtils();
  const [itemToRemove, setItemToRemove] = useState<ProductProps | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const totalPrice = cart.reduce(
    (total: number, item: ProductProps) => total + (item.totalPrice ?? 0),
    0
  );

  useEffect(() => {
    document.title = "Carrinho | Mingle";
  }, []);

  const renderEmptyCart = () => (
    <EmptyCartContainer>
      <h1>Seu carrinho está vazio!</h1>
      <img src={EmptyCartImage} alt="" />
      <a href="/coffees">Ver produtos</a>
    </EmptyCartContainer>
  );

  const handleUpdateQuantity = (item: ProductProps, increment: boolean) => {
    const updatedCart = cart.map((cartItem: ProductProps) => {
      if (!cartItem.quantity) {
        cartItem.quantity = 1;
        cartItem.totalPrice = cartItem.price;
      }

      if (
        cartItem.id === item.id &&
        typeof cartItem.quantity !== "undefined" &&
        typeof cartItem.totalPrice !== "undefined"
      ) {
        if (increment) {
          cartItem.quantity += 1;
          cartItem.totalPrice += cartItem.price;
        } else {
          if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            cartItem.totalPrice -= cartItem.price;
          } else {
            setOpenModal(true);
            setItemToRemove(cartItem);
          }
        }
      } else if (cartItem.quantity === undefined) {
        setOpenModal(true);
        setItemToRemove(cartItem);
        cartItem.quantity = 1;
        cartItem.totalPrice = cartItem.price;
      }

      return cartItem;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItemFromCart = () => {
    if (itemToRemove) {
      const newCart = handleRemoveFromCart(itemToRemove);

      setCart(newCart);
      setOpenModal(false);
      setItemToRemove(null);
      toast.success("Item removido do carrinho com sucesso!");
    } else {
      toast.error("Erro ao remover item do carrinho!");
    }
  };

  const renderMobileCartItems = () => {
    return (
      <div>
        {cart.map((item: ProductProps) => (
          <MobileCartItem key={item.id}>
            <MobileQuantityContainer>
              <div>
                <button onClick={() => handleUpdateQuantity(item, false)}>
                  <MinusCircle size={24} />
                </button>{" "}
                {item.quantity ?? 1}{" "}
                <button onClick={() => handleUpdateQuantity(item, true)}>
                  <PlusCircle size={24} />
                </button>
              </div>
              <img src={item.image} alt={item.title} />
            </MobileQuantityContainer>
            <MobilePriceContainer>
              <h2>{item.title}</h2>
              <h3>R$ {item.totalPrice},00</h3>
            </MobilePriceContainer>
          </MobileCartItem>
        ))}
      </div>
    );
  };

  return (
    <Container>
      {openModal && (
        <ModalComponent
          modalTitle="Deseja remover o item do carrinho?"
          modalBody="Você está tentando remover um item que possui apenas uma unidade. Deseja remover o item do carrinho?"
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onConfirm={handleRemoveItemFromCart}
          isCentered
        />
      )}
      <>
        {cart.length > 0 && (
          <Title
            style={{
              textAlign: "center",
              fontSize: "2rem",
              marginBottom: "2rem"
            }}
          >
            <ShoppingCart
              color={colors.green}
              size={48}
              style={{ margin: "0 auto" }}
            />
            <h1>Seu carrinho</h1>
          </Title>
        )}
        <Content>
          {cart.length === 0 ? (
            renderEmptyCart()
          ) : (
            <>
              <Left>
                {!isMobile ? (
                  <TableContainer>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Produto</Th>
                          <Th>Preço un.</Th>
                          <Th>Qtde.</Th>
                          <Th>Total</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {cart.map((item: ProductProps) => (
                          <Tr key={item.id}>
                            <CustomCell>
                              <img src={item.image} alt={item.title} />
                              <div>{item.title}</div>
                            </CustomCell>
                            <Td>R$ {item.price},00</Td>
                            <Td>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(item, false)
                                  }
                                >
                                  <MinusCircle size={24} />
                                </button>{" "}
                                {item.quantity ?? 1}{" "}
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(item, true)
                                  }
                                >
                                  <PlusCircle size={24} />
                                </button>
                              </div>
                            </Td>
                            <Td>R$ {item.price * (item.quantity ?? 1)},00</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                ) : (
                  renderMobileCartItems()
                )}
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
            </>
          )}
        </Content>
      </>
    </Container>
  );
};

const Title = styled.div`
  margin-block: 2rem;
  margin-top: 20vh;
  h1 {
    color: var(--dark);
    font-size: 2rem;
    font-weight: bold;
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-block: 0 10%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-block: 0;
  }
`;

const Left = styled.div`
  width: 65%;
  position: relative;

  table {
    img {
      width: 125px;
    }
  }

  td,
  th {
    text-align: start;
    vertical-align: middle;
    color: var(--dark);

    button {
      font-weight: bold;
      font-size: 1.2rem;
      margin-inline: 0.25rem;
    }
  }

  th {
    color: var(--firefly);
  }
  div {
    font-weight: bold;
    color: var(--dark);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 2rem;
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

  @media screen and (max-width: 768px) {
    width: 100%;
    position: relative;
    margin-bottom: 2rem;
  }
`;

const EmptyCartContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  margin-top: 5%;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: var(--dark);
    margin-block: 2rem;
  }

  img {
    width: 30svh;
  }

  a {
    font-size: 1rem;
    font-weight: bold;
    color: var(--primary);
    background-color: var(--firefly);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: var(--gunmetal);
    }
  }
`;

const MobileCartItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 0.75rem;

  div {
  }
`;

const MobileQuantityContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  width: 45%;
  div {
    display: flex;
    flex-direction: column-reverse;
  }
  button {
    margin-inline: 0.5rem;
  }
  img {
    width: 5rem;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;

const MobilePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
  width: 50%;

  h2 {
    font-size: 1rem;
    font-weight: bold;
    color: var(--dark);
  }
  h3 {
    color: var(--green);
    font-size: 0.85rem;
  }
`;

export default Cart;
