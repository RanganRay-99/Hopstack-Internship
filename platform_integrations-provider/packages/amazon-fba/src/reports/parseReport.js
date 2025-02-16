/*
let str = `item-name	item-description	listing-id	seller-sku	price	quantity	open-date	image-url	item-is-marketplace	product-id-type	zshop-shipping-fee	item-note	item-condition	zshop-category1	zshop-browse-path	zshop-storefront-feature	asin1	asin2	asin3	will-ship-internationally	expedited-shipping	zshop-boldface	product-id	bid-for-featured-placement	add-delete	pending-quantity	fulfillment-channel	Business Price	Quantity Price Type	Quantity Lower Bound 1	Quantity Price 1	Quantity Lower Bound 2	Quantity Price 2	Quantity Lower Bound 3	Quantity Price 3	Quantity Lower Bound 4	Quantity Price 4	Quantity Lower Bound 5	Quantity Price 5	merchant-shipping-group	Progressive Price Type	Progressive Lower Bound 1	Progressive Price 1	Progressive Lower Bound 2	Progressive Price 2	Progressive Lower Bound 3	Progressive Price 3
Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones [Hardcover] Clear, James		0315ZB1G5NR	0F-O1L9-60Y7	15.69		2022-03-15 02:26:37 PDT		y	1			11				0735211299						0735211299				AMAZON_NA													Migrated Template							
Alchemist [Hardcover] Paulo Coelho		0311Z3BN6MB	KE-H1ZQ-628T	25		2022-03-10 19:20:20 PST		y	1			11				0060533773						0060533773				AMAZON_NA													Migrated Template							
The Alchemist, 25th Anniversary: A Fable About Following Your Dream [Paperback] Coelho, Paulo		0314Z8PRLSG	O8-BFXG-PG6F	3.99		2022-03-14 04:00:48 PDT		y	1			11				0062315005						0062315005				AMAZON_NA													Migrated Template							
Atomic Habits: An Easy and Proven Way to Build Good Habits and Break Bad Ones [Paperback] James Clear	James Clear is a writer and speaker focused on habits, decision making, and continuous improvement. He is the author of the #1 New York Times bestseller, Atomic Habits. The book has sold over 5 million copies worldwide and has been translated into more than 50 languages.	0315ZATVICZ	YT-AAUR-OBXE	12		2022-03-15 01:59:26 PDT		y	2			11				1847941842						B07RFSSYBH				AMAZON_NA													Migrated Template							`
*/

function parseReport(str) {
  let lines = str.split('\n')
  let keys = lines[0].split('\t')
  let res = []
  for(let i=1; i<lines.length; i++) {
    let values = lines[i].split('\t')
    let obj = {}
    for(let j=0; j<keys.length; j++) {
      obj[keys[j]] = values[j]
    }
    res.push(obj)
  }
  return res
}

module.exports = parseReport

// f(str)
