import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../public/login2.jpg";
import signUpImage from "../../public/signUp2.jpg";
import { apiClient } from "../../utils/apiClient";
import { z } from "zod";
import Alert from "../CustomAlert";
import "./AuthForm.css";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const AuthForm = () => {
  const navigate = useNavigate();
  const registrationSchema = z.object({
    name: z
      .string()
      .nonempty()
      .min(1, { message: "Name must contain at least 1 character " }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({}); //state to manage form errors.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const toggleForm = () => {
    setIsLoginForm((prev) => !prev);
  };

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [prop]: event.target.value });
    };

  const handleLogin = async () => {
    try {
      // Validate form data
      if (!formData.email || !formData.password) {
        setFormErrors({
          email: !formData.email ? "Email is required." : "",
          password: !formData.password ? "Password is required." : "",
        });
        return; // Exit early if fields are empty
      }
      const response = await apiClient.post("/auth/login", formData);
      console.log("User logged in:", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userId", response.data.userId);
      navigate("/home");
      // Optionally, handle successful login (e.g., redirect)
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Incorrect email or password.");
      // Optionally, handle login error (e.g., display error message)
    }
  };

  const handleSignUp = async () => {
    try {
      // Validate form data
      registrationSchema.parse(formData);
      console.log(formData);
      const response = await apiClient.post("/auth/register", formData);
      console.log("User registered:", response.data);
      await handleLogin();
      // Optionally, handle successful registration (e.g., redirect)
    } catch (error) {
      if (error instanceof z.ZodError) {
        // If validation fails, set form errors state
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setFormErrors(fieldErrors);
      } else {
        console.error("Registration failed:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoginForm) {
      await handleLogin();
    } else {
      await handleSignUp();
    }
  };

  const onGoogleLogInSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      console.log(credentialResponse);
      // Send the access token to your server for verification and user authentication
      const response = await apiClient.post("/auth/google", credentialResponse);

      // Check if the login was successful
      if (response.status === 200) {
        // Optionally, perform additional actions such as updating UI, storing tokens, or navigating to another page
        console.log("Google login success:", response.data);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("userId", response.data.userId);
        navigate("/home");
      } else {
        // Handle login failure
        console.error("Google login failed:", response.statusText);
        // Optionally, display an error message or take other actions
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error("Error logging in with Google:", error);
      // Optionally, display an error message or take other actions
    }
  };

  const onGoogleLogInFailure = () => {
    // Handle the Google login failure
    console.log("Google login failed");
    // Optionally, display an error message or take other actions
  };

  return (
    <div className="auth-form-container urbanist-font">
      {!isLoginForm ? (
        <div className="image-container">
          <img src={signUpImage} alt="Sign Up" />
        </div>
      ) : (
        <div className="image-container">
          <img src={loginImage} alt="Login" />
        </div>
      )}
      <div className="form-container" style={{ padding: "0 5rem" }}>
        <div className="header-container">
          <h4
            className={"_firstHeader urbanist-font"}
            style={{
              width: "100%",
              textWrap: "wrap",
              fontSize: "2.5rem",
            }}
          >
            {isLoginForm ? "Welcome Back!" : "Hi, Get Started Now"}
          </h4>
        </div>
        <Typography
          variant="h5"
          gutterBottom
          className="urbanist-font _secondHeader"
          sx={{ textWrap: "wrap" }}
          fontSize={"1.25rem"}
          width={"100%"}
          fontWeight={300}
        >
          {isLoginForm
            ? "Continue with Google or Enter Login Details"
            : "Enter details to create your Travel Talk account"}
        </Typography>
        <div style={{ borderRadius: "30px" }}>
          <GoogleLogin
            onSuccess={onGoogleLogInSuccess}
            onError={onGoogleLogInFailure}
          ></GoogleLogin>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLoginForm && (
            <Grid item xs={12}>
              <FormControl
                fullWidth
                className="_inputs form-control-container "
                sx={{ margin: "1rem 0 0 0" }}
              >
                <InputLabel
                  htmlFor="full-name"
                  className="urbanist-font _inputs"
                >
                  Full Name
                </InputLabel>
                <Input
                  id="full-name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange("name")}
                />
                {formErrors.name && (
                  <span className="text-danger">{formErrors.name}</span>
                )}{" "}
                {/* Display error message for name */}
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl
              fullWidth
              className="_inputs form-control-container "
              sx={{ margin: "1rem 0 0 0" }}
            >
              <InputLabel htmlFor="email" className="urbanist-font ">
                Email
              </InputLabel>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
              />
              {formErrors.email && (
                <span className="text-danger">{formErrors.email}</span>
              )}{" "}
              {/* Display error message for email */}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              className="_inputs form-control-container "
              sx={{ margin: "1rem 0 0 0" }}
            >
              <InputLabel htmlFor="password" className="urbanist-font">
                Password
              </InputLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ marginBottom: "30px" }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formErrors.password && (
                <span className="text-danger">{formErrors.password}</span>
              )}{" "}
              {/* Display error message for password */}
            </FormControl>
          </Grid>
          <div>
            <Button
              type="submit"
              variant="contained"
              className={"urbanist-font "}
              sx={{ borderRadius: "50px", width: "100%" }}
            >
              {isLoginForm ? "Log In" : "Sign Up"}
            </Button>
          </div>
        </form>
        {errorMessage && (
          <Alert message={errorMessage} type="danger" margin="10px" />
        )}
        <div className="frame16">
          <Typography variant="body1" className="urbanist-font ">
            {isLoginForm ? (
              <>
                Don’t have an account yet?{" "}
                <Link onClick={toggleForm} to={""}>
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link onClick={toggleForm} to={""}>
                  Log in to account
                </Link>
              </>
            )}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
