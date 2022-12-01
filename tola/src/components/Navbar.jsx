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
          <div 
            id='Dashboard' 
            className={`nav-link ${location.pathname === '/tola/dashboard' ? 'active' : ''}`} 
            aria-current="page" 
            onClick={() => {
              navigate('/tola/dashboard');
            }}
            >
            Home
          </div>
        </li>
        <li className="nav-item">
          <div 
            id='Training' 
            className={`nav-link ${location.pathname === '/tola/training' ? 'active' : ''}`} 
            aria-current="page"
            onClick={() => {
              navigate('/tola/training')
            }}
            >
            Training
          </div>
        </li>
        <li className="nav-item">
          <div 
            id='Maxes' 
            className={`nav-link ${location.pathname === '/tola/maxes' ? 'active' : ''}`} 
            aria-current="page" 
            onClick={() => {
              navigate('/tola/maxes')
            }}
            >
            Maxes
          </div>
        </li>
        <li className="nav-item">
          <div 
            id='Programs' 
            className={`nav-link ${location.pathname === '/tola/programs' ? 'active' : ''}`} 
            aria-current="page"
            onClick={() => {
              navigate('/tola/programs')
            }}
            >
            Programs
          </div>
        </li>
      </ul>
    </>
  )
}

export default Navbar