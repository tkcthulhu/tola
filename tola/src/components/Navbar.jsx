import {
  useNavigate,
} from "react-router-dom";

function Navbar(props) {
  let navigate = useNavigate();

  return(
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a 
            id='Home' 
            className="nav-link" 
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
            className="nav-link" 
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
            className="nav-link" 
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
            className="nav-link" 
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