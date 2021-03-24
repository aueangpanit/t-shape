import { fetchTickets } from 'actions'
import { message, PageHeader } from 'antd'
import axios from 'axios'
import { TicketForm } from 'components'
import { useAct } from 'hooks'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppRoute, ServiceUrl } from 'utils'

export const title = 'Create Ticket'
export const createSuccessfullyMessage = 'Ticket created successfully'

export const CreateTicket = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const onFinish = useAct(async values => {
    if (loading) return

    setLoading(true)
    await axios.post(ServiceUrl.CreateTicket, values)
    dispatch(fetchTickets())
    message.success(createSuccessfullyMessage)
    setLoading(false)
    history.push(AppRoute.Home)
  })

  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={title}
    >
      <TicketForm loading={loading} onFinish={onFinish} />
    </PageHeader>
  )
}
