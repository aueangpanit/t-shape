import { PageHeader } from 'antd'
import { TicketForm } from 'components'
import { useCreateTicket } from 'hooks'

export const title = 'Create Ticket'
export const createSuccessfullyMessage = 'Ticket created successfully'

export const CreateTicket = () => {
  const [createTicket, loading] = useCreateTicket()

  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={title}
    >
      <TicketForm loading={loading} onFinish={createTicket} />
    </PageHeader>
  )
}
