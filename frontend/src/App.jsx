
import React, { useEffect } from 'react'
import { BrowserRouter, data, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { getMe } from './features/getMe';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/userSlice';
import Home from './pages/Home';


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
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
