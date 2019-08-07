import { TokenState, TokenActionTypes, SET_TOKEN, REMOVE_TOKEN } from "./types";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

function setToken(token: string): TokenActionTypes {
    return {
        type: SET_TOKEN,
        payload : token
    }
}

function removeToken(): TokenActionTypes {
    return {
        type: REMOVE_TOKEN
    }
}