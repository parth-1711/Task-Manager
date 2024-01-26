import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import BasicInput from "../components/BasicInput";

import { toast } from "react-toastify";

function ValidateUserName(inp) {
  if (inp.length >= 5) {
    return true;
  } else {
    return false;
  }
}

function validatePassword(password) {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  return pattern.test(password);
}

function Login() {
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("verified") == 1) {
      toast.success("Account Already Verified");
    } else if (searchParams.get("verified") == 2) {
      toast.error("UserName Verified Please Login!");
    }
  }, []);

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const location = useLocation();

  let { error } = location.state || false;

  async function submitHandler(event) {
    event.preventDefault();

    // if(isEmailValid && isPasswordValid){
    const data = new FormData(event.target);
    const formdata = {
      username: data.get("userName"),
      password: data.get("pass"),
    };
    // console.log(formdata);
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    let tokenData=await response.json();
    if(response.status==201){
      localStorage.setItem("token",tokenData.token);
      localStorage.setItem("username",formdata.username)
    }
    setLoading(true);
    //   dispatch(login({user:formdata}))
    navigate("/list");
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        minWidth: "160px",
        marginTop: "6vh",
        marginBottom: "6vh",
        marginX: "30vw",
      }}
    >
      {error && (
        <Typography component="h1" variant="h4" sx={{ color: "red" }}>
          Please Login
        </Typography>
      )}
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          // backgroundColor: '#0F1111',
          px: 4,
          py: 2,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
         <Typography component="h1" variant="h4" sx={{ color: "black" }}>
          Welcome to Task Manager
        </Typography>
        <Typography component="h1" variant="h4" sx={{ color: "black" }}>
          Login
        </Typography>

        <Box noValidate sx={{ mt: 1, width: "100%" }} onSubmit={submitHandler}>
          <form onSubmit={submitHandler}>
            <BasicInput
              name="userName"
              key="userName"
              type="userName"
              label="UserName"
              err="UserName should have at least 5 characters"
              validation={ValidateUserName}
              valid={setIsUserNameValid}
              status={isUserNameValid}
            >
              {" "}
            </BasicInput>

            <BasicInput
              name="pass"
              key="pass"
              type="password"
              label="Password"
              err="Password Must Contain a Capital Letter, Digit and Special Character"
              validation={validatePassword}
              valid={setIsPasswordValid}
              status={isPasswordValid}
            >
              {" "}
            </BasicInput>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 3, minWidth: "50px", fontSize: "1.2rem" }}
            >
              {!loading && <div>Sign In</div>}
              {loading && <div>Loading...</div>}
            </Button>
          </form>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Link to="/signup">New Here? Register!</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
