import {combineReducers, createStore} from "redux";
import { ticketReducer } from "./ticket-reducer";


let rootReducer = combineReducers({
    ticket : ticketReducer
})

export let store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store.getState();