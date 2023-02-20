import { useState } from 'react';

import Button from 'react-bootstrap/esm/Button';

function NewSession(props) {

    const [exercises, setExercises ] = useState([]);

    const [ counter, setCounter ] = useState(1);

    function NewExercise()
    {
        setCounter(counter+1);

        setExercises([...exercises, <p>Exercise {counter}</p>])
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col">
            {exercises}
            <Button onClick={() => NewExercise()}>Add Exercise</Button>
          </div>
        </div>
      </div>
    )

}

export default NewSession