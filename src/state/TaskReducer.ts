import {TasksStateType} from "../App";
import {v1} from "uuid";
import {todoListID1, todoListID2} from "./TodoListReducer";

const initialState: TasksStateType = {
    [todoListID1]: [
        {id: v1(), title: 'CSS & HTML', isDone: true},
        {id: v1(), title: 'js', isDone: true},
        {id: v1(), title: 'REACT', isDone: false}],
    [todoListID2]: [
        {id: v1(), title: 'CSS & HTML', isDone: true},
        {id: v1(), title: 'js', isDone: true},
        {id: v1(), title: 'REACT', isDone: false}]

}
export const taskReducer = (state: TasksStateType = initialState, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return (
                {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.todoListID)}
            )
        case 'ADD-TASK':
            return (
                {
                    ...state,
                    [action.todoListID]: [...state[action.todoListID], {
                        id: action.todoListID,
                        title: action.title,
                        isDone: true
                    }]
                }
            )
        case 'CHANGE-STATUS':
            return (
                {
                    ...state,
                    [action.todoListID]: [...state[action.todoListID].map(t => t.id === action.id ? {
                        ...t,
                        isDone: action.isDone
                    } : t)]
                }
            )
        case 'CHANGE-TASK-TITLE':
            return (
                {...state,
                    [action.todoListID]: [...state[action.todoListID].map(t => t.id === action.id ? {
                        ...t,
                        title: action.title
                    } : t)]
                }
            )
        case 'TASK-FOR-TODOLIST':
            debugger
            return (

                {...state, [action.todoListID]: []}
            )
        default:
            return {...state}
    }
}


export type ActionType = RemoveTaskACType | AddTaskACType | ChangeStatusACType | ChangeTaskTitleACType | addTaskForTodoListACType
type RemoveTaskACType = {
    type: 'REMOVE-TASK',
    id: string,
    todoListID: string
}
export const removeTaskAC = (tID: string, todoListID: string) => {
    return {type: 'REMOVE-TASK', id: tID, todoListID: todoListID} as const
}


type AddTaskACType = {
    type: 'ADD-TASK',
    title: string,
    todoListID: string
}
export const addTaskAC = (title: string, todoListID: string) => {
    return {type: 'ADD-TASK', title: title, todoListID: todoListID} as const
}

type ChangeStatusACType = {
    type: 'CHANGE-STATUS',
    id: string,
    isDone: boolean,
    todoListID: string
}

export const changeStatusAC = (tID: string, isDone: boolean, todoListID: string) => {
    return {type: 'CHANGE-STATUS', id: tID, isDone: isDone, todoListID: todoListID} as const
}

type ChangeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    todoListID: string,
    title: string
}
export const changeTaskTitleAC = (title: string, tID: string, todoListID: string) => {
    return {type: 'CHANGE-TASK-TITLE', title: title, id: tID, todoListID: todoListID} as const
}

type addTaskForTodoListACType = {
    type: 'TASK-FOR-TODOLIST',
    todoListID: string
}
export const addTaskForTodoListAC = (todoListID: string) => { return {type: 'TASK-FOR-TODOLIST', todoListID:todoListID} as const}




