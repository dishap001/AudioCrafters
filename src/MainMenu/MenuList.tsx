import { useNavigate } from "react-router-dom";
import './LeftMenu.css';
import { useEffect, useState } from "react";
import {BsFillHouseFill } from 'react-icons/bs';
import {FaMicrophoneAlt, FaPodcast} from 'react-icons/fa';
import { FaSignInAlt,FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


const MenuList = ( ) => {
 
  const [signedIn, setSignedIn] = useState(false);
 
  const navigate = useNavigate();
  const checkSignIn = async () => {
    const storedUser = localStorage.getItem("isSignIn") || ''; // Use empty string as default
    console.log('Stored user:', storedUser);
    setSignedIn(!!storedUser);
    console.log('Stored user in useEffect:', storedUser); // Access it here if needed
  };
  
  useEffect(() => {
    checkSignIn();
  }, []);
  
  const handleSignOutClick = () => {
   localStorage.removeItem("isSignIn");

    navigate("/");
  };

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
        {signedIn && (
        <li>
          <a href="/ForArtists">
            <i><FaMicrophoneAlt/></i>
            <span>{"For Artist"}</span>
          </a>
        </li>
         )}
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
        </li>)}
        {signedIn && (
          <li>
            <a href="/Home1">
              <i><FaSignOutAlt /></i>
              <span onClick={handleSignOutClick}>{"Sign Out"}</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MenuList;
