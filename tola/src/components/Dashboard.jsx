import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

import unchecked from '../img/unchecked-box.png'
import checked from '../img/checked-box.png'
import Layout from './Layout';

function Dashboard(props) {

    let date = new Date().toDateString();

    let navigate = useNavigate();

    return (
        <Layout>
            <ul className="list-group list-group-flush">
                <li className="list-group-item norse-bold">
                    <h2>Welcome back {props.users?.first_name}!</h2>
                </li>
                <li className="list-group-item">
                    <h6>It's {date}</h6>
                    <p className='tab'>No current messages for your gym today! May your 80% feel like 60%</p>
                </li>
                <li className="list-group-item">
                    <div className="row justify-content-center norse-bold">
                        <div className="col d-flex justify-content-center checkbox">S</div>
                        <div className="col d-flex justify-content-center checkbox">M</div>
                        <div className="col d-flex justify-content-center checkbox">T</div>
                        <div className="col d-flex justify-content-center checkbox">W</div>
                        <div className="col d-flex justify-content-center checkbox">T</div>
                        <div className="col d-flex justify-content-center checkbox">F</div>
                        <div className="col d-flex justify-content-center checkbox">S</div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col checkbox">
                            <img className='checkbox' src={checked} alt="" />
                        </div>
                        <div className="col checkbox">
                            <img className='checkbox' src={checked} alt="" />
                        </div>
                        <div className="col checkbox">
                            <img className='checkbox' src={checked} alt="" />
                        </div>
                        <div className="col checkbox">
                            <img className='checkbox' src={unchecked} alt="" />
                        </div>
                        <div className="col checkbox">
                            <img className='checkbox' src={unchecked} alt="" />
                        </div>
                        <div className="col checkbox">
                            <img className='checkbox' src={unchecked} alt="" />
                        </div>
                        <div className="col checkbox">
                            <img className='checkbox' src={unchecked} alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Button id='coach-options' className={props.users?.is_coach ? '' : 'hidden'} onClick={() => navigate("/user/coach/")}>Coach options</Button>
                        </div>
                    </div>
                </li>
            </ul>
        </Layout>
    )

}

export default Dashboard