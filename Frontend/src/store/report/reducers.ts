import { SET_REPORT_MODAL_OPEN, ReportState, ReportActionTypes } from './types'

const initialState: ReportState = {
  open: false,
  title: '',
}

export function reportReducer(state = initialState, action: ReportActionTypes): ReportState {
  switch (action.type) {
    case SET_REPORT_MODAL_OPEN: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}
