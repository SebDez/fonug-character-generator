import { GENERATOR_CATEGORIES, MAIN_GENERATOR_MODULE } from './../constants'

/**
 * A class representing a generated character
 * @export
 * @class Character
 */
export default class Character {
  constructor () {
    this[MAIN_GENERATOR_MODULE] = {}
  }

  /**
   * Set the character gender
   * @param {String} gender The gender to set
   */
  setGender (gender) {
    this.gender = gender
  }

  /**
   * Set the character main values
   * @param {Object} mainValues The main values to set
   */
  setMainValues (mainValues) {
    this.setGeneratorModuleValues(MAIN_GENERATOR_MODULE, mainValues)
  }

  /**
   * Set the character name
   * @param {String} name The name to set
   */
  setName (name) {
    this.name = name
  }

  /**
   * Set character attributes for a module (main, etc.) from given values
   * Each value must be a ContentObject
   * @param {String} genModule The name of the module concerned
   * @param {Object} values The values to set, each value must be a ContentObject
   */
  setGeneratorModuleValues (genModule, values) {
    const valuesClone = Object.assign({}, values)
    this[genModule] = {}
    for (const category of GENERATOR_CATEGORIES[genModule]) {
      this[genModule][category] = valuesClone[category]
    }
  }

  /**
   * Returns he character to JSON format
   * @returns The character to JSON format
   */
  toJSON () {
    return Object.keys(GENERATOR_CATEGORIES)
      .reduce((obj, mod) => {
        const moduleObject = GENERATOR_CATEGORIES[mod].reduce((modObj, category) => {
          modObj[category] = this[mod] && this[mod][category] && this[mod][category].toJSON ? this[mod][category].toJSON() : void (0)
          return modObj
        }, {})
        obj[mod] = moduleObject
        return obj
      }, {
        gender: this.gender,
        name: this.name
      })
  }
}
