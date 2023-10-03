import { TicketIntercept } from "./intercept.tickets";

export const TicketRouter = {

    path: "/tickets",

    Create: {
        name: "create",
        description: "Create a new ticket",
        method: "POST",
        socketing: false,
        path: "/create",
        params: ["token", "title", "content"],
        res: TicketIntercept.create
    },

    Get: {
        name: "get",
        description: "Get a ticket",
        method: "GET",
        socketing: false,
        path: "/get",
        params: ["token", "ticket_id"],
        res: TicketIntercept.get
    }

}