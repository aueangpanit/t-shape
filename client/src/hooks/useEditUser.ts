import { fetchUser } from 'actions'
import { message } from 'antd'
import axios from 'axios'
import { useAct } from 'hooks'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ServiceUrl } from 'utils'

const updateSuccessfulMessage = 'User updated successfully'

export const useEditUser = (): [(params: any) => Promise<void>, boolean] => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const editUser = useAct(async values => {
    if (loading) return

    setLoading(true)
    await axios.put(ServiceUrl.UpdateUser, values)
    message.success(updateSuccessfulMessage)
    setLoading(false)

    dispatch(fetchUser())
  })

  return [editUser, loading]
}
