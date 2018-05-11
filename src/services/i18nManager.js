import { DEFAULT_TRANSLATION } from './../constants'

export default class I18nManager {
  translateKey (fullKey, gender, lang) {
    const fileKey = fullKey.split('.')
    const fileName = `${lang}.${fileKey[0]}.${fileKey[1]}`
    const content = this.getI18nContent(fileName)
    if (content) {
      if (content[fileKey[2]]) {
        return content[fileKey[2]][gender] || content[fileKey[2]]
      }
    }
    return DEFAULT_TRANSLATION
  }

  getI18nContent (filename) {
    let content = {}
    try {
      content = require(`./../lang/${filename}`)
    } catch (e) {
      content = null
    }
    return content
  }
}
