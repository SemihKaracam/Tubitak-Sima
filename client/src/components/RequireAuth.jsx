import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = ({ children,allowedRoles=["admin"] }) => {
    const { currentUser } = useSelector((state) => state.user)
    console.log(currentUser)
    return allowedRoles?.includes(currentUser?.role) ? children : <Navigate to={"/login"} state={{ from: location }} />
    // return allowedRoles?.includes(currentUser?.role) ? children : currentUser ? <Navigate to={"/unauthorized"} state={{ from: location }} /> : <Navigate to={"/login"} state={{ from: location }} />
    
}

export default RequireAuth