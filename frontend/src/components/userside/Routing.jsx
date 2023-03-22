import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import About from '../../pages/userside/About';
import Admin from '../../pages/adminside/Admin';
import Friends from '../../pages/userside/Friends';
import Home from '../../pages/userside/Home';
import Loging from '../../pages/userside/Loging';
import Notification from '../../pages/userside/Notification';
import Photos from '../../pages/userside/Photos';
import Postmanagement from '../../pages/adminside/Postmanagement';
import Profile from '../../pages/userside/Profile';
import Savedpost from '../../pages/userside/Savedpost';
import Setings from '../../pages/userside/Setings';
import Signup from '../../pages/userside/Signup';
import Verify from '../../pages/userside/Verify';
import Verifyemail from '../../pages/userside/Verifyemail';
import Chat from '../../components/userside/chat/Chat';
import Mobchat from '../../components/userside/chat/Mobchat';
import Userprivate from './Protectedcomponents/Userprivate';
import Usermanagement from '../../pages/adminside/Usermanagement';
import Adminlogin from '../../pages/adminside/Adminlogin';
import Adminprivate from '../adminside/Adminprivate';

function Routing() {
  let UserLogedin = useSelector((state) => state.auth.Userisloggedin);
  let Adminlogedin = useSelector((state) => state.auth.Adminisloggedin);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/s" element={<Verify />}></Route>

          {/* only logged in user can view the user private page page */}
          <Route element={<Userprivate />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/notifications" element={<Notification />}></Route>
            <Route path="/setings/:id" element={<Setings />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
            <Route path="/profile/post/:id" element={<Profile />}></Route>
            <Route path="/profile/about/:id" element={<About />}></Route>
            <Route path="/profile/photos/:id" element={<Photos />}></Route>
            <Route path="/verifyemail" element={  <Verifyemail />}></Route>
            <Route path="/ismobile" element={<Mobchat />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/profile/friends/:id" element={<Friends />}></Route>
            <Route path="/saved" element={<Savedpost />}></Route>
          </Route>

          {/* only logged in admin can view the adminpannel pages */}
          <Route element={<Adminprivate />}>
            <Route path="/admin/dashboard" element={<Admin />}></Route>
            <Route path="/postmanagement" element={<Postmanagement />}></Route>
            <Route path="/usermanagement" element={<Usermanagement />}></Route>
          </Route>

          {/* login & signup is rendered only if there is no user logged in */}
          <Route
            path="/login"
            element={!UserLogedin ? <Loging /> : <Navigate replace to="/" />}
          ></Route>
          <Route
            path="/signup"
            element={!UserLogedin ? <Signup /> : <Navigate replace to="/" />}
          ></Route>
          <Route
            path="/admin/adminlogin"
            element={
              !Adminlogedin ? (
                <Adminlogin />
              ) : (
                <Navigate replace to="/admin/dashboard" />
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
