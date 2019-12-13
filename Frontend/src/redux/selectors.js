import {createSelector} from 'reselect'

import {DEFAULT_DONATIONS_LIMIT, DEFAULT_ROLES_LIMIT} from '../constants'

export const getSearchQuery = store => store.app.searchQuery
export const getSearchResults = store => store.app.searchResults
export const isSearchLoading = store => store.app.loadingSearch
export const isDetailLoading = store => store.app.loadingDetail
export const getDetailData = store => store.app.detail
export const getPhotoUrl = store => getDetailData(store).photo
export const getDetailNewsRaw = store => store.app.detailNews
export const getShowAllDonations = store => store.app.showAllDonations
export const getShowAllRoles = store => store.app.showAllRoles
export const getPersonalInsolvency = store => getDetailData(store).insolvencyPerson
export const getCompanyInsolvency = store => getDetailData(store).insolvencyCompany
export const wasSearched = store => !!getSearchResults(store)

export const getDetailNews = createSelector(getDetailNewsRaw, (news) => {
  return news.map(a => ({
    ...a,
    source: a.Source.replace(new RegExp('^www.'), ''),
    time: (new Date(a.time*1000)).toLocaleDateString()
  }))
})
export const getFullName = store => {
	const detail = getDetailData(store)
	return `${detail.namePrefix} ${detail.name} ${detail.surname} ${detail.nameSuffix}`.trim() // TODO lip naformatovat
}

export const getBirthYear = store => {
  const {birthDate} = getDetailData(store)
  if (!birthDate) return ''
	return (new Date(birthDate)).getFullYear()
}

export const getCurrentParty = store => {
  const {currentParty} = getDetailData(store)
  return currentParty
}

export const getDescription = store => {
  return getDetailData(store).description
}

const groupByYear = (data) => {
  if (!data) return []

  let unsorted = data.reduce((groups, item) => {
    groups[item.year] = groups[item.year] || {
      year: item.year,
      items: []
    }
    groups[item.year].items.push(item)
    return groups
  }, {})

  return Object.values(unsorted).sort((a, b) => {
    return b.year - a.year
  })
}

export const getDonationsRaw = store => getDetailData(store).sponsor || []
export const getDonationsCount = store => getDonationsRaw(store).length
export const getDonations = createSelector(getDonationsRaw, getShowAllDonations, (donations, showAll) => {
  let donationsToGroup = [...donations]
  if (!showAll) {
    const sorted = donationsToGroup.sort((a, b) => b.year - a.year)
    donationsToGroup = sorted.splice(0, DEFAULT_DONATIONS_LIMIT)
  }
  return groupByYear(donationsToGroup)
})

export const getRolesRaw = store => getDetailData(store).roles || []
export const getRolesCount = store => getRolesRaw(store).length

export const getRoles = createSelector(getRolesRaw, getShowAllRoles, (roles, showAll) => {
  let rolesMap = roles.map((role) => ({
    ...role,
    year: role.dateTo ? role.dateTo.substring(0,4) : 9999
  }))
  if (!showAll) {
    const sorted = rolesMap.sort((a, b) => b.year - a.year)
    rolesMap = sorted.splice(0, DEFAULT_ROLES_LIMIT)
  }
  return groupByYear(rolesMap)
})
