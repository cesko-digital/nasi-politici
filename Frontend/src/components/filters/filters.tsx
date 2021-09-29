import React, { useCallback } from 'react'
import { useRouteMatch } from 'react-router-dom'
import classnames from 'classnames'
import { ReactComponent as Search } from 'assets/images/search.svg'
import { useForm, FormProvider } from 'react-hook-form'
import { FiltersValues } from 'store/search/types'
import styles from './filters.module.scss'

export interface Props {
  filters: FiltersValues
  filter: () => void
  setFilters: (values: FiltersValues, instantSearch: boolean) => void
}

const Filters: React.FC<Props> = ({}) => {
  const methods = useForm()
  const onSubmit = useCallback(data => {}, [])

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h3>Nebo vyberte z následujících atributů</h3>
        </form>
      </FormProvider>
    </div>
  )
}

export default Filters
