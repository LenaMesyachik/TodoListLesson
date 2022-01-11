import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/TaskReducer";
import {useDispatch} from "react-redux";

type PropsTaskType = {
    id: string,
    tasks: TaskType[]
   /* removeTask: (tID: string, todoListID: string) => void,
    changeStatus: (tID: string, isDone: boolean, todoListID: string) => void,
    changeTaskTitle: (title: string, tID: string, todoListID: string) => void,*/
}
type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

export const Task = React.memo((props: PropsTaskType) => {
    console.log('task called')

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

    return (
            <div>
                {props.tasks.map(t => {
                    const onChangeTitle = (title: string) => {
                        changeTaskTitle(title,t.id)
                    }
                        const onClickHandler = () =>removeTask(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                           changeStatus(t.id, e.currentTarget.checked)
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
                )}
            </div>

    )
})

