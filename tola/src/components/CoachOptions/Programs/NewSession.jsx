import { useState, useRef, useEffect } from 'react';
import toast, {Toaster} from "react-hot-toast";
import { API_URL } from '../../../services/auth.constants';
import { useGlobalState } from '../../../context/GlobalState';
import DatabaseCall from '../../../services/api.data'

import NewExerciseModal from './NewExercise';
import NewSetModal from './NewSet';
 
import Button from 'react-bootstrap/esm/Button';

function NewSession(props) {

    const [program, setProgram] = useState();
    const [exercises, setExercises] = useState();
    const [sessionExercises, setSessionExercises ] = useState([]);
    const [selected, setSelected] = useState();

    const [counter, setCounter] = useState(1);
    
    const [state, ] = useGlobalState();

    const [exerciseModalShow, setExerciseModalShow] = useState(false);
    const [addSetModal, setAddSetModal] = useState(false);

    const exerciseSelect = useRef(null);

    useEffect(() => {
      DatabaseCall.GetExercises(state)
        .then(data => setExercises(data))}, [])

    useEffect(() => {
      DatabaseCall.GetProgram(state, localStorage.getItem('EditProgram'))
        .then(data => setProgram(data))}, [])

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
    }

    function addSet(selected)
    {
      let thisExercise = [...sessionExercises].filter(item => item.id === selected)

      let session = [...sessionExercises].filter(item => item.id !== selected)

      console.log(thisExercise)

      console.log(session)
    }

    function listExercises()
    {
      let items = [...sessionExercises];

      let itemsList = [];

      items.map(item => itemsList.push(
        <p>
          {item.name} {item.order}
        <Button onClick={() => {setSelected(item.id); setAddSetModal(true)}}>
        Add Set
        </Button>
        </p>
      ))

      return itemsList
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{program?.name}</h1>
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
              <Button onClick={() => setExerciseModalShow(true)}>Add New Exercise</Button>
            </div>
          </div>
        </div>
        <Toaster/>
        <NewExerciseModal
          show={exerciseModalShow}
          onHide={() => setExerciseModalShow(false)}
          toast={toast}
        />
        <NewSetModal
          show={addSetModal}
          onHide={() => setAddSetModal(false)}
          sessionExercises={sessionExercises}
          setSessionExercises={setSessionExercises}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    )

}

export default NewSession