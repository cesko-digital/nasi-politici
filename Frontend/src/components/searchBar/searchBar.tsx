import React, { useCallback } from 'react'
import { useRouteMatch } from 'react-router-dom'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import styles from './searchBar.module.scss'
import Filters from 'components/filters/filtersConnected'
import Input from 'components/input/input'
import { Container } from 'components/container/container'

import { ReactComponent as Logo } from 'assets/images/logo-icon-np.svg'

export interface Props {
  form?: string
  query: string
  search: () => void
  setSearchQuery: (query: string, instantSearch: boolean) => void
  wrapperClassname?: string
  wasSearched: boolean
  resetFilters: () => void
}

const SearchBar: React.FC<Props> = ({
  form,
  wasSearched,
  setSearchQuery,
  search,
  query,
  wrapperClassname,
  resetFilters,
}) => {
  const matchDetail = useRouteMatch('/detail/:id')
  const onSubmit = useCallback(
    e => {
      e.preventDefault()
      if (matchDetail) resetFilters()
      search()
    },
    [search, matchDetail, resetFilters],
  )
  const onChange = useCallback(
    event => {
      const { value } = event.target
      if (value !== query) {
        setSearchQuery(event.target.value, !matchDetail)
      }
    },
    [setSearchQuery, query, matchDetail],
  )

  return (
    <form
      className={classnames(styles.form, form, {
        [styles.isSearched]: wasSearched && !matchDetail,
        [styles.formDetail]: matchDetail,
      })}
      onSubmit={onSubmit}
    >
      <Container className={classnames(styles.wrapper, wrapperClassname, { [styles.wrapperDetail]: matchDetail })}>
        {wasSearched && !matchDetail && (
          <Link to="/" className={styles.searchedLogo}>
            <Logo />
          </Link>
        )}
        <Input
          autoFocus={!matchDetail}
          className={styles.searchInput}
          onChange={onChange}
          value={query}
          placeholder="Jméno a příjmení"
        />
        {!matchDetail && <Filters />}
        <button type="submit" className={styles.searchBtn}>
          Hledat
        </button>
      </Container>
    </form>
  )
}

export default SearchBar
