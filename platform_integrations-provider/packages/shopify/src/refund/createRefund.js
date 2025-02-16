const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const createRefund = async (params) => {
  try {
    const { apiUrl, orderId, currency, note, full_refund, amount, refundLineItems, transactions } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const data = {
      refund: {
        currency: currency || 'USD',
        notify: true,
        note,
        shipping: { full_refund, amount },
        refund_line_items: refundLineItems.map((item) => ({
          line_item_id: item.lineItemId,
          quantity: item.quantity,
          restock_type: item.restock_type,
          location_id: item.locationId,
        })),
        transactions: transactions.map((transaction) => ({
          parent_id: transaction.parentId,
          amount: transaction.amount,
          kind: transaction.kind,
          gateway: transaction.gateway,
        })),
      },
    }
    const axiosConfig = {
      method: 'post',
      url: `${SHOPIFY_BASEURL}/orders/${orderId}/refunds.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = createRefund
