import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import bcrypt from "bcrypt"
import UTILS from "../../../utils"

export const userLogin = async (req: express.Request, res: express.Response) => { // Connect a user
    try {
        const { username, password } = req.body

        // if username or password badly formatted
        if(!username || !password) throw "Badly formatted"

        var User = await DB.users.find.username(username)

        var match = false
        if(User) match = await bcrypt.compare(password, User.password)

        if (!match || !User){
            Logger.warn(`A user tried to log in with an invalid password from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress} !`)
            Emitter.emit("connect", null, req.headers['x-forwarded-for'] || req.connection.remoteAddress) 
            throw "Username or password invalid"
        }

        User.last_connection = new Date().toLocaleString()
        User.save() //update the last connection date of the user in the database

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Successfully connect to the user ${username}`)
                .setData(User)
        )
    }

    catch(err) {
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}
