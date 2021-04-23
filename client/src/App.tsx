import { fetchTickets } from 'actions'
import { fetchUsers } from 'actions/fetchUsers'
import { message } from 'antd'
import axios from 'axios'
import { Base } from 'components'
import { CreateTicket, EditTicket, Home, Login, Register, Ticket } from 'pages'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import { AlertMessage, AppRoute } from 'utils'
import { LocalStorageValue } from 'utils/LocalStorageValue'

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
  }
]

function App() {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    axios.interceptors.request.use(req => {
      req.headers.authorization = `Bearer ${localStorage.getItem(
        LocalStorageValue.jwt
      )}`

      return req
    })

    axios.interceptors.response.use(
      res => res,
      error => {
        if (error?.response?.status === 403) {
          message.error(AlertMessage.InvalidSession)
          history.push(AppRoute.Login)
        }
      }
    )

    dispatch(fetchTickets())
    dispatch(fetchUsers())

    if (!localStorage.getItem(LocalStorageValue.jwt)) {
      history.push(AppRoute.Login)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Base>
      <Route>
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
      </Route>
    </Base>
  )
}

export default App
