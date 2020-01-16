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

const mapStateToProps = createStructuredSelector({
  fullname: getFullName,
  birthYear: getBirthYear,
  currentParty: getCurrentParty,
  isLoading: isDetailLoading,
  description: getDescription,
  photoUrl: getPhotoUrl,
})

export default connect(mapStateToProps, {loadDetail})(Detail);
