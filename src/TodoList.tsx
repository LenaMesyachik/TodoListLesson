import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType} from "./App";

type PropsTodoListType = {
    title: string,
    tasks: TaskType[]
    removeTask: (tID: string) => void,
    addTask: (title: string) => void,
    changeFilter:(filter:FilterValueType) => void
}
type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

export const TodoList = (props: PropsTodoListType) => {

    const [title, setTitle] = useState()
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)}
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>)=>{
        if (e.charCode === 13)
            addTask()}




    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}
                    onKeyPress = {onKeyPress}
                />
                <button onClick={addTask}> + </button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}>
                    <input type='checkbox' checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id)}> x</button>
                </li>)}

            </ul>
            <div>
                <button onClick={()=> props.changeFilter('all')}>ALL</button>
                <button onClick={()=> props.changeFilter('active')}>ACTIVE</button>
                <button onClick={()=> props.changeFilter('completed')}>COMPLETED</button>
            </div>
        </div>
    )
}

