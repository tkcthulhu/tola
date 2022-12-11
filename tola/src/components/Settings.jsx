import Button from 'react-bootstrap/esm/Button'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup'
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
        <div className='container'>
            <div className="row">
                <div className="col">
                    <h1 className='norse-bold'>Settings</h1>
                </div>
            </div>
            <ListGroup variant="flush">
              <ListGroup.Item>
                    <div className="row">
                        <div className="col-7">
                            <strong>Units</strong>
                        </div>
                        <div className="col-5">
                            <ButtonGroup size="sm">
                                <Button variant='dark'>Imperial</Button>
                                <Button variant='danger' className='lil-button'>Metric</Button>
                            </ButtonGroup>
                        </div>
                    </div>

                </ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
            </ListGroup>
            <div className="row justify-content-center">
                <div className="col-4">
                    <Button variant='danger' className='lil-button norse-bold' onClick={() => handleLogout()}>Logout</Button>
                </div>
            </div>
        </div>
    )
}

export default Settings