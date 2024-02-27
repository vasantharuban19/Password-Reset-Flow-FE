import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import TBFHSL from "./TBFHSL";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
    toast.success("Logout successfuly");
  };

  const handleSignIn = () => {
    navigate("/signup");
  };

  return (
    <>
      <TBFHSL />
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
          <Typography variant="h4" gutterBottom>
            COMING SOON
          </Typography>
          {userData ? (
            <>
              <Typography variant="h5" component="h2" gutterBottom>
                You're In, {userData?.firstName} !
              </Typography>
              <Typography variant="body1" gutterBottom>
                Thanks for joining. Login to explore our services.
              </Typography>{" "}
              <br></br>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                {" "}
                Login{" "}
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                Our website is under construction, please sign in for updates.
              </Typography>
              <br></br>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </>
          )}
        </Box>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Home;
