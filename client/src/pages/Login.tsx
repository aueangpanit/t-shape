import { Center, LoginForm } from 'components'
import { useLogin } from 'hooks'

const title = 'Login'
const submitButtonText = title

export const Login = () => {
  const { loading, login } = useLogin()

  return (
    <Center>
      <LoginForm
        title={title}
        submitButtonText={submitButtonText}
        loading={loading}
        onFinish={login}
      />
    </Center>
  )
}
