import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Loging from './pages/home/Loging';
import Signup from './pages/home/Signup';
import Friends from './pages/home/Friends';
import Chat from './components/appcomponents/chat/Chat';
import Mobchat from './components/appcomponents/chat/Mobchat';
import Admin from './pages/home/Admin'
import Postmanagement from './pages/home/Postmanagement';
import Savedpost from './pages/home/Savedpost';
import Notification from './pages/home/Notification';
import Setings from './pages/home/Setings';
import Profile from './pages/home/Profile';
import Post from './components/appcomponents/Post';
import About from './pages/home/About';
import Photos from './pages/home/Photos';
import Verifyemail from './pages/home/Verifyemail';


function App() {
  
  return (
    <div>
      <BrowserRouter>
                <Routes>
                    
                   <Route path='/admin' element={<Admin/>}></Route>
                   <Route path='/ismobile' element={<Mobchat/>}></Route>
                   <Route path='/chat' element={<Chat/>}></Route>
                    <Route path='/profile/friends' element={<Friends/>}></Route>
                    <Route path='/'element={  <Home /> }></Route>
                    <Route path='/login' element={<Loging />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/postmanagement' element={<Postmanagement />}></Route>
                    <Route path='/saved' element={<Savedpost/>}></Route>
                    <Route path='/notifications' element = {<Notification/>}></Route>
                    <Route path='/setings' element = {<Setings/>}></Route>
                    <Route path='/profile' element = {<Profile/>}></Route>
                    <Route path='/profile/post' element = {<Profile/>}></Route>
                    <Route path='/profile/about' element = {<About/>}></Route>
                    <Route path='/profile/photos' element = {<Photos/>}></Route>
                    <Route path='/verifyemail' element = {<Verifyemail/>}></Route>
                </Routes>

            </BrowserRouter>
  
     
      
    </div>
  )
}

export default App


