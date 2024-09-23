import {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../context/authContext'


const ProtectedRoutes = ({children, allowedRoutes}) => {
  const {token, role} = useContext(authContext)
  const isAllowed = allowedRoutes.includes(role)
  const accessibleRoute = token && isAllowed ? children : <Navigate to='/login' replace={true}/>
  
  return accessibleRoute;
}

export default ProtectedRoutes
