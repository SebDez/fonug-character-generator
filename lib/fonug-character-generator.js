(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fonug-character-generator", [], factory);
	else if(typeof exports === 'object')
		exports["fonug-character-generator"] = factory();
	else
		root["fonug-character-generator"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MAIN_GENERATOR_MODULE = exports.MAIN_GENERATOR_MODULE = 'main';

var GENERATOR_CATEGORIES = exports.GENERATOR_CATEGORIES = _defineProperty({}, MAIN_GENERATOR_MODULE, ['age', 'civilization', 'charClass', 'alignment', 'punchline', 'fightSkills']);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _package = __webpack_require__(2);

var config = _interopRequireWildcard(_package);

var _characterGenerator = __webpack_require__(3);

var _characterGenerator2 = _interopRequireDefault(_characterGenerator);

var _contentProvider = __webpack_require__(5);

var _contentProvider2 = _interopRequireDefault(_contentProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The class defining the character generator
 * Instanciate it whith the contentProvider wanted, are use the default ones
 * The generate random generate characters that will use the given content providers
 * @export
 * @class FonugGenerator
 */
var FonugCharacterGenerator = function () {
  function FonugCharacterGenerator() {
    _classCallCheck(this, FonugCharacterGenerator);

    this.version = config.version;
    this.contentProvider = new _contentProvider2.default();
  }

  /**
   * Generate a new random Character
   * @returns Object The character generated
   * @memberof FonugGenerator
   */


  _createClass(FonugCharacterGenerator, [{
    key: 'generateCharacter',
    value: function generateCharacter() {
      var generator = new _characterGenerator2.default(this.getGeneratorContent());
      var character = generator.generateCharacter();
      return Object.assign({}, character.toJSON(), {
        version: this.version
      });
    }
  }, {
    key: 'getGeneratorContent',
    value: function getGeneratorContent() {
      return {
        main: {
          civilization: this.contentProvider.default(),
          age: this.contentProvider.default()
        }
      };
    }
  }]);

  return FonugCharacterGenerator;
}();

exports.default = FonugCharacterGenerator;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"name":"fonug-character-generator","version":"0.0.1","description":"A character generator","main":"lib/library.js","scripts":{"build":"webpack --env dev && webpack --env build && npm run test","dev":"webpack --progress --colors --watch --env dev","test":"mocha --require babel-core/register --colors ./test/*.spec.js","test:watch":"mocha --require babel-core/register --colors -w ./test/*.spec.js"},"repository":{"type":"git","url":"https://github.com/SebDez/npc-generator"},"keywords":["webpack","es6","starter","library","universal","umd","commonjs"],"author":"Sébastien Dez","license":"MIT","devDependencies":{"babel-cli":"^6.26.0","babel-core":"^6.26.0","babel-eslint":"^8.0.3","babel-loader":"^7.1.2","babel-plugin-add-module-exports":"^0.2.1","babel-preset-env":"^1.6.1","chai":"^4.1.2","eslint":"^4.13.1","eslint-config-standard":"^11.0.0","eslint-loader":"^1.9.0","eslint-plugin-import":"^2.11.0","eslint-plugin-node":"^6.0.1","eslint-plugin-promise":"^3.7.0","eslint-plugin-standard":"^3.1.0","mocha":"^4.0.1","webpack":"^3.10.0","yargs":"^10.0.3"},"dependencies":{"eslint-config-standard":"^11.0.0","eslint-plugin-import":"^2.11.0","eslint-plugin-node":"^6.0.1","eslint-plugin-promise":"^3.7.0","eslint-plugin-standard":"^3.1.0"}}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _character = __webpack_require__(4);

var _character2 = _interopRequireDefault(_character);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharacterGenerator = function () {
  function CharacterGenerator(contents) {
    _classCallCheck(this, CharacterGenerator);

    this.contents = contents || {};
  }

  _createClass(CharacterGenerator, [{
    key: 'generateCharacter',
    value: function generateCharacter() {
      var character = new _character2.default();
      character.setMainValues(this.generateGenModuleValues(_constants.MAIN_GENERATOR_MODULE));
      return character;
    }
  }, {
    key: 'generateGenModuleValues',
    value: function generateGenModuleValues(genModule) {
      var _this = this;

      return _constants.GENERATOR_CATEGORIES[genModule].reduce(function (obj, category) {
        obj[category] = _this.getRandomContentForCategory(genModule, category);
        return obj;
      }, {});
    }
  }, {
    key: 'getRandomContentForCategory',
    value: function getRandomContentForCategory(genModule, category) {
      var randomList = [];
      var categoryContents = this.contents[genModule] && this.contents[genModule][category] ? this.contents[genModule][category] : [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = categoryContents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var content = _step.value;

          var nb = content.weight ? content.weight * 10 : 1;
          for (var i = 0; i < nb; i++) {
            randomList.push(content);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var contentPicked = this.getRandomContentInArray(randomList);
      return contentPicked ? this.prepareContentPicked(contentPicked, genModule, category) : void 0;
    }
  }, {
    key: 'getRandomContentInArray',
    value: function getRandomContentInArray(array) {
      var randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
  }, {
    key: 'prepareContentPicked',
    value: function prepareContentPicked(contentPicked, genModule, category) {
      contentPicked.setI18nFullKey(genModule, category);
      contentPicked.setI18nValue(this.getContentI18nValue());
      return contentPicked;
    }
  }, {
    key: 'getContentI18nValue',
    value: function getContentI18nValue() {
      return 'traduction !';
    }
  }]);

  return CharacterGenerator;
}();

exports.default = CharacterGenerator;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A class representing a generated character
 * @export
 * @class Character
 */
var Character = function () {
  function Character() {
    _classCallCheck(this, Character);

    this[_constants.MAIN_GENERATOR_MODULE] = {};
  }

  _createClass(Character, [{
    key: 'setMainValues',
    value: function setMainValues(mainValues) {
      this.setGeneratorModuleValues(_constants.MAIN_GENERATOR_MODULE, mainValues);
    }
  }, {
    key: 'setGeneratorModuleValues',
    value: function setGeneratorModuleValues(genModule, values) {
      var valuesClone = Object.assign({}, values);
      this[genModule] = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _constants.GENERATOR_CATEGORIES[genModule][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var category = _step.value;

          this[genModule][category] = valuesClone[category];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var _this = this;

      return Object.keys(_constants.GENERATOR_CATEGORIES).reduce(function (obj, mod) {
        var moduleObject = _constants.GENERATOR_CATEGORIES[mod].reduce(function (modObj, category) {
          modObj[category] = _this[mod] && _this[mod][category] && _this[mod][category].toJSON ? _this[mod][category].toJSON() : void 0;
          return obj;
        }, {});
        obj[mod] = moduleObject;
        return obj;
      }, {});
    }
  }]);

  return Character;
}();

exports.default = Character;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentObject = __webpack_require__(6);

var _contentObject2 = _interopRequireDefault(_contentObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContentProvider = function () {
  function ContentProvider() {
    _classCallCheck(this, ContentProvider);
  }

  _createClass(ContentProvider, [{
    key: 'default',
    value: function _default() {
      return [new _contentObject2.default({ i18nKey: 'HUMAN' }), new _contentObject2.default({ i18nKey: 'DWARF' })];
    }
  }]);

  return ContentProvider;
}();

exports.default = ContentProvider;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A class representing a content Object
 * i18nKey : The key that will be used to manage i18n values
 * i18nValue : The default i18n value
 * weight: float, determine the chances to be picked
 * percentage : values from 0 to 100
 * @export
 * @class ContentObject
 */
var ContentObject = function () {
  function ContentObject(content) {
    _classCallCheck(this, ContentObject);

    var contentClone = Object.assign({}, content);
    this.i18nKey = contentClone.i18nKey;
    this.i18nFullKey = contentClone.i18nFullKey;
    this.i18nValue = contentClone.i18nValue;
    this.weight = contentClone.weight;
    this.percentage = contentClone.percentage;
  }

  _createClass(ContentObject, [{
    key: "setI18nValue",
    value: function setI18nValue(value) {
      this.i18nValue = value;
    }
  }, {
    key: "setI18nFullKey",
    value: function setI18nFullKey(genModule, category) {
      this.i18nFullKey = genModule + "." + category + "." + this.i18nKey;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        i18nKey: this.i18nKey,
        i18nFullKey: this.i18nFullKey,
        i18nValue: this.i18nValue
      };
    }
  }]);

  return ContentObject;
}();

exports.default = ContentObject;
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=fonug-character-generator.js.map