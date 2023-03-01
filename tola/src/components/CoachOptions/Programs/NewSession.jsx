import { useState, useRef, useEffect } from 'react';
import toast, {Toaster} from "react-hot-toast";
import { API_URL } from '../../../services/auth.constants';
import { useGlobalState } from '../../../context/GlobalState';
import DatabaseCall from '../../../services/api.data'
import request from '../../../services/api.request'

import NewExerciseModal from './NewExercise';
import NewSetModal from './NewSet';
 
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';

function NewSession(props) {

    const [program, setProgram] = useState();
    const [exercises, setExercises] = useState();
    const [sessionExercises, setSessionExercises ] = useState([]);
    const [selected, setSelected] = useState();
    const [sessions, setSessions] = useState();

    const [counter, setCounter] = useState(1);
    
    const [state, ] = useGlobalState();

    const [exerciseModalShow, setExerciseModalShow] = useState(false);
    const [addSetModal, setAddSetModal] = useState(false);

    const exerciseSelect = useRef(null);
    const week = useRef(null)

    useEffect(() => {
      DatabaseCall.GetExercises(state)
        .then(data => setExercises(data))}, [])

    useEffect(() => {
      DatabaseCall.GetProgram(state, localStorage.getItem('EditProgram'))
        .then(data => setProgram(data))}, [])

    useEffect(() => {
      DatabaseCall.GetProgramSessions(state, localStorage.getItem('EditProgram'))
        .then(data => setSessions(data))}, [])

    let currentSession

    if (sessions) {
      currentSession = sessions.length + 1;
    } else {
      currentSession = 1;
    }

    useEffect(() => {
      if(localStorage.getItem('EditSession'))
      {
        setSessionExercises(JSON.parse(localStorage.getItem('EditSession')))
      }
    }, [])


    console.log(sessionExercises)

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
            max_exercise: exercise.id,
            sets: []
          }])
    }

    function listSets(exerciseSets)
    {
      let setsList = []
      exerciseSets.map(set => setsList.push(
        <p>{set.set_num}: {set.percent}% {set.num_of_reps} reps</p>
      ))
      return setsList
    }

    function listExercises()
    {
      let items = [...sessionExercises];

      let itemsList = [];

      items.map(item => itemsList.push(
        <p>
          Exercise {item.order}<br/>
          {item.name}
          {listSets(item.sets)}
          <br/>
        <Button onClick={() => {setSelected(item.id); setAddSetModal(true)}}>
        Add Set
        </Button>
        </p>
      ))

      return itemsList
    }

    async function createSession()
    {
      let payload = {
        url: `/api/addNewSession/${localStorage.getItem('EditProgram')}/`,
        method: "POST",
        data: {
          "session": currentSession,
          "week": week.current.value,
          "exercises": [...sessionExercises]
        }
      };
      try {
        await request(payload);
          toast.success('Session has been added successfully')
        } catch {
          toast.error('Failed')
        }
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{program?.name}</h1>
            <h3>Session {currentSession}</h3>
            <h4>Week: </h4>
            <input type="number" ref={week}/>
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
          <div className="row">
            <div className="col">
              <Button onClick={() => createSession()}>Create Session</Button>
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