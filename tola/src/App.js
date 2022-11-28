import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './Navbar';
import Header from './Header';

function AppInfo() {

  const [users, setUsers] = useState([])

  let id = 4
  
  useEffect(() => {
    axios.get(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/usersAPI/${id}`)
    .then((resp) => setUsers(resp.data));
  }, [])

  return (
    <>
      <Header users={users}/>
      <Navbar users={users}/>
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
