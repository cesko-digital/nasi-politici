export const dummyFormatDate = (date: Date): string =>
  date.toLocaleDateString('cs-CZ', { day: '2-digit', month: 'long', year: 'numeric' })

export const dummyFormatDateShort = (date: Date): string =>
  date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })
