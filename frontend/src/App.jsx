
import { signInWithPopup } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth, googleProvider } from '../firebase';
import axios from 'axios';
import { BrowserRouter, data, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { getMe } from './features/getMe';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/userSlice';

const App = () => {
   const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
     const user =  await getMe();
       dispatch(setUserData(user));
    }

    fetch();
  },[]);





  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
