import { Button, Descriptions, Space, Tag } from 'antd'
import axios from 'axios'
import { PageHeader, SolutionForm, SolutionList } from 'components'
import { useDeleteTicket, useEditTicket } from 'hooks'
import { useCreateSolution } from 'hooks/useCreateSolution'
import { Solution, Ticket as TicketModel } from 'models'
import moment from 'moment-timezone'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { AppRoute, dontPropagateClick, ServiceUrl } from 'utils'

const Base = styled(Space)`
  width: 100%;
`

export const editButtonText = 'Edit'
export const deleteButtonText = 'Delete'

export const descriptionLabel = 'Description'
export const dateCreatedLabel = 'Date Created'
export const lastUpdatedLabel = 'Last Updated'

export const Ticket = () => {
  const history = useHistory()
  const { id }: { id: string } = useParams()

  const [deleteTicket, deleteTicketLoading] = useDeleteTicket(Number(id))
  const [editTicket, editTicketLoading] = useEditTicket(Number(id))
  const [createSolution, createSolutionLoading] = useCreateSolution(Number(id))

  const [ticket, setTicket] = useState<TicketModel | null>(null)
  const [solutions, setSolutions] = useState<Solution[]>([])

  const fetchTicket = useCallback((id: string) => {
    axios
      .get(ServiceUrl.GetTicket(id))
      .then(res => {
        setTicket(res.data)
      })
      .catch(error => error)
  }, [])

  const fetchSolutions = useCallback((id: string) => {
    axios
      .get(ServiceUrl.GetTicketSolutions(id))
      .then(res => {
        setSolutions(res.data)
      })
      .catch(error => error)
  }, [])

  useEffect(() => {
    fetchTicket(id)
    fetchSolutions(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (ticket === null) return <div></div>

  const ticketStatusString = ticket.status ? 'Open' : 'Closed'
  const doneButtonText = ticket.status ? 'Close' : 'Open'

  return (
    <PageHeader
      tags={
        <Tag color={ticket.status ? 'blue' : 'red'}>{ticketStatusString}</Tag>
      }
      onBack={() => window.history.back()}
      title={ticket.title}
      subTitle={ticket.author.name}
      extra={[
        <Button
          key="1"
          type="primary"
          onClick={dontPropagateClick(async () => {
            await editTicket({ ...ticket, status: !ticket.status })
            fetchTicket(id)
          })}
          loading={editTicketLoading}
        >
          {doneButtonText}
        </Button>,
        <Button
          key="2"
          onClick={dontPropagateClick(() =>
            history.push({ pathname: AppRoute.EditTicket, state: ticket })
          )}
        >
          {editButtonText}
        </Button>,
        <Button key="3" onClick={deleteTicket} loading={deleteTicketLoading}>
          {deleteButtonText}
        </Button>
      ]}
    >
      <Base size="large" direction="vertical">
        <Descriptions bordered column={1}>
          <Descriptions.Item label={descriptionLabel}>
            {ticket.description}
          </Descriptions.Item>
          <Descriptions.Item label={dateCreatedLabel}>
            {moment(ticket.dateCreated).calendar()}
          </Descriptions.Item>
          <Descriptions.Item label={lastUpdatedLabel}>
            {moment(ticket.dateUpdated).calendar()}
          </Descriptions.Item>
        </Descriptions>

        <SolutionList
          ticketId={Number(id)}
          solutions={solutions}
          fetchSolutions={() => fetchSolutions(id)}
        />

        {!ticket.status && (
          <SolutionForm
            loading={createSolutionLoading}
            onFinish={async values => {
              await createSolution(values)
              fetchSolutions(id)
            }}
          />
        )}
      </Base>
    </PageHeader>
  )
}
