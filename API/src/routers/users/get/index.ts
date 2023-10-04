import {getUserbyToken} from "./users.token.get"
import {getUserbyID} from "./users.id.get"
import {getUsername} from "./users.username.get"
import {getUpdatedAt} from "./users.updated_at.get"
import {getCreatedAt} from "./users.created_at.get"
import {getAvatar} from "./users.avatar.get"
import {getLastConnection} from "./users.last_connection.get"

export const get = {
    UserbyToken: getUserbyToken,
    UserbyID: getUserbyID,
    Username: getUsername,
    UpdatedAt: getUpdatedAt,
    CreatedAt: getCreatedAt,
    Avatar: getAvatar,
    LastConnection: getLastConnection,
}