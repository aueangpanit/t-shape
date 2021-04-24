import { User } from './User'

export interface Ticket {
  ticketId: number
  title: string
  status: boolean
  author: User
  description: string
  dateCreated: Date
  dateUpdated: Date
}
