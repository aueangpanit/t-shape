import { Center, LoginForm } from 'components'
import { useLogin } from 'hooks'

const title = 'Login'
const submitButtonText = title

export const Login = () => {
  const [login, loading] = useLogin()

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
