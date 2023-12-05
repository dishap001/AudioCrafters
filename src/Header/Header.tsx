import { Link } from "react-router-dom"

function Header() {
  return (
   <>
   <div className="Header">
   <nav>
        <ul className="Menu"><li><Link to='/'>Home</Link></li></ul>
    </nav>
    <ul className="UserRegistration" >
                <li><Link to='/SignUp'>Sign up</Link></li>
                <li><Link to='/SignIn'>Sign In</Link></li>
     </ul>
   </div>
   
   </>
  )
}

export default Header