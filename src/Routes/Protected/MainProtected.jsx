import React from 'react'
import { Outlet } from 'react-router-dom';

function MainProtected() {
  return (
   <Outlet />
  )
}

export default MainProtected
