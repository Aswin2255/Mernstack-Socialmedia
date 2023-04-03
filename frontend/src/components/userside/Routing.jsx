import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Admin from '../../pages/adminside/Admin';
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
import Chat from '../../components/userside/chat/Chat';
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
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/notifications"
              element={<Notification />}
            ></Route>
            <Route exact path="/setings/:id" element={<Setings />}></Route>
            <Route exact path="/profile/:id" element={<Profile />}></Route>
            <Route exact path="/profile/post/:id" element={<Profile />}></Route>

            <Route
              exact
              path="/profile/photos/:id"
              element={<Photos />}
            ></Route>

            <Route exact path="/chat" element={<Chat />}></Route>

            <Route exact path="/saved" element={<Savedpost />}></Route>
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
