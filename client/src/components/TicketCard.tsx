import {
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined
} from '@ant-design/icons'
import { Card } from 'antd'
import { Ticket } from 'models'
import moment from 'moment-timezone'

export const TicketCard = ({
  title = '',
  author = '',
  dateCreated,
  dateUpdated
}: Ticket) => (
  <Card
    style={{ width: 300 }}
    actions={[
      <FolderOpenOutlined key="open" />,
      <EditOutlined key="edit" />,
      <DeleteOutlined key="delete" />
    ]}
  >
    <Card.Meta title={author} description={title} />
    <br />
    Created: {moment(dateCreated).calendar()}
    <br />
    Updated: {moment(dateUpdated).calendar()}
  </Card>
)
