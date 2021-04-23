import { Button, Form, Input } from 'antd'
import { Ticket } from 'models'
import React, { FC } from 'react'

export interface TicketFormProps {
  onFinish?: (values: any) => void
  initialValues?: Partial<Ticket>
  loading?: boolean
}

export const TicketForm: FC<TicketFormProps> = props => {
  return (
    <Form name="basic" {...props} layout="vertical">
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button loading={props.loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
