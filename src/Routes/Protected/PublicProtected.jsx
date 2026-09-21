import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicProtected() {
  let {isAuthenticated,user }= useSelector((store)=> store.auth);
  if (isAuthenticated) {
    return <Navigate to="/main"/>
  }
  return (
    
    <div>
      <Outlet/>
    </div>
  )
}
