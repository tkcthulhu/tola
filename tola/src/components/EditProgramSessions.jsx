import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalState } from "../context/GlobalState";
import { API_URL } from "../services/auth.constants";
import toast, {Toaster} from  'react-hot-toast';

function EditProgramSessions(props)
{
    const [state, ] = useGlobalState();
    const [program, setProgram] = useState();

    useEffect(() => {
        axios.get(`${API_URL}/programs/${props.selected}`, {
            "headers": {
                "Authorization": `Bearer ${state.currentUserToken}`
            }})
        .then((resp) => setProgram(resp.data))
        .catch((error) => toast.error(error));;
    }, [state])

    let programName = "Program"
    
    if (program)
    {
        programName = program.name;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>{programName}</h1>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}

export default EditProgramSessions