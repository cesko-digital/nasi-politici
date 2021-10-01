import React, { useState } from 'react'
import ReactSelect, { Props as RSProps, OnChangeValue, components } from 'react-select'
import { ReactComponent as ArrowDown } from 'assets/images/arrow-down.svg'

import './select.scss'

type OptionType = {
  value: string
  label: string
}

interface Props {
  name: string
  defaultValue?: string | null
  onChange: (name: string, value: string | null) => void
}

const DropdownIndicator = (props: never) => (
  <components.DropdownIndicator {...props}>
    <ArrowDown />
  </components.DropdownIndicator>
)

type P = Props & Omit<RSProps<OptionType>, 'onChange'>

const Select: React.FC<P> = ({ onChange, defaultValue = null, ...restProps }) => {
  const { options, name } = restProps
  const foundOption = options?.find(option => 'value' in option && option.value === defaultValue)
  const defaultOption = foundOption && 'value' in foundOption ? foundOption : null
  const [value, setValue] = useState<OnChangeValue<OptionType, false> | null>(defaultOption)

  return (
    <ReactSelect
      {...restProps}
      onChange={valueType => {
        if (valueType && 'value' in valueType) {
          onChange(name, valueType?.value)
          setValue(valueType)
        }
      }}
      value={value}
      classNamePrefix="politics-select"
      components={{ DropdownIndicator }}
      styles={{
        control: provided => ({
          ...provided,
        }),
        indicatorSeparator: () => ({}),
        input: () => ({}),

        /*  menu: () => ({}),
        option: () => ({}),
        dropdownIndicator: () => ({}),

        */
      }}
    />
  )
}

export default Select
