import axios from 'axios'
import { AppState } from 'reducers'
import { ThunkAction } from 'redux-thunk'
import { ServiceUrl } from 'utils'
import { ActionTypes, UpdateTickets } from './types'

type FetchTickets = () => ThunkAction<void, AppState, void, UpdateTickets>

export const fetchTickets: FetchTickets = () => dispatch => {
  axios
    .get(ServiceUrl.GetAllTickets)
    .then(res => {
      if (res?.data) {
        dispatch({
          type: ActionTypes.updateTickets,
          data: res.data
        })
      }
    })
    .catch()
}
