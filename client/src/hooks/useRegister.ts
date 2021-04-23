import { message } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { AppRoute, ServiceUrl } from 'utils'
import { LocalStorageValue } from 'utils/LocalStorageValue'
import { useAct } from './useAct'

const registerSuccessfulMessage = 'Register successfully'

export interface RegisterForm {
  name: string
  email: string
  password: string
}

export const useRegister = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const register = useAct(async (values: RegisterForm) => {
    console.log(values)

    if (loading) return

    setLoading(true)

    axios
      .create()
      .post(ServiceUrl.Register, values)
      .then(res => {
        localStorage.setItem(LocalStorageValue.jwt, res.data.jwt)
        message.success(registerSuccessfulMessage)
        history.push(AppRoute.Home)
      })
      .catch(error => {
        message.error(error?.response?.data)
      })

    setLoading(false)
  })

  return { register, loading }
}
