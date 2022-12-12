import Button from 'react-bootstrap/esm/Button'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup'
import AuthService from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../services/auth.constants';
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast';

function Settings(props) {

    let navigate = useNavigate();

    let units = props.users.units

    console.log(units)

    const handleLogout = () => {
        AuthService
            .logout()
        navigate("/login")
    }

    const handleUnitChange = (unit) => {
        axios
            .patch(
                `${API_URL}/users/${props.users.id}/`,
                {
                    'units': (unit === 'Imperial')
                })
            toast(`Units have been changed to ${unit}`)
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
                                <Button 
                                    variant={`${units ? 'danger' : 'dark'}`} 
                                    className={`${units ? "lil-button" : ""}`}
                                    onClick={() => handleUnitChange('Imperial')}
                                >
                                    Imperial
                                </Button>
                                <Button 
                                    variant={`${units ? 'dark' : 'danger'}`} 
                                    className={`${units ? "" : "lil-button"}`}
                                    onClick={() => handleUnitChange('Metric')}
                                >
                                    Metric
                                </Button>
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
            <Toaster/>
        </div>
    )
}

export default Settings