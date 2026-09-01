function Todo({ todos, addTodo, completeTodo, updateTodo }) {

  return (
    <div className="todo-container">

      <h1>Set Your Today Work</h1>

      <button onClick={addTodo}>+</button>

      {todos
        .filter(todo => !todo.completed)
        .map(todo => (
          <div className="todo-item" key={todo.id}>

            <input
              className="empty-fields"
              type="text"
              placeholder="Enter your task"
              value={todo.text}
              onChange={(e) => updateTodo(todo.id, e.target.value)}
            />

            <input
              className="check-box"
              type="checkbox"
              onChange={() => completeTodo(todo.id)}
            />

          </div>
        ))}

    </div>
  );
}

export default Todo;