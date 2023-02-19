import axios from 'axios'
import { useRef } from 'react';
import { API_URL } from '../services/auth.constants'
import { useGlobalState } from '../context/GlobalState'

export function CreateProgram(props) {

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
            console.log(API_URL)
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

            <h1>Add a session</h1>
            {/* What program to add, what week to put, session number, (exercise, num_of_sets, %, max exercise) */}
        </div>
    )
}