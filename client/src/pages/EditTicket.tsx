import { PageHeader } from 'antd'
import { TicketForm } from 'components'
import { useEditTicket } from 'hooks'
import { Ticket } from 'models'

const title = 'Edit Ticket'

export const EditTicket = (props: Ticket) => {
  const { loading, editTicket } = useEditTicket(props.id)

  if (!props.id) return <div>Ticket not found</div>

  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={title}
    >
      <TicketForm
        initialValues={props}
        loading={loading}
        onFinish={editTicket}
      />
    </PageHeader>
  )
}
