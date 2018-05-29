import { DEFAULT_KEY, DEFAULT_GENDER, NAME_BEGINNING_KEY, NAME_MIDDLE_KEY, NAME_END_KEY, GENDERS } from './../constants'
import namesContent from './../content/names.json'

export default class NameGenerator {
  constructor () {
    this.namesContent = namesContent
  }

  generateName (charCiv, charGender) {
    const civilization = this.namesContent[charCiv] ? charCiv : DEFAULT_KEY
    const gender = charGender && GENDERS[charGender.toUpperCase()] ? charGender : DEFAULT_GENDER

    // A name can have several words, at least 1
    const numberOfSubNames = this.namesContent[civilization].numberOfSubNames || this.namesContent[DEFAULT_KEY].numberOfSubNames
    let name = this.generateSubName(civilization, gender)
    for (let i = 1; i < numberOfSubNames; i++) {
      name += ` ${this.generateSubName(civilization, gender)}`
    }

    return name
  }

  generateSubName (civilization, gender) {
    const begin = this.getRandomSyllab(civilization, gender, NAME_BEGINNING_KEY)
    const middle = this.getRandomSyllab(civilization, gender, NAME_MIDDLE_KEY)
    const end = this.getRandomSyllab(civilization, gender, NAME_END_KEY)

    return `${begin}${middle}${end}`
  }

  getRandomSyllab (civilization, gender, namePosition) {
    const civNameContent = this.namesContent[civilization]
    const syllabArray = civNameContent[gender] && civNameContent[gender][namePosition] ? civNameContent[gender][namePosition] : this.namesContent[DEFAULT_KEY][gender][namePosition]
    const index = Math.floor(Math.random() * syllabArray.length)
    return syllabArray[index]
  }
}
