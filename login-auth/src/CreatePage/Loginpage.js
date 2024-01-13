import { Checkbox, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../images/google.png";
import Button from "react-bootstrap/Button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Loginpage({ setIsLogin }) {
  const navigate = useNavigate();
  function Changepath() {
    navigate("/createAc");
  }
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const getloginData = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };


  const handleSign = async (e) => {
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      alert("please fill Fields!");
      // toast.error("please fill Fields!");
    } else {
      try {
        const ans = await axios.post("http://localhost:5252/loginform/login", loginData);
        if (ans.data.token) {
          setIsLogin(true);
          localStorage.setItem("token", ans.data.token);
          console.log(ans.data.token);
          // navigate("/dashboard");
        } else {
          toast.error("Sorry 🤨 Email is not registered.");
          alert("Sorry 🤨 Email is not registered.");
        }
      } catch (error) {
        console.error("Token not found in response.");
        console.error("Error:==", error);
      }
    }
  };


  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div>
      <div className="container">
        <div className="head">
          <h2>Sign In</h2>
          <p className="arrange">
            or{" "}
            <button onClick={Changepath} className="sign-btn">
              Create an account
            </button>{" "}
          </p>
        </div>
        <br />
        <form>
          <Grid textAlign={"center"} container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="email"
                variant="standard"
                className="input"
                name="email"
                onChange={getloginData}
                value={loginData.email}
              />
            </Grid>
            <ToastContainer position="bottom-right" />

            <Grid item xs={12}>
              <FormControl sx={{ m: 0 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  style={{ width: "70vh" }}
                  name="password"
                  onChange={getloginData}
                  value={loginData.password}
                  // className="main-box-size"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <div className="checkbox">
              <Checkbox />
              Remember me
            </div>
            <Grid item xs={12}>
              <Button
                onClick={() => handleSign()}
                variant="dark"
                className="create-btn"
                type="submit"
              >

                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button className="google-btn" variant="dark">
                Sign in With  <img src={img} alt="" /> Google
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
