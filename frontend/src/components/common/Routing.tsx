import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
const Loging = lazy(() => import('../../pages/userside/LoginPage'));
import Signup from '../../pages/userside/Signup';
import Adminlogin from '../../pages/adminside/Adminlogin';
import Adminprivate from '../adminside/Adminprivate';
import Userprivate from '../protectedauth/Userprotected';
import { RootState } from '../../store/Store';

function Routing() {
  let UserLogedin = useSelector(
    (state: RootState) => state.auth.Userisloggedin
  );
  let Adminlogedin = useSelector(
    (state: RootState) => state.auth.Adminisloggedin
  );
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* only logged in user can view the user private page page */}
          <Route element={<Userprivate />}>
            {/* 
             <Route  path="/verifyemail" element={  <Verifyemail />}></Route>
            <Route  path="/" element={<Home />}></Route>
            <Route
              path="/notifications"
              element={<Notification />}
            ></Route>
            <Route path="/setings/:id" element={<Setings />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
            <Route path="/profile/post/:id" element={<Profile />}></Route>

            <Route
              path="/profile/photos/:id"
              element={<Photos />}
            ></Route>

            <Route path="/chat" element={<Chat />}></Route>

            <Route path="/saved" element={<Savedpost />}></Route>
          </Route>
            */}
          </Route>

          {/* only logged in admin can view the adminpannel pages */}
          <Route element={<Adminprivate />}>
            {/* 
              <Route path="/admin/dashboard" element={<Admin />}></Route>
            <Route path="/postmanagement" element={<Postmanagement />}></Route>
            <Route path="/usermanagement" element={<Usermanagement />}></Route>
          */}
          </Route>

          {/* login & signup is rendered only if there is no user logged in */}
          <Route
            path="/login"
            element={
              !UserLogedin ? (
                <Suspense fallback={<div>Loading...</div>}>
                  <Loging />
                </Suspense>
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
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
