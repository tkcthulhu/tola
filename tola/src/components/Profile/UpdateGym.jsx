import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import React from 'react';

function UpdateGym(props) {

    function useForceUpdate() {
        const [value, setValue] = React.useState(0);
        let v = value
        return () => setValue((value) => v + 1);
    }

    const gymList = useRef(null)
    const [gyms, setGyms] = useState([])
    const [userGyms, setUserGyms] = useState([])


    useEffect(() => {
        axios.get(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/gymAPI/`)
            .then((resp) => setGyms(resp.data));
    }, [])

    let forceUpdate = useForceUpdate()

    function deactivateOldGym(currentGym) {

        axios.put(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/usergymAPI/${currentGym}/`, {
            "active": false
        })

    }

    useEffect(() => {
        axios.get(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/usergymAPI/`)
            .then((resp) => setUserGyms(resp.data));
    }, [])

    function postGym(user, gym) {

        if (props.users.gym){
            deactivateOldGym(props.users.gym.user_gym_id)
        }

        let currentGym = false

        for (const userGym of userGyms) {
            if (userGym.user == user && userGym.gym == gym && !userGym.status) {
                
                currentGym=userGym.id
                console.log(userGym.id)
            } 
        }
        
        if (!currentGym) {
            console.log('new')
            axios
                .post(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/usergymAPI/`, {
                    "user": user,
                    "gym": gym,
                    "active": true,
                })
            .catch((err) => console.log(err + ' it\'s this one officer'));
        } else {
            console.log('update')
            axios
                .put(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/usergymAPI/${currentGym}/`, {
                    "active": true,
            })
        }

    }

    const handleClose = () => {
        props.setShow(false)
    };

    function gymListBuild() {

        let gymList = []

        for (const gym of gyms) {
            gymList.push(
                <option
                    value={gym.id}
                    key={gym.id}
                >
                    {gym.name}
                </option>
            )
        }
        return (
            gymList
        )
    }

    return (

        <Modal
            show={props.show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className='norse-bold'
        >
            <Modal.Header closeButton>
                <Modal.Title>Select new gym</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                What gym would you like to join?
                <select
                    name="list"
                    id="listSelect"
                    className='inputItem'
                    ref={gymList}
                >
                    {gymListBuild()}
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    onClick={() => {
                        postGym(props.users.id, gymList.current.value);
                        handleClose();
                        forceUpdate();
                    }}
                >
                    Set New Gym
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default UpdateGym