import React from 'react'
import Navbar from '../component/Navbar.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout
