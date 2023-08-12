import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Header from "./Components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "./main";
import { UserContext } from "./context/User.Context";

function App() {
 
  const {setUser , isAuthenticated, setIsAuthenticated, setLoading , ref} = useContext(UserContext)

  useEffect(() => {
  setLoading(false)
axios.get(`${server}/users/me`, {
  withCredentials : true
}).then((res) => {
 setUser(res.data.user)
 setIsAuthenticated(true)
 setLoading(false)
}).catch(() => {
  setUser({})
  setIsAuthenticated(false)
  setLoading(false)
});
  }, [ref]);
 

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
     {isAuthenticated &&   <Route path="/profile" element={<Profile/>}/>}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
