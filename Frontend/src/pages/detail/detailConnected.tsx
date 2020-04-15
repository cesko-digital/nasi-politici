import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { loadDetail } from 'store/detail/actions'
import {
  getBirthYear,
  getCurrentParty,
  getDeathYear,
  getDescription,
  getFullName,
  getIsValid,
  getLastUpdate,
  getPhotoUrl,
  isDetailLoading,
} from 'store/detail/selectors'

import Detail from './detail'
import { AppState } from 'store'

interface StateProps {
  birthYear: string
  currentParty: string
  deathYear: string
  description: string
  fullname: string
  isLoading: boolean
  isValid?: boolean
  lastUpdate: string
  photoUrl: string
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  birthYear: getBirthYear,
  currentParty: getCurrentParty,
  deathYear: getDeathYear,
  description: getDescription,
  fullname: getFullName,
  isLoading: isDetailLoading,
  isValid: getIsValid,
  lastUpdate: getLastUpdate,
  photoUrl: getPhotoUrl,
})

export default connect(mapStateToProps, { loadDetail })(Detail)
