import React from "react";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post("http://localhost:3001/logout")
        .then(() => {
            localStorage.removeItem("userName"); // Clear user data
            navigate("/login");
            window.location.reload(); // Refresh to update Navbar state
        })
        .catch(err => {
            localStorage.removeItem("userName");
            navigate("/login");
            window.location.reload();
        });
  };

  return (
    <Button 
      variant="contained" 
      color="error" 
      onClick={handleLogout}
      sx={{ marginRight: '20px', fontSize: '1.2rem', fontWeight: '700' }}
    >
      Logout
    </Button>
  );
};