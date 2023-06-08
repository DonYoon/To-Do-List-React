// src/TodoForm.js

import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit" className="add-button">Add</button>
      </div>
    </form>
  );

};

export default TodoForm;
