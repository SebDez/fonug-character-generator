/* global describe, it, before, beforeEach */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import ContentProvider from './../../src/model/contentProvider'
import ContentObject from './../../src/model/contentObject'

chai.expect()
chai.use(chaiAsPromised)
chai.should()
const expect = chai.expect

describe('ContentProvider model', () => {
  let contentProvider = null

  beforeEach(() => {
    contentProvider = new ContentProvider('main.age')
  })

  describe('getContent', () => {
    let contents = null
    let contentPromise = null

    beforeEach(async () => {
      contentPromise = contentProvider.getContent()
      contents = await contentProvider.getContent()
    })

    it('should return a Promise', () => {
      expect(contentPromise).to.be.an.instanceof(Promise)
    })

    it('should resolve an array', () => {
      expect(contents).to.be.an.instanceof(Array)
    })

    it('should resolve an array of ContentObject', () => {
      contents.forEach(content => {
        expect(content).to.be.an.instanceof(ContentObject)
        expect(content.i18nKey).not.to.be.undefined
      })
    })

    it('should throw code FCG001 if provider is undefined', async () => {
      contentProvider = new ContentProvider('main.thisisundefined')
      let error = null
      try {
        await contentProvider.getContent()
      } catch (e) {
        error = e
      }
      expect(error.code).to.equal('FCG001')
    })

    it('should throw code FCG004 if custom provider is not a promise', async () => {
      const customProvider = () => 'not a promise'
      contentProvider = new ContentProvider('main.age', customProvider)
      let error = null
      try {
        await contentProvider.getContent()
      } catch (e) {
        error = e
      }
      expect(error.code).to.equal('FCG004')
    })

    it('should throw code FCG005 if custom provider does not resolve an array', async () => {
      const customProvider = () => Promise.resolve('invalid response')
      contentProvider = new ContentProvider('main.age', customProvider)
      let error = null
      try {
        await contentProvider.getContent()
      } catch (e) {
        error = e
      }
      expect(error.code).to.equal('FCG005')
    })

    it('should throw code FCG006 if custom provider is resolved values are not valid, not objects case', async () => {
      const customProvider = () => Promise.resolve([42, null])
      contentProvider = new ContentProvider('main.age', customProvider)
      let error = null
      try {
        await contentProvider.getContent()
      } catch (e) {
        error = e
      }
      expect(error.code).to.equal('FCG006')
    })

    it('should throw code FCG007 if custom provider is resolved values are not valid, one object is empty case', async () => {
      const customProvider = () => Promise.resolve([{}])
      contentProvider = new ContentProvider('main.age', customProvider)
      let error = null
      try {
        await contentProvider.getContent()
      } catch (e) {
        error = e
      }
      expect(error.code).to.equal('FCG007')
    })

    it('should throw code FCG007 if custom provider is resolved values are not valid, object format is invalid case', async () => {
      const customProvider = () => Promise.resolve([new ContentProvider()])
      contentProvider = new ContentProvider('main.age', customProvider)
      let error = null
      try {
        await contentProvider.getContent()
      } catch (e) {
        error = e
      }
      expect(error.code).to.equal('FCG007')
    })

    it('should throw code FCG007 if custom provider is resolved values are not valid, object i18nKey is invalid', async () => {
      const customProvider = () => Promise.resolve([{ i18nKey: 23, weight: 0.5, percentage: 20 }])
      contentProvider = new ContentProvider('main.age', customProvider)
      let error = null
      try {
        await contentProvider.getContent()
      } catch (e) {
        error = e
      }
      expect(error.code).to.equal('FCG007')
    })

    it('should return an array of ContentObject, with custom provider', async () => {
      const customProvider = () => Promise.resolve([{i18nKey: 'mykey', weight: 0.5, percentage: 70}])
      contentProvider = new ContentProvider('main.age', customProvider)
      contents = await contentProvider.getContent()
      contents.forEach(content => {
        expect(content).to.be.an.instanceof(ContentObject)
        expect(content.i18nKey).not.to.be.undefined
      })
    })
  })
})
