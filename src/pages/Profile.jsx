import  { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/User.Context'
import Loader from '../Components/Loader'

import Task from '../Components/Task';
import { TaskContext } from '../context/Task.Context';

const Profile = () => {
 
  const {user ,  loading  } = useContext(UserContext)
  const {tasks , DeleteHandler , updatehandler} = useContext(TaskContext)
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
const completedTasks = tasks.filter(task => task.isCompleted);
setCompleted(completedTasks);

  }, [tasks]);
  return (
 

    <div  style={{padding : 4,display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', gap : '20px' , marginBottom : '4rem'}}>
<p  className='text-center text-3xl mt-2' style={{textShadow : '0 0 rgba( 0 0 345 0'}}> Your Profile Hub for Productivity.</p>
    {
      loading ? <Loader/> : (
       <div className='bg-gray-800 flex flex-col px-5 py-4 mx-auto rounded-md gap-4'>
        <p className='text-lg text-slate-200'><span className='text-accent'>Name</span> : {user.name}</p>
        <p className='text-lg text-slate-200'><span className='text-accent'>Email</span> : {user.email}</p>
       </div>
      
      )
    }

<h1 className='text-center text-3xl font-bold text-teal-300 px-2 py-1 drop-shadow-md 
   '>Completed Tasks</h1>
   <div className='flex flex-wrap gap-4 justify-center my-10 '>

 {
    completed.map((task) => (
      <Task key={task._id} title={task?.title} description={task.Description} isCompleted={task.isCompleted} id={task._id} DeleteHandler={() => DeleteHandler(task._id)} updateHandler={() => updatehandler(task._id)}/>
    ))
   }
   </div>

    </div>

  


      
    
  )
}

export default Profile
