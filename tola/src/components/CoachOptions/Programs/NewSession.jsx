import { useState, useRef, useEffect } from 'react';
import toast, {Toaster} from "react-hot-toast";
import { API_URL } from '../../../services/auth.constants';
import { useGlobalState } from '../../../context/GlobalState';
import DatabaseCall from '../../../services/api.data'

import NewExerciseModal from './NewExercise';
 
import Button from 'react-bootstrap/esm/Button';

function NewSession(props) {

    const [response, setResponse] = useState();
    const [exercises, setExercises] = useState()
    const [sessionExercises, setSessionExercises ] = useState([]);

    const [ counter, setCounter ] = useState(1);
    
    const [ state, ] = useGlobalState();

    const [modalShow, setModalShow] = useState(false);

    const exerciseSelect = useRef(null);

    useEffect(() => {
      DatabaseCall.GetExercises(state)
        .then(data => setExercises(data))}, [])

    function exerciseList()
    {
      let response = []
      if (exercises) { 
      let currentExercises = [...exercises]


      for (let i = 0; i < currentExercises.length; i++)
      {
        response
          .push(
            <option 
              value= {currentExercises[i]?.id}
              id={i}
            >
            {currentExercises[i]?.name}
        </option>
          )
      }}

      return response
    }

    function addExercise(selected)
    {
        setCounter(counter+1);

        let exercise = [...exercises].filter(item => item.id == selected)[0]

        setSessionExercises([...sessionExercises, 
          {
            id: exercise.id,
            name: exercise.name,
            order: counter,
            sets: []
          }])

        console.log(sessionExercises)
    }

    function listExercises()
    {
      let items = [...sessionExercises];

      let itemsList = [];

      items.map(item => itemsList.push(
        <p>
          {item.name} {item.order}
        <Button>
        Add Sets
        </Button>
        </p>
      ))

      return itemsList
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col">
            {listExercises()}
            <select 
              name="exercise" 
              id="exerciseList" 
              ref={exerciseSelect}
            >
              {exerciseList()}
            </select>
            <Button onClick={() => addExercise(exerciseSelect.current.value)}>Add Exercise</Button>
          </div>
          <div className="row">
            <div className="col">
              <p>Don't see your exericse listed?</p>
              <Button onClick={() => setModalShow(true)}>Add New Exercise</Button>
            </div>
          </div>
        </div>
        <Toaster/>
        <NewExerciseModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          toast={toast}
        />
      </div>
    )

}

export default NewSession