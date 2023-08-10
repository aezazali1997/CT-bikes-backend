import { Document } from "mongoose"

export interface INotificaton extends Document {
    title: string
    message: string,
    recipient: string
    readStatus: boolean,
}
export interface IPaginatedNotification {
    total: number,
    notifications: INotificaton[]
}