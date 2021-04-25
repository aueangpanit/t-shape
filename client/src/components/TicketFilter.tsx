import { Button, Form, Select } from 'antd'
import { useTechnicians } from 'hooks'
import { useUsers } from 'hooks/useUsers'
import { User } from 'models'
import React, { FC } from 'react'

interface TicketFilterProps {
  users?: User[]
  onFinish: (values: any) => void
}

export const TicketFilter: FC<TicketFilterProps> = ({ onFinish }) => {
  const users = useUsers()
  const technicians = useTechnicians()

  return (
    <Form layout="inline" onFinish={onFinish}>
      <Form.Item label="Author" name="users">
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

      <Form.Item label="Assigned Users" name="assignedUsers">
        <Select
          style={{ width: 300 }}
          mode="multiple"
          allowClear
          placeholder="Please select"
        >
          {technicians.map(user => (
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
}
