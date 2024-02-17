import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../context/Task.Context'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
// import { TaskContext } from '../context/Task.Context'
// import { Line } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2'

const Analytics = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  )
  const {tasks} = useContext(TaskContext)
const [category, setCategory] = useState("");
const [completed, setCompleted] = useState([]);
useEffect(() => {
  
  const completedTasks = tasks?.filter(task => task.isCompleted);

  setCompleted(completedTasks);

  
}, [tasks ]);
  const productivityChart = {
    
      labels : ["Completed Tasks", "Pending Tasks"],
      datasets :[
        {
          label: "Tasks Management",
          backgroundColor: ["#00A6B4" , "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [completed.length,tasks?.length-completed.length],
        }
      ]
      
    }
    // console.log(completed)
  return (
    <div className='h-screen flex  w-full flex-col md:flex-row  gap-10 md:gap-0   bg-gray-200 '>
    <div className='flex md:w-1/2 border-t-8 border-slate-200 flex-col items-center '>
      <h2 className='text-3xl font-bold  text-gray-600 mt-3'>Data Chart</h2>
      <div className="    w-[70%] h-[100%]">

     <Doughnut   data={productivityChart}  options={{
          responsive: true,
          maintainAspectRatio: true,
        }} />
      </div>

    </div>
    
    <div className='flex md:w-1/2 flex-col items-center gap-6 h-auto md:bg-slate-700 text-accent ' >
      <h2 className='text-3xl font-bold text-gray-200 mt-3'>Your Data</h2>
      <select value={category} onChange={e=> setCategory(e.target.value)} className="select select-bordered select-md w-full max-w-xs translate-y-10">
  <option className='' disabled selected>Configure</option>
  <option className='' value="Completed">Completed Tasks</option>
  <option className='' value={"Pending"}>Pending Tasks</option>
  <option className='' value={"Score"}>Your Productive Score </option>
</select>
    {category && <>
  <div className={`flex h-full px-4 my-5  justify-center  ${window.innerHeight <= "768px" ? "text-gray-800" : "text-gray-200"}`}>
{category === "Completed" && <div className='mt-6 text-slate-700 bg-slate-200 h-fit px-6 py-1'> {completed.length != [0,1] && "Congrat's "} You Have Completed {completed?.length} Tasks. </div>}
{category === "Pending" && <div className='mt-6 bg-slate-400'> {tasks?.length-completed.length != [0,1]} Hurry Up !!! You have   {tasks?.length-completed.length} Tasks Remaining</div>}
{category === "Score" && <div className=''> Score</div>}
  </div>
</>}
    </div>

    </div>
  )
}

export default Analytics
