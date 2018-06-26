/* global describe, it, before, beforeEach */

import chai from 'chai'
import ContentProviderManager from './../../src/services/contentProviderManager'
import { GENERATOR_CATEGORIES } from './../../src/constants'
import ContentObject from './../../src/model/contentObject'

chai.expect()
const expect = chai.expect

describe('Content Provider Manager', () => {
  describe('getGeneratorContent', () => {
    let content = null

    beforeEach(async () => {
      content = await new ContentProviderManager().getGeneratorContent()
    })

    it('should return for main content arrays of content Objects', () => {
      const mainContent = content.main
      GENERATOR_CATEGORIES.main.forEach(category => {
        expect(mainContent[category]).to.be.an.instanceof(Array)
        mainContent[category].forEach(content => {
          expect(content).to.be.an.instanceof(ContentObject)
        })
      })
    })
  })

  describe('Setting custom providers', () => {
    let providers = {}
    let cpManager = null

    beforeEach(async () => {
      providers = {
        'main.age': () => 'this is my provider function',
        'main.civilization': null,
        'main.charClass': 'invalid'
      }
      cpManager = new ContentProviderManager(providers)
    })

    it('should set my custom provider if it is a valid one', () => {
      expect(cpManager.contentProviders['main.age'].customProvider).to.be.an.instanceOf(Function)
      expect(cpManager.contentProviders['main.age'].customProvider()).to.equal('this is my provider function')
    })
    it('should NOT set my custom provider if it is null', () => {
      expect(cpManager.contentProviders['main.civilization'].customProvider).not.to.be.an.instanceOf(Function)
      expect(cpManager.contentProviders['main.civilization'].customProvider).to.be.null
    })
    it('should NOT set my custom provider if it is not a function', () => {
      expect(cpManager.contentProviders['main.charclass'].customProvider).not.to.be.an.instanceOf(Function)
      expect(cpManager.contentProviders['main.charclass'].customProvider).to.be.null
    })
  })
})
