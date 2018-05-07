import { GENERATOR_CATEGORIES } from './../constants'
import ContentProvider from './../model/contentProvider'

export default class ContentProviderManager {
  constructor () {
    this.setContentProviders()
  }

  setContentProviders () {
    this.contentProviders = {}
    for (const genModule of Object.keys(GENERATOR_CATEGORIES)) {
      for (const category of GENERATOR_CATEGORIES[genModule]) {
        const providerName = `${genModule}.${category}`
        this.contentProviders[providerName] = new ContentProvider(providerName)
      }
    }
  }

  async getGeneratorContent () {
    const generatorContent = {}
    for (const genModule of Object.keys(GENERATOR_CATEGORIES)) {
      generatorContent[genModule] = {}
      for (const category of GENERATOR_CATEGORIES[genModule]) {
        const providerName = `${genModule}.${category}`
        generatorContent[genModule][category] = await this.contentProviders[providerName].getContent()
      }
    }
    return generatorContent
  }
}
