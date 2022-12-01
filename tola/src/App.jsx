import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation } from "react-router-dom";

import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';
import Training from './components/Training';
import Maxes from './components/Maxes/Maxes';
import Programs from './components/Programs';

function App() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showNewMax, setShowNewMax] = useState(false)

  let location = useLocation();

  let id = 4

  useEffect(() => {
    axios.get(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/usersAPI/${id}`)
      .then((resp) => setUsers(resp.data));
  }, [show, showNewMax, location, id])

  return (
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/tola/" element={<Header users={users} />}>
          <Route path="dashboard" element={<Dashboard users={users}/>} />
          <Route path="training" element={<Training />} />
          <Route path="maxes" element={<Maxes users={users} show={show} setShow={setShow} showNewMax={showNewMax} setShowNewMax={setShowNewMax} />} />
          <Route path="programs" element={<Programs />} />
          <Route path="profile" element={<Profile users={users}/>} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
  );
}

export default App;
