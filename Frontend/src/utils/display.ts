export function scrollTo(element: HTMLElement | null) {
  if (!element) {
    return
  }
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export function getDimensions(element: HTMLElement) {
  const { height } = element.getBoundingClientRect()
  const offsetTop = element.offsetTop
  const offsetBottom = offsetTop + height

  return {
    height,
    offsetBottom,
    offsetTop,
  }
}
