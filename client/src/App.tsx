import { fetchTickets, fetchUser } from 'actions'
import { fetchUsers } from 'actions/fetchUsers'
import { message } from 'antd'
import axios from 'axios'
import { Appbar, Base } from 'components'
import { debounce } from 'lodash'
import {
  Account,
  CreateTicket,
  EditAccount,
  EditTicket,
  Home,
  Login,
  Register,
  Ticket
} from 'pages'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import { AlertMessage, AppRoute } from 'utils'
import { LocalStorageValue } from 'utils/LocalStorageValue'

const sendMessageError = debounce((text: string) => message.error(text), 1000)

const routes = [
  {
    path: AppRoute.Home,
    component: Home
  },
  {
    path: AppRoute.CreateTicket,
    component: CreateTicket
  },
  {
    path: AppRoute.EditTicket,
    component: ({ location }: any) => EditTicket(location.state)
  },
  {
    path: `${AppRoute.Ticket}/:id`,
    component: Ticket
  },
  {
    path: AppRoute.Register,
    component: Register
  },
  {
    path: AppRoute.Login,
    component: Login
  },
  {
    path: AppRoute.Account,
    component: Account
  },
  {
    path: AppRoute.EditAccount,
    component: EditAccount
  }
]

function App() {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    axios.interceptors.response.use(
      res => res,
      error => {
        if (error?.response?.status === 403) {
          sendMessageError(AlertMessage.InvalidSession)
          history.push(AppRoute.Login)
          return error
        }

        if (error?.response?.status === 400) {
          sendMessageError(AlertMessage.BadRequest)
          return error
        }

        sendMessageError(AlertMessage.SomethingWentWrong)
        return error
      }
    )

    axios.interceptors.request.use(req => {
      req.headers.authorization = `Bearer ${localStorage.getItem(
        LocalStorageValue.jwt
      )}`

      return req
    })

    dispatch(fetchUser())
    dispatch(fetchTickets())
    dispatch(fetchUsers())

    if (!localStorage.getItem(LocalStorageValue.jwt)) {
      history.push(AppRoute.Login)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Route>
        <Appbar />
        <Base>
          <Switch>
            {routes.map((route, i) => (
              <Route
                key={i}
                path={route.path}
                exact
                component={route.component}
              />
            ))}
          </Switch>
        </Base>
      </Route>
    </>
  )
}

export default App
