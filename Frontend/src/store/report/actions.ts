import {
  SET_REPORT_MODAL_OPEN,
  SUBMIT_REPORT_MODAL,
  SubmitReportModalActionPayload,
  ReportActionTypes,
  SubmitReportModalAction,
} from './types'

export function openReportModal(title: string): ReportActionTypes {
  return {
    type: SET_REPORT_MODAL_OPEN,
    payload: {
      open: true,
      title,
    },
  }
}

export function closeReportModal(): ReportActionTypes {
  return {
    type: SET_REPORT_MODAL_OPEN,
    payload: {
      open: false,
      title: '',
    },
  }
}

export const submitReportModal = ({
  description,
  email,
  title,
}: SubmitReportModalActionPayload): SubmitReportModalAction => ({
  type: SUBMIT_REPORT_MODAL,
  payload: {
    description,
    email,
    title,
  },
})
