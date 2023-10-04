import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import { IUserModel } from "../../../database/models/User"
import { Types } from "mongoose"
import bcrypt from "bcrypt"
import { v4, v5 } from "uuid"
import Controller from "../../controller/router.controller"
import UTILS from "../../../utils"

export const userRegister = async (req: express.Request, res: express.Response) => { // Register a new user
    try {
        const { username, email, password} = req.body

        // if username or password badly formatted
        if(!username || !password || !email) throw "Badly formatted"

        var user = await DB.users.find.username(username)
        if (user) throw "User already exists"

        const user_id =  Date.now() + Math.floor(Math.random() * 1000)

        var User = await DB.users.create({
            username: username,
            password: await bcrypt.hash(password, 10),
            mail: email,
            token: (v5(username, v4()).split("-").join("") + Date.now()).toUpperCase(),
            user_id: user_id,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        })
        if(!User) throw "Failed to create user"

        User.save()

        Emitter.emit("register", User)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Successfully register")
                .setData(User)
        )

    }
    catch (err) {
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}