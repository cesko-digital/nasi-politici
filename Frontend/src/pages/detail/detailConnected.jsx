import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {loadDetail} from '../../redux/actions'
import {
  getFullName,
  getBirthYear,
  isDetailLoading,
  getDescription,
  getCurrentParty,
  getPhotoUrl,
} from '../../redux/selectors'

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
