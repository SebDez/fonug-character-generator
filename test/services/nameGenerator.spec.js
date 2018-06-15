/* global describe, it, before, beforeEach */

import chai from 'chai'
import NameGenerator from './../../src/services/nameGenerator'

chai.expect()
const expect = chai.expect

describe('NameGenerator', () => {
  let nameGenerator = null

  beforeEach(async () => {
    nameGenerator = await new NameGenerator()
    nameGenerator.namesContent = {
      default: {
        numberOfSubNames: 2,
        male: {
          beginning: ['maleBeg'],
          middle: ['maleMidd'],
          end: ['maleEnd']
        },
        female: {
          beginning: ['femaleBeg'],
          middle: ['femaleMidd'],
          end: ['femaleEnd']
        }
      },
      elf: {
        male: {
          beginning: ['elfMaleBeg'],
          middle: ['elfMaleMidd'],
          end: ['elfMaleEnd']
        },
        female: {
          beginning: ['elfFemaleBeg'],
          middle: ['elfFemaleMidd'],
          end: ['elfFemaleEnd']
        }
      },
      longName: {
        numberOfSubNames: 5
      },
      noGenderCiv: {
        numberOfSubNames: 1
      },
      noSubNameCiv: {
        numberOfSubNames: 1,
        male: {},
        female: {}
      }
    }
  })

  describe('generateName', () => {
    it('should return a valid name for : null civ and null gender', () => {
      expect(nameGenerator.generateName(null, null)).to.equal('femaleBegfemaleMiddfemaleEnd femaleBegfemaleMiddfemaleEnd')
    })
    it('should return a valid name for : default civ and invalid gender', () => {
      expect(nameGenerator.generateName('none!', 'invalidGender')).to.equal('femaleBegfemaleMiddfemaleEnd femaleBegfemaleMiddfemaleEnd')
    })
    it('should return a valid name for : default civ and male', () => {
      expect(nameGenerator.generateName('none!', 'male')).to.equal('maleBegmaleMiddmaleEnd maleBegmaleMiddmaleEnd')
    })
    it('should return a valid name for : default civ and female', () => {
      expect(nameGenerator.generateName('none!', 'female')).to.equal('femaleBegfemaleMiddfemaleEnd femaleBegfemaleMiddfemaleEnd')
    })
    it('should return a valid name for : elf and male', () => {
      expect(nameGenerator.generateName('elf', 'male')).to.equal('elfMaleBegelfMaleMiddelfMaleEnd elfMaleBegelfMaleMiddelfMaleEnd')
    })
    it('should return a valid name for : elf and female', () => {
      expect(nameGenerator.generateName('elf', 'female')).to.equal('elfFemaleBegelfFemaleMiddelfFemaleEnd elfFemaleBegelfFemaleMiddelfFemaleEnd')
    })
    it('should return a valid name for : longName and male', () => {
      expect(nameGenerator.generateName('longName', 'female')).to.equal('femaleBegfemaleMiddfemaleEnd femaleBegfemaleMiddfemaleEnd femaleBegfemaleMiddfemaleEnd femaleBegfemaleMiddfemaleEnd femaleBegfemaleMiddfemaleEnd')
    })
    it('should return a valid name for : noGenderCiv and male', () => {
      expect(nameGenerator.generateName('noGenderCiv', 'female')).to.equal('femaleBegfemaleMiddfemaleEnd')
    })
    it('should return a valid name for : noSubNameCiv and male', () => {
      expect(nameGenerator.generateName('noSubNameCiv', 'female')).to.equal('femaleBegfemaleMiddfemaleEnd')
    })
  })
})
