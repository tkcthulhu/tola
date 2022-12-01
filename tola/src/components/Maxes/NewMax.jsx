import axios from "axios";
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

function NewMax(props) {

  function useForceUpdate() {
    const [value, setValue] = useState(0);
    let v = value
    return () => setValue((value) => v + 1);
  }

  const forceUpdate = useForceUpdate()

  const weight = React.useRef(null);
  const exerciseList = React.useRef(null);

  const [exercises, setExercises] = useState([])

  useEffect(() => {
      axios.get(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/exerciseAPI/`)
      .then((resp) => setExercises(resp.data));
  }, [])

  const handleClose = () => {
      props.setShow(false)
  };

  function postMax(user, exercise, weight, reps) {
    axios.post(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/maxAPI/`, {
        "user": user,
        "exercise": exercise,
        "weight": weight,
        "num_of_reps": reps,
        "created_at": `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
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