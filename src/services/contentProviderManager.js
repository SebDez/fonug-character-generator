import _ from 'lodash'
import { GENERATOR_CATEGORIES } from './../constants'
import ContentProvider from './../model/contentProvider'

export default class ContentProviderManager {
  /**
   * A content provider manager is used to defined what content provider should be used for a content
   * By default, it will be the given contents provided in this lib.
   * But you can also use your own providers
   */
  constructor (providers) {
    this.setContentProviders(providers)
  }

  setContentProviders (givenProviders = {}) {
    this.contentProviders = {}

    // Clear custom providers
    const cleanedProvider = {}
    Object.keys(givenProviders).forEach(key => {
      cleanedProvider[key.toLowerCase()] = givenProviders[key]
    })

    // Define content providers
    for (const genModule of Object.keys(GENERATOR_CATEGORIES)) {
      for (const category of GENERATOR_CATEGORIES[genModule]) {
        const providerName = `${genModule}.${category}`.toLowerCase()
        // Set custom provider given in params or set it to null
        const customProvider = _.isFunction(cleanedProvider[providerName]) ? cleanedProvider[providerName] : null
        this.contentProviders[providerName] = new ContentProvider(providerName, customProvider)
      }
    }
  }

  async getGeneratorContent () {
    const generatorContent = {}
    for (const genModule of Object.keys(GENERATOR_CATEGORIES)) {
      generatorContent[genModule] = {}
      for (const category of GENERATOR_CATEGORIES[genModule]) {
        const providerName = `${genModule}.${category}`.toLowerCase()
        generatorContent[genModule][category] = await this.contentProviders[providerName].getContent()
      }
    }
    return generatorContent
  }
}
