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
import loginImage from "../../assets/login2.jpg";
import signUpImage from "../../assets/signUp2.jpg";
import { apiClient } from "../../utils/apiClient";
import { z } from "zod";
import "./AuthForm.css";

const LogInForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [prop]: event.target.value });
    };

  const handleLogin = async () => {
    try {
      const response = await apiClient.post("/auth/login", formData);
      console.log("User logged in:", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      navigate("/home");
      // Optionally, handle successful login (e.g., redirect)
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally, handle login error (e.g., display error message)
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleLogin();
  };

  return (
    <div className="auth-form-container urbanist-font">
      <div className="image-container">
        <img src={loginImage} alt="Login" />
      </div>
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
            Welcome Back!
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
          Continue with Google or Enter Login Details
        </Typography>
        <form onSubmit={handleSubmit}>
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
            </FormControl>
          </Grid>
          <div>
            <Button
              type="submit"
              variant="contained"
              className={"urbanist-font "}
              sx={{ borderRadius: "50px", width: "100%" }}
            >
              Log In
            </Button>
          </div>
        </form>
        <div className="frame16">
          <Typography variant="body1" className="urbanist-font ">
            Don’t have an account yet?
            <Link to={"/signUp"}>Create an account</Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
