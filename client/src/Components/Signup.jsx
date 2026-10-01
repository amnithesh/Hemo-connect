import React, { useState } from "react";
import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/signup", formData)
            .then(() => {
                alert("Admin Registered Successfully!");
                navigate("/login");
            })
            .catch(err => alert(err.response?.data?.error || "Signup failed"));
    };

    return (
        <Box sx={{ 
            minHeight: "100vh", 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'linear-gradient(135deg, #b71c1c 0%, #4a0000 100%)',
            width: '100vw'
        }}>
            <Paper elevation={15} sx={{ 
                width: '100%', 
                maxWidth: '420px', 
                padding: "3.5rem 2.5rem", 
                borderRadius: "2rem", 
                textAlign: 'center',
                mx: 2
            }}>
                <Typography variant="h4" sx={{ fontWeight: "900", color: "#b71c1c", mb: 1 }}>
                    ADMIN SIGNUP
                </Typography>
                {/* <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                    Create an administrative account to manage life-saving donations.
                </Typography> */}

                <form onSubmit={handleSignup}>
                    <TextField 
                        fullWidth 
                        label="Full Name" 
                        name="name"
                        variant="outlined"
                        onChange={handleChange} 
                        required 
                        sx={{ mb: 2.5 }}
                    />
                    <TextField 
                        fullWidth 
                        label="Email Address" 
                        name="email"
                        type="email"
                        variant="outlined"
                        onChange={handleChange} 
                        required 
                        sx={{ mb: 2.5 }}
                    />
                    <TextField 
                        fullWidth 
                        label="Password" 
                        name="password"
                        type="password" 
                        variant="outlined"
                        onChange={handleChange} 
                        required 
                        sx={{ mb: 4 }}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        sx={{ 
                            py: 1.8, 
                            backgroundColor: '#b71c1c', 
                            fontWeight: 'bold', 
                            fontSize: '1rem', 
                            borderRadius: '50px', 
                            '&:hover': { backgroundColor: '#8e1616', transform: 'scale(1.02)' },
                            transition: '0.3s'
                        }}
                    >
                        Register Account
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};