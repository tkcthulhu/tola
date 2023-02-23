import axios from "axios";

import { API_URL } from "./auth.constants";

class DatabaseCall
{
    async GetUser(state)
    {
        return await
            axios.get(`${API_URL}/api/usersAPI/${state?.currentUser.user_id}`, {
            "headers": {
                "Authorization": `Bearer ${state.currentUserToken}`
            }})
            .then((resp) => {
                const response=resp.data
                return response
            });
    }

    async GetExercises(state)
    {
        return await 
            axios.get(`${API_URL}/api/exerciseAPI/`, {
            "headers": {
                "Authorization": `Bearer ${state.currentUserToken}`
            }})
            .then((resp) => {
                const response=resp.data
                return response
            });    
    }

    async GetPrograms(state)
    {
        return await 
            axios.get(`${API_URL}/programs/`, {
            "headers": {
                "Authorization": `Bearer ${state.currentUserToken}`
            }})
            .then((resp) => {
                const response=resp.data
                return response
            });    
    }

    async GetProgram(state, id)
    {
        return await
            axios.get(`${API_URL}/programs/${id}`, {
                "headers": {
                    "Authorization": `Bearer ${state.currentUserToken}`
                }})
                .then((resp) => {
                    const response=resp.data
                    return response
                }); 
    }
}

export default new DatabaseCall