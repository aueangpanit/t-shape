import { Ticket } from 'models'
import { useSelector } from 'react-redux'
import { AppState } from 'reducers'

export const useTickets = () => {
  return useSelector<AppState, Ticket[]>(({ tickets }) => tickets)
}
