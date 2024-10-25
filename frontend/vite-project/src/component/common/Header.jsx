import React from 'react'
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { logout } from '../store/slices/userSlice';
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div className='header'>
    <button className='w-10' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Header