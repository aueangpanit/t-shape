import { Button, Card, Form, Input } from 'antd'
import React, { FC } from 'react'
import styled from 'styled-components'

const FormCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  min-width: 200px;
`

export interface LoginFormProps {
  title: string
  submitButtonText: string
  onFinish: (values: any) => void
  loading: boolean
}

export const LoginForm: FC<LoginFormProps> = ({
  title,
  submitButtonText,
  onFinish,
  loading
}) => (
  <FormCard title={title}>
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          {submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  </FormCard>
)
