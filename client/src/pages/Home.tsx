import { TicketCard } from 'components'
import { useTickets } from 'hooks'

export const Home = () => {
  const tickets = useTickets()

  console.log(tickets)

  return tickets.map((ticket, i) => <TicketCard key={i} {...ticket} />)
}
