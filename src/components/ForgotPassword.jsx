import React, { useState } from "react";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../routes/ApiRoutes";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material";
import TBFHSL from "./TBFHSL";

const Theme = createTheme({
  palette: {
    mode: "light",
    error: {
      main: "#f44336",
    },
  },
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      const res = await AxiosService.post(`${ApiRoutes.FORGOTPASSWORD.path}`, {
        email,
      });
      // console.log(res.data);
      if (res.data.message) {
        toast.success(res.data.message);
      }
      navigate("/reset-password");
    } catch (error) {
      console.error(error.res.data);
      if (error.res.data.message) {
        toast.error(error.res.data.message);
      } else {
        toast.error("Please Try Again");
      }
    }
  };
  return (
    <>
      <TBFHSL />
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            "& .MuiTextField-root": {
              m: 1,
              width: "40ch",
              marginBottom: "20px",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <h2 style={{ marginBottom: "20px" }}>Forgot Password</h2>
          <p style={{ textAlign: "center" }}>
            Enter your email address to send OTP.
          </p>
          <div>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleEmail}
            />
          </div>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleForgotPassword}
            style={{ marginTop: "20px" }}
          >
            Reset
          </Button>

          <p style={{ marginTop: "20px" }}>
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </Box>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
