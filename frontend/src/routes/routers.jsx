import Contact from '../pages/contact'
import Home from '../pages/home'
import Login from '../pages/login'
import Services from '../pages/services'
import Signup from '../pages/signup'
import Doctors from '../pages/doctors/doctors'
import DoctorDetails from '../pages/doctors/doctor-details'
import MyAccount from '../dashboard/user-account/myAccount'
import Dashboard from '../dashboard/doctor-account/dashboard'

import {Routes, Route} from 'react-router-dom'
import ProtectedRoutes from './protectedRoutes'

const Routers = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/doctors' element={<Doctors/>} />
      <Route path='/doctors/:id' element={<DoctorDetails/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/services' element={<Services/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/users/profile/me' element={<ProtectedRoutes allowedRoutes={['patient']}><MyAccount/></ProtectedRoutes> } />
      <Route path='/doctors/profile/me' element={<ProtectedRoutes allowedRoutes={['doctor']}><Dashboard/></ProtectedRoutes>} />
    </Routes>
    </>
  )
}

export default Routers
