import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.Context";
import axios from "axios";
import { server } from "../main";
import { toast } from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    ref,
    setRef,
  } = useContext(UserContext);
  if (isAuthenticated) navigate("/");
  const submitHandler = async (e) => {
    e.preventDefault();
    let toastid;
    try {
      toastid = toast.loading("Trying...");
      setLoading(true);
      const data = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/");
      toast.dismiss(toastid);
      toast.success(data.data.message);
      setLoading(false);
      setRef(!ref);
      setIsAuthenticated(true);
    } catch (error) {
      toast.dismiss(toastid);
      setRef(!ref);
      setLoading(false);
      toast.error("Invalid email or password");
      setIsAuthenticated(false);
    }
  };

  return (
    <Container
      sx={{
        marginTop: "80px",
        borderRadius: "5px",
        border: "1px solid black",
        width: { md: "40%", xs: "80%" },
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding : 4
      }}
    >
      <Typography variant="h5" mb={3}>
        Login Here
      </Typography>
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1.2rem",
          justifyContent: "center",
          flexDirection: "column",
          gap: "30px",
          width: "100%",
        }}
      >
        <FormControl sx={{ width: { md: "20rem", xs: "15rem" } }}>
          <InputLabel sx={{ textAlign: "center" }} htmlFor="email">
            Email address
          </InputLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            id="email"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl sx={{ width: { md: "20rem", xs: "15rem" } }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            id="password"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <Button disabled={loading} type="submit">
          {" "}
          Login
        </Button>
      </form>
      <Box textAlign={"center"}>
        <Typography variant="body2">Don't have an account ?</Typography>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button>Sign Up</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Login;
Login;
