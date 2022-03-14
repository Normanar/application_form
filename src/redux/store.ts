import {combineReducers, createStore} from "redux";
import { ticketReducer } from "./ticket-reducer";
import {vacancyReducer} from "./vacancy-reducer";


let rootReducer = combineReducers({
    ticket : ticketReducer,
    vacancy : vacancyReducer,
})

export let store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>