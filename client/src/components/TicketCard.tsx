import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { useDeleteTicket } from 'hooks'
import { Ticket } from 'models'
import moment from 'moment-timezone'
import { FC } from 'react'
import { useHistory } from 'react-router'
import { AppRoute, dontPropagateClick } from 'utils'

export interface TicketCardProps extends Ticket {
  onClick?: (id: number) => void
}

export const TicketCard: FC<TicketCardProps> = ({
  id,
  dateCreated,
  dateUpdated,
  title = '',
  author = {},
  description,
  onClick = () => {}
}) => {
  const history = useHistory()

  const [deleteTicket] = useDeleteTicket(id)

  return (
    <Card
      hoverable
      style={{ width: 300 }}
      actions={[
        <CheckOutlined key="done" />,
        <EditOutlined
          key="edit"
          onClick={dontPropagateClick(() =>
            history.push({
              pathname: AppRoute.EditTicket,
              state: { id, title, description }
            })
          )}
        />,
        <DeleteOutlined
          key="delete"
          onClick={dontPropagateClick(deleteTicket)}
        />
      ]}
      onClick={() => onClick(id)}
    >
      <Card.Meta title={title} description={author.name} />
      <br />
      Created: {moment(dateCreated).calendar()}
      <br />
      Updated: {moment(dateUpdated).calendar()}
    </Card>
  )
}
