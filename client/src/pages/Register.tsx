import { Center, RegisterForm } from 'components'
import { useRegister } from 'hooks/useRegister'

const title = 'Register'
const submitButtonText = title

export const Register = () => {
  const [register, loading] = useRegister()

  return (
    <Center>
      <RegisterForm
        title={title}
        submitButtonText={submitButtonText}
        onFinish={register}
        loading={loading}
      />
    </Center>
  )
}
