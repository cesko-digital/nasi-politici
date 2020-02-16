import { connect } from 'react-redux'
import { resetSearchQuery } from 'store/search/actions'

import Header from './header'

export default connect(null, { onLogoClick: resetSearchQuery })(Header)
