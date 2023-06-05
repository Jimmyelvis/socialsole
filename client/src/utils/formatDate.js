import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

export const getTimefromNow = (date) => {

  dayjs.extend(relativeTime);
  const newTime = dayjs(date).fromNow()
  
  return newTime
}

export const getFormattedDate = (date) => {
  const newDate = dayjs(date).format('MMMM D, YYYY')
  return newDate
}
