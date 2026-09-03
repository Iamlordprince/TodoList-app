import { useEffect, useState } from 'react'
import './App.css'
import All from './components/all';
import Active from './components/active';
import Completed from './components/completed'

function App() {
  const [isactive, setIsactive] = useState('All');
  const [task, setTask] = useState(() => {
    const savedTask = localStorage.getItem('my-task');
    return savedTask ? JSON.parse(savedTask) : [];
  });

  useEffect(() => {
    localStorage.setItem('my-task', JSON.stringify(task));
  }, [task]);

  const [input, setInput] = useState('');

  const addTask = () => {
    if(input.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false
    };
    setTask([...task, newTask]);
    setInput('');
  } // <-- Closed addTask properly here

  // Moved outside so it's globally accessible in the component
  const toggleTaskCompletion = (taskId) => {
    const updateTask = task.map((e) => { // Fixed typo from tasks to task
      if(e.id === taskId){
        return {...e, completed: !e.completed};
      }
      return e;
    });
    setTask(updateTask); // <-- Added state update
  };

  return (
    <div className='container'>
      <h1>Todo List</h1>
      <p className='para'>Plan your day, get things done</p>
      <div className='input-div'>
        <input
          value={input}
          type='text'
          placeholder='What do You need to do ?'
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='tabs'>
        <button className={isactive === 'All' ? 'active' : ''} onClick={() => setIsactive('All')}>All</button> 
        <button className={isactive === 'Active' ? 'active':''} onClick={() => setIsactive('Active')}>Active</button>
        <button className={isactive === 'Completed' ? 'active' : ''} onClick={() => setIsactive('Completed')}>Completed</button>
      </div>

      {/* Passed down variables cleanly */}
      {isactive === 'All' && <All task={task} toggleTaskCompletion={toggleTaskCompletion} />}
      {isactive === 'Active' && <Active task={task} toggleTaskCompletion={toggleTaskCompletion}/>} 
      {isactive === 'Completed' && <Completed task={task} toggleTaskCompletion={toggleTaskCompletion}/>}

      {/* REMOVED: Duplicate hardcoded <ul> mapping from the bottom */}
    </div>
  )
}

export default App


