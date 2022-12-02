import './Profile.css'
import UserIcon from '../../img/athlete.png'
import Button from 'react-bootstrap/esm/Button'
import AuthService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import UpdateGym from './UpdateGym'

function Profile(props) {

    let navigate = useNavigate();

    const handleLogout = () => {
        AuthService
            .logout()
        navigate("/login")
    }

    return(
        <>
        <div className="container">       
        <h3>Profile</h3>
        <h2>{props.users.username}</h2>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <img src={UserIcon} alt="" className='ratio'/>
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    Username: {props.users.username}
                </li>
                <li className="list-group-item">
                    First Name: {props.users.first_name}
                </li>
                <li className="list-group-item">
                    Last Name: {props.users.last_name}
                </li>
                <li className="list-group-item">
                    Birthdate: {props.users.birthday}
                </li>
                <li className="list-group-item">
                    Email: {props.users.email}
                </li>
                <li className="list-group-item">
                    My Gym: {props.users.gym.name}
                    <br/>
                    <Button onClick={() => props.setShow(true)}>Update</Button>
                </li>
            </ul>
        </div>
        <Button onClick={() => handleLogout()}>Logout</Button>
        <UpdateGym users={props.users} show={props.show} setShow={props.setShow} />
        </>
    )
}

export default Profile