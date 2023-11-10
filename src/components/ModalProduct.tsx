import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner
} from "@chakra-ui/react";
import { styled } from "styled-components";
import { ProductProps } from "./Product";

interface IModalProductProps {
  selectedProduct: ProductProps | null;
  handleCloseModal: () => void;
  loading: boolean;
  description: string;
}

const ModalProduct = (props: IModalProductProps) => {
  return (
    <Modal
      size={"xl"}
      isCentered
      motionPreset="none"
      isOpen={!!props.selectedProduct}
      onClose={props.handleCloseModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.selectedProduct?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {props.loading ? (
            <LoadingContainer>
              <Spinner size={"lg"} color="green.500" />
            </LoadingContainer>
          ) : (
            <ModalProductContainer>
              <div>
                <img src={props.selectedProduct?.image} alt="" />
              </div>
              <div>
                <p>{props.description}</p>
              </div>
            </ModalProductContainer>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  margin-block: 2rem;
`;

const ModalProductContainer = styled.div`
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

export default ModalProduct;
