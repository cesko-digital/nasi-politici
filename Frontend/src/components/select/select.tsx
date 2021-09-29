import React, { useState } from 'react'
import ReactSelect, { components, Props as RSProps, OnChangeValue } from 'react-select'
import { useController, Control } from 'react-hook-form'

import './select.scss'

type OptionType = {
  value: string
  label: string
}

interface Props {
  control: Control
  name: string
  defaultValue?: string | null
}

const Select: React.FC<Props & RSProps<OptionType>> = ({ control, name, defaultValue = null, ...restProps }) => {
  const { options } = restProps
  const foundOption = options?.find(option => 'value' in option && option.value === defaultValue)
  const defaultOption = foundOption && 'value' in foundOption ? foundOption : null
  const [value, setValue] = useState<OnChangeValue<OptionType, false> | null>(defaultOption)
  const {
    field: { ref, onChange, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue,
  })

  return (
    <ReactSelect
      {...inputProps}
      {...restProps}
      onChange={valueType => {
        if (valueType && 'value' in valueType) {
          onChange(valueType?.value)
          setValue(valueType)
        }
      }}
      value={value}
      ref={ref}
      styles={{}}
    />
  )
}

export default Select
