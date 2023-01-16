import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
import Iconify from "../components/iconify";
import { toast } from "react-toastify";
import { LoginForm } from "../sections/auth/login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogin } from "../slice/loginSlice/userLoginSlice.jsx";
import { Navigate, useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive("up", "md");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.login);
  const handleChange = (e) => {
    //console.log(e.target.value)
    setEmail(e.target.value);
  };
  const handleChangePass = (e) => {
    //   console.log(e.target.value)
    setPassword(e.target.value);
  };

  const data = { email, password };

  const handleSubmit = (e) => {
    // dispatch(getUserLogin(data));
    // if (user!==null ) {
    // /  navigate("/dashboard/app")
    // }
    if (!email) {
     return toast.warn("Please enter email!");
    }
      if(!password ){
       return toast.warn("Please enter password!");
      }
    else {
      dispatch(getUserLogin(data));
    }
  };

  const fn = () => {
    if (user && role) {
      navigate("/dashboard/products");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    fn();
  }, [user]);

  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Welcome, Please Login
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in here
            </Typography>

            <Divider sx={{ my: 3 }}></Divider>
            <input
              style={{ margin: "4px", padding: "4px" }}
              type="email"
              required
              placeholder="email"
              value={email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              style={{ margin: "4px", padding: "4px" }}
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                handleChangePass(e);
              }}
            />
            <Button onClick={(e) => handleSubmit(e)}>submit</Button>
           
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
