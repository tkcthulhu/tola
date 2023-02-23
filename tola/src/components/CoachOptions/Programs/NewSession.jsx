import { useState, useRef } from 'react';
import toast, {Toaster} from "react-hot-toast";
import axios from 'axios';
import { API_URL } from '../../../services/auth.constants';
import { useGlobalState } from '../../../context/GlobalState';

import NewExerciseModal from './NewExercise';
 
import Button from 'react-bootstrap/esm/Button';

function NewSession(props) {

    const [exercises, setExercises ] = useState([]);

    const [ counter, setCounter ] = useState(1);
    
    const [ state, ] = useGlobalState();

    const [modalShow, setModalShow] = useState(false);

    const exerciseSelect = useRef(null);

    function addExercise()
    {
        setCounter(counter+1);

        setExercises([...exercises, <p>Exercise {counter}</p>])
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