import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getDemagogData} from '../../store/demagog/selectors'
import {getFullName} from '../../store/detail/selectors'
import DemagogWidget from './demagogWidget'

const mapStateToProps = createStructuredSelector({
	data: getDemagogData,
	fullname: getFullName,
})

export default connect(mapStateToProps)(DemagogWidget);
