
import React from 'react'

import {dummyPluralize as pluralize} from '../../utils/string'

import styles from './demagogWidget.module.scss'

export default ({value, valuePerc, iconComponent, titleForms}) => {
	const Icon = iconComponent
	return (
		<React.Fragment>
			<div className={styles.percBar} style={{width: `${valuePerc}%`}} />
			<div className={styles.count}>
				<div className={styles.number}>
					<Icon className={styles.icon}/>{value} {pluralize(value, titleForms[0], titleForms[1], titleForms[2])}</div> <div className={styles.percent}>{valuePerc}&nbsp;%
				</div>
			</div>
		</React.Fragment>
	)
}

