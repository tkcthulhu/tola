import unchecked from '../img/unchecked-box.png'
import checked from '../img/checked-box.png'

function Home(props) {

    let date = new Date().toDateString();

    return(
        <ul className="list-group list-group-flush">
            <li className="list-group-item">
                <h4>Welcome back {props.users.first_name}!</h4>
            </li>
            <li className="list-group-item">
                <h6>It's {date}</h6>
                <p className='tab'>Let's get you FECKIN JACK3D</p>
            </li>
            <li className="list-group-item">
                <div className="row justify-content-center">
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
            </li>
        </ul>
    )
}

export default Home