import { message } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { AppRoute, ServiceUrl } from 'utils'
import { LocalStorageValue } from 'utils/LocalStorageValue'
import { useAct } from './useAct'

const loginSuccessfulMessage = 'Login successfully'
const wrongCredentialsMessage = 'Wrong email or password'

export interface LoginForm {
  email: string
  password: string
}

export const useLogin = (): [(values: LoginForm) => Promise<void>, boolean] => {
  const history = useHistory()

  const [loading, setLoading] = useState(false)

  const login = useAct(async (values: LoginForm) => {
    if (loading) return

    setLoading(true)

    axios
      .create()
      .post(`${ServiceUrl.Login}`, values)
      .then(res => {
        localStorage.setItem(LocalStorageValue.jwt, res.data.jwt)
        message.success(loginSuccessfulMessage)
        history.push(AppRoute.Home)
      })
      .catch(error => {
        if (error?.response?.status === 403) {
          message.error(wrongCredentialsMessage)
        }
      })

    setLoading(false)
  })

  return [login, loading]
}
