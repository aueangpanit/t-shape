import { Button, Form, FormProps, Input, Space } from 'antd'
import React, { FC } from 'react'

export interface SolutionFormProps extends Partial<FormProps> {
  title?: string
  submitButtonText?: string
  cancelText?: string
  onFinish: (values: any) => void
  onCancel?: () => void
  loading?: boolean
  initialValues?: any
}

export const SolutionForm: FC<SolutionFormProps> = ({
  title = 'Share your solution',
  submitButtonText = 'Submit',
  cancelText = 'Cancel',
  onFinish,
  onCancel,
  loading,
  initialValues = {},
  ...rest
}) => (
  <Form
    {...rest}
    initialValues={initialValues}
    layout="vertical"
    onFinish={onFinish}
  >
    <Form.Item label={title} name="description">
      <Input.TextArea />
    </Form.Item>

    <Form.Item>
      <Space>
        <Button loading={loading} type="primary" htmlType="submit">
          {submitButtonText}
        </Button>
        {Boolean(onCancel) && <Button onClick={onCancel}>{cancelText}</Button>}
      </Space>
    </Form.Item>
  </Form>
)
