import { useState, useCallback } from 'react'

export interface BindInput {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

interface UseInputReturn {
  value: string
  setValue: (value: string) => void
  reset: () => void
  bind: BindInput
}

export function useInput(initialValue: string): UseInputReturn {
  const [value, setValue] = useState(initialValue)
  const reset = useCallback(() => setValue(''), [setValue])
  return {
    value,
    setValue,
    reset,
    bind: {
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue(event.target.value)
      },
    },
  }
}
