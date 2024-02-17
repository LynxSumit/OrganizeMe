
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Checklist} from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.Context';
import { useContext, useState } from 'react';
import axios from 'axios';
import { server } from '../main';
// import { toast } from 'react-hot-toast';
import  { toast} from "react-toastify"
import Logo from "../assets/checklist.png"

function Header() {
    const {isAuthenticated , setIsAuthenticated} = useContext(UserContext)
    const navigate = useNavigate()
  
const logoutHandler = async () =>{
try {
  await axios.get(`${server}/users/logout`,{
    withCredentials : true
  })
  toast.success("Logged out successfully", {position : "bottom-center"})
  navigate("/login")
  setIsAuthenticated(false)
} catch (error) {
  console.log(error)
  toast.error(error.message, {position : "bottom-center"})
  setIsAuthenticated(true)
}
}
    



  return (
    <div className="navbar bg-gray-500">
  <div className="flex-1">
    <a className="btn btn-ghost   bg-slate-300 backdrop-filter text-gray-800 text-xl">Organize Me</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search your task here..." className="input input-bordered placeholder:text-sm  w-28 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={Logo} />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <Link to={"/profile"} className="justify-between">
            Profile
            
          </Link>
        </li>
        <li><Link to={"/"}>Home</Link></li>
        <li>
          <Link to={"/analytics"} className="justify-between">
            Analytics
            <span className="badge badge-success" >New</span>
          </Link>
        </li>
        {
   isAuthenticated &&
        <li><Link to={"/login" } onClick={logoutHandler}>Logout</Link></li>
     
        }
      </ul>
    </div>
  </div>
</div>
  );
}
export default Header;



