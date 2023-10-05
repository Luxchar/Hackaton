import express from "express"
import DB from "../../database"
import Logger from "../../client/logger.client"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import bcrypt from "bcrypt"
import UTILS from "../../utils"
import { v4, v5 } from "uuid"

import Ticket from "../../database/models/Ticket"

export const ticketCreate = async (req: express.Request, res: express.Response) => { // Connect a user
    try {
        const {postal_code, address, city, type, description, token} = req.body

        if (!postal_code || !address || !city || !type || !description || !token) throw "Missing fields"

        var User = await DB.users.find.token(token)
        if (!User) throw "An error has happened"

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-indexed

        // Pad the month with a leading zero if necessary.
        const monthString = month.toString().padStart(2, "0");

        // Construct the date string in the desired format.
        const dateString = `${year}-${monthString}`;

        Ticket.create({
            ticket_id: Date.now() + Math.floor(Math.random() * 1000),
            type,
            soustype: description,
            adresse: address,
            code_postal: postal_code,
            ville: city,
            arrondissement: "",
            conseilquartier: "",
            datedecl: dateString,
            anneedecl: new Date().toLocaleString().split("/")[2].split(" ")[0],
            moisdecl: new Date().getMonth(),
            prefixe: "",
            intervenant: "",
            id_dmr: "",
            geo_shape: {},
            geo_point_2d: {},
            mois_annee_decla: new Date().toLocaleString().split("/")[2].split(" ")[0],
        })

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Successfully created ticket`)
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
