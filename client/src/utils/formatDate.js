import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

export const getTimefromNow = (date) => {

  dayjs.extend(relativeTime);
  const newTime = dayjs(date).fromNow()
  
  return newTime
}
