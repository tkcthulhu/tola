import { useRef } from 'react';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useGlobalState } from '../../../context/GlobalState';
import { API_URL } from '../../../services/auth.constants';

function NewSetModal(props) {

    const [state,] = useGlobalState();

    let setPercent = useRef(null);

    console.log(props.selected)

    function addSet(selected)
    {
      let thisExercise = [...props.sessionExercises].filter(item => item.id === selected)

      let session = [...props.sessionExercises].filter(item => item.id !== selected)

      console.log(thisExercise)

      console.log(session)
    }
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Set
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Percentage of set:</h4>
          <input 
            type="number" 
            ref={setPercent}
            placeholder='EX: 70%'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {newExercise(setPercent.current.value); props.onHide();}}>Add Execise</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default NewSetModal