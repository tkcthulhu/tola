import Logo from './img/logo.png'
import UserIcon from './img/athlete.png'

function Header(props) {

    let username = ''
    let gym = ''

    if (props.users) {
        username = props.users.username
        gym = {...props.users.gym}
        gym = gym.name
    }



    return (
        <div className='container-fluid'>
            <div className="row header-cont">
                <div className="col-6 tola-logo-header">
                    <img 
                        className='ratio' 
                        src={Logo} 
                        alt="Logo" 
                        id='header-logo'
                    />
                </div>
                <div className="col-4 d-flex justify-content-end">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end header-text">
                            <p id='username-header'>{username}</p>
                        </div>
                        <div className="col-12 d-flex justify-content-end header-text">
                            <p id='gym-name-header'>{gym}</p>
                        </div>
                    </div>

                </div>
                <div className="col user-icon d-flex justify-content-end">
                    <img 
                        className="user-icon-png" 
                        src={UserIcon} 
                        alt="User Icon" 
                    />
                </div>
            </div>
        </div>
    )
}

export default Header