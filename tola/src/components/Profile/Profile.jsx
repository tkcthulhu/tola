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
        <div className="container page">       
        <h1 className='norse-bold'>Profile</h1>
        <h4 className='norse-bold'>{props.users.username}</h4>
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
                    <div className="row">
                        <div className="col-8 align-text-center">
                            My Gym: {props.users.gym.name}
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                            <Button className='norse-bold' variant="dark" onClick={() => props.setShow(true)}>Update</Button>
                        </div>
                    </div>
                </li>
                <li className="list-group-item"></li>
            </ul>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <Button className='norse-bold lil-button' onClick={() => handleLogout()} variant='danger'>Logout</Button>
                </div>
            </div>
        </div>
        <UpdateGym users={props.users} show={props.show} setShow={props.setShow} />
        </>
    )
}

export default Profile