import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalBody: string | JSX.Element;
  modalTitle: string | JSX.Element;
  cancelButtonText?: string;
  confirmbuttonText?: string;
  isCentered?: boolean;
}

const ModalComponent = (props: IModalProps) => {
  const { onClose } = useDisclosure();

  const handleClose = () => {
    onClose();
    props.onClose();
  };

  const handleConfirm = () => {
    props.onConfirm();
  };

  return (
    <>
      <Modal
        isCentered={props.isCentered}
        motionPreset="none"
        isOpen={props.isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{props.modalBody}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              {props.cancelButtonText || "Cancelar"}
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={handleConfirm}>
              {props.confirmbuttonText || "Confirmar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
