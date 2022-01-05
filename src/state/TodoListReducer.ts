import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export const todoListReducer = (state: TodoListType[], action: ActionType) => {
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
                [...state.map(t => t.id === action.todoListID ? {...t, title: action.value} : t)]
            )
        default:
            return [...state]
    }
}

type ActionType = RemoveTodoListACType | AddTodoListACType | ChangeTodoListTitleACType | ChangeFilterACType

type RemoveTodoListACType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

const removeTodoListAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id: id} as const
}

type AddTodoListACType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string
}
const addTodoListAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title: title, todoListID: v1()} as const
}

type ChangeTodoListTitleACType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    todoListID: string
}

const changeTodoListTitleAC = (title: string, todoListID: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, todoListID: todoListID} as const
}

type ChangeFilterACType = {
    type: 'CHANGE-FILTER',
    value: FilterValueType,
    todoListID: string
}
const changeFilterAC = (value: FilterValueType, todoListID: string) => {
    return {type: 'CHANGE-FILTER', filter: value, todoListID: todoListID} as const
}



