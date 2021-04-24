import axios from 'axios'
import { AppState } from 'reducers'
import { ThunkAction } from 'redux-thunk'
import { ServiceUrl } from 'utils'
import { ActionTypes, UpdateUser } from './types'

type FetchUser = () => ThunkAction<void, AppState, void, UpdateUser>

export const fetchUser: FetchUser = () => dispatch => {
  axios
    .get(ServiceUrl.GetCurrentUser)
    .then(res => {
      if (res?.data) {
        dispatch({
          type: ActionTypes.updateUser,
          data: res.data
        })
      }
    })
    .catch()
}
