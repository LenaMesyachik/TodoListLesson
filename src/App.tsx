import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}
type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}
export type TasksStateType = {
    [key:string] : TaskType[]
}
export const App = () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState <TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: 'CSS & HTML', isDone: true},
            {id: v1(), title: 'js', isDone: true},
            {id: v1(), title: 'REACT', isDone: false}],
        [todoListID2]: [
            {id: v1(), title: 'CSS & HTML', isDone: true},
            {id: v1(), title: 'js', isDone: true},
            {id: v1(), title: 'REACT', isDone: false}]

    })

    const removeTask = (tID: string, todoListID: string) => {
        setTasks ({...tasks, [todoListID]:tasks[todoListID].filter(t => t.id !== tID)})
    }

    const addTask = (title: string,todoListID: string) => {
        setTasks({...tasks, [todoListID]: [...tasks[todoListID], {id: v1(), title: title, isDone: true} ]})
    }

    const changeStatus = (tID: string, isDone: boolean,todoListID: string) => {
        setTasks({...tasks, [todoListID]: [...tasks[todoListID].map(t => t.id === tID ? {...t, isDone: isDone} : t)]})
    }
    const changeFilter = (value: FilterValueType, todoListID: string) => {
        const todoList = todoLists.find(t => t.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }
const removeTodoList = (id:string) => {
    setTodoLists([...todoLists.filter(t => t.id !== id)])

}
    return (
        <div className='App'>
            {todoLists.map(t => {
                    let tasksForTodoList = tasks[t.id]
                    if (t.filter === 'active') {
                        tasksForTodoList = tasks[t.id].filter(t => t.isDone)
                    }
                    if (t.filter === 'completed') {
                        tasksForTodoList = tasks[t.id].filter(t => !t.isDone)
                    }
                    return (
                        <TodoList
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            filter={t.filter}
                            removeTodoList = {removeTodoList}/>)
                }
            )}
        </div>
    )
}

export default App
