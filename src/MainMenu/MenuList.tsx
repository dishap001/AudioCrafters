/* eslint-disable react-hooks/exhaustive-deps */

import './LeftMenu.css';
import {BsFillHouseFill } from 'react-icons/bs';
import {FaMicrophoneAlt, FaPodcast,FaSignInAlt,FaSignOutAlt} from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../UseAuth/AuthContext";
import { useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import { useEffect } from 'react';


const MenuList = ( ) => {
  const { SignOut,signedIn ,setSignedIn} =useAuth();
//  const navigate=useNavigate();
  const handleSignOut =()=>{
    SignOut();

  }
  const checkSignedIn = () => {
    console.log('Checking signed in state');
    // const storedUser = localStorage.getItem('isSignIn');
    // setSignedIn(!!storedUser);
  };
  useEffect(()=>{
    const storedUser = localStorage.getItem('isSignIn');
  if (storedUser && !signedIn) {
    console.log('Signing in:', JSON.parse(storedUser));
    setSignedIn(true);
  }
    checkSignedIn();
  },[signedIn]);
  console.log('render menulist')
  return (
    <div className="menuContainer">
      <p className="title">Menu</p>
      <ul>
        <li>
          <a href="/Home1">
            <i><BsFillHouseFill/></i>
            <span>{"Home"}</span>
          </a>
        </li>
        
        <li>
          <a href="/ForArtists">
            <i><FaMicrophoneAlt/></i>
            <span>{"For Artist"}</span>
          </a>
        </li>
         
        <li>
          <a href="/ForListeners">
            <i><FaPodcast/></i>
            <span>{"For Listeners"}</span>
          </a>
        </li>
        {!signedIn && (
        <li>
          <a href="/SignUp">
            <i><CgProfile /></i>
            <span>{"Sign Up"}</span>
          </a>
        </li>)}
        {!signedIn && (
        <li>
          <a href="/SignIn">
            <i><FaSignInAlt /></i>
            <span>{"Sign In"}</span>
          </a>
        </li>
        )}
        {signedIn && (
          <li>
            <a href="/Home1">
              <i><FaSignOutAlt /></i>
              <span onClick={handleSignOut}>{"Sign Out"}</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MenuList;
