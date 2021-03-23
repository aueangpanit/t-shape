import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Ticket } from 'models'
import moment from 'moment-timezone'

interface TicketCardProps extends Ticket {
  onClick?: (id: number) => void
}

export const TicketCard = ({
  id,
  dateCreated,
  dateUpdated,
  title = '',
  author = '',
  onClick = () => {}
}: TicketCardProps) => (
  <Card
    hoverable
    style={{ width: 300 }}
    actions={[
      <CheckOutlined key="done" />,
      <EditOutlined key="edit" />,
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
