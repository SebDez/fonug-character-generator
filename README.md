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
const generator = new FonugCharacterGenerator(options)

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

## Parameters and options

* Parameters for FonugCharacterGenerator (options)

```

Incoming

```

* Parameters for generateCharacter method (params)

You can generate a character with preset values.

| Parameter     | Description         |
| ------------- | ------------- |
| lang          | The generated keys will be translated by default in french. To change this you can preset the lang between these values : fr or en |
| gender        | You can preset the character gender between [male, female], or it will by randomly generated.      |

## Errors

| Error  | Description |
| ------------- | ------------- |
| FCG001  | A content file for element cannot be found, this should never happen now.  |
| FCG002  | The "lang" you preset in params is not a valid one. |
| FCG003  | The "gender" you preset in params is not a valid one. |


## Scripts

* `yarn build` or `npm run build` - produces production version of the library under the `lib` folder
* `yarn dev` or `npm run dev` - produces development version of the library and runs a watcher
* `yarn test` or `npm run test` - well ... it runs the tests :)
* `yarn test:watch` or `npm run test:watch` - same as above but in a watch mode

## Readings

* [Forked from Krasimir Tsonev Js library starter](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)
