import './LeftMenu.css'
import logo from '../assets/logo.svg'


import MenuList from './MenuList'

const LeftMenu =() => {
 

  return (
   <div className='leftMenu'>
      <div className="logoContainer"> 
      <img
          alt="Logo"
          src={logo}
          width="200"
          height="50"
          className="d-inline-block align-top"
        /> 
      </div>
     
      <MenuList />
     
     
   </div>
  );
}

export default LeftMenu