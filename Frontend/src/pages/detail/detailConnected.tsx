import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { loadDetail, setInitAction } from 'store/detail/actions'
import {
  getBirthYear,
  getCurrentParty,
  getDeathYear,
  getDescription,
  getFullName,
  getIsValid,
  getLastManualUpdate,
  getPhotoUrl,
  getHasPhoto,
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
  hasPhoto: boolean
  isLoading: boolean
  isValid?: boolean
  lastUpdate: string | null
  photoUrl: string
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  birthYear: getBirthYear,
  currentParty: getCurrentParty,
  deathYear: getDeathYear,
  description: getDescription,
  fullname: getFullName,
  hasPhoto: getHasPhoto,
  isLoading: isDetailLoading,
  isValid: getIsValid,
  lastUpdate: getLastManualUpdate,
  photoUrl: getPhotoUrl,
})

const dispatchProps = {
  loadDetail,
  onDispose: setInitAction,
}

export default connect(mapStateToProps, dispatchProps)(Detail)
