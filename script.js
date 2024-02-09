import React, {
useState,
useCallback,
useEffect } from
"https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";



const ToDoApp = () => {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('items')) || []);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todos));
  }, [todos]);

  const toggleDone = index => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const submit = event => {
    event.preventDefault();
    setTodos([...todos, { description: textInput, done: false }]);
    setTextInput('');
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "todoapp-container" }, /*#__PURE__*/
    React.createElement("div", { className: "header" }, /*#__PURE__*/
    React.createElement("h1", null, "ToDo-App"), /*#__PURE__*/
    React.createElement("h2", null, "Offene Todos: ", todos.filter(todo => !todo.done).length), /*#__PURE__*/
    React.createElement("form", { className: "todo-form", onSubmit: submit }, /*#__PURE__*/
    React.createElement("input", {
      type: "text",
      placeholder: "Neues Todo...",
      className: "todo-input",
      onChange: e => setTextInput(e.target.value),
      value: textInput }), /*#__PURE__*/

    React.createElement("input", { type: "submit", value: "Add Todo", className: "add-button" }))), /*#__PURE__*/



    React.createElement(ToDoList, { todos: todos, toggleDone: toggleDone, deleteTodo: deleteTodo })));


};


const ToDoItem = ({ item, index, toggleDone, deleteTodo }) => {
  return /*#__PURE__*/(
    React.createElement("div", {
      className: `todo-item ${item.done ? 'done-todo' : ''}`,
      onClick: () => toggleDone(index) }, /*#__PURE__*/

    React.createElement("h1", { className: "text-lg cursor-pointer" }, item.description), /*#__PURE__*/
    React.createElement("button", {
      className: "delete-button",
      onClick: e => {
        e.stopPropagation();
        deleteTodo(index);
      } }, "L\xF6schen")));





};



const ToDoList = ({ todos, toggleDone, deleteTodo }) => {
  return /*#__PURE__*/(
    React.createElement("div", null,
    todos.map((item, index) => /*#__PURE__*/
    React.createElement(ToDoItem, {
      key: index,
      item: item,
      index: index,
      toggleDone: toggleDone,
      deleteTodo: deleteTodo }))));




};




ReactDOM.render( /*#__PURE__*/React.createElement(ToDoApp, null), document.getElementById("root"));