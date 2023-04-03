import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Verifyemail from '../../../pages/Verifyemail';



function Userprivate() {
  let Logedin = useSelector((state) => state.auth.userdetails);
  console.log(Logedin);

  return (
    // if logedin is true && verified is true it will render the children otherwise it will check whether loged in true && verified is false it will render verifyemail page if both are false it will redirect to login
    Logedin?.verified === true ? (
      <Outlet />
    ) : Logedin?.verified === false ? (
      <Verifyemail />
    ) : (
      <Navigate to={'/login'}></Navigate>
    )
  );
}

export default Userprivate;
