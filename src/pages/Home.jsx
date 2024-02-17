import {

  Box,
  Button,
  Container,
  Divider,
  FormControl,

  Input,
  InputLabel,

  Stack,
  Typography,
} from "@mui/material";
import  {  useContext, useEffect, useRef, useState } from "react";
import axios from "axios"
import { server } from "../main";
// import toast from "react-hot-toast"
import { ToastContainer, toast } from 'react-toastify';
import Task from "../Components/Task";
import {  useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.Context";
import { TaskContext } from "../context/Task.Context";

const Home = () => {
  const {isAuthenticated , ref , setRef , user}= useContext(UserContext)
  const {updatehandler , DeleteHandler , tasks , setTasks}= useContext(TaskContext)
  
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
const TitleRef = useRef()
const DescRef = useRef()

const [pending, setPending] = useState([]);
 
  const submitHandler = async (e) => {
    e.preventDefault()
    
    if(!title || !description){
   
      return toast.error("Input fields cant be empty")
    }
    try {
      setLoading(true)
   
    const toastid =   toast.loading("Trying...", {position : "bottom-center"})
 
        const {data} = await axios.post(`${server}/task/new`, {
           title,
         Description :   description,
          
        },
        {
            headers :{
                "Content-Type" : "application/json",
            },
            withCredentials : true
        })
        setRef(!ref)
  setTitle("")
  setDescription("")
  
  toast.dismiss(toastid)
        toast.success(data.message, {position : "bottom-center"})
        setLoading(false)
   
      } catch (error) {
        setRef(!ref)
    
     toast.error(error.response.data.message, {position : "bottom-center"})
    }

  }
  const getTasks = async () => {
    try {
      const data = await axios.get(`${server}/task/my`, {
  withCredentials : true
})

setTasks(data.data.tasks)
    } catch (error) {
      toast.error(error.response.data.message, {position : "bottom-center"})
    }
   
  } 
  
  useEffect(() => {
    if(!isAuthenticated){
      // toast.error("Login First")
    navigate("/login")
  }
    getTasks()
  
    const pendingTasks =  tasks?.filter(task => !task.isCompleted)
      setPending(pendingTasks);

  }, [tasks, ref, isAuthenticated, navigate]);

  useEffect(() => {
  const checkAndRemoveExpiredTasks = () => {
    const currentTime = new Date();
    const updatedTasks = tasks.filter(task => {
      // Check if the task is older than 24 hours
      const taskTimestamp = new Date(task.createdAt);
      const timeDifference = currentTime - taskTimestamp;
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      return hoursDifference <= 24;
    });

    setPending(updatedTasks);
  };

  // Schedule the check every, say, 1 hour
  const intervalId = setInterval(checkAndRemoveExpiredTasks, 60 * 60 * 1000);

  // Clean up the interval on component unmount
  return () => clearInterval(intervalId);
}, [tasks]);

  
  return (
    <Box className="mytask " sx={{marginBottom : '4rem' }}> <Typography textAlign={"center"} padding={3} fontSize={28} mt={3} sx={{textShadow : '0 0 rgba( 0 0 345 0'}}> Hello {user.name} , Organize your day.</Typography>
    
    <Container 
    className="drop-shadow-lg border-accent bg-gray-600 my-2  py-2 border-y-2 filter"
    sx={{
      marginTop: "80px",
      borderRadius: "5px",
      boxShadow: 'rgba(80, 80, 93, 0.75) 2px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px 2px',
      width: { md: "40%", xs: "80%" },
      height: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <div className="mockup-window w-full ">
    <form
      onSubmit={submitHandler}
      className=""
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "1.2rem",
        justifyContent: "center",
        flexDirection: "column",
        gap: "30px",
        width: "100%",
        padding : '12px'
      }}
    >
      <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text text-slate-200">Title</span>
  </label>
  <input maxLength={50}  value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          type="text"
       
          id="title"
          aria-describedby="my-helper-text" className="input input-bordered w-full max-w-xs" />
</div>
      {/* <FormControl sx={{ width: {md : "20rem" , xs : '15rem'} }}>
        <InputLabel sx={{ textAlign: "center" }} htmlFor="desc">
      Description
        </InputLabel>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          
          id="desc"
          aria-describedby="my-helper-text"
        />
      </FormControl> */}

      <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text text-slate-200">Description</span>
  </label>
  <textarea   maxLength={300} className="textarea textarea-bordered h-24"  value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          
          id="desc"
          aria-describedby="my-helper-text"></textarea>
</div>
     
      {/* <Button disabled={loading}  type="submit"> Add Task</Button> */}
      <button disabled={loading} className="btn btn-outline btn-accent" type="submit">Add Task</button>
    </form>
 </div>
  </Container>
 <div className="flex flex-wrap gap-4 justify-center my-10">


 {
    pending?.map((task) => 
     (
      <Task key={task._id} title={task?.title} description={task.Description} isCompleted={task?.isCompleted} id={task._id}  DeleteHandler={() => DeleteHandler(task._id)} updateHandler={() => updatehandler(task._id)}/>
     )
    )
   }
 </div>

 </Box>
  )
}

export default Home
