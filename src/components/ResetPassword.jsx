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

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    OTP: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    OTP: Yup.string().required("OTP Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{5,}$/, "Make Stronger"),
    confirmPassword: Yup.string()
      .required("ConfirmPassword Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleResetPassword = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        console.error("Passwords do not match");
        toast.error("Passwords do not match");
        return;
      }

      const response = await AxiosService.post(
        `${ApiRoutes.RESETPASSWORD.path}`,
        values
      );
      // console.log(response.data);

      if (response.data.message) {
        toast.success(response.data.message);
      }
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);

      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    }
  };
  return (
    <>
      <TBFHSL />
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleResetPassword}
        >
          {() => (
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
                  "& .required": {
                    color: Theme.palette.error.main,
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <h2 style={{ marginBottom: "20px" }}>Reset Password</h2>
                <p>Enter the OTP and set a new password.</p>
                <div>
                  <Field
                    name="OTP"
                    type="text"
                    as={TextField}
                    label="OTP"
                    variant="outlined"
                    className="required"
                  />
                  <ErrorMessage
                    name="OTP"
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
                <div>
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    as={TextField}
                    label="Confirm Password"
                    variant="outlined"
                    className="required"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ErrorMessage
                    name="confirmPassword"
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
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;
