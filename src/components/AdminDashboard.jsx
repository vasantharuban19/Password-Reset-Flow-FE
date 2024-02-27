import React from "react";
import Topbar from "./TopBar";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";

function AdminDashboard() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <Topbar />
      <Container maxWidth="sm">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
            textAlign: "center",
            overflowY: "hidden",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Welcome, {userData?.firstName} !
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default AdminDashboard;
