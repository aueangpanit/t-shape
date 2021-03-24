import { Button, PageHeader, Space } from 'antd'
import { TicketCard } from 'components'
import { useTickets } from 'hooks'
import { useHistory } from 'react-router'
import { AppRoute } from 'utils'

export const queueTitle = 'Queue'
export const createTicketButtonText = 'Create Ticket'

export const Home = () => {
  const history = useHistory()
  const tickets = useTickets()

  return (
    <>
      <PageHeader
        ghost={false}
        title={queueTitle}
        extra={[
          <Button
            key={1}
            type="primary"
            onClick={() => history.push(AppRoute.CreateTicket)}
          >
            {createTicketButtonText}
          </Button>
        ]}
      />
      <Space direction="vertical">
        {tickets.map((ticket, i) => (
          <TicketCard
            key={i}
            {...ticket}
            onClick={() => history.push(`${AppRoute.Ticket}/${ticket.id}`)}
          />
        ))}
      </Space>
    </>
  )
}
