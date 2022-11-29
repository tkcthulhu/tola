import { useState, useEffect } from 'react';
import Home from '../Home/Home';
import Training from '../Training/Training';
import Maxes from '../Maxes/Maxes';
import Programs from '../Programs/Programs';

function Navbar(props) {

  let page = props.page

  let setPage = props.setPage

  function activeTab(id) {

    const tabs = ['Home', 'Training', 'Maxes', 'Programs']

    for (const tab of tabs) {
      document.getElementById(tab).classList.remove('active')
    }

    document.getElementById(id).classList.add('active')

  }

  useEffect(() => activeTab(page), [page])

  return(
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a 
            id='Home' 
            className="nav-link" 
            aria-current="page" 
            onClick={() => {
              setPage('Home');
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
              setPage('Training')
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
              setPage('Maxes')
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
              setPage('Programs')
            }}
            >
            Programs
          </a>
        </li>
      </ul>
      <div className="container" id='main-pages'>
        { page === 'Home' && <Home users={props.users} />}
        { page === 'Training' && <Training />}
        { page === 'Maxes' && <Maxes users={props.users} />}
        { page === 'Programs' && <Programs />}
      </div>
    </>
  )
}

export default Navbar