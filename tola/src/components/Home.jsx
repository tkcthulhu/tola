import Button from 'react-bootstrap/Button'
import logo from '../img/logo.png'
import logoText from '../img/tola.png'
import { useNavigate } from 'react-router-dom'

function Home(props) {

    let navigate = useNavigate()

    return(
        <div className="container-fluid d-flex justify-content-center landing-page-div">
            <div className="row justify-content-center">
                <div className="col-12 d-flex justify-content-center top-page">
                    <img src={logoText} alt="Tola" />
                </div>
                <div className="col-7">
                    <img src={logo} alt='logo' className='ratio' />
                </div>
                <div className="col-12 d-flex justify-content-center space">
                    <h4 className='italics'>To Endure</h4>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 d-flex justify-content-center button-space norse-bold">
                        <Button variant='dark' onClick={() => navigate('/register')}>
                            <h2 className='h1-button'>New User</h2>
                        </Button>
                    </div>
                    <div className="col-12 d-flex justify-content-center space norse-bold">
                        <Button variant='dark' onClick={() => navigate('/login')}>
                            <h2 className='h1-button'>Existing User</h2>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home