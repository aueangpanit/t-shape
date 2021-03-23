import { ActionTypes, UpdateTickets } from 'actions'
import { Ticket } from 'models'

const INITIAL_STATE: Ticket[] = []

export const tickets = (
  state: Ticket[] = INITIAL_STATE,
  action: UpdateTickets
) => {
  switch (action.type) {
    case ActionTypes.updateTickets: {
      return action.data
    }
    default:
      return state
  }
}
