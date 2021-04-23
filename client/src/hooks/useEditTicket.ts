import { fetchTickets } from 'actions'
import { message } from 'antd'
import axios from 'axios'
import { useAct } from 'hooks'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppRoute, ServiceUrl } from 'utils'

const updateSuccessfulMessage = 'Ticket updated successfully'

export const useEditTicket = (id: number) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const editTicket = useAct(async values => {
    if (loading) return

    setLoading(true)
    await axios.put(`${ServiceUrl.UpdateTicket}/${id}`, values)
    dispatch(fetchTickets())
    message.success(updateSuccessfulMessage)
    setLoading(false)
    history.push(AppRoute.Home)
  })

  return {
    loading,
    editTicket
  }
}
