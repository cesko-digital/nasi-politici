import { AppState } from 'store'

export const isReportModalOpen = (store: AppState): boolean => store.report.open
export const getReportModalTitle = (store: AppState): string => store.report.title
