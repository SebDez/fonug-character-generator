/* global describe, it, before, beforeEach */

import chai from 'chai'
import { DEFAULT_TRANSLATION } from './../../src/constants'
import I18nManager from './../../src/services/i18nManager'

chai.expect()
const expect = chai.expect

describe('I18nManager', () => {
  let i18nManager = null

  beforeEach(async () => {
    i18nManager = await new I18nManager()
  })

  describe('translateKey', () => {
    it('should return default key if lang is not handled', () => {
      expect(i18nManager.translateKey('main.age.old', 'male', 'whatlang')).to.equal(DEFAULT_TRANSLATION)
    })
    it('should return default key if category is unvailable for i18n', () => {
      expect(i18nManager.translateKey('main.age.UNKNOWNage', 'male', 'fr')).to.equal(DEFAULT_TRANSLATION)
    })
    it('should return gender key translated', () => {
      expect(i18nManager.translateKey('main.age.old', 'male', 'fr')).to.equal('Vieux')
    })
    it('should return simple key translated (no gender)', () => {
      expect(i18nManager.translateKey('main.alignment.chaoticgood', 'male', 'fr')).to.equal('Chaotique Bon')
    })
  })
})
