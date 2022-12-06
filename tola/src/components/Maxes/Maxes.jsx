import { useState } from 'react'
import update from '../../img/update-button.png'
import UpdateMax from './UpdateMax'
import NewMax from './NewMax'
import Button from 'react-bootstrap/esm/Button'
import './maxes.css'
import Layout from '../Layout'

function Maxes(props) {

    const [exercise, setExercise] = useState('')
    const [exerciseId, setExerciseId] = useState('')
    const [oldMax, setOldMax] = useState('')

    let maxes = props.users.maxes ? [...props.users.maxes] : []

    maxes = maxes.sort((a, b) => {
        if (a.exercise < b.exercise)
            return -1;
        if (a.exercise > b.exercise)
            return 1;
        return 0;
    })

    const handleShow = () => {
        props.setShow(true)
    };

    let max_view = []

    for (const max of maxes) {

        max_view.push(
            <li key={max.id} className="list-group-item">
                <div className="row">
                    <div className="col norse-bold">
                        <h2>
                            {max.exercise}
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9">
                        <br /><p className="tab">{max.reps} Rep Max: {max.weight}</p><p className="tab">{max.date}</p>
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
                            }}
                        />
                    </div>
                </div>
            </li>
        )
    }

    return (
        <Layout>
            <div className="container page">
                <ul className="list-group list-group-flush">
                    {max_view}
                </ul>
            </div>
            <NewMax show={props.showNewMax} setShow={props.setShowNewMax} user={props.users.id} maxes={maxes} />
            <UpdateMax show={props.show} setShow={props.setShow} title={exercise} exerciseId={exerciseId} user={props.users.id} oldMax={oldMax} />
            <Button
                variant="danger"
                onClick={() => { props.setShowNewMax(true) }}
                id="new-max-button"
                className='norse-bold'
            >
                Set a New Max
            </Button>
        </Layout>
    )
}

export default Maxes