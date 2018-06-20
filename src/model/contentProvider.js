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
      } catch (e) {
        throw new ErrorObject('FCG001', `FONUG-CHARACTER-GENERATOR : 0001 : Content file for provider "${this.name}" cannot be found :/`)
      }
    } else {
    // if return a promise
    // if resolve an array
    // an array of objects
    // each objects have
    // i18nKey: the content key, string only, REQUIRED
    // weight: float from 0 to 1, or undefined or null
    // percentage: int from 0 to 100, or undefined or null
    // map it
    }
    return Promise.resolve(content.map(element => new ContentObject(element)))
  }
}
