import React, { useCallback, useMemo } from 'react'
import { FiltersValues } from 'store/search/types'
import styles from './filters.module.scss'
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
  Object.keys(data).map(key => ({
    value: key,
    label: data[key],
  }))

const Filters: React.FC<Props> = ({ setFilter, filters }) => {
  const matchDetail = useRouteMatch('/detail/:id')
  const parties = useMemo(() => filterDataToOptions(partyData), [])
  const functions = useMemo(() => filterDataToOptions(functionData), [])
  const onSelectChange = useCallback(
    (name: string, data: string | null) => {
      console.log('changed data', data)
      setFilter(name, data, !matchDetail)
    },
    [setFilter, matchDetail],
  )

  const onInputChange = useCallback(
    event => {
      setFilter(event.target.name, event.target.value, !matchDetail)
    },
    [setFilter, matchDetail],
  )

  return (
    <>
      <Select onChange={onSelectChange} placeholder="Strana" name="party" options={parties} isSearchable={false} />
      <Input onChange={onInputChange} name="place" placeholder="Místo" />
      <Select onChange={onSelectChange} placeholder="Funkce" name="function" options={functions} isSearchable={false} />
    </>
  )
}

export default Filters
