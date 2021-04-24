import { message } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Root } from 'Root'
import { AlertMessage, AppRoute } from 'utils'
import { LocalStorageValue } from 'utils/LocalStorageValue'
import App from './App'
import reportWebVitals from './reportWebVitals'

const history = createBrowserHistory()

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
      history.push(AppRoute.Home)
      return error
    }

    if (error?.response?.status === 400) {
      message.error(AlertMessage.BadRequest)
      return error
    }

    message.error(AlertMessage.SomethingWentWrong)
    return error
  }
)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Root>
        <App />
      </Root>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
