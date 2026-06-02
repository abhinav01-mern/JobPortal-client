import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Style/global.css'
import{ Routes,Route } from 'react-router-dom'
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
import Superadmindashboard from './pages/Superadmindashboard.jsx'
import Profile from './pages/Profile.jsx'
import EditJob from "./pages/EditJob";



function App() {

  return (
  <>


     <Routes>

  <Route>
    <Route path='/' element={<Login/>}/>
    <Route path='/Signup' element={<Signup/>}/>
  </Route>


   
    <Route path='/Home' element={<Home/>}/>
    <Route path='/Joblisting' element={<Joblisting/>}/>
    <Route path='/Jobdetails/:id' element={<Jobdetails/>}/>
    <Route path='/Applyjob/:id' element={<Applyjob/>}/>
    <Route path='/Profile' element={<Profile/>}/>
    <Route path='/Candidatedashboard' element={<Candidatedashboard/>}/>



     <Route path='/Recruiterdashboard' element={<Recruiterdashboard/>}/>
     <Route path='/Createjob' element={<Createjob/>}/>
     <Route path='/Applicantspage' element={<Applicantspage/>}/>
     <Route path="/editjob/:id" element={<EditJob />}/>



     <Route path='/Superadmindashboard' element={<Superadmindashboard/>}/>

     


    </Routes>

  </>
  )
}

export default App
