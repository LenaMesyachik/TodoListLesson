import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsTodoListType = {
    id: string,
    title: string,
    tasks: TaskType[]
    removeTask: (tID: string, todoListID: string) => void,
    addTask: (title: string, todoListID: string) => void,
    changeFilter: (value: FilterValueType, todoListID: string) => void,
    changeStatus: (tID: string, isDone: boolean, todoListID: string) => void,
    filter: FilterValueType,
    removeTodoList: (id: string) => void
}
type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

export const TodoList = (props: PropsTodoListType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
const onClickDeleteTodoList = () => {
    props.removeTodoList(props.id)
}

    return (
        <div>
            <h3> <EditableSpan value={props.title}/>
                <IconButton aria-label="delete" onClick={onClickDeleteTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addTask={addTask}/>
            <div>
                {props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    onChange={onChangeHandler} checked={t.isDone}
                                />
                                <EditableSpan value={t.title}/>
                                <IconButton aria-label="delete" onClick={onClickHandler}>
                                    <Delete />
                                </IconButton>
                            </div>
                        )
                    }
                )}
            </div>
            <div>
                <ButtonGroup variant="contained" aria-label="contained primary button group" disableElevation size='small'
                             style={{
                                 display:'flex',
                                 justifyContent: "space-between"}}>
                    <Button color={props.filter === 'all' ? 'secondary' : 'primary'} onClick={onAllClickHandler}>ALL</Button>
                    <Button color={props.filter === 'active' ? 'secondary' : 'primary'} onClick={onActiveClickHandler}>ACTIVE</Button>
                    <Button color={props.filter === 'completed' ? 'secondary' : 'primary'}  onClick={onCompletedClickHandler}>COMPLETED</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

