import { Button, Space, Tabs } from 'antd'
import { PageHeader, TicketCard, TicketFilter } from 'components'
import { useTickets } from 'hooks'
import { useUsers } from 'hooks/useUsers'
import { Ticket } from 'models'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { AppRoute } from 'utils'

const Base = styled(Space)`
  width: 100%;
`

const TicketsContainer = styled(Space)`
  padding: 16px;
`

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

  const openTickets = filteredTickets.filter(ticket => ticket.status)
  const doneTickets = filteredTickets.filter(ticket => !ticket.status)

  return (
    <>
      <PageHeader
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
      <Base direction="vertical" size="large">
        <TicketFilter users={users} onFinish={filterTickets} />
        <Tabs defaultActiveKey="open">
          <Tabs.TabPane tab="Open Tickets" key="open">
            <TicketsContainer direction="vertical">
              {openTickets.map((ticket, i) => (
                <TicketCard
                  key={i}
                  {...ticket}
                  onClick={() =>
                    history.push(`${AppRoute.Ticket}/${ticket.id}`)
                  }
                />
              ))}
            </TicketsContainer>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Closed Tickets" key="close">
            <TicketsContainer direction="vertical">
              {doneTickets.map((ticket, i) => (
                <TicketCard
                  key={i}
                  {...ticket}
                  onClick={() =>
                    history.push(`${AppRoute.Ticket}/${ticket.id}`)
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
