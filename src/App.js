import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setTodoList((prev) => {
        return prev.map((t) => (t.id === editId ? { ...t, todo } : t));
      });
      setEditId(0);
      setTodo("");
      return;
    }
    setTodoList([...todoList, { id: `${todo} - ${Date.now()}`, todo }]);
    setTodo("");
  };

  const handleDelete = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };
  const handleEdit = (id) => {
    setEditId(id);
    setTodo(() => {
      const editTodo = todoList.find((todo) => todo.id === id);
      return editTodo.todo;
    });
  };

  return (
    <div className="container">
      <div className="app">
        <h3>Todo List</h3>
        <form
          className="todoForm"
          onSubmit={(e) =>
            window.confirm("Add todo?") ? handleSubmit(e) : e.preventDefault()
          }
        >
          <input
            type="text"
            placeholder="Enter todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit"> {editId ? "Edit" : "Add"} </button>
        </form>

        <ul className="todoList">
          {todoList.length ? (
            todoList.map((t, i) => (
              <li className="todoItem" key={i}>
                <span className="todoText">{t.todo}</span>
                <button onClick={() => handleEdit(t.id)}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </li>
            ))
          ) : (
            <span>No record</span>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
