import axios from "axios";
import displayOutput from 'axios';

function NewMax(props) {

    function postMax(user, exercise, weight, reps, currentMax) {

        axios.post(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/maxAPI/`, {
            "user": user,
            "exercise": exercise,
            "weight": weight,
            "num_of_reps": reps,
            "active": true
        })
        .then((response) => displayOutput(response))
        .catch((err) => console.log(err));
    }

    function deactivateOldMax(props) {
        
        axios.put(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/maxAPI/${currentMax}`, {
            "id": currentMax,
            "active": false
            }
        )

    }

}

export default NewMax