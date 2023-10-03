import { update } from "./update"
import { userLogin, userRegister } from "./connect"
import { get } from "./get"


export const UserIntercept = {
    register : userRegister,
    login : userLogin,

    get: {
        user: get.UserbyToken,
        username: get.Username,
        updated_at: get.UpdatedAt,
        created_at: get.CreatedAt,
        avatar: get.Avatar,
        last_connection: get.LastConnection,
    },

    update : { 
        username: update.username,
        password: update.password,
        avatar: update.avatar,
        status: update.status,
        channels: update.channels,
        servers: update.servers
    }
}