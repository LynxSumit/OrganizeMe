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
import  {  useContext, useEffect, useState } from "react";
import axios from "axios"
import { server } from "../main";
import toast from "react-hot-toast"
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



 
  const submitHandler = async (e) => {
    e.preventDefault()
    if(!title || !description){
   
      return toast.error("Input fields cant be empty")
    }
    try {
      setLoading(true)
   
    const toastid =   toast.loading("Trying...")
 
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
        toast.success(data.message)
        setLoading(false)
   
      } catch (error) {
        setRef(!ref)
    
     toast.error(error.response.data.message)
    }

  }
  


  useEffect(() => {
axios.get(`${server}/task/my`, {
  withCredentials : true
}).then((data)=>{
  
 setTasks(data.data.tasks)
 
}).catch(e=>{
 toast.error(e.response.data.message)

  navigate("/login")
})
  }, [tasks , ref]);

  if(!isAuthenticated){
    navigate("/login")
  }
  
  return (
    <Box className="mytask" sx={{marginBottom : '4rem'}}> <Typography textAlign={"center"} fontSize={28} mt={3} sx={{textShadow : '0 0 rgba( 0 0 345 0'}}> Embrace Productivity, {user.name} Your Task Master Awaits Your Command.</Typography>
    
    <Container 
    sx={{
      marginTop: "80px",
      borderRadius: "5px",
      boxShadow: 'rgba(80, 80, 93, 0.75) 2px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px 2px',
      width: { md: "40%", xs: "80%" },
      height: "250px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
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
        padding : '12px'
      }}
    >
      <FormControl sx={{ width: {md : "20rem" , xs : '15rem'} }}>
        <InputLabel sx={{ textAlign: "center" }} htmlFor="title">
          Title
        </InputLabel>
        <Input
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          type="text"
       
          id="title"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl sx={{ width: {md : "20rem" , xs : '15rem'} }}>
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
      </FormControl>
     
      <Button disabled={loading}  type="submit"> Add Task</Button>
    </form>
  </Container>
  <Stack
  direction="column"
  divider={<Divider orientation="vertical" flexItem />}
  spacing={3}
  className="mytasks"
>


 {
    tasks.map((task) => (
      <Task key={task._id} title={task?.title} description={task.Description} isCompleted={task?.isCompleted} id={task._id} DeleteHandler={() => DeleteHandler(task._id)} updateHandler={() => updatehandler(task._id)}/>
    ))
   }
 </Stack>

 </Box>
  )
}

export default Home
