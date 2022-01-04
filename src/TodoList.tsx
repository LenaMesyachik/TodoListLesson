import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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


    return (
        <div>
            <h3> <EditableSpan value={props.title}/>
                <button onClick={() => props.removeTodoList(props.id)}> x</button>
            </h3>
            <AddItemForm addTask={addTask}/>
            <ul>
                {props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type='checkbox' onChange={onChangeHandler} checked={t.isDone}/>
                                <EditableSpan value={t.title}/>
                                <button onClick={onClickHandler}> x</button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ""} onClick={onAllClickHandler}>ALL
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ""}
                        onClick={onActiveClickHandler}>ACTIVE
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ""}
                        onClick={onCompletedClickHandler}>COMPLETED
                </button>
            </div>
        </div>
    )
}

