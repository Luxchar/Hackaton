import express from "express"
import DB from "../../database"
import Logger from "../../client/logger.client"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import bcrypt from "bcrypt"
import UTILS from "../../utils"

import Ticket from "../../database/models/Ticket"

export const ticketCreate = async (req: express.Request, res: express.Response) => { // Connect a user
    try {
        const { ticket_id, type, soustype, adresse, code_postal, ville, arrondissement, conseilquartier, datedecl, anneedecl, moisdecl, prefixe, intervenant, id_dmr, geo_shape, geo_point_2d, mois_annee_decla } = req.body
        const token = req.body.token

        if (!token || !ticket_id || !type || !soustype || !adresse || !code_postal || !ville || !arrondissement || !conseilquartier || !datedecl || !anneedecl || !moisdecl || !prefixe || !intervenant || !id_dmr || !geo_shape || !geo_point_2d || !mois_annee_decla) {
            throw "Badly formatted"
        }

        var User = await DB.users.find.token(token)
        if (!User) throw "An error has happened"

        Ticket.create({
            ticket_id,
            type,
            soustype,
            adresse,
            code_postal,
            ville,
            arrondissement,
            conseilquartier,
            datedecl,
            anneedecl,
            moisdecl,
            prefixe,
            intervenant,
            id_dmr,
            geo_shape,
            geo_point_2d,
            mois_annee_decla
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
