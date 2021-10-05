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
  showFilters?: boolean
  wasSearched: boolean
  inHeader?: boolean
}

const SearchBar: React.FC<Props> = ({
  form,
  wasSearched,
  setSearchQuery,
  search,
  query,
  wrapperClassname,
  inHeader,
}) => {
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

  console.log({ inHeader })

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
        ></Input>
        {!matchDetail && <Filters />}
        <button type="submit" className={styles.searchBtn}>
          Hledat
        </button>
      </Container>
    </form>
  )
}

export default SearchBar
