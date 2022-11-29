import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import settings_button from './img/settings_button.png'
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';

function AppInfo() {

  const [users, setUsers] = useState([])
  const [page, setPage] = useState('Home');
  const [units, setUnits] = useState([])

  let id = 4
  
  useEffect(() => {
    axios.get(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/usersAPI/${id}`)
    .then((resp) => setUsers(resp.data));
  }, [])

  return (
    <>
      <Header users={users} page={page} setPage={setPage}/>
      { page === 'Profile' && <Profile users={users} />}
      { page === 'Settings' && <Settings users={users} />}
      { page === 'Home' && <Navbar users={users} page={page} setPage={setPage}/>}
      { page === 'Training' && <Navbar users={users} page={page} setPage={setPage}/>}
      { page === 'Maxes' && <Navbar users={users} page={page} setPage={setPage}/>}
      { page === 'Programs' && <Navbar users={users} page={page} setPage={setPage}/>}
      <img 
        src={settings_button} 
        alt="settings" 
        id='settings-button'
        onClick={() => {
          setPage('Settings');
        }}
      />
    </>
  )
}

function App() {
  return (
    <>
      <AppInfo/>
    </>
  );
}

export default App;
