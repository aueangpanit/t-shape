import { PageHeader } from 'antd'
import { AccountForm } from 'components'
import { useCurrentUser } from 'hooks/useCurrentUser'
import { useEditUser } from 'hooks/useEditUser'
import { useHistory } from 'react-router'
import { AppRoute } from 'utils'

const title = 'Edit Account'

export const EditAccount = () => {
  const history = useHistory()
  const [editUser, loading] = useEditUser()
  const user = useCurrentUser()

  if (!user) {
    return <div></div>
  }

  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={title}
    >
      <AccountForm
        initialValues={user}
        loading={loading}
        onFinish={async values => {
          await editUser(values)
          history.push(AppRoute.Account)
        }}
      />
    </PageHeader>
  )
}
