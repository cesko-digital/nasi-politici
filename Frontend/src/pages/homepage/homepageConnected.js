import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {wasSearched} from '../../redux/selectors'

import Homepage from './homepage'

const mapStateToProps = createStructuredSelector({wasSearched})

export default connect(mapStateToProps)(Homepage);

