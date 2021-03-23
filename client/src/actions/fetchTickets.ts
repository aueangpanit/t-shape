import axios from 'axios'
import { AppState } from 'reducers'
import { ThunkAction } from 'redux-thunk'
import { ServiceUrl } from 'utils'
import { ActionTypes, UpdateTickets } from './types'

type FetchTickets = () => ThunkAction<void, AppState, void, UpdateTickets>

export const fetchTickets: FetchTickets = () => async dispatch => {
  const { data } = await axios.get(ServiceUrl.GetAllTickets)

  dispatch({
    type: ActionTypes.updateTickets,
    data
  })
}
