import { User } from './User'

export interface Ticket {
  id: number
  title: string
  status: boolean
  author: User
  description: string
  dateCreated: Date
  dateUpdated: Date
}
