import { useState, useEffect } from 'react';
import Home from './Home';
import Maxes from './Maxes';

function Navbar(props) {

  const [page, setPage] = useState('Home');

  return(
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a id='Home' className="nav-link active" aria-current="page" onClick={() => setPage('Home')}>Home</a>
        </li>
        <li className="nav-item">
          <a id='Training' className="nav-link" aria-current="page">Training</a>
        </li>
        <li className="nav-item">
          <a id='Maxes' className="nav-link" aria-current="page" onClick={() => setPage('Maxes')}>Maxes</a>
        </li>
        <li className="nav-item">
          <a id='Programs' className="nav-link" aria-current="page">Programs</a>
        </li>
      </ul>
      { page === 'Home' && <Home users={props.users} />}
      {/* { page === 'Training' && <Training />} */}
      { page === 'Maxes' && <Maxes users={props.users} />}
      {/* { page === 'Programs' && <Programs />} */}
    </>
  )
}

export default Navbar