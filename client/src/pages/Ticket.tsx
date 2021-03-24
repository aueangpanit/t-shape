import { Button, Descriptions, PageHeader } from 'antd'
import axios from 'axios'
import { useDeleteTicket } from 'hooks'
import { Ticket as TicketModel } from 'models'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { AppRoute, dontPropagateClick, ServiceUrl } from 'utils'

export const doneButtonText = 'Done'
export const editButtonText = 'Edit'
export const deleteButtonText = 'Delete'

export const descriptionLabel = 'Description'
export const dateCreatedLabel = 'Date Created'
export const lastUpdatedLabel = 'Last Updated'

export const Ticket = () => {
  const history = useHistory()
  const { id }: { id: string } = useParams()

  const [deleteTicket, deleteTicketLoading] = useDeleteTicket(Number(id))

  const [ticket, setTicket] = useState<TicketModel | null>(null)

  const fetchTicket = async (id: string) => {
    const { data } = await axios.get(`${ServiceUrl.GetTicket}/${id}`)
    setTicket(data)
  }

  useEffect(() => {
    fetchTicket(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (ticket === null) return <div></div>

  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={ticket.title}
      subTitle={ticket.author}
      extra={[
        <Button key="1" type="primary">
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
    </PageHeader>
  )
}
