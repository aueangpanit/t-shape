import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Ticket } from 'models'
import moment from 'moment-timezone'
import { useHistory } from 'react-router'
import { AppRoute, dontPropagateClick } from 'utils'

interface TicketCardProps extends Ticket {
  onClick?: (id: number) => void
}

export const TicketCard = ({
  id,
  dateCreated,
  dateUpdated,
  title = '',
  author = '',
  description,
  onClick = () => {}
}: TicketCardProps) => {
  const history = useHistory()

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
              state: { id, title, author, description }
            })
          )}
        />,
        <DeleteOutlined key="delete" />
      ]}
      onClick={() => onClick(id)}
    >
      <Card.Meta title={title} description={author} />
      <br />
      Created: {moment(dateCreated).calendar()}
      <br />
      Updated: {moment(dateUpdated).calendar()}
    </Card>
  )
}
