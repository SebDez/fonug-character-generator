import ContentObject from './contentObject'

export default class ContentProvider {
  constructor (name) {
    this.name = name
  }

  getContent () {
    let content = []
    try {
      content = require(`./../content/${this.name}`)
    } catch (e) {
      throw new Error({code: 'FCG001', message: `FONUG-CHARACTER-GENERATOR : 0001 : Content file for provider "${this.name}" cannot be found :/`})
    }
    return Promise.resolve(content.map(element => new ContentObject(element)))
  }
}
