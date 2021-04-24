import { fetchTickets, fetchUser } from 'actions'
import { fetchUsers } from 'actions/fetchUsers'
import { Appbar, Base } from 'components'
import {
  Account,
  CreateTicket,
  EditTicket,
  Home,
  Login,
  Register,
  Ticket
} from 'pages'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import { AppRoute } from 'utils'
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
  },
  {
    path: AppRoute.Account,
    component: Account
  }
]

function App() {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
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
