import { useState, useEffect } from "react"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import axios from "axios"
import Layout from "./Layout"

//Need to fix a bug where if user doesn't have a max in the exercise the app crashes

function Training(props) {

    let program = props.users.programs

    if (!program) {
        program = {
            'id': ''
        }
    }

    const [index, setIndex] = useState(0);

    const [training, setTraining] = useState([])

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

    useEffect(() => {
        axios
            .get(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/user_programs/${program.id}`)
            .then((resp) => setTraining(resp.data))
    }, [])

    if (!program.id) {
        return(
            <Layout>
                <h1>Please add a program to start training!</h1>
            </Layout>
        )
    }

    let myTraining = []

    function handleComplete(set, id) {
        axios
            .patch(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/user_set/${set}/`, {
                "status": 2
            })

        document.getElementById(id).classList.add('cross-out')
    }

    function handleFailed(set) {
        axios
            .patch(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/user_set/${set}/`, {
                "status": 3
            })
    }

    if (training) {  

        let program = training.program

        let this_program = []

        if (program) {

            let sessions = program.sessions

            for (const session of sessions) {

                let exercises = session.exercises

                let i = 0

                let this_session = []

                for (const exercise of exercises) {

                    let sets = exercise.sets

                    let this_exercise = []
                    
                    for (const set of sets) {

                        let id = Date.now()

                        this_exercise.push(
                            <Card className="exercise-card">
                                <Card.Body className="row exercise-body">
                                    <div className="col-6">
                                        <Card.Title className="d-flex justify-content-center">
                                            <h3 id={id} className={set.set_status.status === 'Incomplete' ? '' : 'cross-out'}><strong>{set.percent}%</strong></h3>
                                        </Card.Title>
                                        <Card.Text className="d-flex justify-content-center">
                                            <h4>
                                            {set.weight} lbs
                                            <br/>
                                            <span className="d-flex justify-content-center">{set.num_of_reps} reps</span>
                                            </h4>
                                        </Card.Text>
                                    </div>
                                    <ButtonGroup className="col-6" vertical>
                                            <Button size="small" variant="dark" onClick={() => handleComplete(set.set_status.id, id)}>Complete</Button>
                                            <Button className='lil-button' size="small" variant="danger" onClick={() => handleFailed(set.set_status.id)}>Failed</Button>
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>
                        )

                    }

                    this_session.push(
                        <Accordion.Item eventKey={i}>
                            <Accordion.Header><h2 className="">{exercise.exercise}</h2><br/><span className="tab">Sets: {(exercise.sets).length}</span></Accordion.Header>
                            <Accordion.Body className="row exercise-sets justify-content-center exercise-list">
                                {this_exercise}
                            </Accordion.Body>
                        </Accordion.Item>
                    )

                    i++

                }

                this_program.push(
                    <Carousel.Item>
                        <div className="container">
                            <p className="tab">Week: {session.week} <span className="tab">Session: {session.session}</span></p>
                            <Accordion defaultActiveKey={null} flush className="training-accordion">
                                {this_session}
                            </Accordion>
                        </div>
                    </Carousel.Item>
                )
            }

            myTraining.push(
                <div className="container page">
                    <div className="row">
                        <div className="col-9">
                            <h1 className="norse-bold">{program.program}</h1>
                        </div>
                        <div className="col-3 norse-bold">
                            <Button variant="dark">Week</Button>
                        </div>
                    </div>
                    <h6 className="tab">{program.coach}</h6>
                    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} variant="dark">
                        {this_program}
                    </Carousel>
                </div>
            )
        }
    

        }

    return(
        <Layout>
            {myTraining}
        </Layout>
    )
}

export default Training