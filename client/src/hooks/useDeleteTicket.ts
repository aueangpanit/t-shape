import { fetchTickets } from 'actions'
import { message } from 'antd'
import axios from 'axios'
import { useAct } from 'hooks'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppRoute, ServiceUrl } from 'utils'

const deleteSuccessfulMessage = 'Ticket deleted successfully'

export const useDeleteTicket = (
  id: number
): [(params: any) => Promise<void>, boolean] => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const deleteTicket = useAct(async () => {
    if (loading) return

    setLoading(true)
    await axios.delete(`${ServiceUrl.DeleteTicket}/${id}`)
    dispatch(fetchTickets())
    message.success(deleteSuccessfulMessage)
    setLoading(false)
    history.push(AppRoute.Home)
  })

  return [deleteTicket, loading]
}
