/* global describe, it, before, beforeEach */

import chai from 'chai'
import ContentObject from './../../src/model/contentObject'

chai.expect()
const expect = chai.expect

describe('ContentObject model', () => {
  let object = null

  beforeEach(() => {
    object = new ContentObject({
      i18nKey: 'my-i18nKey',
      i18nFullKey: null,
      i18nValue: 'my-i18nValue',
      weight: 'my-weight',
      percentage: 'my-percentage'
    })
    object.setI18nFullKey('main', 'age')
  })

  describe('toJSON', () => {
    let jsonResult = null

    beforeEach(() => {
      jsonResult = object.toJSON()
    })

    it('should return an object', () => {
      expect(jsonResult).to.be.an.instanceof(Object)
    })

    it('should not return a ContentObject', () => {
      expect(jsonResult).to.not.be.an.instanceof(ContentObject)
    })

    it('should not return a weight attribute', () => {
      expect(jsonResult.weight).to.be.undefined
    })

    it('should return i18nFullKey', () => {
      expect(jsonResult.i18nFullKey).to.equal('main.age.my-i18nKey')
    })

    it('should return i18nKey', () => {
      expect(jsonResult.i18nKey).to.equal('my-i18nKey')
    })

    it('should return i18nValue', () => {
      expect(jsonResult.i18nValue).to.equal('my-i18nValue')
    })

    it('should return percentage', () => {
      expect(jsonResult.percentage).to.equal('my-percentage')
    })
  })
})
