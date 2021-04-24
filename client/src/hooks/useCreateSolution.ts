import { message } from 'antd'
import axios from 'axios'
import { useAct } from 'hooks'
import { useState } from 'react'
import { ServiceUrl } from 'utils'

export const createSuccessfullyMessage = 'Solution created successfully'

export const useCreateSolution = (
  ticketId: number
): [(params: any) => Promise<void>, boolean] => {
  const [loading, setLoading] = useState(false)

  const createSolution = useAct(async values => {
    if (loading) return

    setLoading(true)
    await axios.post(ServiceUrl.CreateSolution, { ...values, ticketId })
    message.success(createSuccessfullyMessage)
    setLoading(false)
  })

  return [createSolution, loading]
}
