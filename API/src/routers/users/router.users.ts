import { UserIntercept } from "./intercept.users"

export const UserRouter = {
    path: "/client",

    Register: { // Register a new user
        name: "register",
        description: "Register a new user",
        method: "POST",
        socketing: false,
        path:"/register",
        params: ["username", "password"],
        res: UserIntercept.register
    },

    Login: { // Login a user with login credentials
        name: "login",
        description: "Login a user with login credentials",
        method: "POST",
        socketing: false,
        path: "/login",
        params: ["username", "password"],
        res: UserIntercept.login,
    },
    Update: {
        path: "/update",

        Status: {
            name: "updatestatus",
            method: "POST",
            socketing: false,
            description: "Update a user's status",
            path: "/status/",
            params: ["token", "newstatus"],
            res: UserIntercept.update.status
        },
        Username: {
            name: "updateusername",
            method: "GET",
            socketing: false,
            description: "Update a user's username",
            path: "/username/:newusername",
            params: ["token", "newusername"],
            res: UserIntercept.update.username
        },
        // UpdateProfilePicture: {
        //     name: "updateprofilepicture",
        //     method: "POST",
        //     socketing: false,
        //     description: "Update a user's profile picture",
        //     path: "/profilepicture/",
        //     params: ["token", "newprofile_picture"],
        //     res: UserIntercept.update.avatar
        // },
        Password: {
            name: "updatepassword",
            method: "POST",
            socketing: false,
            description: "Update a user's password",
            path: "/password/",
            params: ["token", "newpassword"],
            res: UserIntercept.update.password
        },
        Wallet_token: {
            name: "updatewallettoken",
            method: "POST",
            socketing: false,
            description: "Update a user's wallet token",
            path: "/wallet_token/",
            params: ["token", "newwallet_token"]
        },
        Channels: {
            name: "updatechannels",
            method: "POST",
            socketing: false,
            description: "Update a user's channels order",
            path: "/channels/",
            params: ["token", "newchannels"],
            res: UserIntercept.update.channels
        },
        Servers: {
            name: "updateservers",
            method: "POST",
            socketing: false,
            description: "Update a user's servers order",
            path: "/servers/",
            params: ["token", "newservers"],
            res: UserIntercept.update.servers
        }
    },

    Get: {
        path: "/get",
        User_token: {
            name: "getuser_token",
            method: "GET",
            socketing: false,
            description: "Get a user with a token",
            path: "/user/token",
            params: ["token"],
            res: UserIntercept.get.user
        },
        // Wallet_token: {
        //     name: "getwallettoken",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user wallet token",
        //     path: "/wallet_token/:wallet_token",
        //     params: ["wallet_token"],
        //     res: UserIntercept.get.wallet_token
        // },
        Username: {
            name: "getusername",
            method: "GET",
            socketing: false,
            description: "Get a user username",
            path: "/username/:user_id",
            params: ["user_id"],
            res: UserIntercept.get.username
        },
        // Avatar: {
        //     name: "getavatar",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user avatar",
        //     path: "/avatar/:user_id",
        //     params: ["user_id"],
        //     res: UserIntercept.get.avatar
        // },
        Updated_at: {
            name: "getupdatedat",
            method: "GET",
            socketing: false,
            description: "Get a user updated at",
            path: "/updated_at/:user_id",
            params: ["user_id"],
            res: UserIntercept.get.updated_at
        },
        Created_at: {
            name: "getcreatedat",
            method: "GET",
            socketing: false,
            description: "Get a user created at",
            path: "/created_at/:user_id",
            params: ["user_id"],
            res: UserIntercept.get.created_at
        },
        Last_connection: {
            name: "getlastconnection",
            method: "GET",
            socketing: false,
            description: "Get a user last connection",
            path: "/last_connection/:user_id",
            params: ["user_id"],
            res: UserIntercept.get.last_connection
        }
    }
}