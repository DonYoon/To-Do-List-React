// src/components/TodoList.js

import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';

// Declaring the TodoList functional component
const TodoList = () => {

  // Defining a state variable 'todos' with its setter function 'setTodos'
  // The initial state is set from the value retrieved from local storage or an empty array if it doesn't exist
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [currentText, setCurrentText] = useState("");

  // useEffect hook runs the function whenever 'todos' state changes
  // The function sets the new state to the local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text, completed: false, isEditing: false }];
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    setCurrentText(todos[index].text);
    const newTodos = [...todos];
    newTodos[index].isEditing = true;
    setTodos(newTodos);
  };
  
  const updateTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = currentText;
    newTodos[index].isEditing = false;
    setTodos(newTodos);
  };  

  const handleInputChange = (event) => {
    setCurrentText(event.target.value);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)} 
            />

            {todo.isEditing ? (
              <input 
                type="text"
                value={currentText}
                onChange={handleInputChange}
                onKeyDown={event => event.key === 'Enter' ? updateTodo(index) : null}
              />
            ) : (
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.text}
              </span>
            )}

            <button className="button2" onClick={() => editTodo(index)}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default TodoList;
