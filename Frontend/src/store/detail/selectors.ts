import {createSelector} from 'reselect'

import {AppState} from '../index'
import {DEFAULT_DONATIONS_LIMIT, DEFAULT_ROLES_LIMIT} from '../../constants'


export const getDetailData = (store: AppState) => store.detail.detail
export const isDetailLoading = (store: AppState) => store.detail.loadingDetail // TODO rename to loading
export const getPhotoUrl = (store: AppState) => getDetailData(store).photo
export const getShowAllDonations = (store: AppState) =>  store.detail.showAllDonations
export const getShowAllRoles = (store: AppState) => store.detail.showAllRoles
export const getPersonalInsolvency = (store: AppState) => getDetailData(store).insolvencyPerson
export const getCompanyInsolvency = (store: AppState) => getDetailData(store).insolvencyCompany
export const hasInsolvencyData = createSelector(getPersonalInsolvency, getCompanyInsolvency, (personal, company) => {
  return Object.entries(personal).length !== 0 && Object.entries(company).length !== 0
})

export const hasPersonalInsolvency = createSelector(getPersonalInsolvency, (insolvency) => {
  if (Object.entries(insolvency).length === 0) return false
  const {debtorCount, creditorCount, bailiffCount} = insolvency
  return debtorCount !== 0 || creditorCount !== 0 || bailiffCount !== 0
})

export const hasCompanyInsolvency = createSelector(getCompanyInsolvency, (insolvency) => {
  if (Object.entries(insolvency).length === 0) return false
  const {debtorCount, creditorCount, bailiffCount} = insolvency
  return debtorCount !== 0 || creditorCount !== 0 || bailiffCount !== 0
})

export const hasInsolvency = createSelector(hasPersonalInsolvency, hasCompanyInsolvency, (personal, company) => {
  return personal || company
})

export const getFullName = (store: AppState) => {
	const detail = getDetailData(store)
	const prefix = detail.namePrefix ? `${detail.namePrefix} ` : ''
	const suffix = detail.nameSuffix ? `${detail.nameSuffix} ` : ''
	return `${prefix}${detail.name} ${detail.surname}${suffix}`.trim() // TODO lip naformatovat
}

export const getBirthYear = (store: AppState) => {
  const {birthDate} = getDetailData(store)
  if (!birthDate) return ''
	return (new Date(birthDate)).getFullYear()
}

export const getCurrentParty = (store: AppState) => {
  const {currentParty} = getDetailData(store)
  return currentParty
}

export const getDescription = (store: AppState) => {
  return getDetailData(store).description
}
export const getRolesRaw = (store: AppState) => getDetailData(store).roles
export const getRolesCount = (store: AppState) => getRolesRaw(store).length

export const getDonationsRaw = (store: AppState) => getDetailData(store).sponsor || []
export const getDonationsCount = (store: AppState) => getDonationsRaw(store).length

interface SortableByYear {
	year: number
}

function groupByYear<T extends SortableByYear>(data: T[]) {
  if (!data) return []
	const initial: {[key: number]: {year: number, items: T[]}} = {}
  let unsorted = data.reduce((groups, item) => {
    groups[item.year] = groups[item.year] || {
      year: item.year,
      items: []
    }
    groups[item.year].items.push(item)
    return groups
  }, initial)

  return Object.values(unsorted).sort((a, b) => {
    return b.year - a.year
  })
}
export const getDonations = createSelector(getDonationsRaw, getShowAllDonations, (donations, showAll) => {
  let donationsToGroup = [...donations]
  if (!showAll) {
    const sorted = donationsToGroup.sort((a, b) => b.year - a.year)
    donationsToGroup = sorted.splice(0, DEFAULT_DONATIONS_LIMIT)
  }
  return groupByYear(donationsToGroup)
})
export const getRoles = createSelector(getRolesRaw, getShowAllRoles, (roles, showAll) => {
  let rolesMap = roles.map((role) => ({
    ...role,
    year: role.dateTo ? +role.dateTo.substring(0,4) : 9999
  }))
  if (!showAll) {
    const sorted = rolesMap.sort((a, b) => b.year - a.year)
    rolesMap = sorted.splice(0, DEFAULT_ROLES_LIMIT)
  }
  return groupByYear(rolesMap)
})
