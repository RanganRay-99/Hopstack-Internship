const { getToken } = require('@/index')

const axios = require('axios').default



const createSchedule = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, feedType,preferredTriggerDayOfMonth, preferredTriggerDayOfWeek,preferredTriggerHour, scheduleEndDate, scheduleName, scheduleStartDate, scheduleTemplateId, schemaVersion } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        feedType,
        preferredTriggerDayOfMonth,
        preferredTriggerDayOfWeek:[],
        preferredTriggerHour,
        scheduleEndDate,
        scheduleName,
        scheduleStartDate,
        scheduleTemplateId,
        schemaVersion,
    }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/feed/v1/schedule`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        'X-EBAY-C-MARKETPLACE-ID': 'X-EBAY-C-MARKETPLACE-ID:EBAY_US',
        
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = createSchedule