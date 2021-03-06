import _ from 'lodash'

/**
 * A class representing a content Object
 * i18nKey : The key that will be used to manage i18n values
 * i18nValue : The default i18n value
 * weight: float, determine the chances to be picked
 * percentage : values from 0 to 100
 * @export
 * @class ContentObject
 */
export default class ContentObject {
  constructor (content) {
    const contentClone = Object.assign({}, content)
    this.i18nKey = contentClone.i18nKey
    this.i18nFullKey = contentClone.i18nFullKey
    this.i18nValue = contentClone.i18nValue
    this.weight = contentClone.weight
    this.percentage = contentClone.percentage
  }

  setI18nValue (value) {
    this.i18nValue = value
  }

  setI18nFullKey (genModule, category) {
    this.i18nFullKey = `${genModule}.${category}.${this.i18nKey}`
  }

  getI18nFullKey () {
    return this.i18nFullKey
  }

  toJSON () {
    return {
      i18nKey: this.i18nKey,
      i18nFullKey: this.i18nFullKey,
      i18nValue: this.i18nValue,
      percentage: this.percentage
    }
  }

  static isValid ({ i18nKey, weight, percentage } = {}) {
    const isI18nValid = !!i18nKey && _.isString(i18nKey)
    const isWeightValid = _.isNil(percentage) || (_.isNumber(weight) && weight >= 0 && weight <= 1)
    const isPercentageValid = _.isNil(percentage) || (_.isNumber(percentage) && percentage >= 0 && percentage <= 100)
    return isI18nValid && isWeightValid && isPercentageValid
  }
}
