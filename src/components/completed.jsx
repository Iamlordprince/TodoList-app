import '../App.css';
function Completed({ todos }) {

  return (
    <div className='completed-container'>
      <h1>Congratulations! You've completed these tasks</h1>
      <h3>
        <ul>
            {todos
                .filter(todo => todo.completed)
                .map(todo => (
                <li key={todo.id}>
                    {todo.text}
                </li>
                ))}
            </ul>
        </h3>

    </div>
  )
}

export default Completed;