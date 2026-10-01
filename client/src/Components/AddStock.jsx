import React, { useState } from "react";
import { Container, TextField, MenuItem, Button, Typography, Paper, Box } from "@mui/material";
import axios from "axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const AddStock = () => {
    const [stock, setStock] = useState({ bloodGroup: "", units: "", collectionDate: "" });

    const handleChange = (e) => setStock({ ...stock, [e.target.name]: e.target.value });

    // Helper for formatted alerts
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, '-');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/add-stock", stock)
            .then(() => {
                alert(`Stock Added Successfully for ${formatDate(stock.collectionDate)}!`);
                setStock({ bloodGroup: "", units: "", collectionDate: "" });
            })
            .catch(err => alert("Error adding stock"));
    };

    return (
        <Box sx={{ minHeight: "100vh", pt: "120px", bgcolor: "#f8f9fa" }}>
            <Container>
                <Paper elevation={3} sx={{ p: 5, maxWidth: "500px", margin: "auto", borderRadius: "20px" }}>
                    <Typography variant="h4" sx={{ color: "#b71c1c", mb: 3, fontWeight: "bold", textAlign: 'center' }}>
                        Add Blood Stock
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField select fullWidth label="Blood Group" name="bloodGroup" value={stock.bloodGroup} onChange={handleChange} required sx={{ mb: 2 }}>
                            {bloodGroups.map(bg => <MenuItem key={bg} value={bg}>{bg}</MenuItem>)}
                        </TextField>
                        <TextField fullWidth type="number" label="Units (ml)" name="units" value={stock.units} onChange={handleChange} required sx={{ mb: 2 }} />
                        <TextField 
                            fullWidth 
                            type="date" 
                            label="Collection Date" 
                            name="collectionDate" 
                            value={stock.collectionDate} 
                            onChange={handleChange} 
                            required 
                            InputLabelProps={{ shrink: true }} 
                            sx={{ mb: 3 }} 
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, backgroundColor: '#b71c1c', fontWeight: 'bold' }}>
                            Add to Inventory
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};