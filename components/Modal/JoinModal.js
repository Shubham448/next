import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const JoinModal = (props) => {
  return (
    <>
      <Modal isOpen={props.isOpen}>
        <ModalHeader>Join Chat</ModalHeader>
        <ModalBody>
          Are you sure you want to join chat?
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="primary" onClick={props.joinHandler}>
            Join
          </Button>
          <Button type="button" color="danger" onClick={props.closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default JoinModal;
