import { Suspense, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

import Home from "./pages/Home";
import Header from "./Components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { server } from "./main";
import { UserContext } from "./context/User.Context";
import Loader from "./Components/Loader.jsx"
import Analytics from "./Components/Analytics"
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

  }, [ref, setIsAuthenticated, setLoading, setUser]);



  return (
    <BrowserRouter>
    <div className="App">

  
    <Header/>
      <Routes>
        <Route path="/" element={<Suspense fallback={<Loader/>}><Home/></Suspense>}/>
     {isAuthenticated &&   <Route path="/profile" element={<Suspense fallback={<Loader/>}><Profile/></Suspense>}/>}
        <Route path="/login" element={<Suspense fallback={<Loader/>}><Login/></Suspense>}/>
        <Route path="/register" element={<Suspense fallback={<Loader/>}><Register/></Suspense>}/>
        <Route path="/analytics" element={<Suspense fallback={<Loader/>}><Analytics/></Suspense>}/>
      </Routes>
    <ToastContainer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
