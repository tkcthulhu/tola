import { useState, useEffect } from "react"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import axios from "axios"
import Layout from "./Layout"

function Training(props) {

    let program = props.users.programs

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

    let myTraining = []

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

                        this_exercise.push(
                            <Card className="exercise-card">
                                <Card.Body className="row exercise-body">
                                    <div className="col-6">
                                        <Card.Title>
                                            <strong>{set.percent}%</strong>
                                        </Card.Title>
                                        <Card.Text className="d-flex justify-content-center">
                                            <strong>
                                            <br/>
                                            {set.weight}lbs
                                            <br/>
                                            {set.num_of_reps} reps
                                            </strong>
                                        </Card.Text>
                                    </div>
                                    <ButtonGroup className="col-6" vertical>
                                            <Button size="small" variant="dark">Complete</Button>
                                            <Button size="small" variant="danger">Failed</Button>
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>
                        )

                    }

                    this_session.push(
                        <Accordion.Item eventKey={i}>
                            <Accordion.Header><strong>{exercise.exercise}</strong><br/><span className="tab">Sets: {(exercise.sets).length}</span></Accordion.Header>
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
                            <p>Session: {session.session}</p>
                            <Accordion defaultActiveKey={null} flush className="training-accordion">
                                {this_session}
                            </Accordion>
                        </div>
                    </Carousel.Item>
                )
            }

            myTraining.push(
                <div className="container page">
                    <h4>{program.program}</h4>
                    <h6>Coach: {program.coach}</h6>
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