export interface ReportState {
  open: boolean
  title: string
}

export const SET_REPORT_MODAL_OPEN = 'SET_REPORT_MODAL_OPEN'
export const SUBMIT_REPORT_MODAL = 'SUBMIT_REPORT_MODAL'

interface SetReportModalOpenAction {
  type: typeof SET_REPORT_MODAL_OPEN
  payload: ReportState
}

export interface SubmitReportModalActionPayload {
  description: string
  email: string
  title: string
}

interface SubmitReportModalAction {
  type: typeof SUBMIT_REPORT_MODAL
  payload: SubmitReportModalActionPayload
}

export type ReportActionTypes = SetReportModalOpenAction | SubmitReportModalAction
