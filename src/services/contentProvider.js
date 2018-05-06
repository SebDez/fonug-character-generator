import ContentObject from './../model/contentObject'

export default class ContentProvider {
  default () {
    return [
      new ContentObject({i18nKey: 'HUMAN'}),
      new ContentObject({i18nKey: 'DWARF'})
    ]
  }
}
