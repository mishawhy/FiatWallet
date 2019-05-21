import moment from 'moment'
export const generateSignMessage = () => {
  return moment().utc().format('YYYY-MM-DD')
}
