import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import React from 'react';
import { API_URL } from '../../services/auth.constants';
import { useGlobalState } from '../../context/GlobalState';

function UpdateMax(props) {

  function useForceUpdate() {
    const [value, setValue] = React.useState(0);
    let v = value
    return () => setValue((value) => v + 1);
  }

  let forceUpdate = useForceUpdate()
  const [ state, ] = useGlobalState();

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
    }, {
      "headers": {
          "Authorization": `Bearer ${state.currentUserToken}`
      }})
    .catch((err) => console.log(err));

    let newMaxes = [...props.userMaxes]

    let replace = newMaxes.filter((max) => max.exercise_id !== exercise)

    console.log(replace)

    props.setUserMaxes([...replace, {
      "user": user,
      "exercise": exercise,
      "weight": Math.round(weight*units),
      "num_of_reps": reps,
      "active": true
    }])
  }

  function deactivateOldMax(currentMax) {
        
    axios.put(`${API_URL}/api/maxAPI/${currentMax}/`, {
        "id": currentMax,
        "active": false
        }, {
          "headers": {
              "Authorization": `Bearer ${state.currentUserToken}`
          }}
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
            placeholder={user_units ? 'lbs' : 'kg'}
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