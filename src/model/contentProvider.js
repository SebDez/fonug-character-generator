import _ from 'lodash'
import ContentObject from './contentObject'
import ErrorObject from './errorObject'

export default class ContentProvider {
  constructor (name, customProvider) {
    this.name = name
    this.customProvider = customProvider
  }

  getContent () {
    let content = []
    // If no provider is provided
    if (_.isNil(this.customProvider)) {
      try {
        content = require(`./../content/${this.name}`)
        return Promise.resolve(content.map(element => new ContentObject(element)))
      } catch (e) {
        throw new ErrorObject('FCG001', `FONUG-CHARACTER-GENERATOR : 0001 : Content file for provider "${this.name}" cannot be found :/`)
      }
    } else {
      const providerPromise = this.customProvider()
      // A custom provider must be a promise
      if (!providerPromise.then) {
        throw new ErrorObject('FCG004', `FONUG-CHARACTER-GENERATOR : 0004 : Custom provider "${this.name}" is not a promise.`)
      }
      return providerPromise.then(content => {
        // A custom provider must resolve an array
        if (_.isArray(content)) {
          // Return an array of content objects
          return content.map(element => {
          // A custom provider must resolve an array of objects
            if (_.isObject(element)) {
              // Each object resolved should be valid
              if (ContentObject.isValid(element)) {
                return new ContentObject(element)
              } else {
                throw new ErrorObject('FCG007', `FONUG-CHARACTER-GENERATOR : 0007 : Content resolved for custom provider "${this.name}", one element is not a valid ContentObject.`)
              }
            } else {
              throw new ErrorObject('FCG006', `FONUG-CHARACTER-GENERATOR : 0006 : Content resolved for custom provider "${this.name}" is not objects.`)
            }
          })
        } else {
          throw new ErrorObject('FCG005', `FONUG-CHARACTER-GENERATOR : 0005 : Content resolved for custom provider "${this.name}" is not an array.`)
        }
      })
    }
  }
}
