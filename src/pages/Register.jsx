import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import  { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { server } from "../main";
import toast from "react-hot-toast"
import { UserContext } from "../context/User.Context";
const Register = () => {
  const {  setIsAuthenticated, loading, setLoading} = useContext(UserContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  
  const submitHandler = async (e) => {
    e.preventDefault();
    let toastid;
try {
   toastid =   toast.loading("Trying...")
  setLoading(true)
    const data = await axios.post(`${server}/users/new`, {
        name,
        email,
        password
    },
    {
        headers :{
            "Content-Type" : "application/json",
        },
        withCredentials : true
    })
    navigate("/")
    toast.dismiss(toastid)
    toast.success(data.data.message)
    setLoading(false)
    setIsAuthenticated(true)
  } catch (error) {
    toast.dismiss(toastid)
    toast.error("User with this email already exist")
    setLoading(false)
    
    setIsAuthenticated(false)
}

  };
  return (
    <Container
      sx={{
        marginTop: "80px",
        borderRadius: "5px",
        border: "1px solid black",
        width: { md: "40%", xs: "80%" },
        height: "450px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        
       
      }}
    >
    <Typography variant='h5' mb={3} >Create your account here </Typography>
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
        <FormControl sx={{width: {md : "20rem" , xs : '15rem'}}}>
          <InputLabel sx={{ textAlign: "center" }} htmlFor="name">
            Name
          </InputLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            id="name"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl sx={{width: {md : "20rem" , xs : '15rem'} }}>
          <InputLabel sx={{ textAlign: "center" }} htmlFor="email">
            Email address
          </InputLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            id="email"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl sx={{width: {md : "20rem" , xs : '15rem'}}}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            id="password"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <Button disabled={loading} type="submit"> SIGN UP</Button>
      </form>
      <Box  textAlign={"center"}>
        <Typography variant="body2">Already have an account ?</Typography>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button>Login</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Register;
Register;
