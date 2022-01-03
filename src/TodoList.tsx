import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType} from "./App";

type PropsTodoListType = {
    id: string,
    title: string,
    tasks: TaskType[]
    removeTask: (tID: string,todoListID: string) => void,
    addTask: (title: string,todoListID: string) => void,
    changeFilter: (value: FilterValueType, todoListID: string) => void,
    changeStatus: (tID: string, isDone: boolean,todoListID: string) => void,
    filter: FilterValueType
}
type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

export const TodoList = (props: PropsTodoListType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13)
            addTask()
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
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPress}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}> + </button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type='checkbox' onChange={onChangeHandler}  checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}> x</button>
                            </li>)
                    }
                )}
            </ul>
            <div>
                <button className = { props.filter === 'all' ? 'active-filter' : ""}  onClick={onAllClickHandler}>ALL</button>
                <button className = { props.filter === 'active' ? 'active-filter' : ""} onClick={onActiveClickHandler}>ACTIVE</button>
                <button className = { props.filter === 'completed' ? 'active-filter' : ""} onClick={onCompletedClickHandler}>COMPLETED</button>
            </div>
        </div>
    )
}

