import axios from "axios";
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { API_URL } from "../../services/auth.constants";

function NewMax(props) {

  function useForceUpdate() {
    const [value, setValue] = useState(0);
    let v = value
    return () => setValue((value) => v + 1);
  }

  let user_units = props.users.units

  let units = 1
  
  if (!user_units) {
      units = 2.2
  }

  const forceUpdate = useForceUpdate()

  const weight = React.useRef(null);
  const exerciseList = React.useRef(null);

  const [exercises, setExercises] = useState([])

  useEffect(() => {
      axios.get(`${API_URL}/api/exerciseAPI/`)
      .then((resp) => setExercises(resp.data));
  }, [])

  const handleClose = () => {
      props.setShow(false)
  };

  function postMax(user, exercise, weight, reps) {
    axios.post(`${API_URL}/api/maxAPI/`, {
        "user": user,
        "exercise": exercise,
        "weight": Math.round(weight/units),
        "num_of_reps": reps,
        "active": true
    })
    .catch((err) => console.log(err));
  }

  function exerciseListsBuild() {

    let maxes = []

    for (const max of props.maxes) {
      maxes.push(max.exercise)
    }

    let exerciseLists = []

    for (const exercise of exercises) {
      if (!maxes.includes(exercise.name)) {
        exerciseLists.push(
            <option 
                value= {exercise.id}
                key= {exercise.id}
            >
              {exercise.name}
            </option>
        )
      }
    }

    return exerciseLists
        
    }

    return (

        <Modal
          show={props.show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className='norse-bold'
        >
          <Modal.Header closeButton>
            <Modal.Title>New Max</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Congratulations on your new PR!!
            <br/>
            <select 
              name="list" 
              id="listSelect"
              className='inputItem'
              ref={exerciseList}
            >
              {exerciseListsBuild()}
            </select>
            <br/>
            What did you hit?
            <br/>
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
                postMax(props.user, exerciseList.current.value, weight.current.value, 1);
                handleClose()
                forceUpdate()
              }}
            >
              Set New Max
            </Button>
          </Modal.Footer>
        </Modal>
    );
}

export default NewMax