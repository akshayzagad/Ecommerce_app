import React from 'react'
import { Outlet } from 'react-router-dom';

export default function PublicProtected() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}
