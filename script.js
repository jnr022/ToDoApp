import React, {
  useState,
  useCallback,
  useEffect
} from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";



const ToDoApp = () => {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('items')) || []);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todos));
  }, [todos]);

  const toggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const submit = (event) => {
    event.preventDefault();
    setTodos([...todos, { description: textInput, done: false }]);
    setTextInput('');
  };

  return (
    <div className="todoapp-container">
      <div className="header">
        <h1>ToDo-App</h1>
        <h2>Offene Todos: {todos.filter((todo) => !todo.done).length}</h2>
        <form className="todo-form" onSubmit={submit}>
          <input
            type="text"
            placeholder="Neues Todo..."
            className="todo-input"
            onChange={(e) => setTextInput(e.target.value)}
            value={textInput}
          />
          <input type="submit" value="Add Todo" className="add-button" />
        </form>
      </div>

      <ToDoList todos={todos} toggleDone={toggleDone} deleteTodo={deleteTodo} />
    </div>
  );
};


const ToDoItem = ({ item, index, toggleDone, deleteTodo }) => {
  return (
    <div
      className={`todo-item ${item.done ? 'done-todo' : ''}`}
      onClick={() => toggleDone(index)}
    >
      <h1 className="text-lg cursor-pointer">{item.description}</h1>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(index);
        }}
      >
        Löschen
      </button>
    </div>
  );
};



const ToDoList = ({ todos, toggleDone, deleteTodo }) => {
  return (
    <div>
      {todos.map((item, index) => (
        <ToDoItem
          key={index}
          item={item}
          index={index}
          toggleDone={toggleDone}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};




ReactDOM.render(<ToDoApp />, document.getElementById("root"));
