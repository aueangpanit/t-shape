import { fetchTickets } from 'actions'
import { message, PageHeader } from 'antd'
import axios from 'axios'
import { TicketForm } from 'components'
import { useAct } from 'hooks'
import { Ticket } from 'models'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { AppRoute, ServiceUrl } from 'utils'

const title = 'Edit Ticket'
const updateSuccessfulMessage = 'Ticket updated successfully'

export const EditTicket = (props: Ticket) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const onFinish = useAct(async values => {
    if (loading) return

    setLoading(true)
    await axios.put(`${ServiceUrl.UpdateTicket}/${props.id}`, values)
    dispatch(fetchTickets())
    message.success(updateSuccessfulMessage)
    setLoading(false)
    history.push(AppRoute.Home)
  })

  if (!props.id) return <div>Ticket not found</div>

  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={title}
    >
      <TicketForm initialValues={props} loading={loading} onFinish={onFinish} />
    </PageHeader>
  )
}
