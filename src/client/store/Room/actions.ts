import { IGameRoom } from "../../../models/GameRoom/IGameRoom";
import { SET_ROOMS, ADD_ROOM, REMOVE_ROOM, RoomActionTypes } from './types'

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

function setRooms(rooms: IGameRoom[]): RoomActionTypes {
    return {
        type: SET_ROOMS,
        payload: rooms
    }
}

function addRoom(room: IGameRoom): RoomActionTypes {
    return {
        type: ADD_ROOM,
        payload: room
    }
}

function deleteMessage(room: IGameRoom): RoomActionTypes {
    return {
        type: REMOVE_ROOM,
        payload: room
    }
}

export const getRooms = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
              return new Promise<void>((resolve) => {
                resolve();
              })
            }
        
}

// export const login = (username: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
//     // Invoke API
//     return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
//       return new Promise<void>((resolve) => {
//         dispatch(isFetching(true))
//         console.log('Login in progress')
//         setTimeout(() => {
//                 dispatch(set('this_is_access_token'))
//                 setTimeout(() => {
//                             dispatch(isFetching(false))
//                             console.log('Login done')
//                             resolve()
//                         }, 1000)
//         }, 3000)
//       })
//     }
//   }