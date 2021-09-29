import React, { useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { FiltersValues } from 'store/search/types'
import styles from './filters.module.scss'
import Select from 'components/select/select'

export interface Props {
  filters: FiltersValues
  filter: () => void
  setFilters: (values: FiltersValues, instantSearch: boolean) => void
}

const Filters: React.FC<Props> = ({ setFilters }) => {
  const methods = useForm()
  const onSubmit = useCallback(data => {
    console.log('form data', data)
    setFilters(data, true)
  }, [])

  const mapToOptions = (values: string[]) => values.map(value => ({ value, label: value }))

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h3>Nebo vyberte z následujících atributů</h3>
          <div className={styles.filters}>
            <div className={styles.filter}>
              <Select
                control={methods.control}
                placeholder="Zvolte kraj..."
                name="place"
                options={mapToOptions(['Pardubice', 'Praha'])}
              />
            </div>
            <button type="submit">Filtrovat</button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default Filters
