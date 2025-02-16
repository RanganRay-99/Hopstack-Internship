const replaceSpecialCharactersInOrders = require('./replace-special-characters-in-orders')

describe('replaceSpecialCharactersInOrders', () => {
  it('should replace underscore fields and dollar fields in the object', () => {
    const data = {
      OrderMessageBatch: {
        $: { batchNumber: '18177797335' },
        partnerID: [{ _: 'delmarmfg', $: { name: 'Delmar Mfg., LLC', roleType: 'vendor' } }],
        hubOrder: [
          {
            $: { transactionID: '3342486680' },
            participatingParty: [
              {
                _: 'bestbuyca',
                $: {
                  name: 'Best Buy Canada',
                  roleType: 'merchant',
                  participationCode: 'From:',
                },
              },
            ],
            // Rest of the data...
          },
        ],
        messageCount: ['1'],
      },
    }

    const expectedOutput = {
      OrderMessageBatch: {
        attributes: {
          batchNumber: '18177797335',
        },
        partnerID: [{ partnerID: 'delmarmfg', attributes: { name: 'Delmar Mfg., LLC', roleType: 'vendor' } }],
        hubOrder: [
          {
            attributes: {
              transactionID: '3342486680',
            },
            participatingParty: [
              {
                attributes: {
                  name: 'Best Buy Canada',
                  roleType: 'merchant',
                  participationCode: 'From:',
                },
                participatingParty: 'bestbuyca',
              },
            ],
            // Rest of the data...
          },
        ],
        messageCount: ['1'],
      },
    }

    const result = replaceSpecialCharactersInOrders(data)
    expect(result).toEqual(expectedOutput)
  })
})
