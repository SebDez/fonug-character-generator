import * as config from './../package.json'
import { AVAILABLE_LANG, AVAILABLE_GENDERS } from './constants'
import CharacterGenerator from './services/characterGenerator'
import ContentProviderManager from './services/contentProviderManager'
import ErrorObject from './model/errorObject'

/**
 * The class defining the character generator
 * Instanciate it whith the contentProvider wanted, are use the default ones
 * The generate random generate characters that will use the given content providers
 * @export
 * @class FonugGenerator
 */
export default class FonugCharacterGenerator {
  constructor () {
    this.version = config.version
    this.contentProviderManager = new ContentProviderManager()
  }

  /**
   * Generate a new random Character
   * @returns Object The character generated
   * @memberof FonugGenerator
   */
  async generateCharacter (params) {
    const paramsClone = Object.assign({}, params)
    this.checkCharacterGeneratorParams(paramsClone)
    const options = this.buildOptionsFromParams(paramsClone)
    const generatorContent = await this.contentProviderManager.getGeneratorContent()
    const generator = new CharacterGenerator(generatorContent, options.lang, { gender: options.gender })
    const character = generator.generateCharacter()
    return Object.assign({}, character.toJSON(), {
      version: this.version,
      lang: options.lang
    })
  }

  buildOptionsFromParams (options) {
    return {
      lang: options.lang,
      gender: options.gender
    }
  }

  checkCharacterGeneratorParams (params) {
    // Lang
    if (params.lang && AVAILABLE_LANG.indexOf(params.lang) === -1) {
      throw new ErrorObject('FCG002', `FONUG-CHARACTER-GENERATOR : 0002 : The lang "${params.lang}" is not available.`)
    }
    // Gender
    if (params.gender && AVAILABLE_GENDERS.indexOf(params.gender) === -1) {
      throw new ErrorObject('FCG003', `FONUG-CHARACTER-GENERATOR : 0003 : The gender "${params.gender}" is not available.`)
    }
  }
}
