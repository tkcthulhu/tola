import axios from "axios";
import displayOutput from 'axios';
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

function NewMax(props) {

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

    console.log(exercises)

    function postMax(user, exercise, weight, reps) {

        axios.post(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/maxAPI/`, {
            "user": user,
            "exercise": exercise,
            "weight": weight,
            "num_of_reps": reps,
            "active": true
        })
        .then((response) => displayOutput(response))
        .catch((err) => console.log(err));
    }

    function exerciseListsBuild() {

        let userLists = [...exercises]

        let exerciseLists = []

        for (let i = 0; i < userLists.length; i++) {
            exerciseLists.push(
                <>
                    <option 
                        value= {userLists[i].id}
                        // id={Date().now()}
                    >
                        {userLists[i].name}
                    </option>
                </>
            )
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
            <Modal.Title>{props.title} Max</Modal.Title>
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
                postMax(props.user, props.exerciseId, weight.current.value, 1);
                handleClose()
              }}
            >
              Set New Max
            </Button>
          </Modal.Footer>
        </Modal>
    );
}

export default NewMax