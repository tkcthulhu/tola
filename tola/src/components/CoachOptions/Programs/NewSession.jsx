import { useState, useRef } from 'react';
import toast, {Toaster} from "react-hot-toast";
import axios from 'axios';
import { API_URL } from '../../../services/auth.constants';
import { useGlobalState } from '../../../context/GlobalState';
 
import Button from 'react-bootstrap/esm/Button';

function NewSession(props) {

    const [exercises, setExercises ] = useState([]);

    const [ counter, setCounter ] = useState(1);
    
    const [ state, ] = useGlobalState();

    const exerciseSelect = useRef(null);
    const newExerciseName = useRef(null);

    function addExercise()
    {
        setCounter(counter+1);

        setExercises([...exercises, <p>Exercise {counter}</p>])
    }

    function newExercise(name) {
      axios
          .post(`${API_URL}/exercises/`, {
              "name": name,
          }, 
          {
              "headers": {
                  "Authorization": `Bearer ${state.currentUserToken}`
              }
          })

          newExerciseName.current.value = ''
          toast.success(`Exercise ${name} is now availible!`)

  }

    return(
      <div className="container">
        <div className="row">
          <div className="col">
            {exercises}
            <Button onClick={() => addExercise()}>Add Exercise</Button>
          </div>
          <div className="row">
            <div className="col">
              <p>Don't see your exericse listed?</p>
              <Button>Add New Exercise</Button>
            </div>
          </div>
        </div>
        <Toaster/>
      </div>
    )

}

export default NewSession