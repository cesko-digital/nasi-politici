import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {loadDetail} from '../../store/detail/actions'
import {
  getFullName,
  getBirthYear,
  isDetailLoading,
  getDescription,
  getCurrentParty,
  getPhotoUrl,
} from '../../store/detail/selectors'

import Detail from './detail'
import { AppState } from '../../store'

interface StateProps {
	birthYear?: string,
	currentParty: string,
	description: string,
	fullname: string,
	isLoading: boolean,
	photoUrl: string,
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  birthYear: getBirthYear,
  currentParty: getCurrentParty,
  description: getDescription,
  fullname: getFullName,
  isLoading: isDetailLoading,
  photoUrl: getPhotoUrl,
})

export default connect(mapStateToProps, {loadDetail})(Detail);
