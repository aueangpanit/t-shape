import { Button, Descriptions, PageHeader } from 'antd'
import axios from 'axios'
import { Ticket as TicketModel } from 'models'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ServiceUrl } from 'utils'

export const doneButtonText = 'Done'
export const editButtonText = 'Edit'
export const deleteButtonText = 'Delete'

export const descriptionLabel = 'Description'
export const dateCreatedLabel = 'Date Created'
export const lastUpdatedLabel = 'Last Updated'

export const Ticket = () => {
  const { id }: { id: string } = useParams()
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
        <Button key="2">{editButtonText}</Button>,
        <Button key="3">{deleteButtonText}</Button>
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
