import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";


export const  App = () => {

    const tasks1 = [
        {id:1, title: 'CSS & HTML', isDone: true },
        {id:2, title: 'js', isDone: true },
        {id:3, title: 'REACT', isDone: false }
]

       const tasks2 = [
        {id:1, title: 'MILK', isDone: true },
        {id:2, title: 'BRED', isDone: false },
        {id:3, title: 'SUGAR', isDone: true }
    ]


    return (
        <div className='App'>
        <TodoList title = 'What to learn' tasks = {tasks1}/>
        <TodoList title = 'What to buy' tasks = {tasks2}/>

        </div>
    )}

export default App
