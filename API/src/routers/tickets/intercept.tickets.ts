import { ticketGet } from "./tickets.get"
import { ticketCreate } from "./tickets.create"


export const TicketIntercept = {
    get: ticketGet,
    create: ticketCreate,
}