function Completed({ task, toggleTaskCompletion}){
     const completedTasks = task.filter(e => e.completed);
    return (
         <ul>
      {completedTasks.map((e) => (
        <li key={e.id}>
          <input 
            type="checkbox" 
            checked={e.completed} 
            onChange={() => toggleTaskCompletion(e.id)} 
          />
          <span style={{ textDecoration: 'line-through' }}>{e.text}</span>
        </li>
      ))}
    </ul>

    )
}
export default Completed
