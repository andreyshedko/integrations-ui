import { DeliveryProvider } from "@/models/delivery_provider";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";

interface IModalProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  provider: DeliveryProvider;
  deleteProvider: () => void;
}

export default function DeleteModal(props: IModalProps) {
  let { isOpen, onClose, provider, deleteProvider } = props;

  const handleCancel = (): void => onClose();
  const handleDelete = (): void => {
    deleteProvider();
    onClose();
  };

  return (
    <>
      <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete Provider
          </ModalHeader>
          <ModalBody>
            <p>
              <span className="font-bold">
                Do you want to delete {provider?.provider_name}
              </span>
              ?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCancel}>
              Close
            </Button>
            <Button color="primary" onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
