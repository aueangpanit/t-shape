import { ActionTypes, UpdateUsers } from 'actions'
import { User } from 'models'

const INITIAL_STATE: User[] = []

export const users = (state: User[] = INITIAL_STATE, action: UpdateUsers) => {
  switch (action.type) {
    case ActionTypes.updateUsers: {
      return action.data
    }
    default:
      return state
  }
}
