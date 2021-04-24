import { fetchTickets } from 'actions'
import { message } from 'antd'
import axios from 'axios'
import { useAct } from 'hooks'
import { createSuccessfullyMessage } from 'pages/CreateTicket'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppRoute, ServiceUrl } from 'utils'

export const useCreateTicket = (): [
  (params: any) => Promise<void>,
  boolean
] => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const createTicket = useAct(async values => {
    if (loading) return

    setLoading(true)
    await axios.post(ServiceUrl.CreateTicket, values)
    dispatch(fetchTickets())
    message.success(createSuccessfullyMessage)
    setLoading(false)
    history.push(AppRoute.Home)
  })

  return [createTicket, loading]
}
