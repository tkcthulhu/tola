import Button from 'react-bootstrap/Button'
import logo from '../img/logo.png'
import logoText from '../img/tola.png'
import { useNavigate } from 'react-router-dom'

function Home(props) {

    let navigate = useNavigate()

    return(
        <div className="container-fluid d-flex justify-content-center landing-page-div">
            <div className="row justify-content-center">
                <div className="col-12 d-flex justify-content-center top-page sapce">
                    <img src={logoText} alt="Tola" />
                </div>
                <div className="col-8">
                    <img src={logo} alt='logo' className='ratio' />
                </div>
                <div className="col-12 d-flex justify-content-center space">
                    <h1 className='norse-bold'>To Endure</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 d-flex justify-content-center space norse-bold">
                        <Button variant='dark' onClick={() => navigate('/register')}>New User</Button>
                    </div>
                    <div className="col-12 d-flex justify-content-center space norse-bold">
                        <Button variant='dark' onClick={() => navigate('/login')}>Existing User</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home