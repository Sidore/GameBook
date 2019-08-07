import { roomReducer } from "./Room/reducers";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    rooms : roomReducer
})

export type AppState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer,applyMiddleware(thunk));