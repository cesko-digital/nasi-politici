import React, { useCallback } from 'react'
import { useRouteMatch } from 'react-router-dom'
import classnames from 'classnames'
import { ReactComponent as Search } from 'assets/images/search.svg'

import styles from './searchBar.module.scss'
import Filters from 'components/filters/filtersConnected'
import Input from 'components/input/input'

export interface Props {
  form?: string
  query: string
  search: () => void
  setSearchQuery: (query: string, instantSearch: boolean) => void
  wrapperClassname?: string
  showFilters?: boolean
}

const SearchBar: React.FC<Props> = ({ form, setSearchQuery, search, query, wrapperClassname, showFilters }) => {
  const matchDetail = useRouteMatch('/detail/:id')
  const onSubmit = useCallback(
    e => {
      e.preventDefault()
      search()
    },
    [search],
  )
  const onChange = useCallback(
    event => {
      setSearchQuery(event.target.value, !matchDetail)
    },
    [setSearchQuery, matchDetail],
  )



  return (
    <form className={classnames(styles.form, form)} onSubmit={onSubmit}>
      <div className={classnames(styles.wrapper, wrapperClassname)}>
        <Input
          autoFocus={!matchDetail}
          className={styles.searchInput}
          onChange={onChange}
          value={query}
          placeholder="Jméno a příjmení"
        ></Input>
        {!matchDetail && <Filters />}
        <button type="submit" className={styles.searchBtn}>
          Hledat
        </button>
      </div>
    </form>
  )
}

export default SearchBar
