import { Button, Menu } from 'antd'
import React from 'react'
import { useHistory, useLocation } from 'react-router'
import styled from 'styled-components'
import { AppRoute } from 'utils'

const LogoutButton = styled(Button)`
  float: right;
  margin-top: 7px;
  margin-right: 16px;
`

export const Appbar = () => {
  const history = useHistory()
  const location = useLocation()

  if (
    location.pathname.includes(AppRoute.Login) ||
    location.pathname.includes(AppRoute.Register)
  ) {
    return <div></div>
  }

  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" onClick={() => history.push(AppRoute.Home)}>
        Tickets
      </Menu.Item>
      <Menu.Item key="account" onClick={() => history.push(AppRoute.Account)}>
        Account
      </Menu.Item>
      <LogoutButton onClick={() => history.push(AppRoute.Login)}>
        Logout
      </LogoutButton>
    </Menu>
  )
}
