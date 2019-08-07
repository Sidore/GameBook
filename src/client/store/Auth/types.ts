export const SET_TOKEN = "SET_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";

export interface SetTokenAction {
    type: typeof SET_TOKEN,
    payload: string
}

export interface RemoveTokenAction {
    type: typeof REMOVE_TOKEN
}

export type TokenActionTypes = SetTokenAction | RemoveTokenAction;

export interface TokenState {
    token: string;
    setDate: Date;
}