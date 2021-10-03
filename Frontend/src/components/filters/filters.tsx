import React, { useCallback, useMemo } from 'react'
import { FiltersValues } from 'store/search/types'
import Select from 'components/select/select'
import { useRouteMatch } from 'react-router-dom'
import { partyData, functionData } from 'components/filters/filterData'
import Input from 'components/input/input'

export interface Props {
  filters: FiltersValues
  filter: () => void
  setFilter: (name: string, value: string | null, instantSearch: boolean) => void
}

const filterDataToOptions = (data: { [key: string]: string }) =>
  Object.keys(data).map(key => {
    const label = data[key].charAt(0).toUpperCase() + data[key].slice(1) // capitalize first
    return {
      value: key,
      label,
    }
  })

const Filters: React.FC<Props> = ({ setFilter, filters }) => {
  const matchDetail = useRouteMatch('/detail/:id')
  const parties = useMemo(() => filterDataToOptions(partyData), [])
  const functions = useMemo(() => filterDataToOptions(functionData), [])
  const onSelectChange = useCallback(
    (name: string, data: string | null) => {
      setFilter(name, data, !matchDetail)
    },
    [setFilter, matchDetail],
  )

  const onInputChange = useCallback(
    event => {
      const { value } = event.target
      if (value) {
        setFilter(event.target.name, event.target.value, !matchDetail)
      }
    },
    [setFilter, matchDetail],
  )

  return (
    <>
      <Select onChange={onSelectChange} placeholder="Strana" name="party" options={parties} isSearchable={false} />
      <Input onChange={onInputChange} name="place" placeholder="Místo" debounceTimeout={500} />
      <Select onChange={onSelectChange} placeholder="Funkce" name="function" options={functions} isSearchable={false} />
    </>
  )
}

export default Filters
