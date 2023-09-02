import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const[todoEditing, setTodoEditing] = React.useState(null);
  const[editingText, setEditingText] = React.useState("");


  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if(loadedTodos) {
      setTodos(loadedTodos)
    }
  }, []);

  React.useEffect(() => {
    if (todos.length > 0) {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json)
  }
}, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
        setTodo("");
    } else {

        alert("Enter Valid Task");
        setTodo("");
    }
  }

  // Add the deleteToDo code here
  function deleteToDo(id) {
    setTodos([...todos].filter((todo) => todo.id !== id))
  }
  
  // Add the toggleComplete code here
  function toggleComplete (id) {
    let updated = [...todos].map((todo) => {if(todo.id === id) {todo.completed = !todo.completed}; return todo});
    setTodos(updated)
  }
  
  // Add the submitEdits code here

function submitEdits(id) {
  let updated = [...todos].map((todo) => {if(todo.id === id) {todo.text = editingText}; return todo});
  setTodos(updated);
  setTodoEditing(null)
}


  return (
      <div id="todo-list">
        <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
        />
        <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) => <div className="todo" key={todo.id}>
          <div className="todo-text">
            <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
            {todo.id === todoEditing ? (
              <input type="text" onChange={(e) => setEditingText(e.target.value)}/>
            ) : (<div>{todo.text}</div>)}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (<button onClick={() => submitEdits(todo.id)}>Submit Edits</button>) : 
            (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>)}
            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
          </div>

        </div>)}
        </div>

  );
};

export default App;