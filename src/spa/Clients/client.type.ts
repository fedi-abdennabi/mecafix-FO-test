import { Car } from "../Car/car.type"
import { Folder } from "../folder/folder.type";

export type Clients ={
    id: number,
    type?:string,
    firstName?:string,
    lastName?:string,
    email?:string,
    adress?:string,
    phone?:string,
    city?:string,
    postalCode?:string,
    car: Car[],
    folder:Folder[]
}


export type ClientList = {
    data: Clients[],
    totalItems?: number,
    current_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    prev_page_url: string;
    from: number;
    to: number;
    total: number;
    last_page: number;
    per_page: number;
}
