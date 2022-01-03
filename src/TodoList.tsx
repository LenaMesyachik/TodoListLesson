import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType} from "./App";

type PropsTodoListType = {
    title: string,
    tasks: TaskType[]
    removeTask: (tID: string) => void,
    addTask: (title: string) => void,
    changeFilter: (filter: FilterValueType) => void,
    changeStatus: (tID: string, isDone: boolean) => void,
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
            props.addTask(title)
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
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
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
                        const onClickHandler = () => props.removeTask(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={t.id}>
                                <input type='checkbox' onChange={onChangeHandler} checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}> x</button>
                            </li>)
                    }
                )}
            </ul>
            <div>
                <button className = { props.filter === 'all' ? 'active-filter' : ""} onClick={onAllClickHandler}>ALL</button>
                <button className = { props.filter === 'active' ? 'active-filter' : ""}onClick={onActiveClickHandler}>ACTIVE</button>
                <button className = { props.filter === 'completed' ? 'active-filter' : ""}onClick={onCompletedClickHandler}>COMPLETED</button>
            </div>
        </div>
    )
}

