const { createParcel } = require('..')

const func = async () => {
  const params = {
    length: '9',
    width: '6',
    height: '2',
    weight: '10',
  }

  try {
    const response = await createParcel(params)
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

func()

// Test result:

const res = {
  id: 'prcl_53292f58d3bc45f68517e29722934071',
  object: 'Parcel',
  created_at: '2022-11-18T03:14:23Z',
  updated_at: '2022-11-18T03:14:23Z',
  length: 9,
  width: 6,
  height: 2,
  predefined_package: null,
  weight: 10,
  mode: 'test',
}
