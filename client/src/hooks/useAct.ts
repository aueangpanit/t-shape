import { message } from 'antd'
import { useCallback } from 'react'
import { AlertMessage } from 'utils'

export const useAct = (fn: (params?: any) => Promise<any>) => {
  const callback: (params: any) => Promise<void> = useCallback(
    async params => {
      try {
        await fn(params)
      } catch (error) {
        message.error(AlertMessage.SomethingWentWrong)
      }
    },
    [fn]
  )

  return callback
}
