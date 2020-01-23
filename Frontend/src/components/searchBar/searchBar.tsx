import React, { useCallback } from 'react'
import { useRouteMatch } from 'react-router-dom'
import classnames from 'classnames'
import { ReactComponent as Search } from 'assets/images/search.svg'

import styles from './searchBar.module.scss'

export interface Props {
  form?: string
  query: string
  search: () => void
  setSearchQuery: (query: string) => void
  wrapperClassname?: string
}

const SearchBar: React.FC<Props> = ({ form, setSearchQuery, search, query, wrapperClassname }) => {
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
      setSearchQuery(event.target.value)
    },
    [setSearchQuery],
  )
  return (
    <form className={form} onSubmit={onSubmit}>
      <div className={classnames(styles.wrapper, wrapperClassname)}>
        <input
          autoFocus={!matchDetail}
          className={styles.input}
          onChange={onChange}
          value={query}
          placeholder="Markéta Adamová"
        ></input>
        <button type="submit" className={styles.searchBtn}>
          <Search className={styles.icon} />
          <span className={styles.noIcon}>Hledat Politika/čku</span>
        </button>
      </div>
    </form>
  )
}

export default SearchBar
