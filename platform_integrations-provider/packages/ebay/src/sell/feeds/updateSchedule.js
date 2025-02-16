const { getToken } = require('@/index')
const axios = require('axios').default


const updateSchedule = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, schedule_id, preferredTriggerDayOfMonth,
    preferredTriggerDayOfWeek,
    preferredTriggerHour,
    scheduleEndDate,
    scheduleName,
    scheduleStartDate,
    schemaVersion, } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        preferredTriggerDayOfMonth,
        preferredTriggerDayOfWeek,
        preferredTriggerHour,
        scheduleEndDate,
        scheduleName,
        scheduleStartDate,
        schemaVersion,
      }
    const axiosConfig = {
      method: 'put',
      url: `https://api.ebay.com/sell/feed/v1/schedule/${schedule_id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
      },
      query: {
        schedule_id,
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = updateSchedule