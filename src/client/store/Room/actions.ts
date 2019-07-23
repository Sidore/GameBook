import { IGameRoom } from "../../../models/GameRoom/IGameRoom";
import { GET_ROOMS, CREATE_ROOM, DELETE_ROOM, RoomActionTypes } from './types'

export function getRooms(rooms: IGameRoom[]): RoomActionTypes {
    return {
        type: GET_ROOMS,
        data: rooms
    }
}

export function createRoom(room: IGameRoom): RoomActionTypes {
    return {
        type: CREATE_ROOM,
        data: room
    }
}

export function deleteMessage(room: IGameRoom): RoomActionTypes {
    return {
        type: DELETE_ROOM,
        data: room
    }
}