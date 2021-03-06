import { Contact } from '../../services/apiTypes'

export interface Insolvency {
  bailiffCount: number
  bailiffLink: string
  creditorCount: number
  creditorLink: string
  debtorCount: number
  debtorLink: string
}

export interface Role {
  dateFrom: string | null
  dateTo: string | null
  organisation: string
  role: string
}

export interface Sponsor {
  donatedAmount: number
  party: string
  source: string | null
  year: number
}

export interface Connection {
  company: string
  ico: string
  since: string
  until: string | null
  description: string
}

export interface Detail {
  birthDate: string
  contacts: Contact[]
  companyConnection: string
  connections: Connection[]
  currentParty: string
  deathDate: string | null
  description: string
  hasPhoto: boolean
  id: string
  insolvencyCompany: Insolvency
  insolvencyPerson: Insolvency
  lastManualUpdate: string
  lastUpdate: string
  name: string
  namePrefix: string
  nameSuffix: string
  notificationRegisterId: string
  notificationRegisterStatements: []
  photo: string
  roles: Role[]
  source: string
  sourceInsolvency: string
  sourceSponzor: string
  sourceRegisterStatements: string
  sourceRoles: string
  sponsor: Sponsor[]
  status: string
  surname: string
  valid?: boolean
}

export interface DetailState {
  detail: Detail
  loadingDetail: boolean
  showAllRoles: boolean
  showAllDonations: boolean
  showAllNotifications: boolean
}

export enum DetailSections {
  OVERVIEW = 'OVERVIEW',
  CAREER = 'CAREER',
  ENGAGEMENT = 'ENGAGEMENT',
  MEDIA = 'MEDIA',
}

export const INIT_DETAIL = 'INIT'
export const SET_DETAIL = 'SET_DETAIL'
export const SET_LOADING_DETAIL_START = 'SET_LOADING_DETAIL_START'
export const SET_LOADING_DETAIL_END = 'SET_LOADING_DETAIL_END'
export const TOGGLE_SHOW_ALL_DONATIONS = 'TOGGLE_SHOW_ALL_DONATIONS'
export const TOGGLE_SHOW_ALL_NOTIFICATIONS = 'TOGGLE_SHOW_ALL_NOTIFICATIONS'
export const TOGGLE_SHOW_ALL_ROLES = 'TOGGLE_SHOW_ALL_ROLES'
export const LOAD_DETAIL = 'LOAD_DETAIL'

interface SetInitAction {
  type: typeof INIT_DETAIL
}

interface SetDetailAction {
  type: typeof SET_DETAIL
  payload: Detail
}

interface SetLoadingDetailStartAction {
  type: typeof SET_LOADING_DETAIL_START
}

interface SetLoadingDetailEndAction {
  type: typeof SET_LOADING_DETAIL_END
}

interface ToggleShowAllDonationsAction {
  type: typeof TOGGLE_SHOW_ALL_DONATIONS
}

interface ToggleShowAllNotificationsAction {
  type: typeof TOGGLE_SHOW_ALL_NOTIFICATIONS
}

interface ToggleShowAllRolesAction {
  type: typeof TOGGLE_SHOW_ALL_ROLES
}

export interface LoadDetailAction {
  type: typeof LOAD_DETAIL
  payload: string
}

export type DetailActionTypes =
  | SetInitAction
  | SetDetailAction
  | SetLoadingDetailEndAction
  | SetLoadingDetailStartAction
  | ToggleShowAllDonationsAction
  | ToggleShowAllNotificationsAction
  | ToggleShowAllRolesAction
  | LoadDetailAction
