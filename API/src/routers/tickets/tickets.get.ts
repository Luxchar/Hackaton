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

        if (!token) {
            throw "Badly formatted"
        }

        var user = await User.findOne({ token: token })
        if (!user) throw "An error has happened"
        
        // count all tickets
        const tickets = await Ticket.countDocuments();
        console.log(tickets)
        const users = await User.countDocuments();
        const lastFourTickets = await Ticket.find({})
            .sort({ datedecl: -1 }) 
            .limit(4)               
            .exec();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const totalTicketsToday = await Ticket.countDocuments({
            datedecl: { $gte: today, $lt: tomorrow }
        });

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

            const dailyTotals = await Ticket.aggregate([
                {
                    $group: {
                        _id: "$datedecl",
                        count: { $sum: 1 } 
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]).exec();   
            
        const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

        const monthlyReports = await Ticket.aggregate([
            {
                $match: {
                    datedecl: { $gte: oneMonthAgo, $lt: today }
                }
            },
            {
                $group: {
                    _id: { year: { $year: "$datedecl" }, month: { $month: "$datedecl" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]).exec();
        
        const monthlyReports12 = await Ticket.aggregate([
            {
                $match: {
                    datedecl: { $gte: oneYearAgo, $lt: today }
                }
            },
            {
                $group: {
                    _id: { year: { $year: "$datedecl" }, month: { $month: "$datedecl" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]).exec();
            
        const mostReportedCitiesOfTheMonth = await Ticket.aggregate([
            {
                $match: {
                    datedecl: { $gte: startOfMonth, $lt: endOfMonth }
                }
            },
            {
                $group: {
                    _id: "$ville",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 4
            }
        ]).exec();
            
        const struct = {
            user_count: users, // total users
            tickets_count: totalTicketsToday, // total tickets today
            monthly_reports: monthlyReports, // total tickets this month
            tickets_reports_12_months: monthlyReports12, // array of reports for the last 12 months
            tickets_four_most_reported_cities_monthly: mostReportedCitiesOfTheMonth, // array of the four most reported city of the month
            last_four_tickets: lastFourTickets, // array of the last four tickets

            last_seven_days: null, // number of report per day for the last 7 days
        }

        Logger.log(struct)

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
