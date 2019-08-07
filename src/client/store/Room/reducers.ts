
  
  import { IGameRoom } from "../../../models/GameRoom/IGameRoom";
  import { RoomState, SET_ROOMS, ADD_ROOM, REMOVE_ROOM, RoomActionTypes } from "./types";

  const initialState: RoomState = {
    rooms: []
  }
  
  export function roomReducer(
    state = initialState,
    action: RoomActionTypes
  ): RoomState {
    switch (action.type) {
        case SET_ROOMS:
            return {
                rooms: [...state.rooms, ...action.payload]
            }
        case ADD_ROOM:
            return {
                rooms: [...state.rooms, action.payload]
            }
        case DELETE_ROOM:
            return {
                rooms: state.rooms.filter(
                    room => room.name !== action.payload.name
                )
            }
        default:
            return state
    }
  }