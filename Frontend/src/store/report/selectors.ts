import { AppState } from '../index'

export const isReportModalOpen = (store: AppState): boolean => store.report.open
export const getReportModalTitle = (store: AppState): string => store.report.title
