const { getToken } = require('@/index')

const axios = require('axios').default



const issueRefund = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, order_id, comment, lineItemId } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        order_id,
        reasonForRefund:[],
        comment,
        refundItems:[{
            refundAmout:{
                currency:'',
                value:'',
            },
            lineItemId,
            legacyReference:{
                legacyItemId:'',
                legacyTransactionId:'',

            },
        }
        ],
        orderLevelRefundAmout:{
            currency:'',
            value:'',
        },
    }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/fulfillment/v1/order/${order_id}/issue_refund`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = issueRefund