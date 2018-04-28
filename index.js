const reduce = require('lodash/reduce')
const isObject = require('lodash/isObject')
const isNumber = require('lodash/isNumber')

const makeReducer = (str = '', depth, strict) => (result, value, key) => {
  if (isNumber(depth) && depth < 0)
    return result

  if (!strict || isNumber(depth) && depth === 0)
    result.push(`${str}${key}`)

  if (!isObject(value))
    return result

  const reducedValue = reduce(
    value,
    makeReducer(`${str}${key}.`, depth - 1, strict),
    []
  )

  return result.concat(reducedValue)
}

module.exports = (obj, depth, strict) =>
  reduce(obj, makeReducer('', depth - 1, strict), [])
