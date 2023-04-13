export const getFormatDateString = (dateString: string | undefined): string => {
  if (dateString) {
    const date = new Date(dateString)
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString()
  }
  return ""
}
