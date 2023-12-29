export function capitalizeFirstChar(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []
  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })

  return orderedArray
}
