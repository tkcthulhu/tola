import { useRef } from 'react';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useGlobalState } from '../../../context/GlobalState';
import { API_URL } from '../../../services/auth.constants';

function NewExerciseModal(props) {

    const [state,] = useGlobalState();

    let newExerciseName = useRef(null);

    function newExercise(name) {
        axios
            .post(`${API_URL}/api/exerciseAPI/`, {
                "name": name,
            }, 
            {
                "headers": {
                    "Authorization": `Bearer ${state.currentUserToken}`
                }
            })
  
            newExerciseName.current.value = ''
            props.toast.success(`Exercise ${name} is now availible!`)
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
            New Exercise
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Please enter the name of the exercise:</h4>
          <input 
            type="" 
            ref={newExerciseName}
            placeholder='EX: Back Squat'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {newExercise(newExerciseName.current.value); props.onHide();}}>Add Execise</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default NewExerciseModal