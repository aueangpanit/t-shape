import { fetchUser } from 'actions'
import { Button, Descriptions } from 'antd'
import { PageHeader } from 'components'
import { useCurrentUser } from 'hooks/useCurrentUser'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { AppRoute } from 'utils'

const title = 'Account'
const nameLabel = 'Name'
const emailLabel = 'Email'
const technicianLabel = 'Technician'

const editButtonText = 'Edit'

export const Account = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useCurrentUser()

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) return <div></div>

  return (
    <PageHeader
      title={title}
      extra={[
        <Button
          key="1"
          type="primary"
          onClick={() => history.push(AppRoute.EditAccount)}
        >
          {editButtonText}
        </Button>
      ]}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label={nameLabel}>{user.name}</Descriptions.Item>
        <Descriptions.Item label={emailLabel}>{user.email}</Descriptions.Item>
        <Descriptions.Item label={technicianLabel}>
          {user.isTechnician ? 'Yes' : 'No'}
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  )
}
