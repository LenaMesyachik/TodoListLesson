import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

export const App = () => {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'CSS & HTML', isDone: true},
        {id: v1(), title: 'js', isDone: true},
        {id: v1(), title: 'REACT', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }
    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    const removeTask = (tID: string) => {
        let filteredTasks = tasks.filter(t => t.id !== tID)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const task = {id: v1(), title: title, isDone: true}
        const newTasks = [...tasks, task]
        setTasks(newTasks)
    }


    return (
        <div className='App'>
            <TodoList title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter = {changeFilter}/>
        </div>
    )
}

export default App
