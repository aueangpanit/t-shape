import { useUsers } from './useUsers'

export const useTechnicians = () => {
  const users = useUsers()
  return users.filter(user => user.isTechnician)
}
