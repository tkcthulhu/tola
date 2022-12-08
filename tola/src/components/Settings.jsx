import Button from 'react-bootstrap/esm/Button'
import AuthService from '../services/auth.service'
import { useNavigate } from 'react-router-dom'

function Settings(props) {

    let navigate = useNavigate();

    const handleLogout = () => {
        AuthService
            .logout()
        navigate("/login")
    }

    return(
        <>
            <h1>Settings</h1>
            <Button variant='danger' className='lil-button norse-bold' onClick={() => handleLogout()}>Logout</Button>
        </>
    )
}

export default Settings