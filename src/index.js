import * as config from './../package.json'
import CharacterGenerator from './services/characterGenerator'
import ContentProvider from './services/contentProvider'

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
    this.contentProvider = new ContentProvider()
  }

  /**
   * Generate a new random Character
   * @returns Object The character generated
   * @memberof FonugGenerator
   */
  generateCharacter () {
    const generator = new CharacterGenerator(this.getGeneratorContent())
    const character = generator.generateCharacter()
    return Object.assign({}, character.toJSON(), {
      version: this.version
    })
  }

  getGeneratorContent () {
    return {
      main: {
        civilization: this.contentProvider.default(),
        age: this.contentProvider.default()
      }
    }
  }
}
