# 📝 Todo List

A simple and responsive **Todo List application built with React.js** that allows users to add tasks, mark tasks as completed, and filter tasks based on their current status.

The project was built to practice important React concepts such as **state management, props, conditional rendering, reusable components, event handling, and browser Local Storage**.

---

## 🚀 Live Demo

🔗 **Live Demo:** Add your deployed website link here

---

## 📸 Preview

Add a screenshot or GIF of the project here.

```md
![Todo List Preview](./screenshots/todo-preview.png)
```

---

## ✨ Features

* ➕ Add new tasks
* ✅ Mark tasks as completed
* 🔄 Toggle task completion status
* 📋 View all tasks
* 🔵 View only active/pending tasks
* 🟢 View only completed tasks
* 💾 Persistent data using `localStorage`
* 🔄 Tasks remain saved after refreshing the page
* 🎯 Active filter button highlighting
* 🧩 Reusable React components
* 📱 Responsive user interface
* 🚫 Prevents adding empty tasks

---

## 🛠️ Technologies Used

### Frontend

* **React.js**
* **JavaScript (ES6+)**
* **HTML5**
* **CSS3**

### React Concepts

* `useState`
* `useEffect`
* Props
* Event handling
* Conditional rendering
* Array methods such as `map()` and `filter()`
* Component-based architecture

### Browser API

* **Local Storage**

---

## 📂 Project Structure

```text
todo-list/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── all.jsx
│   │   ├── active.jsx
│   │   └── completed.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 🧠 How the Application Works

The application keeps all tasks inside a React state variable.

Each task is represented as an object:

```js
{
  id: Date.now(),
  text: "Complete React project",
  completed: false
}
```

### Task Properties

| Property    | Description                                      |
| ----------- | ------------------------------------------------ |
| `id`        | Unique identifier for the task                   |
| `text`      | Task description                                 |
| `completed` | Boolean indicating whether the task is completed |

---

# ⚛️ React State Management

The application uses `useState()` to manage three main pieces of state.

### 1. Current Filter

```js
const [isActive, setIsActive] = useState('All');
```

This controls which task category is currently displayed.

Possible values:

```text
All
Active
Completed
```

---

### 2. Input Value

```js
const [input, setInput] = useState('');
```

This stores the value entered by the user in the task input field.

Whenever the user types:

```js
onChange={(e) => setInput(e.target.value)}
```

the input state is updated.

---

### 3. Tasks

```js
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem('my-task');
  return savedTasks ? JSON.parse(savedTasks) : [];
});
```

The task state is initialized from Local Storage.

If saved tasks exist, they are converted from JSON back into a JavaScript array.

If nothing is stored, the application starts with an empty array.

---

# 💾 Local Storage

One of the main features of this project is **persistent task storage using the browser's Local Storage API**.

Without Local Storage, all tasks would disappear whenever the page is refreshed.

The application stores tasks using:

```js
localStorage.setItem('my-task', JSON.stringify(tasks));
```

This is handled inside `useEffect()`:

```js
useEffect(() => {
  localStorage.setItem('my-task', JSON.stringify(tasks));
}, [tasks]);
```

The dependency array:

```js
[tasks]
```

means the effect runs whenever the task list changes.

Therefore, whenever a task is:

* Added
* Completed
* Marked incomplete

the updated task list is automatically saved.

---

## 🔄 How Local Storage Works

The process is:

```text
User changes task
       ↓
React state updates
       ↓
useEffect() runs
       ↓
tasks converted to JSON
       ↓
localStorage.setItem()
       ↓
Data saved in browser
```

When the application starts again:

```text
Application loads
       ↓
localStorage.getItem()
       ↓
Saved JSON retrieved
       ↓
JSON.parse()
       ↓
Tasks restored into React state
```

This means tasks persist even after a browser refresh.

---

# ➕ Adding a Task

The `addTask()` function handles task creation.

```js
const addTask = () => {
  if (input.trim() === '') return;

  const newTask = {
    id: Date.now(),
    completed: false,
    text: input
  };

  setTasks([...tasks, newTask]);
  setInput('');
};
```

### What happens?

1. The input is checked.
2. Empty or whitespace-only tasks are rejected.
3. A new task object is created.
4. `Date.now()` is used as the task ID.
5. The task is added to the existing task array.
6. The input field is cleared.

---

# 🚫 Empty Task Validation

The application prevents users from adding empty tasks:

```js
if (input.trim() === '') return;
```

`trim()` removes whitespace from the beginning and end of the string.

Therefore, inputs such as:

```text
""
"   "
```

are not added as tasks.

---

# ✅ Completing a Task

Each task has a `completed` property:

```js
completed: false
```

When the checkbox is clicked, the `toggleTask()` function updates the corresponding task.

```js
const toggleTask = (taskId) => {
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        completed: !task.completed
      };
    }

    return task;
  });

  setTasks(updatedTasks);
};
```

The important part is:

```js
completed: !task.completed
```

This switches the value:

```text
false → true
true  → false
```

So the same checkbox can both **complete** and **uncomplete** a task.

---

# 📋 Task Filters

The application provides three filters:

```text
ALL
ACTIVE
COMPLETED
```

The selected filter is stored in:

```js
isActive
```

The buttons update it using:

```js
setIsActive('All')
setIsActive('Active')
setIsActive('Completed')
```

---

## 📋 All Tasks

The `All` component displays every task.

Conceptually:

```js
tasks.map(...)
```

Each task is rendered with:

* Checkbox
* Task text
* Completion state

Completed tasks are displayed with a line-through effect.

---

## 🔵 Active Tasks

The Active component uses `filter()`:

```js
const activeTasks = tasks.filter(
  (task) => !task.completed
);
```

This removes completed tasks from the displayed list.

Only unfinished tasks are shown.

```text
Task A  ☐
Task B  ☐
Task C  ☐
```

---

## 🟢 Completed Tasks

The Completed component uses:

```js
const completedTasks = tasks.filter(
  (task) => task.completed
);
```

Only completed tasks are displayed.

```text
Task A  ☑
Task B  ☑
```

Completed task text is displayed with a line-through effect.

---

# 🧩 Component Architecture

Instead of keeping everything inside `App.jsx`, the application separates task views into components:

```text
App
 │
 ├── All
 │
 ├── Active
 │
 └── Completed
```

The main `App` component manages the task data and passes it to the child components using props.

For example:

```jsx
<All
  tasks={tasks}
  toggleTask={toggleTask}
/>
```

The child component receives:

```js
tasks
toggleTask
```

and uses them to render and update tasks.

---

# 🔀 Conditional Rendering

React conditional rendering is used to decide which component should be displayed.

```jsx
{isActive === 'All' && (
  <All
    tasks={tasks}
    toggleTask={toggleTask}
  />
)}

{isActive === 'Active' && (
  <Active
    tasks={tasks}
    toggleTask={toggleTask}
  />
)}

{isActive === 'Completed' && (
  <Completed
    tasks={tasks}
    toggleTask={toggleTask}
  />
)}
```

Only the component corresponding to the selected filter is rendered.

---

# 🎨 Active Button State

The selected filter button receives an `active` CSS class.

```jsx
className={
  isActive === 'All'
    ? 'active'
    : ''
}
```

This allows CSS to visually distinguish the currently selected filter.

Example:

```css
.btn button.active {
  /* active button styling */
}
```

---

# 🔁 Data Flow

The application follows a simple one-way data flow:

```text
                 App
                  │
          ┌───────┴────────┐
          │                │
       tasks          toggleTask
          │                │
     ┌────┼────┐           │
     ↓    ↓    ↓           │
    All Active Completed    │
     │    │      │          │
     └────┴──────┴──────────┘
              │
         User clicks
              │
         toggleTask()
              │
         React state
              │
          useEffect()
              │
         localStorage
```

This helped me understand how **state is passed from a parent component to child components through props**.

---

# 🧪 User Flow

A typical user interaction looks like this:

```text
1. User opens the application
              ↓
2. Saved tasks are loaded from Local Storage
              ↓
3. User enters a task
              ↓
4. User clicks "Add"
              ↓
5. Task is added to React state
              ↓
6. useEffect saves the updated tasks
              ↓
7. User clicks the checkbox
              ↓
8. Task completion status changes
              ↓
9. Updated state is saved again
              ↓
10. User can switch between All / Active / Completed
```

---

# 📦 Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd todo-list
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available through the local development URL provided by Vite.

---

# 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

# 📚 What I Learned From This Project

This project helped me understand several important React concepts.

### React Fundamentals

* Creating React components
* JSX
* `useState`
* `useEffect`
* Props
* Event handling
* Conditional rendering

### State Management

* Managing arrays inside React state
* Updating objects without directly mutating state
* Using `map()` to update individual objects
* Using `filter()` to create filtered views

### Browser APIs

* Understanding Local Storage
* `localStorage.setItem()`
* `localStorage.getItem()`
* `JSON.stringify()`
* `JSON.parse()`

### Component Design

* Breaking a UI into smaller components
* Passing data through props
* Passing functions through props
* Separating different views into reusable components

### JavaScript

* Arrow functions
* Objects
* Arrays
* `map()`
* `filter()`
* Spread operator
* Ternary operators
* Boolean values
* Event objects

---

# 🎯 Project Purpose

The main purpose of this project was not just to create a Todo application, but to understand how a **React application works internally**.

The project provided practice with the complete frontend flow:

```text
UI
 ↓
User Event
 ↓
Event Handler
 ↓
React State
 ↓
Component Re-render
 ↓
Local Storage
```

It was also an important step toward building larger React applications where multiple components share and update common state.

---

# 🔮 Future Improvements

Possible features that can be added in future versions:

* ✏️ Edit tasks
* 🗑️ Delete tasks
* 🧹 Clear completed tasks
* 🧹 Clear all tasks
* 🔢 Display task count
* ⌨️ Add tasks using the Enter key
* 🔍 Search tasks
* 📅 Add due dates
* ⭐ Add task priorities
* 🏷️ Add categories/tags
* 🌙 Dark mode
* 📱 Improve mobile UI
* 🔐 User authentication
* ☁️ Store tasks in a backend database
* 🔄 Sync tasks across devices

---

# 🌱 Future Backend Version

The current version stores tasks entirely in the browser using Local Storage.

A future full-stack version could replace Local Storage with a backend:

```text
React Frontend
      ↓
REST API
      ↓
Node.js + Express
      ↓
MongoDB
```

This would allow users to:

* Create accounts
* Log in
* Store tasks in a database
* Access tasks from different devices
* Update and delete tasks through APIs
* Persist data independently of the browser

---

# 👨‍💻 Author

**Prince Raj**

Built as a React.js learning project to strengthen frontend development and prepare for full-stack/backend development.

---

## ⭐ If You Like This Project

If this project helped you understand React or you found it useful, consider giving the repository a ⭐ on GitHub.
