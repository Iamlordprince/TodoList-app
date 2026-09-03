function Active({task, toggleTaskCompletion}){ // Capitalized component name to match file import
    const activeTasks = task.filter(e => !e.completed)
    return(
      <ul>
        {activeTasks.map((e) => (
          <li key={e.id}>
            <input 
              type="checkbox" 
              checked={e.completed} 
              onChange={() => toggleTaskCompletion(e.id)} 
            />
            <span>{e.text}</span>
          </li>
        ))}
      </ul>
    )
}
export default Active
