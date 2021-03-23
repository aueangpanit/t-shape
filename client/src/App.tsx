import { fetchTickets } from 'actions'
import { Base } from 'components'
import { CreateTicket, Home, Ticket } from 'pages'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/createTicket',
    component: CreateTicket
  },
  {
    path: '/editTicket',
    component: CreateTicket
  },
  {
    path: '/ticket/:id',
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
              component={() => <div>{route.component()}</div>}
            />
          ))}
        </Switch>
      </Route>
    </Base>
  )
}

export default App
