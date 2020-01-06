import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getDemagogData, getFullName} from '../../redux/selectors'
import DemagogWidget from './demagogWidget'

const mapStateToProps = createStructuredSelector({
	data: getDemagogData,
	fullname: getFullName,
})

export default connect(mapStateToProps)(DemagogWidget);
