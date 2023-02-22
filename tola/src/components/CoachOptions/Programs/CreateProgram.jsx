import axios from 'axios'
import { useRef } from 'react';
import { API_URL } from '../../../services/auth.constants'
import toast, { Toaster } from 'react-hot-toast';
import { useGlobalState } from '../../../context/GlobalState'

function CreateProgram(props) {

    const [ state, ] = useGlobalState();

    const newProgramName = useRef(null)

    function newProgram(name) {
        axios
            .post(`${API_URL}/programs/`, {
                "name": name,
                "coach": state.currentUser?.user_id
            }, 
            {
                "headers": {
                    "Authorization": `Bearer ${state.currentUserToken}`
                }
            })

            newProgramName.current.value = ''
            toast.success(`Program ${name} created!`)

    }

    return (
        <div className="container">
            <div className="row">
                <h1>Create a new program</h1>
            </div>
            <div className="row">
                <input 
                    type="text" 
                    placeholder="New program name"
                    ref={newProgramName}
                />
            </div>
            <button onClick={() => newProgram(newProgramName.current.value)}>
                Create Program
            </button>
            <Toaster/>
        </div>
    )
}

export default CreateProgram