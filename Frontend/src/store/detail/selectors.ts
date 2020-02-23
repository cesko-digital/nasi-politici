import { createSelector } from 'reselect'

import { AppState } from 'store'
import { DEFAULT_DONATIONS_LIMIT, DEFAULT_ROLES_LIMIT } from 'constants/constants'
import { ContactService, Contact, Role, Sponsor, Detail, Insolvency } from './types'

export const getDetailData = (store: AppState): Detail => store.detail.detail
export const isDetailLoading = (store: AppState): boolean => store.detail.loadingDetail // TODO rename to loading
export const getPhotoUrl = (store: AppState): string => getDetailData(store).photo
export const getShowAllDonations = (store: AppState): boolean => store.detail.showAllDonations
export const getShowAllRoles = (store: AppState): boolean => store.detail.showAllRoles
export const getPersonalInsolvency = (store: AppState): Insolvency => getDetailData(store).insolvencyPerson || {}
export const getCompanyInsolvency = (store: AppState): Insolvency => getDetailData(store).insolvencyCompany || {}
export const hasInsolvencyData = createSelector(getPersonalInsolvency, getCompanyInsolvency, (personal, company) => {
  return Object.entries(personal).length !== 0 && Object.entries(company).length !== 0
})

export const hasPersonalInsolvency = createSelector(getPersonalInsolvency, insolvency => {
  if (Object.entries(insolvency).length === 0) return false
  const { debtorCount, creditorCount, bailiffCount } = insolvency
  return debtorCount !== 0 || creditorCount !== 0 || bailiffCount !== 0
})

export const hasCompanyInsolvency = createSelector(getCompanyInsolvency, insolvency => {
  if (Object.entries(insolvency).length === 0) return false
  const { debtorCount, creditorCount, bailiffCount } = insolvency
  return debtorCount !== 0 || creditorCount !== 0 || bailiffCount !== 0
})

export const hasInsolvency = createSelector(hasPersonalInsolvency, hasCompanyInsolvency, (personal, company) => {
  return personal || company
})

export const getFullName = (store: AppState): string => {
  const detail = getDetailData(store)
  const prefix = detail.namePrefix ? `${detail.namePrefix} ` : ''
  const suffix = detail.nameSuffix ? ` ${detail.nameSuffix}` : ''
  return `${prefix}${detail.name} ${detail.surname}${suffix}`.trim() // TODO lip naformatovat
}

export const getBirthYear = (store: AppState): string => {
  const { birthDate } = getDetailData(store)
  if (!birthDate) return ''
  return new Date(birthDate).getFullYear().toString()
}

export const getDeathYear = (store: AppState): string => {
  const { deathDate } = getDetailData(store)
  if (!deathDate) return ''
  return new Date(deathDate).getFullYear().toString()
}

export const getCurrentParty = (store: AppState): string => {
  const { currentParty } = getDetailData(store)
  return currentParty
}

export const getDescription = (store: AppState): string => {
  return getDetailData(store).description
}
export const getRolesRaw = (store: AppState): Role[] => getDetailData(store).roles || []
export const getRolesCount = (store: AppState): number => getRolesRaw(store).length

export const getDonationsRaw = (store: AppState): Sponsor[] => getDetailData(store).sponsor || []
export const getDonationsCount = (store: AppState): number => getDonationsRaw(store).length

interface SortableByYear {
  year: number
}

interface GroupedByYear<T> {
  year: number
  items: T[]
}

function groupByYear<T extends SortableByYear>(data: T[]): GroupedByYear<T>[] {
  if (!data) return []
  const initial: { [key: number]: { year: number; items: T[] } } = {}
  const unsorted = data.reduce((groups, item) => {
    groups[item.year] = groups[item.year] || {
      year: item.year,
      items: [],
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
  let rolesMap = roles.map(role => ({
    ...role,
    dateFrom: role.dateFrom ? role.dateFrom.substring(0, 4) : '',
    year: role.dateTo ? +role.dateTo.substring(0, 4) : 9999,
  }))
  if (!showAll) {
    const sorted = rolesMap.sort((a, b) => b.year - a.year)
    rolesMap = sorted.splice(0, DEFAULT_ROLES_LIMIT)
  }
  return groupByYear(rolesMap)
})

export const getContacts = (store: AppState): Contact[] => store.detail.detail.contacts || []

export const hasContacts = (store: AppState): boolean =>
  !!store.detail.detail.contacts && !!store.detail.detail.contacts.length

const mapContact = (contact: Contact): { service: ContactService; contact: string } => ({
  service: contact.Service,
  contact: contact.Contact,
})

export const getSocialNetworksContacts = createSelector(getContacts, contacts => {
  return contacts.filter(contact => contact.Service !== ContactService.WWW).map(mapContact)
})

export const getWebContacts = createSelector(getContacts, contacts => {
  return contacts.filter(contact => contact.Service === ContactService.WWW).map(mapContact)
})
