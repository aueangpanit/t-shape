import { ActionTypes, UpdateUser } from 'actions'
import { User } from 'models'

const INITIAL_STATE: User | null = null

export const user = (
  state: User | null = INITIAL_STATE,
  action: UpdateUser
) => {
  switch (action.type) {
    case ActionTypes.updateUser: {
      return action.data
    }
    default:
      return state
  }
}
