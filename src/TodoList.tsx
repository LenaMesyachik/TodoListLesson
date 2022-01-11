import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/TaskReducer";
import {changeFilterAC, changeTodoListTitleAC, removeTodoListAC} from "./state/TodoListReducer";
import {useDispatch} from "react-redux";

type PropsTodoListType = {
    id: string,
    title: string,
    tasks: TaskType[],
    filter: FilterValueType,
   /* removeTask: (tID: string, todoListID: string) => void,
    addTask: (title: string, todoListID: string) => void,
    changeFilter: (value: FilterValueType, todoListID: string) => void,
    changeStatus: (tID: string, isDone: boolean, todoListID: string) => void,
    removeTodoList: (id: string) => void,
    changeTaskTitle: (title: string, tID: string, todoListID: string) => void,
    changeTodoListTitle: (title: string, todoListID: string) => void*/
}
type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

export const TodoList = React.memo((props: PropsTodoListType) => {
    console.log('todoList called')

    const dispatch = useDispatch()

    const removeTask = useCallback((tID: string) => {
        dispatch(removeTaskAC(tID, props.id))
    }, [] )

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [])

    const changeStatus = useCallback((tID: string, isDone: boolean) => {
        dispatch(changeStatusAC(tID, isDone, props.id))
    },[])
    const changeTaskTitle = useCallback((title: string, tID: string) => {
        dispatch(changeTaskTitleAC(title, tID, props.id))
    },[])

    const changeFilter = (filter: FilterValueType) => {
        dispatch(changeFilterAC(filter, props.id))
    }

    const removeTodoList = useCallback(() => {
        dispatch(removeTodoListAC(props.id))
    },[])
    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleAC(title, props.id))
    },[])



  /*  const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    },[props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    },[props.changeFilter, props.id])

    const onClickDeleteTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    }, [props.changeFilter, props.id])

    const onChangeTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeFilter, props.id])*/


  /*  const onAllClickHandler = useCallback(() => {
        changeFilter('all')
    },[changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => {
       changeFilter('active')
    }, [changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() => {
        changeFilter('completed')
    },[changeFilter, props.id])*/
    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    return (
        <div>
            <h3><EditableSpan value={props.title} onChange={changeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addTask={addTask}/>
            <div>
                <Task tasks={tasksForTodoList}
                      id={props.id}
                      changeTaskTitle={changeTaskTitle}
                      removeTask = {removeTask}
                      changeStatus = {changeStatus}
                />
                {/*               {tasksForTodoList.map(t => {
                    const onChangeTitle = (title: string) => {
                        props.changeTaskTitle(title,t.id, props.id)
                    }
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    onChange={onChangeHandler} checked={t.isDone}
                                />
                                <EditableSpan value={t.title} onChange={onChangeTitle}/>
                                <IconButton aria-label="delete" onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    }
                )}*/}
            </div>
            <div>
                <ButtonGroup variant="contained" aria-label="contained primary button group" disableElevation
                             size='small'
                             style={{
                                 display: 'flex',
                                 justifyContent: "space-between"
                             }}>
                    <Button color={props.filter === 'all' ? 'secondary' : 'primary'}
                            onClick={()=>changeFilter('all')}>ALL</Button>
                    <Button color={props.filter === 'active' ? 'secondary' : 'primary'}
                            onClick={()=>changeFilter('active')}>ACTIVE</Button>
                    <Button color={props.filter === 'completed' ? 'secondary' : 'primary'}
                            onClick={()=>changeFilter('completed')}>COMPLETED</Button>
                </ButtonGroup>
            </div>
        </div>
    )
})

