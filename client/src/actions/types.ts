import { Ticket, User } from 'models'

export enum ActionTypes {
  updateTickets = 'UPDATE_TICKETS',
  updateUsers = 'UPDATE_USERS',
  updateUser = 'UPDATE_USER'
}

export interface UpdateTickets {
  type: ActionTypes.updateTickets
  data: Ticket[]
}

export interface UpdateUsers {
  type: ActionTypes.updateUsers
  data: User[]
}

export interface UpdateUser {
  type: ActionTypes.updateUser
  data: User
}
