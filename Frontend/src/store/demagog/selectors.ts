import {createSelector} from 'reselect'

import {AppState} from '../index'

export const getDemagogDataRaw = (store: AppState) => store.demagog
export const getDemagogData = createSelector(getDemagogDataRaw, (demagog) => {
	const count = demagog.misleading + demagog.true + demagog.untrue + demagog.unverifiable
	return {
		...demagog,
		truePerc: Math.round(demagog.true / count * 100) || 0,
		untruePerc: Math.round(demagog.untrue / count * 100) || 0,
		misleadingPerc: Math.round(demagog.misleading / count * 100) || 0,
		unverifiablePerc: Math.round(demagog.unverifiable / count * 100) || 0,
		count: count,
	}
})
