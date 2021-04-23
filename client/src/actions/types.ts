import { Ticket, User } from 'models'

export enum ActionTypes {
  updateTickets = 'UPDATE_TICKETS',
  updateUsers = 'UPDATE_USERS'
}

export interface UpdateTickets {
  type: ActionTypes.updateTickets
  data: Ticket[]
}

export interface UpdateUsers {
  type: ActionTypes.updateUsers
  data: User[]
}
