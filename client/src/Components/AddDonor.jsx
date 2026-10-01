import React, { useState } from "react";
import { Container, TextField, MenuItem, Button, Typography, Paper, Box } from "@mui/material";
import axios from "axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const AddDonor = () => {
    const [donor, setDonor] = useState({ name: "", email: "", phoneNumber: "", bloodGroup: "", district: "", address: "" });

    const handleChange = (e) => setDonor({ ...donor, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/add-donor", donor)
            .then(() => {
                alert("Donor Saved Successfully!");
                setDonor({ name: "", email: "", phoneNumber: "", bloodGroup: "", district: "", address: "" });
            })
            .catch(err => alert(err.response?.data?.error || "Error adding donor"));
    };

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa", pt: "100px", pb: "50px" }}>
            <Container>
                <Paper elevation={0} sx={{ p: 5, maxWidth: "600px", margin: "auto", borderRadius: "20px", border: '1px solid #e0e0e0' }}>
                    <Typography variant="h4" align="center" sx={{ mb: 1, fontWeight: "900", color: "#b71c1c" }}>Register Donor</Typography>
                    <Typography variant="body2" align="center" sx={{ mb: 4, color: 'text.secondary' }}>Enter official donor details to the central database</Typography>
                    
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth label="Full Name" name="name" value={donor.name} onChange={handleChange} required sx={{ mb: 2 }} />
                        <TextField fullWidth label="Email Address" name="email" value={donor.email} onChange={handleChange} required sx={{ mb: 2 }} />
                        <TextField fullWidth label="Phone Number" name="phoneNumber" value={donor.phoneNumber} onChange={handleChange} required sx={{ mb: 2 }} />
                        <TextField select fullWidth label="Blood Group" name="bloodGroup" value={donor.bloodGroup} onChange={handleChange} required sx={{ mb: 2 }}>
                            {bloodGroups.map(bg => <MenuItem key={bg} value={bg}>{bg}</MenuItem>)}
                        </TextField>
                        <TextField fullWidth label="District" name="district" value={donor.district} onChange={handleChange} required sx={{ mb: 2 }} />
                        <TextField fullWidth multiline rows={3} label="Current Address" name="address" value={donor.address} onChange={handleChange} required sx={{ mb: 3 }} />
                        <Button type="submit" variant="contained" fullWidth sx={{ py: 2, backgroundColor: '#b71c1c', fontWeight: 'bold', borderRadius: '10px', '&:hover': { backgroundColor: '#8e1616' } }}>
                            Submit Record
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};