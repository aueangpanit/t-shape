import { message } from 'antd'
import axios from 'axios'
import { useAct } from 'hooks'
import { useState } from 'react'
import { ServiceUrl } from 'utils'

const updateSuccessfulMessage = 'Solution updated successfully'

export const useEditSolution = (
  solutionId: number,
  ticketId: number
): [(params: any) => Promise<void>, boolean] => {
  const [loading, setLoading] = useState(false)

  const editSolution = useAct(async values => {
    if (loading) return

    setLoading(true)
    const res = await axios.put(ServiceUrl.UpdateSolution(String(solutionId)), {
      ...values,
      ticketId
    })
    if (res.status === 200) {
      message.success(updateSuccessfulMessage)
    }
    setLoading(false)
  })

  return [editSolution, loading]
}
