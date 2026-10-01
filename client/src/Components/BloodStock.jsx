import React, { useEffect, useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Chip } from "@mui/material";
import axios from "axios";

export const BloodStock = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/inventory")
            .then(res => setInventory(res.data))
            .catch(err => console.log(err));
    }, []);

    // Helper function to format date as DD-MMM-YYYY
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, '-'); // Replaces spaces with dashes
    };

    const getStatusColor = (status) => {
        if (status === 'Available') return 'success';
        if (status === 'Expired') return 'error';
        return 'default';
    };

    return (
        <Box sx={{ minHeight: "100vh", pt: "120px", pb: "50px", bgcolor: '#fdfdfd' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" sx={{ color: "#b71c1c", mb: 4, fontWeight: "900", textAlign: 'center' }}>
                    Live Blood Inventory
                </Typography>
                
                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '15px' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: '#b71c1c' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Blood Group</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Units (ml)</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Collection Date</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Expiry Date</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inventory.map((item) => (
                                <TableRow key={item._id} hover>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{item.bloodGroup}</TableCell>
                                    <TableCell>{item.units} ml</TableCell>
                                    {/* Updated Date Formatting */}
                                    <TableCell>{formatDate(item.collectionDate)}</TableCell>
                                    <TableCell sx={{ color: item.status === 'Expired' ? 'red' : 'inherit', fontWeight: '500' }}>
                                        {formatDate(item.expiryDate)}
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={item.status} color={getStatusColor(item.status)} variant="filled" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};