import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import React from 'react';

function UpdateMax(props) {

  function useForceUpdate() {
    const [value, setValue] = React.useState(0);
    let v = value
    return () => setValue((value) => v + 1);
  }

  let forceUpdate = useForceUpdate()

  const weight = React.useRef(null);

  async function postMax(user, exercise, weight, reps) {

    await axios.post(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/maxAPI/`, {
        "user": user,
        "exercise": exercise,
        "weight": weight,
        "num_of_reps": reps,
        "active": true
    })
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
        className='norse-bold'
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
          <Button 
            variant="danger"
            className='lil-button norse-bold'
            onClick={() => {
              postMax(props.user, props.exerciseId, weight.current.value, 1);
              deactivateOldMax(props.oldMax)
              handleClose()
              forceUpdate();
            }}
          >
            Set New Max
          </Button>
        </Modal.Footer>
      </Modal>

  );
}

export default UpdateMax