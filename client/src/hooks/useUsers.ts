import { User } from 'models'
import { useSelector } from 'react-redux'
import { AppState } from 'reducers'

export const useUsers = () => {
  return useSelector<AppState, User[]>(({ users }) => users)
}
