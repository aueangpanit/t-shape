import { Descriptions } from 'antd'
import { PageHeader } from 'components'
import { useCurrentUser } from 'hooks/useCurrentUser'

const title = 'Account'
const nameLabel = 'Name'
const emailLabel = 'Email'

export const Account = () => {
  const user = useCurrentUser()

  return (
    <PageHeader title={title}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label={nameLabel}>{user.name}</Descriptions.Item>
        <Descriptions.Item label={emailLabel}>{user.email}</Descriptions.Item>
      </Descriptions>
    </PageHeader>
  )
}
