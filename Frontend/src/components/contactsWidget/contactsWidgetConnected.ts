import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getFullName, hasContacts, getSocialNetworksContacts, getWebContacts} from '../../store/detail/selectors'
import ContactsWidget from './contactsWidget'
import { AppState } from '../../store'

interface StateProps {
	fullname: string,
	hasContacts: boolean
	socialNetworksContacts: ReturnType<typeof getSocialNetworksContacts>,
	webContacts: ReturnType<typeof getWebContacts>,
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
	fullname: getFullName,
	hasContacts,
	socialNetworksContacts: getSocialNetworksContacts,
	webContacts: getWebContacts,
})

export default connect(mapStateToProps)(ContactsWidget);
