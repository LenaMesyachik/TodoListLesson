import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";


export const  App = () => {
    return (
        <div className='App'>
        <TodoList title = 'What to learn'/>
        <TodoList title = 'What to buy'/>
        <TodoList title = 'What to watch'/>
        </div>
    )}

export default App
