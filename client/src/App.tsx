import { fetchTickets } from 'actions'
import { Base } from 'components'
import { CreateTicket, EditTicket, Home, Ticket } from 'pages'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { AppRoute } from 'utils'

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
  }
]

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTickets())
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
