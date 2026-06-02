import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Joblisting from './pages/Joblisting.jsx'
import Jobdetails from './pages/Jobdetails.jsx'
import Applyjob from './pages/Applyjob.jsx'
import Candidatedashboard from './pages/Candidatedashboard.jsx'
import Recruiterdashboard from './pages/Recruiterdashboard.jsx'
import Createjob from './pages/Createjob.jsx'
import Applicantspage from './pages/Applicantspage.jsx'
import SuperAdminDashboard from './pages/Superadmindashboard.jsx'








createRoot(document.getElementById('root')).render(
  <>


    <BrowserRouter>
      <App />
    </BrowserRouter>


    {/* <Login /> */}
    {/* <Signup /> */}
    {/* <Home /> */}
    {/* <Joblisting /> */}
    {/* <Jobdetails /> */}
    {/* <Applyjob /> */}
    {/* <Candidatedashboard /> */}
    {/* <Recruiterdashboard /> */}
    {/* <Createjob /> */}
    {/* <Applicantspage /> */}
    {/* <SuperAdminDashboard /> */}











  </>,
)



// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass