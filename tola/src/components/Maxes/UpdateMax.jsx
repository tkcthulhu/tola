import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import React from 'react';
import { API_URL } from '../../services/auth.constants';

function UpdateMax(props) {

  function useForceUpdate() {
    const [value, setValue] = React.useState(0);
    let v = value
    return () => setValue((value) => v + 1);
  }

  let forceUpdate = useForceUpdate()

  const weight = React.useRef(null);

  let user_units = props.users.units

  let units = 1
  
  if (!user_units) {
      units = 2.2
  }

  async function postMax(user, exercise, weight, reps) {

    await axios.post(`${API_URL}/api/maxAPI/`, {
        "user": user,
        "exercise": exercise,
        "weight": Math.round(weight*units),
        "num_of_reps": reps,
        "active": true
    })
    .catch((err) => console.log(err));
  }

  function deactivateOldMax(currentMax) {
        
    axios.put(`${API_URL}/api/maxAPI/${currentMax}/`, {
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