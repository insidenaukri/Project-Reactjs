import { MONTHS } from './constants'
/*
 ** This method is used to help format the date which is used
 ** in several API calls as parameters for selecting data within a date range
 */
export const formatDate = (selectedYear, selectedMonth) => {
  const fromDate = `${selectedYear}-0${MONTHS.indexOf(selectedMonth) + 1}-01`
  const maxDate = `${selectedYear}-0${MONTHS.indexOf(selectedMonth) + 2}-01`

  return { fromDate, maxDate }
}
