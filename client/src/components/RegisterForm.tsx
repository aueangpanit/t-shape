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

export interface RegisterFormProps {
  title: string
  submitButtonText: string
  onFinish: (values: any) => void
  loading?: boolean
}

export const RegisterForm: FC<RegisterFormProps> = ({
  title,
  submitButtonText,
  onFinish,
  loading
}) => {
  const history = useHistory()

  return (
    <FormCard title={title}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

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
      <Button type="link" onClick={() => history.push(AppRoute.Login)}>
        Already have an account? Click here to login.
      </Button>
    </FormCard>
  )
}
