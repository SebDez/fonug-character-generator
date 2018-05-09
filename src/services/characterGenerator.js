import Character from './../model/character'
import { GENERATOR_CATEGORIES, MAIN_GENERATOR_MODULE } from './../constants'

export default class CharacterGenerator {
  constructor (contents) {
    this.contents = contents || {}
  }

  generateCharacter () {
    const character = new Character()
    character.setGender(this.generateGender())
    character.setMainValues(this.generateGenModuleValues(MAIN_GENERATOR_MODULE))
    return character
  }

  generateGender () {
    return Math.random() >= 0.5 ? 'female' : 'male'
  }

  generateGenModuleValues (genModule) {
    return GENERATOR_CATEGORIES[genModule].reduce((obj, category) => {
      obj[category] = this.getRandomContentForCategory(genModule, category)
      return obj
    }, {})
  }

  getRandomContentForCategory (genModule, category) {
    const randomList = []
    const categoryContents = this.contents[genModule] && this.contents[genModule][category] ? this.contents[genModule][category] : []
    for (const content of categoryContents) {
      const nb = content.weight ? content.weight * 10 : 1
      for (let i = 0; i < nb; i++) {
        randomList.push(content)
      }
    }
    const contentPicked = this.getRandomContentInArray(randomList)
    return contentPicked ? this.prepareContentPicked(contentPicked, genModule, category) : void (0)
  }

  getRandomContentInArray (array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }

  prepareContentPicked (contentPicked, genModule, category) {
    contentPicked.setI18nFullKey(genModule, category)
    contentPicked.setI18nValue(this.getContentI18nValue())
    return contentPicked
  }

  getContentI18nValue () {
    return 'traduction !'
  }
}
