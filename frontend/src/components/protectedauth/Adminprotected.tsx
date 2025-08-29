import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

function Adminprivate() {
   
    const AdminLoggedin = useSelector((state)=>state.auth.Adminisloggedin)
  return (
   AdminLoggedin ? <Outlet/> : <Navigate to={'/admin/adminlogin'}></Navigate>
  )
}

export default Adminprivate