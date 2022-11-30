import {
  useNavigate, useLocation
} from "react-router-dom";

function Navbar(props) {

  let navigate = useNavigate();

  let location = useLocation();

  return(
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a 
            id='Home' 
            className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} 
            aria-current="page" 
            onClick={() => {
              navigate('/');
            }}
            >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a 
            id='Training' 
            className={`nav-link ${location.pathname === '/training' ? 'active' : ''}`} 
            aria-current="page"
            onClick={() => {
              navigate('/training')
            }}
            >
            Training
          </a>
        </li>
        <li className="nav-item">
          <a 
            id='Maxes' 
            className={`nav-link ${location.pathname === '/maxes' ? 'active' : ''}`} 
            aria-current="page" 
            onClick={() => {
              navigate('/maxes')
            }}
            >
            Maxes
          </a>
        </li>
        <li className="nav-item">
          <a 
            id='Programs' 
            className={`nav-link ${location.pathname === '/programs' ? 'active' : ''}`} 
            aria-current="page"
            onClick={() => {
              navigate('/programs')
            }}
            >
            Programs
          </a>
        </li>
      </ul>
    </>
  )
}

export default Navbar