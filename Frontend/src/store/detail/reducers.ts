import {
  DetailActionTypes,
  DetailState,
  Detail,
  Insolvency,
  INIT_DETAIL,
  SET_DETAIL,
  SET_LOADING_DETAIL_END,
  SET_LOADING_DETAIL_START,
  TOGGLE_SHOW_ALL_DONATIONS,
  TOGGLE_SHOW_ALL_NOTIFICATIONS,
  TOGGLE_SHOW_ALL_ROLES,
} from './types'

const initialInsolvency: Insolvency = {
  bailiffCount: 0,
  bailiffLink: '',
  creditorCount: 0,
  creditorLink: '',
  debtorCount: 0,
  debtorLink: '',
}

const initialDetail: Detail = {
  birthDate: '',
  contacts: [],
  connections: [],
  companyConnection: '',
  currentParty: '',
  deathDate: '',
  description: '',
  hasPhoto: false,
  id: '',
  insolvencyCompany: initialInsolvency,
  insolvencyPerson: initialInsolvency,
  lastUpdate: '',
  lastManualUpdate: '',
  name: '',
  namePrefix: '',
  nameSuffix: '',
  notificationRegisterId: '',
  notificationRegisterStatements: [],
  photo: '',
  roles: [],
  source: '',
  sourceInsolvency: '',
  sourceRegisterStatements: '',
  sourceRoles: '',
  sourceSponzor: '',
  sponsor: [],
  status: '',
  surname: '',
}

const initialState: DetailState = {
  detail: initialDetail,
  loadingDetail: true,
  showAllDonations: false,
  showAllNotifications: false,
  showAllRoles: false,
}

export function detailReducer(state = initialState, action: DetailActionTypes): DetailState {
  switch (action.type) {
    case INIT_DETAIL: {
      return {
        ...initialState,
      }
    }
    case SET_DETAIL: {
      return {
        ...state,
        detail: action.payload,
      }
    }
    case SET_LOADING_DETAIL_START: {
      return {
        ...state,
        loadingDetail: true,
      }
    }
    case SET_LOADING_DETAIL_END: {
      return {
        ...state,
        loadingDetail: false,
      }
    }
    case TOGGLE_SHOW_ALL_DONATIONS: {
      return {
        ...state,
        showAllDonations: !state.showAllDonations,
      }
    }
    case TOGGLE_SHOW_ALL_NOTIFICATIONS: {
      return {
        ...state,
        showAllNotifications: !state.showAllNotifications,
      }
    }
    case TOGGLE_SHOW_ALL_ROLES: {
      return {
        ...state,
        showAllRoles: !state.showAllRoles,
      }
    }
    default:
      return state
  }
}
