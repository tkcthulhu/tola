import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import Layout from "./Layout"
import Accordion from 'react-bootstrap/Accordion'
import Button from "react-bootstrap/esm/Button"
import request from '../services/api.request'
import { API_URL } from '../services/auth.constants'
import { useGlobalState } from '../context/GlobalState';

function Programs(props) {

    const [programs, setPrograms] = useState([])
    const [ state, ] = useGlobalState();
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`${API_URL}/programs/`, {
            "headers": {
                "Authorization": `Bearer ${state.currentUserToken}`
            }})
        .then((resp) => setPrograms(resp.data))
        .catch((error) => toast.error(error));;
    }, [state])

    let my_program = ''

    let availible_programs = []

    async function handleReset(id) {

        let payload = {
            url: `/api/updateUserProgram/${id}/`,
            method: "PATCH",
          };
          try {
            await request(payload);
              toast.success('Program has been reset successfully')
            } catch {
              toast.error('Failed')
            }
    }

    async function handleLeave(id) {

        let payload = {
            url: `/api/updateUserProgram/${id}/`,
            method: "DELETE",
            };
        try {
                await request(payload);
                toast.success('You have left this program')
        } catch {
                toast.error('Failed')
            }
            navigate('/user/programs')
    }

    async function handleJoin(id) {

        let payload = {
            url: `/api/addUserToProgram/${id}/`,
            method: "POST",
        };
        try {
            await request(payload);
              toast.success('You have joined this program')
        } catch {
                toast.error('There has been an error')
            }
            navigate('/user/programs')
    }

    if (props.users.programs.name) {
        my_program = props.users.programs.name

        my_program =
        <Accordion.Item eventKey={my_program}>
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
                <Accordion.Item eventKey={program.id}>
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
            <div className="container page">
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
            <Toaster/>
        </Layout>
    )
}

export default Programs