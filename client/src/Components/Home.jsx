import React, { useEffect, useState } from "react";
import { Typography, Container, Box } from "@mui/material";

export const Home = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setName(storedName);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fdfdfd", pt: "180px" }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ fontWeight: '900', color: '#b71c1c', mb: 2 }}>
          Hello, {name ? name : "Admin"}!
        </Typography>
        <Typography variant="h5" sx={{ color: "text.secondary", maxWidth: '600px', margin: 'auto' }}>
          Welcome to the HEMO CONNECT Management System. Every donation entry you manage helps save a life.
        </Typography>
      </Container>
    </Box>
  );
}