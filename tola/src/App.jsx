import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation } from "react-router-dom";

import './App.css';
import { useGlobalState } from './context/GlobalState';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';
import Training from './components/Training';
import Maxes from './components/Maxes/Maxes';
import Programs from './components/Programs';
import Coach from './components/Coach';
import CreateProgram from './components/CreateProgram';
import EditPrograms from './components/EditPrograms';
import EditProgramSessions from './components/EditProgramSessions';
import NewSession from './components/NewSession';

import { API_URL } from './services/auth.constants';

function App() {
  const [users, setUsers] = useState([]);
  const [ selected, setSelected ] = useState();
  const [show, setShow] = useState(false);
  const [showNewMax, setShowNewMax] = useState(false)

  const [ state, ] = useGlobalState();

  let location = useLocation();

  let id = ''

  if (state.currentUser) {
    id = state.currentUser.user_id
  } 

  useEffect(() => {
    axios.get(`${API_URL}/api/usersAPI/${id}`, {
      "headers": {
          "Authorization": `Bearer ${state.currentUserToken}`
      }})
      .then((resp) => setUsers(resp.data));
  }, [show, showNewMax, location ])

  return (      
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/user/" element={<Header users={users} />}>
          <Route path="dashboard" element={<Dashboard users={users}/>} />
          <Route path="training" element={<Training users={users}/>} />
          <Route path="maxes" element={<Maxes users={users} show={show} setShow={setShow} showNewMax={showNewMax} setShowNewMax={setShowNewMax} />} />
          <Route path="programs" element={<Programs users={users}/>}/>
          <Route path="profile" element={<Profile users={users} show={show} setShow={setShow}/>} />
          <Route path="settings" element={<Settings users={users}/>} />
          <Route path="/user/coach/" element={<Coach/>}/>
          <Route path='newprogram' element={<CreateProgram/>}/>
          <Route path='editprograms' element={<EditPrograms selected={selected} setSelected={setSelected}/>}/>
          <Route path="editprogramsessions" element={<EditProgramSessions selected={selected} setSelected={setSelected}/>}/>
          <Route path="newsession" element={<NewSession selected={selected} setSelected={setSelected}/>}/>
        </Route>
      </Routes>
  );
}

export default App;
