import { IGameRoom } from "../../../models/GameRoom/IGameRoom";

export const SET_ROOMS = "SET_ROOMS";
export const ADD_ROOM = "ADD_ROOM";
export const REMOVE_ROOM = "REMOVE_ROOM";

interface GetRoomsAction {
    type: typeof SET_ROOMS
    payload: IGameRoom[]
}

interface CreateRoomAction {
    type: typeof ADD_ROOM
    payload: IGameRoom
}

interface DeleteRoomAction {
    type: typeof REMOVE_ROOM
    payload: IGameRoom
}

export type RoomActionTypes = GetRoomsAction | CreateRoomAction | DeleteRoomAction;

export interface RoomState {
    rooms: IGameRoom[]
}
