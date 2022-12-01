import {
    useNavigate,
    Outlet
} from "react-router-dom";

import Logo from '../img/logo.png'
import UserIcon from '../img/athlete.png'
import settings_button from '../img/settings_button.png'

function Header(props) {
    let navigate = useNavigate();

    let username = ''
    let gym = ''

    username = props.users.username
    gym = { ...props.users.gym }
    gym = gym.name
    
    return (
        <>
            <div className='container-fluid'>
                <div className="row header-cont">
                    <div className="col-6 tola-logo-header">
                        <img
                            className='ratio'
                            src={Logo}
                            alt="Logo"
                            id='header-logo'
                            onClick={() => {
                                navigate('/');
                            }}
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
                            onClick={() => navigate('/profile')}
                            />
                    </div>
                </div>
            </div>
            <Outlet />
            <img
                src={settings_button}
                alt="settings"
                id='settings-button'
                onClick={() => {
                    navigate('/settings');
                }}
                />
        </>
    )
}

export default Header