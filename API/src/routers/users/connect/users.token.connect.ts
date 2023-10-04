import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import bcrypt from "bcrypt"
import UTILS from "../../../utils"

import User from "../../../database/models/User"

export const userTokenConnect = async (req: express.Request, res: express.Response) => { // Connect a user
    try {
        const token  = req.body.token

        // if username or password badly formatted
        if(!token) throw "Badly formatted"

        var user = await User.findOne({token: token})

        if(!user) throw "User not found"

        

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Successfully connect to the user ${user.username}`)
                .setData(user)
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
