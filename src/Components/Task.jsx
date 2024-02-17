
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea,  Checkbox, IconButton } from '@mui/material';
import {  Delete,  Done } from '@mui/icons-material';
import { useContext } from 'react';
import { TaskContext } from '../context/Task.Context';


export default function Task({title,description , id , isCompleted  , updateHandler , DeleteHandler}) {


 
  return (
    <>
  

    <div className="card w-96 bg-gray-700 shadow-xl mx-4  ">
  <figure><img src={`https://source.unsplash.com/random/?Productivity&${id}`} className='w-2/3  max-h-40' alt="Shoes" /></figure>
  <div className="card-body">
      <h2 className="card-title  h-fit break-all ">
    {title}
    
    

    <div className={`badge cursor-pointer  ${isCompleted ? "badge-success" : "badge-primary" } `}  
      
      // onClick={()=>document.getElementById('my_modal_2').showModal()}
      
       >{isCompleted ? "Done" : "Pending"}</div>
       { !isCompleted && <input type="checkbox" checked={isCompleted} onChange={updateHandler} className="toggle toggle-accent"  />}
         
      {/* <dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Update Task</h3>
   
    <div className="form-control w-52">
    <label className="cursor-pointer label">
      <span className="label-text">Status</span> 
      <input type="checkbox" checked={isCompleted} onChange={updateHandler} className="toggle toggle-accent"  />
        <div>
   <p className={`badge badge-${isCompleted ? "success" : "secondary"}`}> {isCompleted ? "Completed" : "Pending"}</p>
      </div>
    </label>
  </div>



  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog> */}
    </h2>
    <p className=' h-full break-words'>{description}</p>
    <div className="card-actions justify-end">
      {/* <div className="badge badge-outline">Fashion</div> 
      <div className="badge badge-outline">Products</div> */}
      <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer " onClick={DeleteHandler}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

    </div>
  </div>
</div>
    </>
  );
}

