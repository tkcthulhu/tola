import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalState } from "../../../context/GlobalState";
import { API_URL } from "../../../services/auth.constants";
import toast, {Toaster} from  'react-hot-toast';
import Button from 'react-bootstrap/Button';

function EditProgramSessions(props)
{
    const [state, ] = useGlobalState();
    const [program, setProgram] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/programs/${localStorage.getItem('EditProgram')}`, {
            "headers": {
                "Authorization": `Bearer ${state.currentUserToken}`
            }})
        .then((resp) => setProgram(resp.data))
        .catch((error) => toast.error(error));;
    }, [state])

    let programName = "Program"

    let existingSessions = [];

    let numOfSessions = 0;
    
    if (program)
    {
        programName = program.name;

        if ((program.sessions).length > 0)
        {
            numOfSessions = (program.sessions).length;
        } else {
            existingSessions = "Let's add some sessions to your program!"
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>{programName}</h1>
                    <p>{existingSessions}</p>
                    <Button onClick={() => navigate('/user/newsession')}>Add a session</Button>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}

export default EditProgramSessions