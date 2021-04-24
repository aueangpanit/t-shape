import { Button, Card, Form, Input } from 'antd'
import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { AppRoute } from 'utils'

const FormCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  min-width: 200px;
`

export interface LoginFormProps {
  title: string
  submitButtonText: string
  onFinish: (values: any) => void
  loading?: boolean
}

export const LoginForm: FC<LoginFormProps> = ({
  title,
  submitButtonText,
  onFinish,
  loading
}) => {
  const history = useHistory()

  return (
    <FormCard title={title}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            {submitButtonText}
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={() => history.push(AppRoute.Register)}>
        Don't have an account yet? Click here to create an account.
      </Button>
    </FormCard>
  )
}
