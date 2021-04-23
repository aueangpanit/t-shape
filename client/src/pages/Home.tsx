import { Button, PageHeader, Space } from 'antd'
import { TicketCard, TicketFilter } from 'components'
import { useTickets } from 'hooks'
import { useUsers } from 'hooks/useUsers'
import { Ticket } from 'models'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { AppRoute } from 'utils'

export const queueTitle = 'Queue'
export const createTicketButtonText = 'Create Ticket'

export const Home = () => {
  const history = useHistory()
  const tickets = useTickets()
  const users = useUsers()
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])

  useEffect(() => {
    setFilteredTickets(tickets)
  }, [tickets])

  const filterTickets = useCallback(
    ({ users = [] }) => {
      const userMap: { [email: string]: true } = {}
      for (const user of users) {
        userMap[user] = true
      }

      let filtered = [...tickets]

      if (users.length) {
        filtered = filtered.filter(ticket => userMap[ticket.author.email])
      }

      setFilteredTickets(filtered)
    },
    [tickets]
  )

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
        <TicketFilter users={users} onFinish={filterTickets} />
        {filteredTickets.map((ticket, i) => (
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
