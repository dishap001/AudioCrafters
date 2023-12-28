/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// AuthContext.tsx
import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
 
interface AuthContextProps {
  children: ReactNode;
}
 
interface AuthState {
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
 
}
 
interface AuthContextType extends AuthState {
  SignIn: (user: any) => void;
  SignOut: () => void;
}
 
const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
 const[signedIn,setSignedIn] = useState(false);
 useEffect(() => {
    const storedUser = localStorage.getItem('isSignIn');
    setSignedIn(!!(storedUser && JSON.parse(storedUser)));
   
  }, []);
  
  const SignIn = (user: any) => {
    console.log('Signing in:', user);
    localStorage.setItem('isSignIn', JSON.stringify(user));
    setSignedIn(true);
  };
  
 
  const SignOut = () => {
    console.log('Signing out');
    localStorage.removeItem('isSignIn');
    setSignedIn(false);
  };
  
  const authContextValue: AuthContextType = {


    signedIn,
    SignIn,
    SignOut,
    setSignedIn,
 
  };
 
  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
 
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


