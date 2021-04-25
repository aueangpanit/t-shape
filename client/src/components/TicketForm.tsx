import { Button, Form, Input, Select } from 'antd'
import { useTechnicians } from 'hooks'
import { Ticket } from 'models'
import React, { FC } from 'react'

export interface TicketFormProps {
  onFinish?: (values: any) => void
  initialValues?: Partial<Ticket>
  loading?: boolean
}

export const TicketForm: FC<TicketFormProps> = props => {
  const technicians = useTechnicians()

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

      <Form.Item label="Assign" name="assignedUserId">
        <Select allowClear placeholder="Please select">
          {technicians.map(user => (
            <Select.Option key={user.userId} value={user.userId}>
              {user.name} ({user.email})
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button loading={props.loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
