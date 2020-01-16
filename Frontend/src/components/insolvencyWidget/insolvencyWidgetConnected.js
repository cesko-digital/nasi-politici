import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {
  getPersonalInsolvency,
	getCompanyInsolvency,
	getFullName,
  hasInsolvency,
  hasInsolvencyData,
} from '../../store/detail/selectors'

import InsolvencyWidget from './insolvencyWidget'

const mapStateToProps = createStructuredSelector(
  {
    hasInsolvencyData: hasInsolvencyData,
    hasInsolvency: hasInsolvency,
    personalInsolvency: getPersonalInsolvency,
		companyInsolvency: getCompanyInsolvency,
		fullname: getFullName,
  }
)

export default connect(mapStateToProps)(InsolvencyWidget);
