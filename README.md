# Fonug Character Generator (Non Playable Character Generator)

![Travis](https://travis-ci.org/SebDez/fonug-character-generator.svg?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

This generator was designed to generate some random characters to be used in role playing game, fiction or whatever which needs a character !

I used to import this lib in another project called FONUG, which is a web based app to generate these characters.

You can choose to generate your character entirely randomly or to select the gender, the age, the class or the civilization as start values.

The character is generated according to that choice, the data could be not rational, it's up to you to adjust the values that you judge appropriated.

The character generated is very general with a view to be adapted to any world background (as a mediavel wolrd to a futuristic one )


## Features

* Generate a random character
** With key translated in : french or english
** With given gender : male or female

## Getting started

```javascript
const FonugCharacterGenerator = require('.../fonug-character-generator')

// Initialize the generator and content providers
const generator = new FonugCharacterGenerator()

//Generate a random character into a JSON object
const params = {
    lang: 'en',
    gender: 'male'
}
generator.generateCharacter(params).then(myRandomCharacter => {
  console.log('Character generated !')
  console.log(myRandomCharacter)
}, error => {
  console.log(error)
})
```

* Shortest Way (default values and content providers)
```javascript
const FonugCharacterGenerator = require('.../fonug-character-generator')

// Initialize the generator and content providers
const generator = new FonugCharacterGenerator()

//Generate a random character into a JSON object
const character = await generator.generateCharacter()
```

* With Custom providers
```javascript
//INCOMING
```


## Parameters and options

* Parameters for FonugCharacterGenerator (options)

```

Incoming

```

* Parameters for generateCharacter method (params)

You can generate a character with preset values.

| Parameter     | Description         |
| ------------- | ------------- |
| lang          | The generated keys will be translated by default in english. To change this you can preset the lang between these values : fr or en |
| gender        | You can preset the character gender between [male, female], or it will by randomly generated.      |

## Errors

| Error  | Description |
| ------------- | ------------- |
| FCG001  | A content file for element cannot be found, this should never happen now.  |
| FCG002  | The "lang" you preset in params is not a valid one. |
| FCG003  | The "gender" you preset in params is not a valid one. |

## How it works

First you must instanciate a FonugCharacterGenerator with some providers.
By default, we use some fixed providers in this lib, but you can provide your own providers.

A ContentProvider is an element which will return an array of Content Objects.

Each ContentObject is defined by :
- i18nKey: an unique key to represent the content.
- i18nFullKey: a more complete string to define the i18nkey and the module concerned, for example : main.age.child, says that the key is 'child' of the category 'age' of the 'main' module.
- i18nValue: if the lang is available, this will be the translation for this key.
- weight: the weight of a content object determine the chances to be picked during the generation, its value is from 0 et 1. For example, we want to randomly pick a value between BANANA (weight: 0.4) and TOMATO (weight: 0.6), the value will be picked randomly into a list of 4 BANANAS and 6 TOMATOES.
- percentage: some values as the "fightSkills" are represented in percentage, which means that we can link the key to a value from 0 to 100.

Therefrom, the FonugCharacterGenerator will fetch the contentValues for each modules accros content provider, and from theses values the character will be randomly generated.

So you can (soon) passed your own ContentProvider if you want the data to be from everywhere you want.

A given ContentProvider must be a function that return a Promise, and the values will not be translated in this generator.
The promise should resolves an Array of Json objects which respect the format of a contentObject.

In short :
- You instanciate a FonugCharacterGenerator (eventually with your own providers)
- You generate a character from that generator (eventually with options  as : lang, gender, or module choices)
- You get a randomly generated character to JSON format.

Enjoy !

## Scripts

* `yarn build` or `npm run build` - produces production version of the library under the `lib` folder
* `yarn dev` or `npm run dev` - produces development version of the library and runs a watcher
* `yarn test` or `npm run test` - well ... it runs the tests :)
* `yarn test:watch` or `npm run test:watch` - same as above but in a watch mode

## Readings

* [Forked from Krasimir Tsonev Js library starter](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)
