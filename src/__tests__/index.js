/* eslint no-console: 0 */
import PropTypes from "prop-types"
import {expectSameBehaviour} from "../../test/util"

import {propify, optional} from "../"

const types = [
  undefined, null,
  0, 1, NaN, new Number(),
  "", "a", new String(),
  function() {},
  true, false,
  [], new Array(),
  {}, new Object()
]

function checkOneType(newValue, oldValue) {
  const check = expectSameBehaviour(
    propify({a: newValue}),
    {a: oldValue}
  )

  types.map(a => check({a}))
}

describe("Propify", () => {
  describe("top-level values", () => {

    it("checks required numbers", () => {
      checkOneType(Number, PropTypes.number.isRequired)
    })

    it("checks optional numbers", () => {
      checkOneType(optional(Number), PropTypes.number)
    })

    it("checks required strings", () => {
      checkOneType(String, PropTypes.string.isRequired)
    })

    it("checks optional strings", () => {
      checkOneType(optional(String), PropTypes.string)
    })

    it("checks required objects", () => {
      checkOneType(Object, PropTypes.object.isRequired)
    })

    it("checks optional objects", () => {
      checkOneType(optional(Object), PropTypes.object)
    })

    it("checks required arrays", () => {
      checkOneType(Array, PropTypes.array.isRequired)
    })

    it("checks optional arrays", () => {
      checkOneType(optional(Array), PropTypes.array)
    })

    it("checks required booleans", () => {
      checkOneType(Boolean, PropTypes.bool.isRequired)
    })

    it("checks optional booleans", () => {
      checkOneType(optional(Boolean), PropTypes.bool)
    })

    it("checks required functions", () => {
      checkOneType(Function, PropTypes.func.isRequired)
    })

    it("checks optional functions", () => {
      checkOneType(optional(Function), PropTypes.func)
    })

    it("checks required symbols", () => {
      checkOneType(Symbol, PropTypes.symbol.isRequired)
    })

    it("checks optional symbols", () => {
      checkOneType(optional(Symbol), PropTypes.symbol)
    })

    it("allows normal propTypes values to pass through", () => {
      checkOneType(PropTypes.array, PropTypes.array.isRequired)
      checkOneType(optional(PropTypes.array), PropTypes.array)
    })

  })
})
