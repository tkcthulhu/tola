import unchecked from './img/unchecked-box.png'

function Home(props) {

    let date = new Date().toDateString();

    console.log(props.users)

    return(
        <div className="container-fluid">
            <div className="row">
                <h4>Welcome back {props.users.first_name}!</h4>
                <h6>It's {date}</h6>
                <p>Lets get you FECKIN JACK3D</p>
            </div>
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
        </div>
    )
}

export default Home