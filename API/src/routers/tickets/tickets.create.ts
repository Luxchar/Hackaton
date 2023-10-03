import express from "express"
import DB from "../../database"
import Logger from "../../client/logger.client"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import bcrypt from "bcrypt"
import UTILS from "../../utils"

export const ticketCreate = async (req: express.Request, res: express.Response) => { // Connect a user
    try {
        const { name, email, type, description, country, city, activity, postal_code } = req.body
        const platform = req.headers["platform"] as string
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
