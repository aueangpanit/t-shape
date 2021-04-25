import { message } from 'antd'
import axios from 'axios'
import { useAct } from 'hooks'
import { useState } from 'react'
import { ServiceUrl } from 'utils'

const deleteSuccessfulMessage = 'Solution deleted successfully'

export const useDeleteSolution = (
  id: number
): [() => Promise<void>, boolean] => {
  const [loading, setLoading] = useState(false)

  const deleteSolution = useAct(async () => {
    if (loading) return

    setLoading(true)
    const res = await axios.delete(`${ServiceUrl.DeleteSolution}/${id}`)
    if (res.status === 200) {
      message.success(deleteSuccessfulMessage)
    }
    setLoading(false)
  })

  return [deleteSolution as () => Promise<void>, loading]
}
