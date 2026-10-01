import React from 'react';
import { AppBar, Typography, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Logout } from './Logout';

export const Navbar = () => {
  const buttonStyle = { 
    marginRight: '15px', 
    fontSize: '0.85rem', 
    fontWeight: '600', 
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    textTransform: 'none' 
  };
  
  const isLoggedIn = !!localStorage.getItem("userName");

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#b71c1c', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h5" 
          component={Link} 
          to="/home" 
          sx={{ color: 'white', textDecoration: 'none', fontWeight: '900', letterSpacing: '0.5px' }}
        >
          HEMO<span style={{ fontWeight: '300', opacity: 0.8 }}>CONNECT</span>
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isLoggedIn ? (
            <>
              <Button color='inherit' sx={buttonStyle} component={Link} to='/login'>Login</Button>
              <Button sx={{ ...buttonStyle, backgroundColor: 'white', color: '#b71c1c', '&:hover': { backgroundColor: '#f5f5f5' } }} variant='contained' component={Link} to='/signup'>Signup</Button>
            </>
          ) : (
            <>
              <Button color='inherit' component={Link} to='/home' sx={buttonStyle}>Home</Button>
              <Button color='inherit' component={Link} to='/search' sx={buttonStyle}>Find Donors</Button>
              <Button color='inherit' component={Link} to='/add-donor' sx={buttonStyle}>Add Donor</Button>
              
              {/* STOCK MANAGEMENT LINKS */}
              <Button color='inherit' component={Link} to='/stock' sx={buttonStyle}>Blood Stock</Button>
              <Button color='inherit' component={Link} to='/add-stock' sx={buttonStyle}>Update Stock</Button>
              
              <Logout /> 
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};