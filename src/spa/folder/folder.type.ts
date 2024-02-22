import { Car } from "../Car/car.type"
import { Categorys } from "../Categories/categories.type"
import { Clients } from "../Clients/client.type"
import { Status } from "../carStatus/carStatus.type"

export type Folder = {
    id: number,
    number : string,
    hashtag?: string,
    contrat?: string,
    notes?: string,
    vehiculeType?: string,
    mileage?: number,
    panne?: boolean,
    notesVocal?: string,
    created_at: Date,
    updated_at?: Date,
    statusId?: number,
    statusValue?: string,
    carId?: number,
    userId?: number,
    clientId?: number,
    car:Car,
    clients:Clients,
    category:Categorys[],
    status?:Status
}

export type FolderList = {
    content : Folder[],
    totalItems? : number
}


