import React, { useCallback } from 'react'
import { useRouteMatch } from 'react-router-dom'
import classnames from 'classnames'
import { ReactComponent as Search } from 'assets/images/search.svg'

import styles from './filters.module.scss'

export interface Props {}

const Filters: React.FC<Props> = ({}) => {

  return (
    <div>
      <h3>Nebo vyberte z následujících atributů</h3>
    </div>
  )
}

export default Filters
