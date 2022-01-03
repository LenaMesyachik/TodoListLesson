import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";


export const App = () => {

    const tasks = [
        {id: 1, title: 'CSS & HTML', isDone: true},
        {id: 2, title: 'js', isDone: true},
        {id: 3, title: 'REACT', isDone: false}
    ]

    const removeTask = (tID:number) => {
        tasks.filter(t => t.id !== tID)



    }


    return (
        <div className='App'>
            <TodoList title='What to learn' tasks={tasks} removeTask = {removeTask}/>
        </div>
    )
}

export default App
