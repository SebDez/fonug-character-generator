/* global describe, it, before, beforeEach */

import chai from 'chai'
import Character from './../../src/model/character'
import ContentObject from './../../src/model/contentObject'

chai.expect()
const expect = chai.expect

describe('Character model', () => {
  let character = null

  beforeEach(() => {
    character = new Character()
  })
  describe('setGeneratorModuleValues', () => {
    it('should set main values', () => {
      // GIVEN some values
      const mainValues = {
        age: 'my-age',
        civilization: 'my-civilization',
        charClass: 'my-charClass',
        alignment: 'my-alignment',
        punchline: 'my-punchline',
        charisma: 'my-charisma',
        beauty: 'my-beauty',
        intellect: 'my-intellect',
        perception: 'my-perception',
        fightskills: 'my-fightskills'
      }
      // WHEN set theses values to character main module
      character.setGeneratorModuleValues('main', mainValues)
      // THEN character age should be set
      expect(character.main.age).to.equal('my-age')
      // THEN character civilization should be set
      expect(character.main.civilization).to.equal('my-civilization')
      // THEN character charClass should be set
      expect(character.main.charClass).to.equal('my-charClass')
      // THEN character alignment should be set
      expect(character.main.alignment).to.equal('my-alignment')
      // THEN character punchline should be set
      expect(character.main.punchline).to.equal('my-punchline')
      // THEN character charisma should be set
      expect(character.main.charisma).to.equal('my-charisma')
      // THEN character beauty should be set
      expect(character.main.beauty).to.equal('my-beauty')
      // THEN character intellect should be set
      expect(character.main.intellect).to.equal('my-intellect')
      // THEN character perception should be set
      expect(character.main.perception).to.equal('my-perception')
      // THEN character fightskills should be set
      expect(character.main.fightskills).to.equal('my-fightskills')
    })
  })
  describe('toJSON', () => {
    let jsonResult = null

    beforeEach(() => {
      character.setGender('male')
      character.setName('Fonug II')
      character.setGeneratorModuleValues('main', {
        age: new ContentObject({i18nFullKey: 'my full key'}),
        civilization: {}
      })
      jsonResult = character.toJSON()
    })

    it('should return an object', () => {
      expect(jsonResult).to.be.an.instanceof(Object)
    })

    it('should not return a Character', () => {
      expect(jsonResult).to.not.be.an.instanceof(Character)
    })

    it('should return character gender', () => {
      expect(jsonResult.gender).to.equal('male')
    })

    it('should return character name', () => {
      expect(jsonResult.name).to.equal('Fonug II')
    })

    it('should return main values to JSON', () => {
      const mainValue = jsonResult.main.age
      expect(mainValue).to.be.an.instanceof(Object)
      expect(mainValue).to.not.be.an.instanceof(ContentObject)
      expect(mainValue.i18nFullKey).to.equal('my full key')
    })

    it('should return undefined for a module value if there are no toJSON', () => {
      const mainValue = jsonResult.main.civilization
      expect(mainValue).to.be.undefined
    })
  })
})
