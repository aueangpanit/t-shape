import { Button, Form, Select } from 'antd'
import { User } from 'models'
import React, { FC } from 'react'

interface TicketFilterProps {
  users?: User[]
  onFinish: (values: any) => void
}

export const TicketFilter: FC<TicketFilterProps> = ({
  users = [],
  onFinish
}) => (
  <Form layout="inline" onFinish={onFinish}>
    <Form.Item label="Users" name="users">
      <Select
        style={{ width: 300 }}
        mode="multiple"
        allowClear
        placeholder="Please select"
      >
        {users.map(user => (
          <Select.Option key={user.email} value={user.email}>
            {user.name} ({user.email})
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
)
