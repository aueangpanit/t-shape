import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  RollbackOutlined
} from '@ant-design/icons'
import { fetchTickets } from 'actions'
import { Card } from 'antd'
import { useDeleteTicket, useEditTicket } from 'hooks'
import { Ticket } from 'models'
import moment from 'moment-timezone'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { AppRoute, dontPropagateClick } from 'utils'

export interface TicketCardProps extends Ticket {
  onClick?: (id: number) => void
}

export const TicketCard: FC<TicketCardProps> = ({
  ticketId,
  dateCreated,
  dateUpdated,
  title = '',
  status,
  author = {},
  description,
  onClick = () => {}
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [deleteTicket] = useDeleteTicket(ticketId)
  const [editTicket] = useEditTicket(ticketId)

  return (
    <Card
      hoverable
      style={{ width: 300 }}
      actions={[
        <>
          {status && (
            <CheckOutlined
              key="done"
              onClick={dontPropagateClick(async () => {
                await editTicket({ title, description, status: false })
                dispatch(fetchTickets())
              })}
            />
          )}
          {!status && (
            <RollbackOutlined
              key="open"
              onClick={dontPropagateClick(async () => {
                await editTicket({ title, description, status: true })
                dispatch(fetchTickets())
              })}
            />
          )}
        </>,
        <EditOutlined
          key="edit"
          onClick={dontPropagateClick(() =>
            history.push({
              pathname: AppRoute.EditTicket,
              state: { ticketId, title, description, status }
            })
          )}
        />,
        <DeleteOutlined
          key="delete"
          onClick={dontPropagateClick(deleteTicket)}
        />
      ]}
      onClick={() => onClick(ticketId)}
    >
      <Card.Meta title={title} description={author.name} />
      <br />
      Created: {moment(dateCreated).calendar()}
      <br />
      Updated: {moment(dateUpdated).calendar()}
    </Card>
  )
}
