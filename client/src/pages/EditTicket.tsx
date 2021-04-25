import { PageHeader } from 'antd'
import { TicketForm } from 'components'
import { useEditTicket } from 'hooks'
import { Ticket } from 'models'
import { FC } from 'react'
import { useHistory } from 'react-router'
import { AppRoute } from 'utils'

const title = 'Edit Ticket'

export const EditTicket: FC<Ticket> = props => {
  const history = useHistory()
  const [editTicket, loading] = useEditTicket(props.ticketId, props)

  if (!props.ticketId) return <div>Ticket not found</div>

  console.log(props)

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
