import { useRef } from 'react';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useGlobalState } from '../../../context/GlobalState';
import { API_URL } from '../../../services/auth.constants';

function NewSetModal(props) {

    const [state,] = useGlobalState();

    let setOrder = useRef(null);
    let setPercent = useRef(null);
    let setReps = useRef(null);
    let setCount = useRef(null);

    function addSet(selected, order, percent, reps, sets)
    {
      let thisExercise = [...props.sessionExercises].filter(item => item.id === selected)

      for (let i=0; i<sets; i++)
      {
        (thisExercise[0].sets).push(
          {
            'set_num': Number(order) + i,
            'num_of_reps': reps,
            'percent': percent
          }
        )
      }

      saveSession(props.sessionExercises)
    }

    function saveSession(sessionExercises)
    {
        if(localStorage.getItem('EditSession'))
        {
            localStorage.removeItem('EditSession');
            localStorage.setItem('EditSession', JSON.stringify([...sessionExercises]))
        } else {
            localStorage.setItem('EditSession', JSON.stringify([...sessionExercises]))
        }
    }

    function clearForm(currentSet)
    {
      setOrder.current.value = Number(currentSet) + 1;
      setPercent.current.value = '';
      setCount.current.value = '';
    }

    function numOfSets()
    {
      let options = []

      options.push(
        <option 
        value= {1}
        selected
        id={`1 set`}
      >
      {1}
      </option>)
      
      for (let i = 2; i <=10; i++)
      {
        let first = (i == 1) ? 'selected' : '';
        options.push(
          <option 
          value= {i}
          {...first}
          id={`${i} set`}
        >
        {i}
    </option>
        )
      }

      return options
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
          <h6>Set order:</h6>
          <input 
            type="number" 
            ref={setOrder}
            placeholder='EX: 1'
          />
          <h6>Percentage:</h6>
          <input 
            type="number" 
            ref={setPercent}
            placeholder='EX: 70%'
          />
          <h6>Rep scheme:</h6>
          <input 
            type="" 
            ref={setReps}
            placeholder='EX: 5 or 2 + 2 or 2 (pause first)'
          />
          <h6>Sets at this weight:</h6>
          <select 
            type="number" 
            ref={setCount}
          >
            {numOfSets()}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              addSet(
                props.selected, 
                setOrder.current.value, 
                setPercent.current.value, 
                setReps.current.value, 
                setCount.current.value
              ); 
              clearForm(setOrder.current.value);}}
          >
            Add Another Set
          </Button>
          <Button 
            onClick={() => {
                addSet(
                  props.selected, 
                  setOrder.current.value, 
                  setPercent.current.value, 
                  setReps.current.value, 
                  setCount.current.value
                ); 
                props.onHide();}}
            >
              Done
            </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default NewSetModal