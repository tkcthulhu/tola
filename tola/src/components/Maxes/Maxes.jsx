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

    let user_units = props.users.units

    let units = 1
    
    if (!user_units) {
        units = 2.2
    }

    const handleShow = () => {
        props.setShow(true)
    };

    let max_view = []

    for (const max of maxes) {

        max_view.push(
            <li key={max.id} className="list-group-item">
                <div className="row">
                    <div className="col-9">
                        <h2>
                            {max.exercise}
                        </h2>
                        <p className="tab">{max.reps} Rep Max: {Math.round(max.weight/units)}{user_units ? 'lbs' : 'kg'}<br/>{max.date}</p>
                    </div>
                    <div className="col-3 d-flex align-items-center">
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

    if (!max_view.length) {
        max_view = [<h1>No maxes yet, let's get some numbers on the board!</h1>]
    }

    return (
        <Layout>
            <div className="container page">
                <div className="row">
                    <div className="col">
                        <h1 className='norse-bold'>My Maxes</h1>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"></li>
                    {max_view}
                </ul>
            </div>
            <NewMax users={props.users} show={props.showNewMax} setShow={props.setShowNewMax} user={props.users.id} maxes={maxes} />
            <UpdateMax users={props.users} show={props.show} setShow={props.setShow} title={exercise} exerciseId={exerciseId} user={props.users.id} oldMax={oldMax} />
            <Button
                variant="danger"
                onClick={() => { props.setShowNewMax(true) }}
                id="new-max-button"
                className='norse-bold lil-button'
            >
                Set a New Max
            </Button>
        </Layout>
    )
}

export default Maxes