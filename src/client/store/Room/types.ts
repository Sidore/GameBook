import { IGameRoom } from "../../../models/GameRoom/IGameRoom";

export const GET_ROOMS = "GET_ROOMS";
export const CREATE_ROOM = "CREATE_ROOM";
export const DELETE_ROOM = "DELETE_ROOM";

interface GetRoomsAction {
    type: typeof GET_ROOMS
    data: IGameRoom[]
}

interface CreateRoomAction {
    type: typeof CREATE_ROOM
    data: string
}
  
interface DeleteRoomAction {
    type: typeof DELETE_ROOM
    data: IGameRoom
}

export type RoomActionTypes = GetRoomsAction | CreateRoomAction | DeleteRoomAction;

export interface RoomState {
    rooms: IGameRoom[]
}
