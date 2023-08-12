import axios from "axios";
import  { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { server } from "../main";
import { UserContext } from "./User.Context";



const updatehandler = async (id) => {
    try {
     const data = await axios.put(`${server}/task/${id}`,{},{
       withCredentials : true
     })
     console.log(data)
     toast.success(data.data.message)
    } catch (error) {
     toast.error(error.response.data.message)
    }
   }
  
   export const TaskContext = createContext({
   
    updatehandler : () => {},
    DeleteHandler : () => {}
});

export const TaskProvider = ({children}) => {
  const {ref , setRef} = useContext(UserContext)
  const DeleteHandler = async (id) => {
    try {
      const toastid =   toast.loading("Trying...")
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials : true
      })
   
      toast.dismiss(toastid)
      toast.success(data.message)
      setRef(!ref)
     } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setRef(!ref)
     }
  }

    const [tasks, setTasks] = useState([]);
    return <TaskContext.Provider value={{updatehandler , DeleteHandler , tasks , setTasks}}>
        {children}
    </TaskContext.Provider>
}