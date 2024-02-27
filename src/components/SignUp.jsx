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
import { ToastContainer, toast } from "react-toastify";
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

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("FirstName Required"),
    lastName: Yup.string().required("LastName Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Give Strong password"),
  });

  const handleSignup = async (values) => {
    try {
      const response = await AxiosService.post(
        `${ApiRoutes.SIGNUP.path}`,
        values
      );
      const { message, userData } = response.data;
      console.log(message);
      toast.success(message);
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
      const errorMessage =
        error.response.data.message || "SIGNUP failed. Please try again.";
      console.log(errorMessage);
      toast.error(errorMessage);
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
          onSubmit={handleSignup}
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
              <h2 style={{ marginBottom: "20px" }}>Create Account</h2>
              <div>
                <Field
                  name="firstName"
                  type="text"
                  as={TextField}
                  label="First Name"
                  variant="outlined"
                  className="required"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="required"
                />
              </div>
              <div>
                <Field
                  name="lastName"
                  type="text"
                  as={TextField}
                  label="Last Name"
                  variant="outlined"
                  className="required"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="required"
                />
              </div>
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
                  className="required"
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
                Signup
              </Button>
              <p style={{ marginTop: "20px" }}>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Box>
          </Form>
        </Formik>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};

export default SignUp;
