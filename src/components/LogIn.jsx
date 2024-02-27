import React, { useState } from "react";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../routes/ApiRoutes";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
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

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Make Strong password"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await AxiosService.post(
        `${ApiRoutes.LOGIN.path}`,
        values
      );
      // console.log(response);

      const { message, token, userData } = response.data;
      if (message) {
        toast.success(message);
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        if (userData.role === "admin") {
          navigate("/admin-dashboard");
        } else if (userData.role === "user") {
          navigate("/user-dashboard");
        }
      }
    } catch (error) {
      console.error(error.response.data.message);

      if (error.response) {
        if (error.response.status === 401) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Login Failed. Please try again.");
        }
      }
    }
  };

  return (
    <>
      <TBFHSL />
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <Box
              component="div"
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
                "& .required": { color: Theme.palette.error.main },
              }}
              noValidate
              autoComplete="off"
            >
              <h2 style={{ marginBottom: "20px" }}>Login</h2>
              <div>
                <Field
                  name="email"
                  type="text"
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  className="required"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="required"
                />
              </div>
              <div>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  className="required"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="required"
                />
              </div>
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                style={{ marginTop: "20px" }}
              >
                {" "}
                Login
              </Button>
              <p style={{ marginTop: "20px" }}>
                <Link to="/forgot-password">Forgot Password?</Link>
              </p>
              <p>
                Don't have an account? <Link to="/signup">Signup</Link>
              </p>
            </Box>
          </Form>
        </Formik>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
};

export default Login;
