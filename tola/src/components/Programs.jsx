import { useState, useEffect } from 'react'

import axios from 'axios'
import Layout from "./Layout"
import Accordion from 'react-bootstrap/Accordion'
import Button from "react-bootstrap/esm/Button"
import request from '../services/api.request'
import { API_URL } from '../services/auth.constants'

function Programs(props) {

    const [programs, setPrograms] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/programs/`)
        .then((resp) => setPrograms(resp.data));
    }, [])

    let my_program = ''

    let availible_programs = []

    async function handleReset(id) {

        let payload = {
            url: `/api/updateUserProgram/${id}/`,
            method: "PATCH",
          };
          await request(payload);
    }

    async function handleLeave(id) {

        let payload = {
            url: `/api/updateUserProgram/${id}/`,
            method: "DELETE",
          };
          await request(payload);
    }

    async function handleJoin(id) {

        let payload = {
            url: `/api/addUserToProgram/${id}/`,
            method: "POST",
        };
        await request(payload)
    }

    if (props.users.programs.name) {
        my_program = props.users.programs.name

        my_program =
        <Accordion.Item eventkey={my_program}>
            <Accordion.Header>
                <h3 className='norse-bold'>
                    {my_program}
                </h3>
            </Accordion.Header>
            <Accordion.Body>
                <div className="row">
                    <div className="col">
                        <Button variant="dark" onClick={() => handleReset(props.users.programs.program_id)}><strong>RESTART PROGRAM</strong></Button>
                    </div>
                    <div className="col">
                        <Button variant="danger" className="lil-button" onClick={() => handleLeave(props.users.programs.program_id)}><strong>LEAVE PROGRAM</strong></Button>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    }

    if (programs) {
        let availible_programs_arr = programs.filter((item) => item.id !== props.users.programs.program_id)
        
        for (const program of availible_programs_arr){
            availible_programs.push(
                <Accordion.Item eventkey={program.id}>
                    <Accordion.Header>
                        <h3 className='norse-bold'>
                            {program.name}
                        </h3>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="row justify-content-center">
                            <div className="col">
                                <Button variant="dark" onClick={() => handleJoin(program.id)}><strong>JOIN PROGRAM</strong></Button>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            )
        }
    }


    return(
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='norse-bold'>My Programs</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Accordion defaultActiveKey={null} flush>
                        {my_program}
                    </Accordion>
                </div>
                <div className="row">
                    <div className="col">
                        <h1 className='norse-bold'>Availible Programs</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Accordion defaultActiveKey={null} flush>
                        {availible_programs}
                    </Accordion>
                </div>
            </div>
        </Layout>
    )
}

export default Programs