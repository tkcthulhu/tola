import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Header from './components/Header';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Home from './components/Home';
import Training from './components/Training';
import Maxes from './components/Maxes/Maxes';
import Programs from './components/Programs';

function App() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showNewMax, setShowNewMax] = useState(false)
  const [units, setUnits] = useState([]);
  let id = 2

  useEffect(() => {
    axios.get(`https://8000-tkcthulhu-tolaapi-g6ziba3two5.ws-us77.gitpod.io/api/usersAPI/${id}`)
      .then((resp) => setUsers(resp.data));
  }, [show])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header users={users} />}>
            <Route path="" element={<Home />} />
            <Route path="training" element={<Training />} />
            <Route path="maxes" element={<Maxes users={users} show={show} setShow={setShow} showNewMax={showNewMax} setShowNewMax={setShowNewMax} />} />
            <Route path="programs" element={<Programs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
