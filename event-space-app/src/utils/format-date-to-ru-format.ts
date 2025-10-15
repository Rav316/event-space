export const formatDateToRuFormat = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU')
}