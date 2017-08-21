/* eslint no-console: 0 */
import {expect} from "chai"
import PropTypes from "prop-types"
import uuid from "uuid"
import sinon from "sinon"

const getErrorArgs = (propTypes, props) => {
  const argsA = []
  sinon.stub(console, "error").callsFake((...args) => argsA.push(args[0]))

  const suffix = uuid.v4()
  PropTypes.checkPropTypes(addSuffixes(suffix, propTypes), addSuffixes(props), "prop", "Component")
  const strippedArgs = argsA.map(a => a.replace(`_${suffix}`, ""))

  console.error.restore()

  return strippedArgs
}

function addSuffixes(suffix, source) {
  const result = {}

  for (let key in source) {
    result[`${key}_${suffix}`] = source[key]
  }

  return result
}

export const expectSameBehaviour = (propTypesA, propTypesB) => (props) => {
  const aErrors = getErrorArgs(propTypesA, props)
  const bErrors = getErrorArgs(propTypesB, props)

  try {
    expect(aErrors).to.eql(bErrors)
  } catch (e) {
    throw new Error(`Expected\n\npropified:\n\t${JSON.stringify(aErrors)}\n\nto be\n\nnormal:\n\t${JSON.stringify(bErrors)}`)
  }
}
