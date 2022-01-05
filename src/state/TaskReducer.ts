import {TasksStateType} from "../App";

export const taskReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return (
                {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.todoListID)}
            )
        case 'ADD-TASK':
            return (
                {...state,
                    [action.todoListID]: [...state[action.todoListID], {
                        id: action.todoListID,
                        title: action.title,
                        isDone: true
                    }]
                }
            )
        case 'CHANGE-STATUS':
            return (
                {...state,
                    [action.todoListID]: [...state[action.todoListID].map(t => t.id === action.id ? {
                        ...t,
                        isDone: action.isDone
                    } : t)]
                }
            )
        case 'CHANGE-TASK-STATUS':
            return (
                {...state, [action.todoListID]: [...state[action.todoListID].map( t => t.id === action.id ? {...t, title:action.title} : t)]}
            )
        default:
        return {...state}
    }
}


export type ActionType = RemoveTaskACType | AddTaskACType | ChangeStatusACType | ChangeTaskTitleACType
type RemoveTaskACType = {
    type: 'REMOVE-TASK',
    id: string,
    todoListID: string
}
const removeTaskAC = (tID: string, todoListID: string) => {
    return {type: 'REMOVE-TASK', id: tID, todoListID: todoListID} as const
}


type AddTaskACType = {
    type: 'ADD-TASK',
    title: string,
    todoListID: string
}
const addTaskAC = (title: string, todoListID: string) => {
    return {type: 'ADD-TASK', title: title, todoListID: todoListID} as const
}

type ChangeStatusACType = {
    type: 'CHANGE-STATUS',
    id: string,
    isDone: boolean,
    todoListID: string
}

const changeStatusAC = (tID: string, isDone: boolean, todoListID: string) => {
    return {type: 'CHANGE-STATUS', id: tID, isDone: isDone, todoListID: todoListID} as const
}

type ChangeTaskTitleACType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    todoListID: string
    title: string
}
const changeTaskTitleAC = (title: string, tID: string, todoListID: string) => {
    return {type: 'CHANGE-TASK-STATUS', id: tID, todoListID: todoListID, title: title}
}


