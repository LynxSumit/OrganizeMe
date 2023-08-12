import  { useContext, useEffect } from 'react'
import { UserContext } from '../context/User.Context'
import Loader from '../Components/Loader'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Stack, Typography } from '@mui/material';
import Task from '../Components/Task';
import { TaskContext } from '../context/Task.Context';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));
const Profile = () => {
 
  const {user ,  loading  } = useContext(UserContext)
  const {tasks , DeleteHandler , updatehandler} = useContext(TaskContext)

  
  return (
 

    <Box container sx={{padding : '1.2rem',display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', gap : '20px' , marginBottom : '4rem'}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
<Typography textAlign={"center"} fontSize={28} mt={2} sx={{textShadow : '0 0 rgba( 0 0 345 0'}}>Crafting Success, {user.name} ! Your Profile Hub for Productivity.</Typography>
    {
      loading ? <Loader/> : (
        <>
        <Grid xs={5}>
        <Item> Name :     {user.name}</Item>
      </Grid>
      <Grid xs={6}>
        <Item>Email : {user.email}</Item>
      </Grid>
      </>
      )
    }

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

export default Profile
