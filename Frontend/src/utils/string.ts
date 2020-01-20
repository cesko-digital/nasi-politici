export const dummyPluralize = (number: number, one: string, lessThanFive: string, more: string): string => {
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
