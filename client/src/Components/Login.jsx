import React, { useState } from "react";
import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", { email, password })
            .then(res => {
                if (res.data.status === "Success") { 
                    localStorage.setItem("userName", res.data.name);
                    navigate("/home");
                    window.location.reload();
                }
            })
            .catch(err => alert(err.response?.data || "Login failed"));
    };

    return (
        <Box sx={{ minHeight: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #b71c1c 0%, #4a0000 100%)' }}>
            <Paper elevation={10} sx={{ width: '100%', maxWidth: '400px', padding: "3rem", borderRadius: "1.5rem", textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: "800", color: "#b71c1c", mb: 1 }}>Admin Login</Typography>
                {/* <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>Welcome back to the Blood Management Portal</Typography> */}
                <form onSubmit={handleLogin}>
                    <TextField fullWidth label="Email Address" onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }} variant="outlined" />
                    <TextField fullWidth label="Password" type="password" onChange={(e) => setPassword(e.target.value)} required sx={{ mb: 4 }} variant="outlined" />
                    <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, backgroundColor: '#b71c1c', fontWeight: 'bold', fontSize: '1rem', borderRadius: '50px', '&:hover': { backgroundColor: '#8e1616' } }}>
                        Secure Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};