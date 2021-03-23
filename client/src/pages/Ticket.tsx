import { Button, Descriptions, PageHeader } from 'antd'
import axios from 'axios'
import { Ticket as TicketModel } from 'models'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Ticket = () => {
  const { id }: { id: string } = useParams()
  const [ticket, setTicket] = useState<TicketModel | null>(null)

  const fetchTicket = async (id: string) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVICE_URL}/ticket/${id}`
    )
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
          Done
        </Button>,
        <Button key="2">Edit</Button>,
        <Button key="3">Delete</Button>
      ]}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Description">
          {ticket.description}
        </Descriptions.Item>
        <Descriptions.Item label="Date Created">
          {moment(ticket.dateCreated).calendar()}
        </Descriptions.Item>
        <Descriptions.Item label="Last Updated">
          {moment(ticket.dateUpdated).calendar()}
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  )
}
