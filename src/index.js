import * as config from './../package.json'
import CharacterGenerator from './services/characterGenerator'
import ContentProviderManager from './services/contentProviderManager'

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
  async generateCharacter () {
    const generatorContent = await this.contentProviderManager.getGeneratorContent()
    const generator = new CharacterGenerator(generatorContent)
    const character = generator.generateCharacter()
    return Object.assign({}, character.toJSON(), {
      version: this.version
    })
  }
}
