import { PageHeader } from 'antd'
import { TicketForm } from 'components'
import { useEditTicket } from 'hooks'
import { Ticket } from 'models'
import { useHistory } from 'react-router'
import { AppRoute } from 'utils'

const title = 'Edit Ticket'

export const EditTicket = (props: Ticket) => {
  const history = useHistory()
  const [editTicket, loading] = useEditTicket(props.ticketId)

  if (!props.ticketId) return <div>Ticket not found</div>

  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={title}
    >
      <TicketForm
        initialValues={props}
        loading={loading}
        onFinish={async values => {
          await editTicket(values)
          history.push(AppRoute.Home)
        }}
      />
    </PageHeader>
  )
}
