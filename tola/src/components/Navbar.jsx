import {
  useNavigate, useLocation
} from "react-router-dom";

function Navbar(props) {

  let navigate = useNavigate();

  let location = useLocation();

  return(
    <>
      <ul className="nav nav-tabs norse-bold">
        <li className="nav-item">
          <div 
            id='Dashboard' 
            className={`nav-link ${location.pathname === '/user/dashboard' ? 'active active-color' : ''}`} 
            aria-current="page" 
            onClick={() => {
              navigate('/user/dashboard');
            }}
            >
              <h3>
                Home
              </h3>
          </div>
        </li>
        <li className="nav-item">
          <div 
            id='Training' 
            className={`nav-link ${location.pathname === '/user/training' ? 'active active-color' : ''}`} 
            aria-current="page"
            onClick={() => {
              navigate('/user/training')
            }}
            >
              <h3>
                Training
              </h3>
          </div>
        </li>
        <li className="nav-item">
          <div 
            id='Maxes' 
            className={`nav-link ${location.pathname === '/user/maxes' ? 'active active-color' : ''}`} 
            aria-current="page" 
            onClick={() => {
              navigate('/user/maxes')
            }}
            >
              <h3>
                Maxes
              </h3>
          </div>
        </li>
        <li className="nav-item">
          <div 
            id='Programs' 
            className={`nav-link ${location.pathname === '/user/programs' ? 'active active-color' : ''}`} 
            aria-current="page"
            onClick={() => {
              navigate('/user/programs')
            }}
            >
              <h3>
                Programs
              </h3>
          </div>
        </li>
      </ul>
    </>
  )
}

export default Navbar