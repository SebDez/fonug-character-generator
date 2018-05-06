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

  setMainValues (mainValues) {
    this.setGeneratorModuleValues(MAIN_GENERATOR_MODULE, mainValues)
  }

  setGeneratorModuleValues (genModule, values) {
    const valuesClone = Object.assign({}, values)
    this[genModule] = {}
    for (const category of GENERATOR_CATEGORIES[genModule]) {
      this[genModule][category] = valuesClone[category]
    }
  }

  toJSON () {
    return Object.keys(GENERATOR_CATEGORIES)
      .reduce((obj, mod) => {
        const moduleObject = GENERATOR_CATEGORIES[mod].reduce((modObj, category) => {
          modObj[category] = this[mod] && this[mod][category] && this[mod][category].toJSON ? this[mod][category].toJSON() : void (0)
          return obj
        }, {})
        obj[mod] = moduleObject
        return obj
      }, {})
  }
}
