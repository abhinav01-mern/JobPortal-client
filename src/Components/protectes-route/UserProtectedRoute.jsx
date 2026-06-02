import React from 'react'
import UserLayout from '../layout/UserLayout'
import { Outlet } from 'react-router-dom'

const UserProtectedRoute = () => {
  return (
    <UserLayout>
        <Outlet/>
    </UserLayout>
  )
}

export default UserProtectedRoute