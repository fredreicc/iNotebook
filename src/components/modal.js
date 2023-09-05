import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteModal(props) {

  const handleClose = () => {
    props.setShowModal(false);
  };
  //   const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Note?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete the note with title : <b>{props.note.title}</b>
          <p>This action can't be reverted.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              props.deleteNote(props.note._id);
              handleClose();
              props.showAlert("Deleted Note Successfully", "success");
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteModal;
