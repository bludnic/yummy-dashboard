/*
 * Get MenuItem price by size name
 */
export const getMenuItemPrice = (menuItem, size) => {
  let price = 0

  if (!menuItem) return 0;
  if (!Array.isArray(menuItem.prices)) return 0;

  // Return price if has only one Size
  if (menuItem.prices.length === 1) return menuItem.prices[0].price

  menuItem.prices.forEach(priceObj => {
    if (priceObj.name === size) {
      price = priceObj.price
    }
  })
  return price
}

/*
 * Get Option price of MenuItem
 */
export const getOptionPrice = (menuItem, groupId, optionId, size) => {
  let price = 0

  if (!menuItem) return 0;
  if (!Array.isArray(menuItem.optionGroups)) return 0;

  menuItem.optionGroups.forEach(optionGroup => {
    if (optionGroup._id.toString() !== groupId) return;

    optionGroup.options.forEach(option => {
      if (option._id.toString() !== optionId) return;

      // Get price for specific size
      if (size) {
        price = _getOptionPriceBySizeName(menuItem, option.prices, size)
      } else {
        price = option.prices[0]
      }
    })
  })
  return price
}

/*
 * Get LineItems total price
 */
export const getTotalPrice = (lineItems) => {
  let total = 0

  lineItems.forEach(lineItem => {
    let extraTotal = 0

    if (!Array.isArray(lineItem.optionGroups)) return 0;
    
    lineItem.optionGroups.forEach(group => {
      group.options.forEach(option => {
        const price = getOptionPrice(lineItem.menuItem, group.id, option.id, lineItem.size) * option.quantity
        extraTotal += price
      })
    })

    total += ( extraTotal + getMenuItemPrice(lineItem.menuItem, lineItem.size) ) * lineItem.quantity
  })

  return total
}

/*
 * Get OptionGroup ref by optionGroupId
 */
export const getOptionGroupById = (menuItem, optionGroupId) => {
  let groupRef = null
  
  if (!Array.isArray(menuItem.optionGroups)) return null;
  
  menuItem.optionGroups.forEach(optionGroup => {
    if (optionGroup._id.toString() === optionGroupId) {
      groupRef = optionGroup
    }
  })

  return groupRef
}

/*
 * Get Option ref by optionId
 */
export const getOptionById = (menuItem, optionGroupId, optionId, size = '') => {
  let optionRef = null

  if (!Array.isArray(menuItem.optionGroups)) return null;

  menuItem.optionGroups.forEach(optionGroup => {

    // Each OptionGroups
    if (optionGroup._id.toString() === optionGroupId) {

      // Each Options
      optionGroup.options.forEach(option => {
        if (option._id.toString() === optionId) {
          const price = _getOptionPriceBySizeName(menuItem, option.prices, size)
          
          optionRef = option
          optionRef.price = price
          delete optionRef.prices
        }
      })

    }

  })

  return optionRef
}

/**
 * Get discount price by Total and Coupon
 */
export const getDiscountPrice = (total, coupon) => {
  let discountPrice = 0
  const dicountType = coupon && coupon.discountType

  if (dicountType=== 'number') {
    discountPrice = total - coupon.discount
  } else if (dicountType === 'percent') {
    discountPrice = total - (total / (100 / coupon.discount ) )
  } else {
    discountPrice = total
  }
  return discountPrice
}

/*
 * Get option price by MenuItem size name
 */
const _getOptionPriceBySizeName = (menuItem, optionPrices, size) => {
  let itemPrice = 0
  let priceIndex = 0

  menuItem.prices.forEach((price, index) => {
    if (price.name === size) {
      priceIndex = index
    }
  })

  return optionPrices[priceIndex] || optionPrices[0]
}