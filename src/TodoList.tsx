import React from 'react';

type PropsTodoListType = {
    title: string,
    tasks: TaskType[]
    removeTask: (tID: string) => void
}
type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

export const TodoList = (props: PropsTodoListType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button> +</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}>
                    <input type='checkbox' checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id)}> x</button>
                </li>)}

            </ul>
            <div>
                <button>ALL</button>
                <button>ACTIVE</button>
                <button>COMPLETED</button>
            </div>
        </div>
    )
}

