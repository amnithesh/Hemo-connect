import React, { useState } from "react";
import { Container, TextField, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";
import axios from "axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const SearchDonors = () => {
    const [donors, setDonors] = useState([]);
    const [bloodGroup, setBloodGroup] = useState("");

    const handleSearch = () => {
        axios.get("http://localhost:3001/search-donors", { params: { bloodGroup } })
            .then(res => setDonors(res.data))
            .catch(err => alert("Error fetching donor data."));
    };

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#fdfdfd", pt: "120px", pb: "50px" }}>
            <Container maxWidth="lg">
                <Typography variant="h3" sx={{ color: "#b71c1c", mb: 4, fontWeight: "900", textAlign: 'center' }}>
                    Find Life-Saving Donors
                </Typography>
                
                <Paper elevation={0} sx={{ p: 4, mb: 5, display: 'flex', gap: 2, alignItems: 'center', borderRadius: '15px', border: '1px solid #eee' }}>
                    <TextField 
                        select 
                        label="Filter by Blood Group" 
                        fullWidth
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                    >
                        <MenuItem value="">All Blood Groups</MenuItem>
                        {bloodGroups.map(bg => <MenuItem key={bg} value={bg}>{bg}</MenuItem>)}
                    </TextField>

                    <Button 
                        variant="contained" 
                        onClick={handleSearch}
                        sx={{ px: 6, py: 2, fontWeight: '700', borderRadius: '10px', backgroundColor: '#b71c1c', '&:hover': { backgroundColor: '#8e1616' } }}
                    >
                        SEARCH
                    </Button>
                </Paper>

                <TableContainer component={Paper} elevation={4} sx={{ borderRadius: '15px', overflow: 'hidden' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#b71c1c" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Donor Name</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Blood Group</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>District</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact Info</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Location</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donors.length > 0 ? (
                                donors.map((donor) => (
                                    <TableRow key={donor._id} hover>
                                        <TableCell sx={{ fontWeight: '500' }}>{donor.name}</TableCell>
                                        <TableCell><span style={{ color: '#b71c1c', fontWeight: '900' }}>{donor.bloodGroup}</span></TableCell>
                                        <TableCell>{donor.district}</TableCell>
                                        <TableCell>{donor.phoneNumber}</TableCell>
                                        <TableCell>{donor.address}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 8, color: 'text.secondary', fontStyle: 'italic' }}>
                                        No donors match your search. Try another blood group.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};