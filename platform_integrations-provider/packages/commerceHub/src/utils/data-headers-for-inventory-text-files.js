//The .txt files for inventory do not have headers in their data to identify a column
// Sample belk marketplace inventory data:
// IN,075000239422,Yes,183,,,,,,31,,,,No,,PCE,075000239422,belk,075000239422
// IN,075000969770,Yes,14,,,,,,282,,,,No,,PCE,075000969770,belk,075000969770
// IN,075000531489,Yes,187,,,,,,50,,,,No,,PCE,075000531489,belk,075000531489
// IN,075000479392,Yes,105,,,,,,45,,,,No,,PCE,075000479392,belk,075000479392
// IN,075000531496,Yes,123,,,,,,43,,,,No,,PCE,075000531496,belk,075000531496
// IN,075000531502,Yes,118,,,,,,50,,,,No,,PCE,075000531502,belk,075000531502
// So taking the headers from this file to amke a informative json object

// These fields are common and in same order in every marketplace inventory file
const commonFields = [
  'FILE TYPE',
  'VENDOR SKU',
  'AVAILABLE',
  'QTY',
  'NEXT AVAILABLE QTY',
  'NEXT AVAILABLE DATE',
  'MANUFACTURER',
  'MANUFACTURER SKU',
  'DESCRIPTION',
  'UNIT COST',
  'UNIT COST 2',
  'UNIT COST 3',
  'UNIT COST 4',
  'DISCONTINUED',
  'DISCONTINUED DATE',
  'UNIT OF MEASURE',
  'MERCHANT SKU',
  'MERCHANT',
]
// headers object having the column headers for marketplaces
const headers = {
  belk: [...commonFields, 'GS1 ID'],
  bestbuyca: [...commonFields, 'GS1 ID'],
  BJS: [
    ...commonFields,
    'GS1 ID',
    'Warehouse 2 ID',
    'Warehouse 2 QTY',
    'Warehouse 2 Next Available QTY',
    'Warehouse 2 Next Available Date',
    'Warehouse 3 ID',
    'Warehouse',
    'Warehouse 1 ID',
    'Warehouse 1 QTY',
    'Warehouse 1 Next Available QTY',
    'Warehouse 1 Next Available Date',
  ],
  bluestem: [
    ...commonFields,
    'GS1 ID',
    'Warehouse 1 ID',
    'Warehouse 1 QTY',
    'Warehouse 1 Next Available QTY',
    'Warehouse 1 Next Available Date',
    'Warehouse 2 ID',
  ],
  jcpenny: commonFields,
  macys: [
    ...commonFields,
    'GS1 ID',
    'Warehouse 2 ID',
    'Warehouse 2 QTY',
    'Warehouse 2 Next Available QTY',
    'Warehouse 2 Next Available Date',
    'Warehouse 3 ID',
    'Warehouse',
    'Warehouse 1 ID',
    'Warehouse 1 QTY',
    'Warehouse 1 Next Available QTY',
    'Warehouse 1 Next Available Date',
  ],
  ppower: commonFields,
  qvc: commonFields,
  signetjewelers_zales: commonFields,
  signetkj: commonFields,
}

module.exports = headers
