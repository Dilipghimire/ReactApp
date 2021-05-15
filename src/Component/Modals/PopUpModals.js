import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { ToggleButtonGroup } from "react-bootstrap";

const PopUpModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const checkAndPopUP = () => {
    props.searchValue();
    toggle();
  
  };

 

  //send value to parnent component
  const sendValueParent = (e) => {
    const val = e.target.value;
    props.getvalueFromChildComponent(val);
    toggle();
  };


  return (
    <div>
      <Button onClick={checkAndPopUP} id= {props.buttonId}>{props.buttonText}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{props.modalTitle}</ModalHeader>
        <ModalBody>{props.modalBodyText} </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            value={!props.userExist ? "Yes" : "Ok"}
            onClick={sendValueParent}
          >
            {!props.userExist ? "Yes" : "Ok"}
          </Button>
          {!props.userExist && (
            <Button color="secondary" onClick={toggle}>
              No
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PopUpModal;
