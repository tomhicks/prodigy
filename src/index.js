const PropTypes = require("prop-types")

const secret = "my_secret"

function mapObject(fn, object) {
  const result = {}

  for (let key in object) {
    result[key] = fn(object[key], key)
  }

  return result
}

function isOptionalDefinition(checker) {
  return typeof checker === "object" && checker.__propifyOptional__ === secret
}

function createPrimitiveChecker(Type, isOptional) {
  let propTypeValue

  switch (Type) {
  case Number:
    propTypeValue = PropTypes.number
    break
  case String:
    propTypeValue = PropTypes.string
    break
  case Object:
    propTypeValue = PropTypes.object
    break
  case Array:
    propTypeValue = PropTypes.array
    break
  case Boolean:
    propTypeValue = PropTypes.bool
    break
  case Function:
    propTypeValue = PropTypes.func
    break
  case Symbol:
    propTypeValue = PropTypes.symbol
    break
  default:
    propTypeValue = Type
    break
  }

  return isOptional ? propTypeValue : propTypeValue.isRequired
}

function propify(definition) {
  return mapObject(v => {
    const isOptional = isOptionalDefinition(v)
    const value = isOptional ? v.value : v

    return createPrimitiveChecker(value, isOptional)
  }, definition)
}

function optional(checker) {
  return {
    __propifyOptional__: secret,
    value: checker,
  }
}

exports.propify = propify
exports.optional = optional
exports.maybe = optional
