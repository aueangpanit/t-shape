import { User } from 'models'
import { useSelector } from 'react-redux'
import { AppState } from 'reducers'

export const useCurrentUser = () => {
  return useSelector<AppState, User>(({ user }) => user)
}
