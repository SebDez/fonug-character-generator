import Character from './../model/character'
import { GENERATOR_CATEGORIES, MAIN_GENERATOR_MODULE, GENDERS, DEFAULT_GENDER, DEFAULT_LANG } from './../constants'
import I18nManager from './i18nManager'
import NameGenerator from './nameGenerator'

export default class CharacterGenerator {
  constructor (contents, lang, presetValues) {
    this.i18nManager = new I18nManager()
    this.nameGenerator = new NameGenerator()
    this.contents = contents || {}
    this.setLang(lang)
    this.managePresetValues(presetValues)
  }

  setLang (lang) {
    this.lang = lang || DEFAULT_LANG
  }
  setCharacterGender (characterGender) {
    this.characterGender = characterGender || DEFAULT_GENDER
  }
  setPresetCharacterGender (characterGender) {
    this.characterGenderIsPresetted = true
    this.setCharacterGender(characterGender)
  }

  managePresetValues (presetValues) {
    if (presetValues.gender) {
      this.setPresetCharacterGender(presetValues.gender)
    }
  }

  generateCharacter () {
    const character = new Character()

    // Prepare gender
    if (!this.characterGenderIsPresetted) {
      this.setCharacterGender(this.generateGender())
    }
    character.setGender(this.characterGender)

    // Main Values
    character.setMainValues(this.generateGenModuleValues(MAIN_GENERATOR_MODULE))

    // Generate name
    character.setName(this.nameGenerator.generateName(character.civilization, character.gender))

    // Return final character
    return character
  }

  generateGender () {
    return Math.random() >= 0.5 ? GENDERS.FEMALE : GENDERS.MALE
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
    contentPicked.setI18nValue(this.getContentI18nValue(contentPicked.getI18nFullKey()))
    return contentPicked
  }

  getContentI18nValue (fullKey) {
    return this.i18nManager.translateKey(fullKey, this.characterGender, this.lang)
  }
}
