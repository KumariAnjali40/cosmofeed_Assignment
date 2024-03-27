import React from 'react'
import ReactDOM from "react-dom/client";
import Signup from './Signup';
import Login from './Login';
const NavBar = () => {
  return (
    <div>
        <Link to="Signup">Signup</Link>
        <Link to="Login">Login</Link>
    </div>
  )
}

export default NavBar