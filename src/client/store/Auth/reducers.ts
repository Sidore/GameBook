import { TokenState, TokenActionTypes, SET_TOKEN, REMOVE_TOKEN} from "./types";

const initialState: TokenState = {
    token: "",
    setDate: null
  }
  
  export function tokenReducer(
    state = initialState,
    action: TokenActionTypes
  ): TokenState {
    switch (action.type) {
        case SET_TOKEN:
            return {
                token: action.payload,
                setDate: new Date() 
            }
        case REMOVE_TOKEN:
            return {
                token: "",
                setDate: null
              }
        default:
            return state
    }
  }