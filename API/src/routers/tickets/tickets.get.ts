import express from "express"
import DB from "../../database"
import Logger from "../../client/logger.client"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import bcrypt from "bcrypt"
import UTILS from "../../utils"

import Ticket from "../../database/models/Ticket"

export const ticketGet = async (req: express.Request, res: express.Response) => { // Connect a user
    try {
        const token = req.token

        if (!token) {
            throw "Badly formatted"
        }

        var User = await DB.users.find.token(token)
        if (!User) throw "An error has happened"
        
        var tickets = await Ticket.find({}) // find all tickets

        if (!tickets) {
            throw "No tickets found"
        }

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Successfully found ${tickets.length} tickets`)
                .setData(tickets)
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
