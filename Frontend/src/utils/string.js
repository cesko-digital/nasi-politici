export const dummyPluralize = (number, one, lessThanFive, more) => {
	switch (number) {
		case 1:
			return one
		case 2:
		case 3:
		case 4:
			return lessThanFive
		default:
			return more
	}
}
