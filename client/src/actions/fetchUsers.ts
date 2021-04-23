import axios from 'axios'
import { AppState } from 'reducers'
import { ThunkAction } from 'redux-thunk'
import { ServiceUrl } from 'utils'
import { ActionTypes, UpdateUsers } from './types'

type FetchUsers = () => ThunkAction<void, AppState, void, UpdateUsers>

export const fetchUsers: FetchUsers = () => dispatch => {
  axios
    .get(ServiceUrl.GetAllUsers)
    .then(res => {
      if (res?.data) {
        dispatch({
          type: ActionTypes.updateUsers,
          data: res.data
        })
      }
    })
    .catch()
}
