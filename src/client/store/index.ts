import { roomReducer } from "./Room/reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    rooms : roomReducer
})

export type AppState = ReturnType<typeof rootReducer>;
