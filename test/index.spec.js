/* global describe, it, before, afterEach */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import FonugCharacterGenerator from './../src/index'
import Character from './../src/model/character'
import { AVAILABLE_GENDERS } from './../src/constants'

chai.expect()
chai.use(chaiAsPromised)
chai.should()
const expect = chai.expect

describe('NPC Generator', () => {
  let generator = null
  let mockContentProviderManager = null

  before(() => {
    generator = new FonugCharacterGenerator()
    mockContentProviderManager = sinon.mock(generator.contentProviderManager)
  })

  afterEach(() => {
    mockContentProviderManager.restore()
  })

  describe('generateCharacter', () => {
    let character
    before(async () => {
      character = await generator.generateCharacter()
    })

    it('should return an object', () => {
      expect(character).to.be.an.instanceof(Object)
    })

    it('should not return a FonugCharacterGenerator', () => {
      expect(character).to.not.be.an.instanceof(FonugCharacterGenerator)
    })

    it('should not return a Character', () => {
      expect(character).to.not.be.an.instanceof(Character)
    })

    it('should return a valid version', () => {
      expect(character.version).to.match(/^(\d+\.)?(\d+\.)?(\*|\d+)$/)
    })

    it('should not be declared as using customProviders', () => {
      expect(character.customProviders).to.equal(false)
    })

    it('should return a character translated with default lang', () => {
      expect(character.lang).to.equal('en')
    })

    it('should return a character translated with given lang', async () => {
      character = await generator.generateCharacter({lang: 'fr'})
      expect(character.lang).to.equal('fr')
    })

    it('should throw error FCG002 if given lang option is unknown', () => {
      return generator.generateCharacter({lang: 'unknown'}).should.be.eventually.rejected.and.have.property('code', 'FCG002')
    })

    it('should return a character translated with a generated gender', () => {
      expect(AVAILABLE_GENDERS).to.include(character.gender)
    })

    it('should return a character translated with given gender', async () => {
      character = await generator.generateCharacter({gender: 'female'})
      expect(character.gender).to.equal('female')
    })

    it('should throw error FCG003 if given gender option is unknown', () => {
      return generator.generateCharacter({gender: 'unknown'}).should.be.eventually.rejected.and.have.property('code', 'FCG003')
    })

    it('should reject an error if contentProviderManager has an problem with a provider', () => {
      mockContentProviderManager.expects('getGeneratorContent').rejects(new Error('FCG001'))
      return generator.generateCharacter().should.be.rejectedWith('FCG001')
    })
  })

  describe('generateCharacter with custom providers', () => {
    let character
    before(async () => {
      const customProviders = {
        'main.age': () => Promise.resolve([{i18nKey: 'totallyCustomAge', weight: 1, percentage: 70}]),
        'main.civilization': () => Promise.resolve([{i18nKey: 'totallyCustomCiv', weight: 0}]),
        'main.fightSkills': () => Promise.resolve([{i18nKey: 'totallyCustomFS', weight: 1, percentage: 42}]),
        'MAIN.CHARCLASS': () => Promise.resolve([{i18nKey: 'totallyCustomCharClass', weight: 1}])
      }
      const generatorWithCustomProvider = new FonugCharacterGenerator(customProviders)
      character = await generatorWithCustomProvider.generateCharacter()
    })

    it('should return an object', () => {
      expect(character).to.be.an.instanceof(Object)
    })

    it('should be declared as using customProviders', () => {
      expect(character.customProviders).to.equal(true)
    })

    it('should return a character with age from custom provider', () => {
      expect(character.main.age.i18nFullKey).to.equal('main.age.totallyCustomAge')
    })

    it('should return a character with no civilization', () => {
      expect(character.main.civilization.i18nFullKey).to.equal('main.civilization.totallyCustomCiv')
    })

    it('should return a character with fightskills percentage from custom provider', () => {
      expect(character.main.fightskills.percentage).to.equal(42)
    })

    it('should return a character with charClass from CAPS custom provider', () => {
      expect(character.main.charClass.i18nFullKey).to.equal('main.charClass.totallyCustomCharClass')
    })

    it('should no throw even if with invalid providers name', async () => {
      const invalidCustomProvider = {
        42: () => Promise.resolve([{i18nKey: 'totallyCustomAge', weight: 1, percentage: 70}]),
        true: () => Promise.resolve([{i18nKey: 'totallyCustomAge', weight: 1, percentage: 70}]),
        '.main.ft.d': () => Promise.resolve([{i18nKey: 'totallyCustomAge', weight: 1, percentage: 70}]),
        'main.invalidprovider': () => Promise.resolve([{i18nKey: 'totallyCustomAge', weight: 1, percentage: 70}])
      }
      let error = null
      try {
        await new FonugCharacterGenerator(invalidCustomProvider).generateCharacter()
      } catch (e) {
        error = e
      }
      expect(error).to.equal(null)
    })
  })
})
