import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  getPersonalInsolvency,
  getCompanyInsolvency,
  getFullName,
  hasInsolvency,
  hasInsolvencyData,
} from 'store/detail/selectors'

import InsolvencyWidget from './insolvencyWidget'
import { AppState } from 'store'

interface InsolvencyData {
  bailiffCount: number
  bailiffLink: string
  creditorCount: number
  creditorLink: string
  debtorCount: number
  debtorLink: string
}

interface StateProps {
  companyInsolvency: InsolvencyData
  fullname: string
  hasInsolvency: boolean
  hasInsolvencyData: boolean
  personalInsolvency: InsolvencyData
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  companyInsolvency: getCompanyInsolvency,
  fullname: getFullName,
  hasInsolvency: hasInsolvency,
  hasInsolvencyData: hasInsolvencyData,
  personalInsolvency: getPersonalInsolvency,
})

export default connect(mapStateToProps)(InsolvencyWidget)
