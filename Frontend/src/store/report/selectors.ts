import {AppState} from '../index'

export const isReportModalOpen = (store: AppState) => store.report.open
export const getReportModalTitle = (store: AppState) => store.report.title
