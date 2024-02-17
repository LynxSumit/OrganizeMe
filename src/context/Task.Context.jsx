import axios from "axios";
import  { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { server } from "../main";
import { UserContext } from "./User.Context";
import 'react-toastify/dist/ReactToastify.css';



const updatehandler = async (id) => {
    try {
     const data = await axios.put(`${server}/task/${id}`,{},{
       withCredentials : true
     })
     console.log(data)
     toast.success(data.data.message, {position : "bottom-center"})
    } catch (error) {
     toast.error(error.response.data.message, {position : "bottom-center"})
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
      const toastid =   toast.loading("Trying...",{position : "top-center"})
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials : true
      })
   
      toast.dismiss(toastid)
      toast.success(data.message, {position : "bottom-center"})
      setRef(!ref)
     } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {position : "bottom-center"})
      setRef(!ref)
     }
  }

    const [tasks, setTasks] = useState([]);
  
    return <TaskContext.Provider value={{updatehandler , DeleteHandler , tasks , setTasks}}>
        {children}
    </TaskContext.Provider>
}