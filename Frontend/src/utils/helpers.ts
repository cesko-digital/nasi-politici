export const filterEmptyObj = (obj: Record<string, string>) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
