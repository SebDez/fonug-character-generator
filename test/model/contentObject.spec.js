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
  describe('isValid', () => {
    it('should be valid, default case', () => {
      const params = {i18nKey: 'mykey', weight: 0.5, percentage: 70}
      expect(ContentObject.isValid(params)).to.equal(true)
    })

    it('should be valid, default minor cases', () => {
      const params = {i18nKey: 'mykey', weight: 0, percentage: 0}
      expect(ContentObject.isValid(params)).to.equal(true)
    })

    it('should be valid, default major cases', () => {
      const params = {i18nKey: 'mykey', weight: 1, percentage: 100}
      expect(ContentObject.isValid(params)).to.equal(true)
    })

    it('should be invalid if no params are given', () => {
      const params = void (0)
      expect(ContentObject.isValid(params)).to.equal(false)
    })

    it('should be invalid if params is empty', () => {
      const params = {}
      expect(ContentObject.isValid(params)).to.equal(false)
    })

    it('should be invalid if there is no i18nkey', () => {
      const params = {weight: 0.5, percentage: 70}
      expect(ContentObject.isValid(params)).to.equal(false)
    })

    it('should be invalid if ii18nkey is invalid', () => {
      const params = {i18nKey: 42, weight: 0.5, percentage: 70}
      expect(ContentObject.isValid(params)).to.equal(false)
    })

    it('should be invalid if weight is invalid', () => {
      const params = {i18nKey: 'mykey', weight: '0.5', percentage: 70}
      expect(ContentObject.isValid(params)).to.equal(false)
    })

    it('should be invalid if weight is under 0', () => {
      const params = {i18nKey: 'mykey', weight: -1, percentage: 70}
      expect(ContentObject.isValid(params)).to.equal(false)
    })

    it('should be invalid if weight is over 1', () => {
      const params = {i18nKey: 'mykey', weight: 2, percentage: 70}
      expect(ContentObject.isValid(params)).to.equal(false)
    })

    it('should be invalid if percentage is invalid', () => {
      const params = {i18nKey: 'mykey', weight: 0.5, percentage: '70'}
      expect(ContentObject.isValid(params)).to.equal(false)
    })

    it('should be invalid if percentage is under 0', () => {
      const params = {i18nKey: 'mykey', weight: 0.5, percentage: -1}
      expect(ContentObject.isValid(params)).to.equal(false)
    })

    it('should be invalid if percentage is over 100', () => {
      const params = {i18nKey: 'mykey', weight: 0.5, percentage: 101}
      expect(ContentObject.isValid(params)).to.equal(false)
    })
  })
})
