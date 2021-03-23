import { TicketCard } from 'components'
import { useTickets } from 'hooks'
import { useHistory } from 'react-router'

export const Home = () => {
  const history = useHistory()
  const tickets = useTickets()

  return tickets.map((ticket, i) => (
    <TicketCard
      key={i}
      {...ticket}
      onClick={() => history.push(`/ticket/${ticket.id}`)}
    />
  ))
}
