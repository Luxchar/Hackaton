import express from "express"
import DB from "../../database"
import Logger from "../../client/logger.client"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import bcrypt from "bcrypt"
import UTILS from "../../utils"
import Ticket from "../../database/models/Ticket"
import User from "../../database/models/User"

export const ticketGet = async (req: express.Request, res: express.Response) => { // Connect a user
    try {
        const token = req.body.token

        if (!token) throw "Badly formatted"

        var user = await User.findOne({ token: token })
        if (!user) throw "An error has happened"
        
        // count all tickets
        const tickets = await Ticket.countDocuments(); // total tickets
        const users = await User.countDocuments(); // total users
        const lastFourTickets = await Ticket.find({}).sort({ datedecl: -1 }).limit(4).exec(); // last four tickets

        const today = new Date();
        const totalTicketsToday = await Ticket.aggregate([
            {
              $match: {
                datedecl: {
                  $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                  $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
                }
              }
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 }
              }
            }
          ])        

        const totalTicketsMonth = await Ticket.aggregate([
            {
              $match: {
                datedecl: {
                  $gte: new Date(today.getFullYear(), today.getMonth(), 1),
                  $lt: new Date(today.getFullYear(), today.getMonth() + 1, 1)
                }
              }
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 }
              }
            }
          ])

        const monthlyReports = await Ticket.aggregate([
            {
              $group: {
                _id: { $month: { $toDate: "$datedecl" } },
                count: { $sum: 1 }
              }
            }
          ])

        const struct = {
            user_count: users, // total users
            ticket_total: tickets, // total tickets
            tickets_count_today: totalTicketsToday, // total tickets today
            tickets_count_month: totalTicketsMonth, // total tickets this month
            last_four_tickets: lastFourTickets, // array of the last four tickets

            monthly_reports: monthlyReports, // total tickets this month
            // tickets_reports_12_months: monthlyReports12, // array of reports for the last 12 months
            // tickets_four_most_reported_cities_monthly: mostReportedCitiesOfTheMonth, // array of the four most reported city of the month

            // last_seven_days: null, // number of report per day for the last 7 days
        }

        // Logger.log(struct)

        if (!tickets) {
            throw "No tickets found"
        }

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Successfully found ${tickets} tickets`)
                .setData(struct)
        )
    }

    catch(err) {
        console.error(err)
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}
