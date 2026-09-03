function All({task, toggleTaskCompletion}){
    return (
        <ul>
            {task.map((e) => ( // Changed curly braces to parentheses for implicit return
                <li key={e.id}>
                    <input
                      type="checkbox"
                      checked={e.completed}
                      onChange={() => toggleTaskCompletion(e.id)}
                    />
                    <span style={{textDecoration: e.completed ? 'line-through' : 'none'}}>
                      {e.text}
                    </span>
                </li>
            ))}
        </ul>
    )
}
export default All;
