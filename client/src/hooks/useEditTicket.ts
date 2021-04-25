import { fetchTickets } from 'actions'
import { message } from 'antd'
import axios from 'axios'
import { useAct } from 'hooks'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ServiceUrl } from 'utils'

const updateSuccessfulMessage = 'Ticket updated successfully'

export const useEditTicket = (
  id: number,
  initialValues?: any
): [(params: any) => Promise<void>, boolean] => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const editTicket = useAct(async values => {
    if (loading) return

    setLoading(true)
    await axios.put(`${ServiceUrl.UpdateTicket}/${id}`, {
      ...initialValues,
      ...values
    })
    message.success(updateSuccessfulMessage)
    setLoading(false)
    dispatch(fetchTickets())
  })

  return [editTicket, loading]
}
