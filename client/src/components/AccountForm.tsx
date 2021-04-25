import { Button, Form, FormProps, Input, Radio } from 'antd'
import { User } from 'models'
import React, { FC } from 'react'

export interface AccountFormProps extends FormProps {
  initialValues?: User
  submitButtonText?: string
  onFinish: (values: any) => void
  loading?: boolean
}

export const AccountForm: FC<AccountFormProps> = ({
  initialValues = {},
  submitButtonText = 'Submit',
  onFinish,
  loading,
  ...rest
}) => (
  <Form
    initialValues={initialValues}
    layout="vertical"
    onFinish={onFinish}
    {...rest}
  >
    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item
      label="Are you a technician?"
      name="isTechnician"
      rules={[{ required: true }]}
    >
      <Radio.Group>
        <Radio value={true}>Yes</Radio>
        <Radio value={false}>No</Radio>
      </Radio.Group>
    </Form.Item>

    <Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">
        {submitButtonText}
      </Button>
    </Form.Item>
  </Form>
)
