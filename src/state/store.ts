import {combineReducers, createStore} from "redux";
import {taskReducer} from "./TaskReducer";
import {todoListReducer} from "./TodoListReducer";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todoList: todoListReducer})

export const store = createStore(rootReducer)
export type rootStateType = ReturnType<typeof  rootReducer >


// @ts-ignore
window.store = store