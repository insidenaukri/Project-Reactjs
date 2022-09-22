import { MONTHS } from './constants'
/*
 ** This method is used to help format the date which is used
 ** in several API calls as parameters for selecting data within a date range
 ** We make sure to handle the case if the selected month is December
 */
export const formatDate = (selectedYear, selectedMonth) => {
  const fromDate = `${selectedYear}-${MONTHS.indexOf(selectedMonth) + 1}-1`
  const maxDate = `${selectedYear}-${
    selectedMonth === 'Dec' ? MONTHS.indexOf('Feb') : MONTHS.indexOf(selectedMonth) + 2
  }-1`

  return { fromDate, maxDate }
}
