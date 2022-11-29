import { useState } from 'react'
import update from '../img/update-button.png'
import NewMax from './NewMax'
import NewModal from '../NewModal/NewModal'

function Maxes(props) {

    const [exercise, setExercise] = useState('')
    const [exerciseId, setExerciseId] = useState('')
    const [oldMax, setOldMax] = useState('')

    let maxes = [...props.users.maxes]

    const handleShow = () => {
        props.setShow(true)
    };

    let max_view = []

    for (const max of maxes) {

        let i = `${props.users.id}${max.exercise.id}`

        max_view.push(
            <li className="list-group-item">
                <div className="row">
                    <div className="col">
                        {max.exercise}
                    </div>
                </div>
                <div className="row">
                    <div className="col-9">
                        <br/><p className="tab">{max.reps} Rep Max: {max.weight}</p><p className="tab">{max.date}</p>
                    </div>
                    <div className="col-3">
                        <img 
                            src={update} 
                            alt="" 
                            className="ratio" 
                            onClick={() => {
                                setExercise(max.exercise)
                                setExerciseId(max.exercise_id)
                                setOldMax(max.id)
                                handleShow()
                                console.log(max.id)
                            }}
                        />
                    </div>
                </div> 
            </li>
        )
    }
    
    return (
        <>
            <ul className="list-group list-group-flush">
                {max_view}
            </ul>
        <NewModal show={props.show} setShow={props.setShow} title={exercise} exerciseId={exerciseId} user={props.users.id} oldMax={oldMax}/>
        </>
    )
}

export default Maxes