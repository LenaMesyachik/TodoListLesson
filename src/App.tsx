import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from "./state/TodoListReducer";
import {
    addTaskAC,
    addTaskForTodoListAC,
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReducer
} from "./state/TaskReducer";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}
export type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export const App = () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, dispatchTodoList] = useReducer(todoListReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchTask] = useReducer(taskReducer, {
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
        dispatchTask(removeTaskAC(tID, todoListID))
    }

    const addTask = (title: string, todoListID: string) => {
        dispatchTask(addTaskAC(title, todoListID))
    }

    const changeStatus = (tID: string, isDone: boolean, todoListID: string) => {
        dispatchTask(changeStatusAC(tID, isDone, todoListID))
    }
    const changeTaskTitle = (title: string, tID: string, todoListID: string) => {
        dispatchTask(changeTaskTitleAC(title, tID, todoListID))
    }

    const changeFilter = (value: FilterValueType, todoListID: string) => {
        dispatchTodoList(changeFilterAC(value, todoListID))
    }

    const removeTodoList = (id: string) => {
        dispatchTodoList(removeTodoListAC(id))
    }
    const addTodoList = (title: string) => {
        const todoListID = v1()
        dispatchTodoList(addTodoListAC(todoListID,title))
        dispatchTask(addTaskForTodoListAC(todoListID))
    }



    const changeTodoListTitle = (title: string, todoListID: string) => {
        debugger
        dispatchTodoList(changeTodoListTitleAC(title, todoListID))
    }


    return (
        <div className='App'>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addTask={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(t => {
                            let tasksForTodoList = tasks[t.id]
                            if (t.filter === 'active') {
                                tasksForTodoList = tasks[t.id].filter(t => t.isDone)
                            }
                            if (t.filter === 'completed') {
                                tasksForTodoList = tasks[t.id].filter(t => !t.isDone)
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
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
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}/>
                                    </Paper>
                                </Grid>)
                        }
                    )}
                </Grid>
            </Container>
        </div>
    )
}

export default App
