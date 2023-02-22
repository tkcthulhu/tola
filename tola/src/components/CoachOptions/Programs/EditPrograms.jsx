import axios from 'axios'
import { useEffect, useState } from 'react';
import Accordion from "react-bootstrap/Accordion";
import Button from 'react-bootstrap/Button';
import toast, {Toaster} from 'react-hot-toast';
import { API_URL } from '../../../services/auth.constants'
import { useGlobalState } from '../../../context/GlobalState'
import { useNavigate } from 'react-router-dom';

function EditPrograms(props)
{
    const [state, ] = useGlobalState();
    const [ programs, setPrograms ] = useState([]);
    
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/programs/`, {
            "headers": {
                "Authorization": `Bearer ${state.currentUserToken}`
            }})
        .then((resp) => setPrograms(resp.data))
        .catch((error) => toast.error(error));;
    }, [state])

    let editablePrograms = [...programs].filter((program) => program.coach === state.currentUser?.user_id);

    let availible_programs = [];

    if (editablePrograms) {
        
        for (const program of editablePrograms){
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
                                <Button variant="dark" onClick={() => {props.setSelected(program.id); navigate();}}><strong>EDIT PROGRAM INFO</strong></Button>
                                <br/>
                                <br/>
                                <Button variant="dark" onClick={() => {props.setSelected(program.id); navigate("/user/editprogramsessions"); console.log(props.selected)}}><strong>EDIT PROGRAM SESSIONS</strong></Button>
                                <br/>
                                <br/>
                                <Button variant="dark" onClick={() => {props.setSelected(program.id); navigate();}}><strong>EDIT PROGRAM ATHLETES</strong></Button>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            )
        }
    }

    return (
        <div className="container">
            <div className="row">
                <h1>Programs by </h1>
                <div className="row justify-content-center">
                    <Accordion defaultActiveKey={null} flush>
                        {availible_programs}
                    </Accordion>
                </div>
                <Toaster/>
            </div>
        </div>
    )
}

export default EditPrograms