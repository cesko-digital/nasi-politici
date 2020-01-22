import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getDemagogData } from '../../store/demagog/selectors'
import { getFullName } from '../../store/detail/selectors'
import DemagogWidget from './demagogWidget'
import { AppState } from '../../store'

interface StateProps {
  data: {
    count: number
    id: string
    misleading: number
    misleadingPerc: number
    true: number
    truePerc: number
    untrue: number
    untruePerc: number
    unverifiable: number
    unverifiablePerc: number
  }
  fullname: string
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  data: getDemagogData,
  fullname: getFullName,
})

export default connect(mapStateToProps)(DemagogWidget)
