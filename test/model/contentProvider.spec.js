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
  })
})
