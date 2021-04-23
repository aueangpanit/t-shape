import { User } from './User'

export enum TicketStatus {
  Open = 'OPEN',
  Done = 'DONE'
}

export interface Ticket {
  id: number
  title: string
  status: TicketStatus
  author: User
  description: string
  dateCreated: Date
  dateUpdated: Date
}
