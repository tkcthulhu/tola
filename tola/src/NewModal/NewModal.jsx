import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import displayOutput from 'axios';
import React from 'react';

function NewModal(props) {

  const weight = React.useRef(null);

  function postMax(user, exercise, weight, reps) {

    axios.post(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/maxAPI/`, {
        "user": user,
        "exercise": exercise,
        "weight": weight,
        "num_of_reps": reps,
        "created_at": `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
        "active": true
    })
    .then((response) => displayOutput(response))
    .catch((err) => console.log(err));
  }

  function deactivateOldMax(currentMax) {
        
    axios.put(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/maxAPI/${currentMax}/`, {
        "id": currentMax,
        "active": false
        }
    )

  }

  const handleClose = () => {
    props.setShow(false)
  };

  return (

      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title} Max</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Congratulations on your new {props.title} PR!!
          What did you hit?<br/>
          <input 
            type="number" 
            ref={weight}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
            variant="danger"
            onClick={() => {
              postMax(props.user, props.exerciseId, weight.current.value, 1);
              deactivateOldMax(props.oldMax)
              handleClose()
            }}
          >
            Set New Max
          </Button>
        </Modal.Footer>
      </Modal>

  );
}

export default NewModal