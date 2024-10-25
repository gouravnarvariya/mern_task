import React from 'react'
import './App.css'
import { Route, Routes, useRoutes } from "react-router-dom";
import Login from './component/login/Login';
import Homepage from './component/homepage/Homepage';
import Singup from './component/signup/Singup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './component/utils/ProtectRoutes';
import Header from './component/common/Header';
const App = () => {

  const router = useRoutes([
     { path:'/login' , element:<Login/>},
     { path:'/signup' , element:<Singup/>},
     { path:'/*' , element: 
      <>
       <ProtectedRoute>
       <Header></Header>
      <Routes>
     

        <Route path='/' element = {<Homepage/>} />
      
      </Routes>
      </ProtectedRoute>
      </>
    }
  ])

  return (
    <div>{router}
     <ToastContainer />
    </div>
  )
}

export default App