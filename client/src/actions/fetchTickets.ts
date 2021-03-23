import axios from 'axios'
import { AppState } from 'reducers'
import { ThunkAction } from 'redux-thunk'
import { ActionTypes, UpdateTickets } from './types'

type FetchTickets = () => ThunkAction<void, AppState, void, UpdateTickets>

export const fetchTickets: FetchTickets = () => async dispatch => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_SERVICE_URL}/ticket/all`
  )
  dispatch({
    type: ActionTypes.updateTickets,
    data
  })
}
