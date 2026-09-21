import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function MainProtected() {
  let {isAuthenticated,user }= useSelector((store)=> store.auth);
  if (!isAuthenticated) {
    return <Navigate to="/"/>
  }
  return (
   <Outlet />
  )
}

export default MainProtected
