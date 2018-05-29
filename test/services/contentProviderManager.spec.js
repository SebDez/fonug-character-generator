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
})
