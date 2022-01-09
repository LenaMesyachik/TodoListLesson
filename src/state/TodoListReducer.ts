import {FilterValueType} from "../App";
import {v1} from "uuid";


export const todoListID1 = v1()
export const todoListID2 = v1()
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}
const initialState:TodoListType[] = [
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'},
]
export const todoListReducer = (state:TodoListType[]  = initialState, action: ActionType):TodoListType[]  => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return [...state.filter(t => t.id !== action.id)]
        case 'ADD-TODOLIST' :
            return (
                [...state, {id: action.todoListID, title: action.title, filter: 'all'}])
        case 'CHANGE-TODOLIST-TITLE' :
            return (
                [...state.map(t => t.id === action.todoListID ? {...t, title: action.title} : t)]
            )
        case 'CHANGE-FILTER' :
            return (
                [...state.map(t => t.id === action.todoListID ? {...t, filter: action.filter} : t)]
            )
        default:
            return [...state]
    }
}

export type ActionType = RemoveTodoListACType | AddTodoListACType | ChangeTodoListTitleACType | ChangeFilterACType

type RemoveTodoListACType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export const removeTodoListAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id: id} as const
}

type AddTodoListACType = {
    type: 'ADD-TODOLIST',
    title: string,
    todoListID: string
}
export const addTodoListAC = (todoListID:string,title: string) => {
    return {type: 'ADD-TODOLIST', title: title, todoListID: todoListID } as const
}

type ChangeTodoListTitleACType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    todoListID: string
}



export const changeTodoListTitleAC = (title: string, todoListID: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, todoListID: todoListID} as const
}

type ChangeFilterACType = {
    type: 'CHANGE-FILTER',
    filter: FilterValueType,
    todoListID: string
}

export const changeFilterAC = (filter: FilterValueType, todoListID: string) => {
    return {type: 'CHANGE-FILTER', filter: filter, todoListID: todoListID} as const
}
