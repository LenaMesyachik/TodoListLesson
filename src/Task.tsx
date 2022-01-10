import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsTaskType = {
    id: string,
    tasks: TaskType[]
    removeTask: (tID: string, todoListID: string) => void,
    changeStatus: (tID: string, isDone: boolean, todoListID: string) => void,
    changeTaskTitle: (title: string, tID: string, todoListID: string) => void,
}
type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

export const Task = React.memo((props: PropsTaskType) => {
    console.log('task called')

    return (
            <div>
                {props.tasks.map(t => {
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
                )}
            </div>

    )
})

