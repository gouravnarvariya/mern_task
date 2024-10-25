import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    console.log("protected")
    const check = localStorage.getItem('token')
    console.log("check", check)
    if(!check) {
     return <Navigate to={'/login'}/>
    }
  return (
    <>
    {children}
</>
  )
}

export default ProtectedRoute