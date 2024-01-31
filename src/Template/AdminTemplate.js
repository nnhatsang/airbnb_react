import React from 'react'
import PrivateRoute from './PrivateRoute'
import { Outlet } from 'react-router-dom'

const AdminTemplate = () => {
  return (
    <PrivateRoute>
      <Outlet/>
    </PrivateRoute>
  )
}

export default AdminTemplate