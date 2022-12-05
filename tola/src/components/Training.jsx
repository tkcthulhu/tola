import { useState, useEffect } from "react"
import Carousel from 'react-bootstrap/Carousel'
import Accordion from 'react-bootstrap/Accordion'
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
                            <div>
                                <p>Set {set.set_num}</p>
                                <p>{set.num_of_reps} reps</p>
                                <p>{set.percent}%</p>
                                <p>{set.weight}lbs</p>
                            </div>
                        )

                    }

                    this_session.push(
                        <Accordion.Item eventKey={i}>
                            <Accordion.Header>{exercise.exercise}</Accordion.Header>
                            <Accordion.Body>
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
                            <Accordion defaultActiveKey={null} flush>
                                {this_session}
                            </Accordion>
                        </div>
                    </Carousel.Item>
                )
            }

            myTraining.push(
                <div className="container">
                    <h4>{program.program}</h4>
                    <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
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