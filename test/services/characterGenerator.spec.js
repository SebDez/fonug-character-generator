/* global describe, it, before, beforeEach */

import chai from 'chai'
import CharacterGenerator from './../../src/services/characterGenerator'
import Character from './../../src/model/character'
import ContentProviderManager from './../../src/services/contentProviderManager'
import { GENERATOR_CATEGORIES, MAIN_GENERATOR_MODULE } from './../../src/constants'

chai.expect()
const expect = chai.expect

describe('Character Generator', () => {
  describe('generateCharacter', () => {
    let character = null
    let generatorContent = null

    beforeEach(async () => {
      generatorContent = await new ContentProviderManager().getGeneratorContent()
      const generator = new CharacterGenerator(generatorContent)
      character = generator.generateCharacter()
    })

    it('should return a Character', () => {
      expect(character).to.be.an.instanceof(Character)
    })

    it('should have a gender', () => {
      expect(character.gender).to.not.be.null
    })

    it('should have a name', () => {
      expect(character.name).to.not.be.null
    })

    it('should have a name', () => {
      expect(character.name).to.not.be.null
    })

    it('should have a main module completly generated from content values', () => {
      expect(character[MAIN_GENERATOR_MODULE]).to.not.be.null
      GENERATOR_CATEGORIES[MAIN_GENERATOR_MODULE].forEach(category => {
        const categoryGenerated = character[MAIN_GENERATOR_MODULE][category]
        expect(categoryGenerated).to.not.be.null
        expect(categoryGenerated.i18nKey).to.not.be.null
        expect(categoryGenerated.i18nFullKey).to.not.be.null
        expect(categoryGenerated.i18nValue).to.not.be.null
        expect(generatorContent[MAIN_GENERATOR_MODULE][category]).to.include(categoryGenerated)
      })
    })
  })

  describe('getContentI18nValue', () => {
    it('should return content i18n object', () => {
      const generator = new CharacterGenerator()
      expect(generator.getContentI18nValue('main.age.old').male).to.equal('Old man')
      expect(generator.getContentI18nValue('main.age.old').female).to.equal('Old woman')
    })
  })
})
