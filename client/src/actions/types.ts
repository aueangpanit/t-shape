import { Ticket } from 'models'

export enum ActionTypes {
  updateTickets = 'UPDATE_TICKETS'
}

export interface UpdateTickets {
  type: ActionTypes.updateTickets
  data: Ticket[]
}
