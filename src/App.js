// src/App.js
import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>To-Do List App</h1>
      <TodoList />
    </div>
  );
}

export default App;
