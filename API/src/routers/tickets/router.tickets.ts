import { TicketIntercept } from "./intercept.tickets";

export const TicketRouter = {

    path: "/tickets",

    Create: {
        name: "create",
        description: "Create a new ticket",
        method: "POST",
        socketing: false,
        path: "/create",
        params: [],
        res: TicketIntercept.create
    },

    Get: {
        name: "get",
        description: "Get a ticket",
        method: "POST",
        socketing: false,
        path: "/get",
        params: [],
        res: TicketIntercept.get
    }

}