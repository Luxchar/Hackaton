import mongoose, {Document, Schema} from "mongoose";

export interface ITicket { // This is the interface for the user in the database
    ticket_id: number;
    type: string;
    soustype: string;
    adresse: string;
    code_postal: string;
    ville: string;
    arrondissement: string;
    conseilquartier: string;
    datedecl: string;
    anneedecl: string;
    moisdecl: number;
    prefixe: string;
    intervenant: string;
    id_dmr: string;
    geo_shape: object;
    geo_point_2d: object;
    mois_annee_decla: string;
}

export interface ITicketModel extends ITicket, Document {}

const TicketSchema = new Schema({
    ticket_id: { type: Number, required: true, unique: true, index: true },
    type: { type: String, required: true, unique: false, index: true },
    soustype: { type: String, required: true, unique: false, index: true },
    adresse: { type: String, required: true, unique: false, index: true },
    code_postal: { type: String, required: true, unique: false, index: true },
    ville: { type: String, required: true, unique: false, index: true },
    arrondissement: { type: String, required: true, unique: false, index: true },
    conseilquartier: { type: String, required: true, unique: false, index: true },
    datedecl: { type: String, required: true, unique: false, index: true },
    anneedecl: { type: String, required: true, unique: false, index: true },
    moisdecl: { type: Number, required: true, unique: false, index: true },
    prefixe: { type: String, required: true, unique: false, index: true },
    intervenant: { type: String, required: true, unique: false, index: true },
    id_dmr: { type: String, required: true, unique: false, index: true },
    geo_shape: { type: Object, required: true, unique: false, index: true }, // OBJECT ??
    geo_point_2d: { type: Object, required: true, unique: false, index: true }, // OBJECT ??
    mois_annee_decla: { type: String, required: true, unique: false, index: true },

});

export default mongoose.model<ITicketModel>("Ticket", TicketSchema);