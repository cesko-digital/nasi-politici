import {
  DetailActionTypes,
  DetailState,
  Detail,
  Insolvency,
  SET_DETAIL,
  SET_LOADING_DETAIL_END,
  SET_LOADING_DETAIL_START,
  TOGGLE_SHOW_ALL_DONATIONS,
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

const intialDetail: Detail = {
  birthDate: '',
  contacts: [],
  companyConnection: '',
  currentParty: '',
  deathDate: '',
  description: '',
  id: '',
  insolvencyCompany: initialInsolvency,
  insolvencyPerson: initialInsolvency,
  name: '',
  namePrefix: '',
  nameSuffix: '',
  photo: '',
  roles: [],
  source: '',
  sponsor: [],
  status: '',
  surname: '',
}

const initialState: DetailState = {
  detail: intialDetail,
  loadingDetail: false,
  showAllDonations: false,
  showAllRoles: false,
}

export function detailReducer(state = initialState, action: DetailActionTypes): DetailState {
  switch (action.type) {
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
