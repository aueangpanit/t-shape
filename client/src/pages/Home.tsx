import { fetchTickets } from 'actions'
import { fetchUsers } from 'actions/fetchUsers'
import { Button, message, Space, Tabs } from 'antd'
import { PageHeader, TicketCard, TicketFilter } from 'components'
import { useTickets } from 'hooks'
import { useUsers } from 'hooks/useUsers'
import { Ticket } from 'models'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { AppRoute } from 'utils'

const Base = styled(Space)`
  width: 100%;
`

const TicketsContainer = styled(Space)`
  padding: 16px;
`

export const ticketsTitle = 'Tickets'
export const createTicketButtonText = 'Create Ticket'

export const successfulFilteredMessage = 'Tickets successfully filtered'

export const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const tickets = useTickets()
  const users = useUsers()

  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchUsers())
    }

    if (!tickets.length) {
      dispatch(fetchTickets())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setFilteredTickets(tickets)
  }, [tickets])

  const filterTickets = useCallback(
    ({ users = [], assignedUsers = [] }) => {
      const userMap: { [email: string]: true } = {}
      const assignedUserMap: { [email: string]: true } = {}
      for (const user of users) {
        userMap[user] = true
      }
      for (const assignedUser of assignedUsers) {
        assignedUserMap[assignedUser] = true
      }

      let filtered = [...tickets]

      if (users.length) {
        filtered = filtered.filter(ticket => userMap[ticket.author.email])
      }

      if (assignedUsers.length) {
        filtered = filtered.filter(
          ticket => assignedUserMap[ticket.assignedUser?.email ?? '']
        )
      }

      setFilteredTickets(filtered)
      message.success(successfulFilteredMessage)
    },
    [tickets]
  )

  const openTickets = filteredTickets.filter(ticket => ticket.status)
  const doneTickets = filteredTickets.filter(ticket => !ticket.status)

  return (
    <>
      <PageHeader
        title={ticketsTitle}
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
      <Base direction="vertical" size="large">
        <TicketFilter onFinish={filterTickets} />
        <Tabs defaultActiveKey="open">
          <Tabs.TabPane tab="Open Tickets" key="open">
            <TicketsContainer size={[16, 16]} wrap>
              {openTickets.map((ticket, i) => (
                <TicketCard
                  key={i}
                  {...ticket}
                  onClick={() =>
                    history.push(`${AppRoute.Ticket}/${ticket.ticketId}`)
                  }
                />
              ))}
            </TicketsContainer>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Closed Tickets" key="close">
            <TicketsContainer size={[16, 16]} wrap>
              {doneTickets.map((ticket, i) => (
                <TicketCard
                  key={i}
                  {...ticket}
                  onClick={() =>
                    history.push(`${AppRoute.Ticket}/${ticket.ticketId}`)
                  }
                />
              ))}
            </TicketsContainer>
          </Tabs.TabPane>
        </Tabs>
      </Base>
    </>
  )
}
