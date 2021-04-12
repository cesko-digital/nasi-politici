import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getFullName } from 'store/detail/selectors'
import { ContactsWidget } from './contactsWidget'
import { AppState } from 'store'

interface StateProps {
  fullname: string
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  fullname: getFullName,
})

export default connect(mapStateToProps)(ContactsWidget)
