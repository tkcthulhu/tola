import axios from 'axios'

import Layout from "./Layout"
import Accordion from 'react-bootstrap/Accordion'
import Button from "react-bootstrap/esm/Button"
import request from '../services/api.request'
import { API_URL } from '../services/auth.constants'

function Programs(props) {

    let program = props.users.programs.name

    async function handleReset(id) {

        let payload = {
            url: `/api/updateUserProgram/${id}/`,
            method: "PATCH",
          };
          await request(payload);
    }

    return(
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='norse-bold'>Programs</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Accordion flush>
                        <Accordion.Item eventkey={program.id}>
                            <Accordion.Header>
                                <h2 className='norse-bold'>
                                    {program}
                                </h2>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="col">
                                        <Button variant="dark" onClick={() => handleReset(props.users.programs.program_id)}><strong>RESTART PROGRAM</strong></Button>
                                    </div>
                                    <div className="col">
                                        <Button variant="danger" className="lil-button"><strong>LEAVE PROGRAM</strong></Button>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </Layout>
    )
}

export default Programs