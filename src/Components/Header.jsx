
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
import { toast } from 'react-hot-toast';



function Header() {
    const {isAuthenticated , setIsAuthenticated} = useContext(UserContext)
    const navigate = useNavigate()
  
const logoutHandler = async () =>{
try {
  await axios.get(`${server}/users/logout`,{
    withCredentials : true
  })
  navigate("/login")
  toast.success("Logged out successfully")
  setIsAuthenticated(false)
} catch (error) {
  console.log(error)
  toast.error(error.message)
  setIsAuthenticated(true)
}
}
    
    
  const [anchorElNav, setAnchorElNav] =useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" >
      <Container  sx={{bgcolor : 'text.secondary', height: '5rem' , alignItems : 'center', display : 'flex' , }} maxWidth="xl">
        <Toolbar  disableGutters>
          <Checklist sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
        
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              marginRight : 5
            }}
          >
         OrganizeMe
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                bgcolor : 'rgba(0,0,0,0.5)',
                
              }}
             
             
            >
            
                <MenuItem  onClick={handleCloseNavMenu}>
                <Link  style={{textDecoration : 'none', color: 'text.primary'}} to="/" >Home</Link>
                </MenuItem>
                {isAuthenticated &&
                <MenuItem onClick={handleCloseNavMenu}>

           <Link  aria-disabled={isAuthenticated} style={{textDecoration : 'none', color: 'text.primary'}}  to="/profile" >Profile</Link>

                </MenuItem>
                }
                {
isAuthenticated ? 
                <MenuItem onClick={handleCloseNavMenu}>

              <Link onClick={logoutHandler}  style={{textDecoration : 'none', color: 'text.primary'}}  >   Logout</Link> 

                </MenuItem>
   : <MenuItem onClick={handleCloseNavMenu}>
   <Link   style={{textDecoration : 'none', color: 'text.primary'}}  to="/login" >Login</Link>
   </MenuItem>
  

                }
             
            </Menu>
          </Box>
          
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              alignItems : 'center',
              gap : 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
           marginLeft : '3rem',
              textDecoration: 'none',
            }}
          >
            OrganizeMe  <Checklist sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '20px',  }}>
         
                <Link  style={{textDecoration : 'none', color: 'white'}} to="/" ><Typography>Home</Typography></Link>
              {isAuthenticated &&  <Link disabled={isAuthenticated}   style={{textDecoration : 'none', color: 'white'}}  to="/profile" ><Typography>Profile</Typography></Link> }
                  {
isAuthenticated ? 
             
              <Link   style={{textDecoration : 'none', color: 'white', alignSelf : 'flex-end'}}  onClick={logoutHandler}>

                <Typography>Logout</Typography>
              </Link>     
   : 
   <Link   style={{textDecoration : 'none', color: 'white'}}  to="/login" ><Typography>Login</Typography></Link>
   
  

                }
          </Box>

    
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;