import React, { useState } from 'react'




const Task = () => {

  const [data, setData] = useState('');
const [tasks, setTasks] = useState([]);
const [filter, setFilter] = useState('all');

const clicked = () => {
  if (!data.trim()) return;

  const newtask = {
    id: Date.now(),
    text: data,
    complete: false
  };
  setTasks([...tasks, newtask]);
  setData("");
};
const toggleitem = (id) => {
  const updated=tasks.map(task=>
    task.id == id ? {...task, complete: !task.complete} : task
  )
  setTasks(updated);
};

const deleteit = (id) => {
  setTasks(tasks.filter((task) => task.id !== id));
};
 
const filteredtask = tasks.filter(task => {
if(filter === "completed" ) return task.complete;
if (filter === "incompleted") return !task.complete; 
return true;
}
)

  return (
    <div className='w-screen h-full flex'>
     <div className='w-1/3 h-full flex flex-col items-center p-4'>
         <h1 className='text-3xl'>TO DO LIST</h1>
      <input
       className='px-3.5 py-4 mt-10 mb-10 border-2 border-gray-700 rounded-md' 
       value={data}
       onChange={(e) => setData(e.target.value)} 
       type="text" placeholder="Add a new task" />
      <button
      onClick={()=>{
        clicked()
      }}
      className='px-4 py-2 bg-blue-500 text-white rounded-md active:bg-blue-700'>Add Task</button>
     </div>

     
      <div className='w-2/3 my-10 text-2xl '>
        <div className='flex gap-4 mb-6'>
          <button 
          onClick={() => setFilter('all')}
          className='border-2 border-gray-600 px-6 py-1'>All</button>
        <button 
        onClick={() => setFilter('completed')}
        className='border-2 border-gray-600 px-6 py-1'>Completed</button>
        
        <button 
        onClick={() => setFilter('incomplete')}
        className='border-2 border-gray-600 px-6 py-1'>Incomplete</button> 
      </div>
        <ol className='list-decimal list-inside space-y-2'>
            {filteredtask.map(task => (
              <li key={task.id} className='p-2 bg-gray-100 rounded'>
                <span
                onClick={()=>{
                  toggleitem(task.id)
                }}
                className={`cursor-pointer ${
                task.complete ? "line-through text-gray-400" : ""
              }`}
                >{task.text}</span>

                <button className=' border-2 border-red-500 rounded ml-4 text-sm'
                onClick={()=>{deleteit(task.id)}}>delete</button></li>
            ))}
          
        </ol>
      </div>
    </div>
  )
}

export default Task
