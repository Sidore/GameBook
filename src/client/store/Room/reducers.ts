
  
  import { IGameRoom } from "../../../models/GameRoom/IGameRoom";
  import { RoomState, GET_ROOMS, CREATE_ROOM, DELETE_ROOM, RoomActionTypes } from './types'

  const initialState: RoomState = {
    rooms: []
  }
  
  export function roomReducer(
    state = initialState,
    action: RoomActionTypes
  ): RoomState {
    switch (action.type) {
      case GET_ROOMS:
        return {
            rooms: [...state.rooms, ...action.data]
        }
      case CREATE_ROOM:
        return {
            rooms: [...state.rooms, action.data]
        }
        case DELETE_ROOM:
        return {
          rooms: state.rooms.filter(
            room => room.name !== action.data.name
          )
        }
      default:
        return state
    }
  }