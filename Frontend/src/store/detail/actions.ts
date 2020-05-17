import {
  Detail,
  SET_DETAIL,
  SET_LOADING_DETAIL_END,
  SET_LOADING_DETAIL_START,
  TOGGLE_SHOW_ALL_DONATIONS,
  TOGGLE_SHOW_ALL_NOTIFICATIONS,
  TOGGLE_SHOW_ALL_ROLES,
  LOAD_DETAIL,
  DetailActionTypes,
  LoadDetailAction,
} from './types'

export const setDetail = (detail: Detail): DetailActionTypes => ({
  type: SET_DETAIL,
  payload: detail,
})

export const loadingDetailStarted = (): DetailActionTypes => ({
  type: SET_LOADING_DETAIL_START,
})

export const loadingDetailEnded = (): DetailActionTypes => ({
  type: SET_LOADING_DETAIL_END,
})

export const toggleShowAllDonations = (): DetailActionTypes => ({
  type: TOGGLE_SHOW_ALL_DONATIONS,
})

export const toggleShowAllNotifications = (): DetailActionTypes => ({
  type: TOGGLE_SHOW_ALL_NOTIFICATIONS,
})

export const toggleShowAllRoles = (): DetailActionTypes => ({
  type: TOGGLE_SHOW_ALL_ROLES,
})

export const loadDetail = (id: string): LoadDetailAction => ({
  type: LOAD_DETAIL,
  payload: id,
})
