const { saveAddress } = require('../')

const func = async () => {
  const params = {
    company: 'EasyPost',
    street1: '417 Montgomery Street',
    street2: '5th Floor',
    city: 'San Francisco',
    state: 'CA',
    zip: '94104',
    phone: '415-528-7555',
  }

  try {
    const response = await saveAddress(params)
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

func()

// Test results:

const res = {
  id: 'adr_f77d5a6566ee11edbe5cac1f6bc72124',
  object: 'Address',
  created_at: '2022-11-18T03:13:25+00:00',
  updated_at: '2022-11-18T03:13:25+00:00',
  name: null,
  company: 'EasyPost',
  street1: '417 Montgomery Street',
  street2: '5th Floor',
  city: 'San Francisco',
  state: 'CA',
  zip: '94104',
  country: 'US',
  phone: '4155287555',
  email: null,
  mode: 'test',
  carrier_facility: null,
  residential: null,
  federal_tax_id: null,
  state_tax_id: null,
  verifications: {},
}
