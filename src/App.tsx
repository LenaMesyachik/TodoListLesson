import React, {useCallback, useReducer, useState} from 'react';
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
    taskReducer, TasksStateType
} from "./state/TaskReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "./state/store";

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

export const App = () => {

    const dispatch = useDispatch()
    const todoLists = useSelector<rootStateType, TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<rootStateType, TasksStateType>(state => state.tasks)
    /*
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

        })*/

   /* const removeTask = useCallback((tID: string, todoListID: string) => {
        dispatch(removeTaskAC(tID, todoListID))
    }, [])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [])

    const changeStatus = useCallback((tID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeStatusAC(tID, isDone, todoListID))
    }, [])
    const changeTaskTitle = useCallback((title: string, tID: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(title, tID, todoListID))
    }, [])

    const changeFilter = useCallback((filter: FilterValueType, todoListID: string) => {
        dispatch(changeFilterAC(filter, todoListID))
    }, [])

    const removeTodoList = useCallback((id: string) => {
        dispatch(removeTodoListAC(id))
    }, [])*/
    const addTodoList = useCallback((title: string) => {
        const todoListID = v1()
        dispatch(addTodoListAC(todoListID, title))
        dispatch(addTaskForTodoListAC(todoListID))
    }, [])


    /*const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }, [])*/


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
                            /* if (t.filter === 'active') {
                                 tasksForTodoList = tasks[t.id].filter(t => t.isDone)
                             }
                             if (t.filter === 'completed') {
                                 tasksForTodoList = tasks[t.id].filter(t => !t.isDone)
                             }*/
                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <TodoList
                                            key={t.id}
                                            id={t.id}
                                            title={t.title}
                                            tasks={tasksForTodoList}
                                            filter={t.filter}
                                            /*removeTask={removeTask}
                                            addTask={addTask}
                                            changeFilter={changeFilter}
                                            changeStatus={changeStatus}
                                            filter={t.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}*//>
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
