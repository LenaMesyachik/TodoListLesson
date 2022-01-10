import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type PropsTodoListType = {
    id: string,
    title: string,
    tasks: TaskType[]
    removeTask: (tID: string, todoListID: string) => void,
    addTask: (title: string, todoListID: string) => void,
    changeFilter: (value: FilterValueType, todoListID: string) => void,
    changeStatus: (tID: string, isDone: boolean, todoListID: string) => void,
    filter: FilterValueType,
    removeTodoList: (id: string) => void,
    changeTaskTitle: (title: string, tID: string, todoListID: string) => void,
    changeTodoListTitle: (title: string, todoListID: string) => void
}
type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

export const TodoList = React.memo((props: PropsTodoListType) => {
    console.log('todoList called')


    const addTask = useCallback((title: string) => {
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
    }, [props.changeFilter, props.id])

    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    return (
        <div>
            <h3><EditableSpan value={props.title} onChange={onChangeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={onClickDeleteTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addTask={addTask}/>
            <div>
                <Task tasks={tasksForTodoList}
                      id={props.id}
                      changeTaskTitle={props.changeTaskTitle}
                      removeTask = {props.removeTask}
                      changeStatus = {props.changeStatus}
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
                            onClick={onAllClickHandler}>ALL</Button>
                    <Button color={props.filter === 'active' ? 'secondary' : 'primary'}
                            onClick={onActiveClickHandler}>ACTIVE</Button>
                    <Button color={props.filter === 'completed' ? 'secondary' : 'primary'}
                            onClick={onCompletedClickHandler}>COMPLETED</Button>
                </ButtonGroup>
            </div>
        </div>
    )
})

