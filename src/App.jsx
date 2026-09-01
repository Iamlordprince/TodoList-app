import { useState, useEffect } from 'react'
import './App.css'
import Completed from './components/completed'
import Todo from './components/todo'

function App() {
  const [active, setActive] = useState('Todo');

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  // ADD THIS
  const addTodo = () => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: "",
        completed: false
      }
    ]);
  };


  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: true }
          : todo
      )
    );
  };


  const updateTodo = (id, text) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: text }
          : todo
      )
    );
  };

  return (
    <div className='main-container'>

      <div className='container'>
        <h1>Welcome to the ToDo List</h1>

        <div className='inside-container'>
          <button onClick={() => setActive('Todo')}>
            Todo
          </button>

          <button onClick={() => setActive('Completed')}>
            Completed
          </button>
        </div>
      </div>

      <div className='tabs'>

        {active === 'Todo' && (
          <Todo
            todos={todos}
            addTodo={addTodo}
            completeTodo={completeTodo}
            updateTodo={updateTodo}
          />
        )}

        {active === 'Completed' && (
          <Completed todos={todos} />
        )}

      </div>

    </div>
  )
}

export default App