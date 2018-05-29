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
      expect(character.version).to.not.be.an.instanceof(Object)
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

    it('should return a character translated with default lang', () => {
      expect(character.lang).to.equal('fr')
    })

    it('should return a character translated with given lang', async () => {
      character = await generator.generateCharacter({lang: 'en'})
      expect(character.lang).to.equal('en')
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
})
