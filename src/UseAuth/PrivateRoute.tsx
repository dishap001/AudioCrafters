import React from 'react';
// import {  Navigate} from 'react-router-dom';
import { useAuth } from './AuthContext';
import SignIn from '../UserRegistration/SignIn';
 
interface PrivateRouteProps {
  path: string;
  children?: React.ReactNode;
}
 
const PrivateRoute: React.FC<PrivateRouteProps> = ({  children }) => {
    const { signedIn } = useAuth();
  
    return signedIn ? <>{children}</> : <SignIn/>;
    
  };
  
 
export default PrivateRoute;