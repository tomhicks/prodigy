# propify

> Make PropType definitions easier

Provides a more sensible API for the `prop-types` module:

1. Use JavaScript built-ins for easier definition
2. Props are required by default

## Example

The following are equivalent:
```javascript
import PropTypes from `prop-types`

Component.propTypes = {
  requiredNumber: PropTypes.number.isRequired,
  requiredString: PropTypes.string.isRequired,
  requiredArray: PropTypes.array.isRequired,
  requiredObject: PropTypes.object.isRequired,
  ...
  
  optionalNumber: PropTypes.number,
  optionalString: PropTypes.string,
  ...
}
```

```javascript
import {propify, maybe) from `propify`

Component.propTypes = propify({
  requiredNumber: Number
  requiredString: String,
  requiredArray: Array,
  requiredObject: Object,
  ...
  
  optionalNumber: maybe(Number),
  optionalString: maybe(String),
  ...
})
```

## Why?

It saves a lot of typing, making defining new components much faster.

In my experience, most props are required, and the occasional one is optional.
Making things required by default provides a more robust API for your component
and overall gives better warnings.

## Progress

It currently only works on top-level items. So, it doesn't provide any new syntax for
`oneOf`, `oneOfType`, `shape`, `arrayOf`, etc. However, you can pass normal `PropTypes`
values in for those things:

```javascript
propTypes = propify({
  requiredNumber: Number,
  requiredObjectWithShape: PropTypes.shape({
    score: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
 })
 
 // or with nested propify calls
 
 propTypes = propify({
  requiredNumber: Number,
  requiredObjectWithShape: PropTypes.shape(propify({
    score: Number,
    name: String,
  })).isRequired,
 })
```

I will add support for these compound types.
