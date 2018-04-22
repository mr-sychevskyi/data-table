/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 124);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(21);
var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var ctx = __webpack_require__(18);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(49)('wks');
var uid = __webpack_require__(32);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(90);
var toPrimitive = __webpack_require__(22);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(31);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var SRC = __webpack_require__(32)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(21).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(46);
var defined = __webpack_require__(23);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(47);
var createDesc = __webpack_require__(31);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(90);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(65)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.2' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(18);
var IObject = __webpack_require__(46);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var asc = __webpack_require__(82);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(6)) {
  var LIBRARY = __webpack_require__(33);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(59);
  var $buffer = __webpack_require__(88);
  var ctx = __webpack_require__(18);
  var anInstance = __webpack_require__(39);
  var propertyDesc = __webpack_require__(31);
  var hide = __webpack_require__(12);
  var redefineAll = __webpack_require__(41);
  var toInteger = __webpack_require__(24);
  var toLength = __webpack_require__(8);
  var toIndex = __webpack_require__(116);
  var toAbsoluteIndex = __webpack_require__(35);
  var toPrimitive = __webpack_require__(22);
  var has = __webpack_require__(11);
  var classof = __webpack_require__(48);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(79);
  var create = __webpack_require__(36);
  var getPrototypeOf = __webpack_require__(17);
  var gOPN = __webpack_require__(37).f;
  var getIterFn = __webpack_require__(81);
  var uid = __webpack_require__(32);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(26);
  var createArrayIncludes = __webpack_require__(50);
  var speciesConstructor = __webpack_require__(57);
  var ArrayIterators = __webpack_require__(84);
  var Iterators = __webpack_require__(44);
  var $iterDetect = __webpack_require__(54);
  var setSpecies = __webpack_require__(38);
  var arrayFill = __webpack_require__(83);
  var arrayCopyWithin = __webpack_require__(106);
  var $DP = __webpack_require__(7);
  var $GOPD = __webpack_require__(16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(111);
var $export = __webpack_require__(0);
var shared = __webpack_require__(49)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(114))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(32)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(12)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(92);
var enumBugKeys = __webpack_require__(66);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(93);
var enumBugKeys = __webpack_require__(66);
var IE_PROTO = __webpack_require__(65)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(63)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(67).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(92);
var hiddenKeys = __webpack_require__(66).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var call = __webpack_require__(104);
var isArrayIter = __webpack_require__(79);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(8);
var getIterFn = __webpack_require__(81);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(69);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(19);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(35);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(19);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(19);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var redefineAll = __webpack_require__(41);
var meta = __webpack_require__(29);
var forOf = __webpack_require__(40);
var anInstance = __webpack_require__(39);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(54);
var setToStringTag = __webpack_require__(42);
var inheritIfRequired = __webpack_require__(70);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var uid = __webpack_require__(32);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(33) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(18);
var forOf = __webpack_require__(40);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(21);
var LIBRARY = __webpack_require__(33);
var wksExt = __webpack_require__(91);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(49)('keys');
var uid = __webpack_require__(32);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 66 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(18)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(68).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(44);
var $iterCreate = __webpack_require__(76);
var setToStringTag = __webpack_require__(42);
var getPrototypeOf = __webpack_require__(17);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(36);
var descriptor = __webpack_require__(31);
var setToStringTag = __webpack_require__(42);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(53);
var defined = __webpack_require__(23);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(44);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(31);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(48);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(44);
module.exports = __webpack_require__(21).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(217);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(30);
var step = __webpack_require__(107);
var Iterators = __webpack_require__(44);
var toIObject = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(75)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var invoke = __webpack_require__(97);
var html = __webpack_require__(67);
var cel = __webpack_require__(63);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(85).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(6);
var LIBRARY = __webpack_require__(33);
var $typed = __webpack_require__(59);
var hide = __webpack_require__(12);
var redefineAll = __webpack_require__(41);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(39);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var toIndex = __webpack_require__(116);
var gOPN = __webpack_require__(37).f;
var dP = __webpack_require__(7).f;
var arrayFill = __webpack_require__(83);
var setToStringTag = __webpack_require__(42);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 89 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(63)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(15);
var arrayIndexOf = __webpack_require__(50)(false);
var IE_PROTO = __webpack_require__(65)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(34);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15);
var gOPN = __webpack_require__(37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(47);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(46);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(10);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(97);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 97 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(43).trim;
var ws = __webpack_require__(69);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(43).trim;

module.exports = 1 / $parseFloat(__webpack_require__(69) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(19);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 102 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(72);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(46);
var toLength = __webpack_require__(8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(55)
});


/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(87);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(112);
var validate = __webpack_require__(45);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(58)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(36);
var redefineAll = __webpack_require__(41);
var ctx = __webpack_require__(18);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var $iterDefine = __webpack_require__(75);
var step = __webpack_require__(107);
var setSpecies = __webpack_require__(38);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(29).fastKey;
var validate = __webpack_require__(45);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(112);
var validate = __webpack_require__(45);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(58)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(26)(0);
var redefine = __webpack_require__(13);
var meta = __webpack_require__(29);
var assign = __webpack_require__(95);
var weak = __webpack_require__(115);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(45);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(58)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(41);
var getWeak = __webpack_require__(29).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var createArrayMethod = __webpack_require__(26);
var $has = __webpack_require__(11);
var validate = __webpack_require__(45);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(37);
var gOPS = __webpack_require__(51);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(52);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(8);
var ctx = __webpack_require__(18);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8);
var repeat = __webpack_require__(71);
var defined = __webpack_require__(23);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(34);
var toIObject = __webpack_require__(15);
var isEnum = __webpack_require__(47).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(48);
var from = __webpack_require__(122);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(40);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 123 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(125);
module.exports = __webpack_require__(327);


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(126);

__webpack_require__(323);

__webpack_require__(324);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(89)))

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(127);
__webpack_require__(129);
__webpack_require__(130);
__webpack_require__(131);
__webpack_require__(132);
__webpack_require__(133);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(136);
__webpack_require__(137);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(143);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(148);
__webpack_require__(149);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(84);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(108);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(111);
__webpack_require__(113);
__webpack_require__(114);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
module.exports = __webpack_require__(21);


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var META = __webpack_require__(29).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(49);
var setToStringTag = __webpack_require__(42);
var uid = __webpack_require__(32);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(91);
var wksDefine = __webpack_require__(64);
var enumKeys = __webpack_require__(128);
var isArray = __webpack_require__(52);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var createDesc = __webpack_require__(31);
var _create = __webpack_require__(36);
var gOPNExt = __webpack_require__(94);
var $GOPD = __webpack_require__(16);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(34);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(47).f = $propertyIsEnumerable;
  __webpack_require__(51).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(33)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(47);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(36) });


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(93) });


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(15);
var $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(17);

__webpack_require__(25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(34);

__webpack_require__(25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function () {
  return __webpack_require__(94).f;
});


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(95) });


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(144) });


/***/ }),
/* 144 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(68).set });


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(48);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(96) });


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(17);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(98);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(99);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(11);
var cof = __webpack_require__(19);
var inheritIfRequired = __webpack_require__(70);
var toPrimitive = __webpack_require__(22);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(37).f;
var gOPD = __webpack_require__(16).f;
var dP = __webpack_require__(7).f;
var $trim = __webpack_require__(43).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(36)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(13)(global, NUMBER, $Number);
}


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(24);
var aNumberValue = __webpack_require__(100);
var repeat = __webpack_require__(71);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(100);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(101) });


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(101);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(99);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(98);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(102);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(72);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(73);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(103) });


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(102) });


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(72) });


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(73);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(73);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(35);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(43)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(74)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(75)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(74)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(77);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(78)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(77);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(78)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(71)
});


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(77);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(78)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(14)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(14)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(14)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(14)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(14)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(14)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(14)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(14)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(14)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(14)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(14)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(14)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(14)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(206);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(13)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(12)(proto, TO_PRIMITIVE, __webpack_require__(209));


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(52) });


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(18);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(104);
var isArrayIter = __webpack_require__(79);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(80);
var getIterFn = __webpack_require__(81);

$export($export.S + $export.F * !__webpack_require__(54)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(80);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(46) != Object || !__webpack_require__(20)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(67);
var cof = __webpack_require__(19);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(26)(0);
var STRICT = __webpack_require__(20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(52);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(26)(1);

$export($export.P + $export.F * !__webpack_require__(20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(26)(2);

$export($export.P + $export.F * !__webpack_require__(20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(26)(3);

$export($export.P + $export.F * !__webpack_require__(20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(26)(4);

$export($export.P + $export.F * !__webpack_require__(20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(105);

$export($export.P + $export.F * !__webpack_require__(20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(105);

$export($export.P + $export.F * !__webpack_require__(20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(50)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(106) });

__webpack_require__(30)('copyWithin');


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(83) });

__webpack_require__(30)('fill');


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(30)(KEY);


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(30)(KEY);


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Array');


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(70);
var dP = __webpack_require__(7).f;
var gOPN = __webpack_require__(37).f;
var isRegExp = __webpack_require__(53);
var $flags = __webpack_require__(55);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(13)(global, 'RegExp', $RegExp);
}

__webpack_require__(38)('RegExp');


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(108);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(55);
var DESCRIPTORS = __webpack_require__(6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(56)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(56)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(56)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(56)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(53);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var global = __webpack_require__(2);
var ctx = __webpack_require__(18);
var classof = __webpack_require__(48);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var speciesConstructor = __webpack_require__(57);
var task = __webpack_require__(85).set;
var microtask = __webpack_require__(86)();
var newPromiseCapabilityModule = __webpack_require__(87);
var perform = __webpack_require__(109);
var promiseResolve = __webpack_require__(110);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(41)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(42)($Promise, PROMISE);
__webpack_require__(38)(PROMISE);
Wrapper = __webpack_require__(21)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(54)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(115);
var validate = __webpack_require__(45);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(58)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(59);
var buffer = __webpack_require__(88);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(57);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(38)(ARRAY_BUFFER);


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(59).ABV, {
  DataView: __webpack_require__(88).DataView
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(36);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(96);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(16).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(76)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(11);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(16);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(17);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(117) });


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7);
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(11);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(31);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(68);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(50)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(30)('includes');


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(118);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var aFunction = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(82);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(30)('flatMap');


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(118);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(24);
var arraySpeciesCreate = __webpack_require__(82);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(30)('flatten');


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(74)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(119);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(119);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(43)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(43)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var toLength = __webpack_require__(8);
var isRegExp = __webpack_require__(53);
var getFlags = __webpack_require__(55);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(76)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64)('asyncIterator');


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64)('observable');


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(117);
var toIObject = __webpack_require__(15);
var gOPD = __webpack_require__(16);
var createProperty = __webpack_require__(80);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(120)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(120)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(121)('Map') });


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(121)('Set') });


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(61)('Map');


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(61)('Set');


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(61)('WeakMap');


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(61)('WeakSet');


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(62)('Map');


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(62)('Set');


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(62)('WeakMap');


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(62)('WeakSet');


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(19);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(123);
var fround = __webpack_require__(103);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(123) });


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(57);
var promiseResolve = __webpack_require__(110);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(87);
var perform = __webpack_require__(109);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(113);
var from = __webpack_require__(122);
var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(86)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(21);
var microtask = __webpack_require__(86)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(39);
var redefineAll = __webpack_require__(41);
var hide = __webpack_require__(12);
var forOf = __webpack_require__(40);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(38)('Observable');


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var navigator = global.navigator;
var slice = [].slice;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(85);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(84);
var getKeys = __webpack_require__(34);
var redefine = __webpack_require__(13);
var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(44);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(89)))

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(325);
module.exports = __webpack_require__(21).RegExp.escape;


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(326)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 326 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(328);

var _dataTable = __webpack_require__(333);

var _dataTable2 = _interopRequireDefault(_dataTable);

var _laureate = __webpack_require__(334);

var _laureate2 = _interopRequireDefault(_laureate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (document.body) {
    const table = new _dataTable2.default(document.body);

    const data = _laureate2.default.map(({ id, firstname, surname, born, died, bornCountry, bornCity, diedCountry, diedCity, gender, prizes }) => {
        const res = {
            '#': Number(id),
            'First Name': firstname,
            'Last Name': surname,
            'Born': born,
            'Died': died,
            'Born Location': [bornCity, bornCountry].filter(i => i).join(', '),
            'Died Location': [diedCity, diedCountry].filter(i => i).join(', '),
            'Gender': gender,
            'Prizes': prizes.filter(({ year, category }) => year && category).map(({ year, category }) => `${category}, ${year}`).join('; ')
        };

        if (res.Born === '0000-00-00') {
            delete res.Born;
        } else {
            res.Born = new Date(Date.parse(res.Born.replace('-00-00', '-01-01')));
        }

        if (res.Died === '0000-00-00') {
            delete res.Died;
        } else {
            res.Died = new Date(Date.parse(res.Died.replace('-00-00', '-01-01')));
        }

        return res;
    });

    table.build(data);
}

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(329);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(331)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(330)(undefined);
// imports


// module
exports.push([module.i, "* {\n    margin: 0;\n    padding: 0;\n}\n\na { \n\tcolor: #000;\n\ttext-decoration: none; \n\ttransition: all .4s;\n}\n\n.table {\n    width: 100%;\n    text-align: center;\n}\n\n.th {border-bottom: 1px solid #000;}\n\n.td {\n    padding: 10px;\n    background-color: rgb(245, 245, 220);\n}\n\n.btn-sort {\n    display: block;\n    padding: 10px;\n}\n\n.btn-sort:hover {color: rgb(210, 64, 64);}\n\n.btn-sort.active {color: rgb(210, 64, 64);}\n.btn-sort.active:after {\n    content: '\\21C5';\n    margin-left: 5px;\n}\n.controls {\n    text-align: center;\n    padding: 40px 25px;\n\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.select {\n    width: 150px;\n    padding: 5px;\n\n    border: 1px solid rgba(0, 0, 0, .1);\n    border-radius: 4px;\n    outline: none;\n}\n\n.dots {font-size: 1.5rem;}\n\n.btn-control {\n    margin: 0 5px;\n    padding: 5px;\n\n    border: 1px solid rgba(0, 0, 0, .1);\n    border-radius: 4px;\n}\n\n.btn-control:hover {background: rgba(0, 0, 0, .1);}\n.btn-control.current {background: rgba(0, 0, 0, .1);}\n.btn-control.disabled {\n    pointer-events: none;\n    color: rgba(0, 0, 0, .1);\n}", ""]);

// exports


/***/ }),
/* 330 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(332);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 332 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class DataTable {

    constructor(parent) {
        this.parent = parent;
    }

    get dataTable() {
        let activeTable = document.querySelector('.dataTable.active');
        if (activeTable) {
            return activeTable;
        }
    }

    get currPageSize() {
        if (this.dataTable) {
            let select = this.dataTable.querySelector('select');
            if (select instanceof HTMLSelectElement) {
                return Number(select.value);
            }
        }
    }

    createDataTable(data) {
        let dataTable = document.createElement('div');
        let counter = 1;

        if (document.body) {
            document.body.appendChild(dataTable);
        }

        while (document.getElementById('dataTable' + counter)) {
            counter++;
        }

        [...document.querySelectorAll('.dataTable')].forEach(item => item.classList.remove('active'));
        dataTable.id = String('dataTable' + counter);
        dataTable.classList.add('dataTable', 'active');
        dataTable.addEventListener('click', e => {
            e.preventDefault();

            if (!dataTable.classList.contains('active')) {
                [...document.querySelectorAll('.dataTable')].forEach(item => item.classList.remove('active'));
                dataTable.classList.add('active');
            }
        });
    }

    createTable(data) {
        let table = document.createElement('table');
        table.classList.add('table');

        if (this.dataTable) {
            this.dataTable.appendChild(table);
        }

        let thead = document.createElement('thead');
        table.appendChild(thead);
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        let tr = document.createElement('tr');
        thead.appendChild(tr);

        let objKeys = Object.keys(data.reduce((prev, curr) => Object.keys(curr).length > Object.keys(prev).length ? curr : prev, {}));

        objKeys.map(key => {
            let th = document.createElement('th');
            tr.appendChild(th);
            th.classList.add('th');

            let a = document.createElement('a');
            th.appendChild(a);
            a.href = '#';
            a.innerText = key;
            a.dataset.id = key;
            a.classList.add('btn-sort');
            a.addEventListener('click', e => {
                e.preventDefault();
                this.sortTable(data, a, key);
            });
        });
    }

    createPageSize(data) {
        let pageControls = document.createElement("div");
        pageControls.classList.add('controls');
        let select = document.createElement('SELECT');
        select.classList.add('select');

        if (this.dataTable) {
            this.dataTable.appendChild(pageControls);
        }

        pageControls.appendChild(select);

        const createOption = (...pageSizes) => {
            [...pageSizes].forEach((item, index) => {
                let option = document.createElement('option');
                let value = document.createTextNode(item);
                option.setAttribute('value', item);
                option.appendChild(value);
                select.appendChild(option);

                if (index === 0) {
                    option.disabled = true;
                }
            });
        };

        createOption('...', '10', '25', '50', '100');

        let currPageSize = this.currPageSize;
        select.addEventListener('click', e => {
            e.preventDefault();

            if (select.value && select instanceof HTMLSelectElement) {
                if (select.value !== '...' && Number(select.value) !== currPageSize) {
                    this.getPageSize(data, Number(select.value));
                }

                currPageSize = Number(select.value);
            }
        });
    }

    createPagination() {
        if (this.dataTable) {
            let pageControls = this.dataTable.querySelector('.controls');

            if (pageControls) {
                let pagination = document.createElement('nav');
                pagination.classList.add('pagination');
                pageControls.appendChild(pagination);

                let dotsPrev = document.createElement('span');
                dotsPrev.classList.add('dots');
                dotsPrev.innerText = '...';
                let dotsNext = dotsPrev.cloneNode(true);

                const createPaginationLink = (name, className) => {
                    let link = document.createElement('a');
                    pagination.appendChild(link);
                    link.href = '#';
                    link.innerText = name;
                    link.classList.add('btn-control', className);
                };

                createPaginationLink('1', 'firstPage');
                pagination.appendChild(dotsPrev);

                createPaginationLink('', 'numPage');
                createPaginationLink('', 'numPage');
                createPaginationLink('', 'numPage');

                pagination.appendChild(dotsNext);
                createPaginationLink('', 'lastPage');
            }
        }
    }

    getPageSize(data, pageSize) {
        if (this.dataTable) {
            if (!this.dataTable.querySelector('.pagination')) {
                this.createPagination();
                this.pagination(data);
            }

            let numberPerPage = pageSize;
            let numberOfPages = Math.ceil(data.length / numberPerPage);
            if (this.dataTable) {
                let lastPage = this.dataTable.querySelector('.lastPage');
                if (lastPage) {
                    lastPage.innerText = String(numberOfPages);
                }
            }

            this.redrawPagination(data, 1, numberPerPage);
        }
    }

    pagination(data, currentPage = 1) {
        let dataTable = this.dataTable;
        if (dataTable) {
            let firstPageBtn = dataTable.querySelector('.firstPage');
            let lastPageBtn = dataTable.querySelector('.lastPage');

            const firstPage = e => {
                e.preventDefault();
                this.redrawPagination(data, currentPage = 1, this.currPageSize);
            };

            const lastPage = e => {
                e.preventDefault();

                if (typeof this.currPageSize === 'number') {
                    this.redrawPagination(data, currentPage = Math.ceil(data.length / this.currPageSize), this.currPageSize);
                }
            };

            if (firstPageBtn && lastPageBtn) {
                firstPageBtn.addEventListener('click', firstPage);
                lastPageBtn.addEventListener('click', lastPage);
            }

            [...dataTable.querySelectorAll('.numPage')].forEach(item => item.addEventListener('click', e => {
                e.preventDefault();

                if (e.currentTarget.innerText) {
                    this.redrawPagination(data, currentPage = Number(e.currentTarget.innerText), this.currPageSize);
                }
            }));
        }
    }

    redrawPagination(data, currentPage, numberPerPage) {
        if (typeof numberPerPage === 'number') {
            let numberOfPages = Math.ceil(data.length / numberPerPage);
            let begin = (currentPage - 1) * numberPerPage;
            let end = begin + numberPerPage;
            let currData = data.slice(begin, end);

            this.clearTable();
            this.outputTable(currData);

            let dataTable = this.dataTable;
            if (dataTable) {
                let dots = dataTable.querySelectorAll('.dots');
                let btnControl = dataTable.querySelectorAll('.btn-control');
                let numPages = dataTable.querySelectorAll('.btn-control.numPage');
                let startPoint;

                if (currentPage <= [...numPages].length) {
                    startPoint = [...numPages].length - 1;
                    dots[0].style.display = 'none';
                    dots[1].style.display = 'inline';
                } else if (currentPage > numberOfPages - [...numPages].length) {
                    startPoint = numberOfPages - [...numPages].length;
                    dots[0].style.display = 'inline';
                    dots[1].style.display = 'none';
                } else {
                    startPoint = currentPage - 1;
                    [...dots].forEach(item => item.style.display = 'inline');
                }

                [...numPages].reduce((prev, next) => {
                    let foo = Number(prev);
                    return next.innerText = String(++foo);
                }, --startPoint);

                [...btnControl].forEach(item => {
                    Number(item.innerText) === currentPage ? item.classList.add('current') : item.classList.remove('current');
                });
            }
        }
    }

    sortTable(data, clickItem, clickItemKey) {
        if (!clickItem.classList.contains('active')) {
            if (this.dataTable) {
                let prevItem = this.dataTable.querySelector('.btn-sort.active');

                if (prevItem) {
                    prevItem.classList.remove('active');
                }

                clickItem.classList.add('active');
            }
        }

        let order = clickItem.classList.contains('desc') ? -1 : 1;
        data.sort(this.sortValues(clickItemKey, order));
        clickItem.classList.toggle('desc');

        if (!isNaN(this.currPageSize)) {
            this.redrawPagination(data, 1, this.currPageSize);
        } else {
            this.clearTable();
            this.outputTable(data);
        }
    }

    sortValues(key, order = 1) {
        return (a, b) => {
            if (!a[key]) {
                return 1;
            }
            if (!b[key]) {
                return 0;
            }

            a[key] instanceof Date ? a[key] = new Date(a[key]) : typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
            b[key] instanceof Date ? b[key] = new Date(b[key]) : typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];

            return a[key] > b[key] ? order : a[key] < b[key] ? -1 * order : 0;
        };
    }

    clearTable() {
        if (this.dataTable) {
            [...this.dataTable.querySelectorAll('.tbody-row')].forEach(item => item.remove());
        }
    }

    outputTable(data) {
        let dataTable = this.dataTable;
        if (dataTable) {
            let tbody = dataTable.querySelector('tbody');
            let objKeys = [...dataTable.querySelectorAll('.btn-sort')].map(item => item.innerText);

            data.forEach(item => {
                let tr = document.createElement('tr');
                if (tbody) {
                    tbody.appendChild(tr);
                }
                tr.dataset.id = item['#'];
                tr.classList.add('tbody-row');

                objKeys.map(key => {
                    let td = document.createElement('td');
                    tr.appendChild(td);
                    td.classList.add('td');
                    if (key) {
                        td.innerText = item[key] ? item[key] : '';
                    }
                });
            });
        }
    }

    build(data) {
        this.data = data;

        this.createDataTable(data);
        this.createPageSize(data);
        this.createTable(data);
        this.outputTable(data);
    }
}exports.default = DataTable;
;

/***/ }),
/* 334 */
/***/ (function(module, exports) {

module.exports = [{"id":"1","firstname":"Wilhelm Conrad","surname":"Röntgen","born":"1845-03-27","died":"1923-02-10","bornCountry":"Prussia (now Germany)","bornCountryCode":"DE","bornCity":"Lennep (now Remscheid)","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Munich","gender":"male","prizes":[{"year":"1901","category":"physics","share":"1","motivation":"\"in recognition of the extraordinary services he has rendered by the discovery of the remarkable rays subsequently named after him\"","affiliations":[{"name":"Munich University","city":"Munich","country":"Germany"}]}]},{"id":"2","firstname":"Hendrik Antoon","surname":"Lorentz","born":"1853-07-18","died":"1928-02-04","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Arnhem","diedCountry":"the Netherlands","diedCountryCode":"NL","gender":"male","prizes":[{"year":"1902","category":"physics","share":"2","motivation":"\"in recognition of the extraordinary service they rendered by their researches into the influence of magnetism upon radiation phenomena\"","affiliations":[{"name":"Leiden University","city":"Leiden","country":"the Netherlands"}]}]},{"id":"3","firstname":"Pieter","surname":"Zeeman","born":"1865-05-25","died":"1943-10-09","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Zonnemaire","diedCountry":"the Netherlands","diedCountryCode":"NL","diedCity":"Amsterdam","gender":"male","prizes":[{"year":"1902","category":"physics","share":"2","motivation":"\"in recognition of the extraordinary service they rendered by their researches into the influence of magnetism upon radiation phenomena\"","affiliations":[{"name":"Amsterdam University","city":"Amsterdam","country":"the Netherlands"}]}]},{"id":"4","firstname":"Antoine Henri","surname":"Becquerel","born":"1852-12-15","died":"1908-08-25","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","gender":"male","prizes":[{"year":"1903","category":"physics","share":"2","motivation":"\"in recognition of the extraordinary services he has rendered by his discovery of spontaneous radioactivity\"","affiliations":[{"name":"École Polytechnique","city":"Paris","country":"France"}]}]},{"id":"5","firstname":"Pierre","surname":"Curie","born":"1859-05-15","died":"1906-04-19","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1903","category":"physics","share":"4","motivation":"\"in recognition of the extraordinary services they have rendered by their joint researches on the radiation phenomena discovered by Professor Henri Becquerel\"","affiliations":[{"name":"École municipale de physique et de chimie industrielles (Municipal School of Industrial Physics and Chemistry)","city":"Paris","country":"France"}]}]},{"id":"6","firstname":"Marie","surname":"Curie, née Sklodowska","born":"1867-11-07","died":"1934-07-04","bornCountry":"Russian Empire (now Poland)","bornCountryCode":"PL","bornCity":"Warsaw","diedCountry":"France","diedCountryCode":"FR","diedCity":"Sallanches","gender":"female","prizes":[{"year":"1903","category":"physics","share":"4","motivation":"\"in recognition of the extraordinary services they have rendered by their joint researches on the radiation phenomena discovered by Professor Henri Becquerel\"","affiliations":[[]]},{"year":"1911","category":"chemistry","share":"1","motivation":"\"in recognition of her services to the advancement of chemistry by the discovery of the elements radium and polonium, by the isolation of radium and the study of the nature and compounds of this remarkable element\"","affiliations":[{"name":"Sorbonne University","city":"Paris","country":"France"}]}]},{"id":"8","firstname":"Lord Rayleigh","surname":"(John William Strutt)","born":"1842-11-12","died":"1919-06-30","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Langford Grove, Maldon, Essex","diedCountry":"United Kingdom","diedCountryCode":"GB","gender":"male","prizes":[{"year":"1904","category":"physics","share":"1","motivation":"\"for his investigations of the densities of the most important gases and for his discovery of argon in connection with these studies\"","affiliations":[{"name":"Royal Institution of Great Britain","city":"London","country":"United Kingdom"}]}]},{"id":"9","firstname":"Philipp Eduard Anton","surname":"von Lenard","born":"1862-06-07","died":"1947-05-20","bornCountry":"Hungary (now Slovakia)","bornCountryCode":"SK","bornCity":"Pressburg (now Bratislava)","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Messelhausen","gender":"male","prizes":[{"year":"1905","category":"physics","share":"1","motivation":"\"for his work on cathode rays\"","affiliations":[{"name":"Kiel University","city":"Kiel","country":"Germany"}]}]},{"id":"10","firstname":"Joseph John","surname":"Thomson","born":"1856-12-18","died":"1940-08-30","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Cheetham Hill, near Manchester","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1906","category":"physics","share":"1","motivation":"\"in recognition of the great merits of his theoretical and experimental investigations on the conduction of electricity by gases\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"11","firstname":"Albert Abraham","surname":"Michelson","born":"1852-12-19","died":"1931-05-09","bornCountry":"Prussia (now Poland)","bornCountryCode":"PL","bornCity":"Strelno (now Strzelno)","diedCountry":"USA","diedCountryCode":"US","diedCity":"Pasadena, CA","gender":"male","prizes":[{"year":"1907","category":"physics","share":"1","motivation":"\"for his optical precision instruments and the spectroscopic and metrological investigations carried out with their aid\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"12","firstname":"Gabriel","surname":"Lippmann","born":"1845-08-16","died":"1921-07-13","bornCountry":"Luxembourg","bornCountryCode":"LU","bornCity":"Hollerich","gender":"male","prizes":[{"year":"1908","category":"physics","share":"1","motivation":"\"for his method of reproducing colours photographically based on the phenomenon of interference\"","affiliations":[{"name":"Sorbonne University","city":"Paris","country":"France"}]}]},{"id":"13","firstname":"Guglielmo","surname":"Marconi","born":"1874-04-25","died":"1937-07-20","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Bologna","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Rome","gender":"male","prizes":[{"year":"1909","category":"physics","share":"2","motivation":"\"in recognition of their contributions to the development of wireless telegraphy\"","affiliations":[{"name":"Marconi Wireless Telegraph Co. Ltd.","city":"London","country":"United Kingdom"}]}]},{"id":"14","firstname":"Karl Ferdinand","surname":"Braun","born":"1850-06-06","died":"1918-04-20","bornCountry":"Hesse-Kassel (now Germany)","bornCountryCode":"DE","bornCity":"Fulda","diedCountry":"USA","diedCountryCode":"US","diedCity":"Brooklyn, NY","gender":"male","prizes":[{"year":"1909","category":"physics","share":"2","motivation":"\"in recognition of their contributions to the development of wireless telegraphy\"","affiliations":[{"name":"Strasbourg University","city":"Strasbourg","country":"Alsace (then Germany, now France)"}]}]},{"id":"15","firstname":"Johannes Diderik","surname":"van der Waals","born":"1837-11-23","died":"1923-03-08","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Leiden","diedCountry":"the Netherlands","diedCountryCode":"NL","diedCity":"Amsterdam","gender":"male","prizes":[{"year":"1910","category":"physics","share":"1","motivation":"\"for his work on the equation of state for gases and liquids\"","affiliations":[{"name":"Amsterdam University","city":"Amsterdam","country":"the Netherlands"}]}]},{"id":"16","firstname":"Wilhelm","surname":"Wien","born":"1864-01-13","died":"1928-08-30","bornCountry":"Prussia (now Russia)","bornCountryCode":"RU","bornCity":"Gaffken (now Parusnoye)","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Munich","gender":"male","prizes":[{"year":"1911","category":"physics","share":"1","motivation":"\"for his discoveries regarding the laws governing the radiation of heat\"","affiliations":[{"name":"Würzburg University","city":"Würzburg","country":"Germany"}]}]},{"id":"17","firstname":"Nils Gustaf","surname":"Dalén","born":"1869-11-30","died":"1937-12-09","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Stenstorp","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1912","category":"physics","share":"1","motivation":"\"for his invention of automatic regulators for use in conjunction with gas accumulators for illuminating lighthouses and buoys\"","affiliations":[{"name":"Swedish Gas-Accumulator Co.","city":"Lidingö-Stockholm","country":"Sweden"}]}]},{"id":"18","firstname":"Heike","surname":"Kamerlingh Onnes","born":"1853-09-21","died":"1926-02-21","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Groningen","diedCountry":"the Netherlands","diedCountryCode":"NL","diedCity":"Leiden","gender":"male","prizes":[{"year":"1913","category":"physics","share":"1","motivation":"\"for his investigations on the properties of matter at low temperatures which led, inter alia, to the production of liquid helium\"","affiliations":[{"name":"Leiden University","city":"Leiden","country":"the Netherlands"}]}]},{"id":"19","firstname":"Max","surname":"von Laue","born":"1879-10-09","died":"1960-04-23","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Pfaffendorf","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Berlin","gender":"male","prizes":[{"year":"1914","category":"physics","share":"1","motivation":"\"for his discovery of the diffraction of X-rays by crystals\"","affiliations":[{"name":"Frankfurt-on-the-Main University","city":"Frankfurt-on-the-Main","country":"Germany"}]}]},{"id":"20","firstname":"Sir William Henry","surname":"Bragg","born":"1862-07-02","died":"1942-03-12","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Wigton","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1915","category":"physics","share":"2","motivation":"\"for their services in the analysis of crystal structure by means of X-rays\"","affiliations":[{"name":"University College","city":"London","country":"United Kingdom"}]}]},{"id":"21","firstname":"William Lawrence","surname":"Bragg","born":"1890-03-31","died":"1971-07-01","bornCountry":"Australia","bornCountryCode":"AU","bornCity":"Adelaide","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Ipswich","gender":"male","prizes":[{"year":"1915","category":"physics","share":"2","motivation":"\"for their services in the analysis of crystal structure by means of X-rays\"","affiliations":[{"name":"Victoria University","city":"Manchester","country":"United Kingdom"}]}]},{"id":"22","firstname":"Charles Glover","surname":"Barkla","born":"1877-06-07","died":"1944-10-23","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Widnes","diedCountry":"Scotland","diedCountryCode":"GB","diedCity":"Edinburgh","gender":"male","prizes":[{"year":"1917","category":"physics","share":"1","motivation":"\"for his discovery of the characteristic R&ouml;ntgen radiation of the elements\"","affiliations":[{"name":"Edinburgh University","city":"Edinburgh","country":"United Kingdom"}]}]},{"id":"23","firstname":"Max Karl Ernst Ludwig","surname":"Planck","born":"1858-04-23","died":"1947-10-04","bornCountry":"Schleswig (now Germany)","bornCountryCode":"DE","bornCity":"Kiel","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Göttingen","gender":"male","prizes":[{"year":"1918","category":"physics","share":"1","motivation":"\"in recognition of the services he rendered to the advancement of Physics by his discovery of energy quanta\"","affiliations":[{"name":"Berlin University","city":"Berlin","country":"Germany"}]}]},{"id":"24","firstname":"Johannes","surname":"Stark","born":"1874-04-15","died":"1957-06-21","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Schickenhof","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Traunstein","gender":"male","prizes":[{"year":"1919","category":"physics","share":"1","motivation":"\"for his discovery of the Doppler effect in canal rays and the splitting of spectral lines in electric fields\"","affiliations":[{"name":"Greifswald University","city":"Greifswald","country":"Germany"}]}]},{"id":"25","firstname":"Charles Edouard","surname":"Guillaume","born":"1861-02-15","died":"1938-06-13","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Fleurier","diedCountry":"France","diedCountryCode":"FR","diedCity":"Sèvres","gender":"male","prizes":[{"year":"1920","category":"physics","share":"1","motivation":"\"in recognition of the service he has rendered to precision measurements in Physics by his discovery of anomalies in nickel steel alloys\"","affiliations":[{"name":"Bureau International des Poids et Mesures (International Bureau of Weights and Measures)","city":"Sèvres","country":"France"}]}]},{"id":"26","firstname":"Albert","surname":"Einstein","born":"1879-03-14","died":"1955-04-18","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Ulm","diedCountry":"USA","diedCountryCode":"US","diedCity":"Princeton, NJ","gender":"male","prizes":[{"year":"1921","category":"physics","share":"1","motivation":"\"for his services to Theoretical Physics, and especially for his discovery of the law of the photoelectric effect\"","affiliations":[{"name":"Kaiser-Wilhelm-Institut (now Max-Planck-Institut) für Physik","city":"Berlin","country":"Germany"}]}]},{"id":"27","firstname":"Niels Henrik David","surname":"Bohr","born":"1885-10-07","died":"1962-11-18","bornCountry":"Denmark","bornCountryCode":"DK","bornCity":"Copenhagen","diedCountry":"Denmark","diedCountryCode":"DK","diedCity":"Copenhagen","gender":"male","prizes":[{"year":"1922","category":"physics","share":"1","motivation":"\"for his services in the investigation of the structure of atoms and of the radiation emanating from them\"","affiliations":[{"name":"Copenhagen University","city":"Copenhagen","country":"Denmark"}]}]},{"id":"28","firstname":"Robert Andrews","surname":"Millikan","born":"1868-03-22","died":"1953-12-19","bornCountry":"USA","bornCountryCode":"US","bornCity":"Morrison, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"San Marino, CA","gender":"male","prizes":[{"year":"1923","category":"physics","share":"1","motivation":"\"for his work on the elementary charge of electricity and on the photoelectric effect\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"29","firstname":"Karl Manne Georg","surname":"Siegbahn","born":"1886-12-03","died":"1978-09-26","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Örebro","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1924","category":"physics","share":"1","motivation":"\"for his discoveries and research in the field of X-ray spectroscopy\"","affiliations":[{"name":"Uppsala University","city":"Uppsala","country":"Sweden"}]}]},{"id":"30","firstname":"James","surname":"Franck","born":"1882-08-26","died":"1964-05-21","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Hamburg","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Göttingen","gender":"male","prizes":[{"year":"1925","category":"physics","share":"2","motivation":"\"for their discovery of the laws governing the impact of an electron upon an atom\"","affiliations":[{"name":"Goettingen University","city":"Göttingen","country":"Germany"}]}]},{"id":"31","firstname":"Gustav Ludwig","surname":"Hertz","born":"1887-07-22","died":"1975-10-30","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Hamburg","diedCountry":"East Germany","diedCountryCode":"DE","diedCity":"Berlin","gender":"male","prizes":[{"year":"1925","category":"physics","share":"2","motivation":"\"for their discovery of the laws governing the impact of an electron upon an atom\"","affiliations":[{"name":"Halle University","city":"Halle","country":"Germany"}]}]},{"id":"32","firstname":"Jean Baptiste","surname":"Perrin","born":"1870-09-30","died":"1942-04-17","bornCountry":"France","bornCountryCode":"FR","bornCity":"Lille","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1926","category":"physics","share":"1","motivation":"\"for his work on the discontinuous structure of matter, and especially for his discovery of sedimentation equilibrium\"","affiliations":[{"name":"Sorbonne University","city":"Paris","country":"France"}]}]},{"id":"33","firstname":"Arthur Holly","surname":"Compton","born":"1892-09-10","died":"1962-03-15","bornCountry":"USA","bornCountryCode":"US","bornCity":"Wooster, OH","diedCountry":"USA","diedCountryCode":"US","diedCity":"Berkeley, CA","gender":"male","prizes":[{"year":"1927","category":"physics","share":"2","motivation":"\"for his discovery of the effect named after him\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"34","firstname":"Charles Thomson Rees","surname":"Wilson","born":"1869-02-14","died":"1959-11-15","bornCountry":"Scotland","bornCountryCode":"GB","bornCity":"Glencorse","diedCountry":"Scotland","diedCountryCode":"GB","diedCity":"Carlops","gender":"male","prizes":[{"year":"1927","category":"physics","share":"2","motivation":"\"for his method of making the paths of electrically charged particles visible by condensation of vapour\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"35","firstname":"Owen Willans","surname":"Richardson","born":"1879-04-26","died":"1959-02-15","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Dewsbury","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Alton","gender":"male","prizes":[{"year":"1928","category":"physics","share":"1","motivation":"\"for his work on the thermionic phenomenon and especially for the discovery of the law named after him\"","affiliations":[{"name":"London University","city":"London","country":"United Kingdom"}]}]},{"id":"36","firstname":"Prince Louis-Victor Pierre Raymond","surname":"de Broglie","born":"1892-08-15","died":"1987-03-19","bornCountry":"France","bornCountryCode":"FR","bornCity":"Dieppe","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1929","category":"physics","share":"1","motivation":"\"for his discovery of the wave nature of electrons\"","affiliations":[{"name":"Sorbonne University, Institut Henri Poincaré","city":"Paris","country":"France"}]}]},{"id":"37","firstname":"Sir Chandrasekhara Venkata","surname":"Raman","born":"1888-11-07","died":"1970-11-21","bornCountry":"India","bornCountryCode":"IN","bornCity":"Tiruchirappalli","diedCountry":"India","diedCountryCode":"IN","diedCity":"Bangalore","gender":"male","prizes":[{"year":"1930","category":"physics","share":"1","motivation":"\"for his work on the scattering of light and for the discovery of the effect named after him\"","affiliations":[{"name":"Calcutta University","city":"Calcutta","country":"India"}]}]},{"id":"38","firstname":"Werner Karl","surname":"Heisenberg","born":"1901-12-05","died":"1976-02-01","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Würzburg","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Munich","gender":"male","prizes":[{"year":"1932","category":"physics","share":"1","motivation":"\"for the creation of quantum mechanics, the application of which has, inter alia, led to the discovery of the allotropic forms of hydrogen\"","affiliations":[{"name":"Leipzig University","city":"Leipzig","country":"Germany"}]}]},{"id":"39","firstname":"Erwin","surname":"Schrödinger","born":"1887-08-12","died":"1961-01-04","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"Austria","diedCountryCode":"AT","diedCity":"Vienna","gender":"male","prizes":[{"year":"1933","category":"physics","share":"2","motivation":"\"for the discovery of new productive forms of atomic theory\"","affiliations":[{"name":"Berlin University","city":"Berlin","country":"Germany"}]}]},{"id":"40","firstname":"Paul Adrien Maurice","surname":"Dirac","born":"1902-08-08","died":"1984-10-20","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Bristol","diedCountry":"USA","diedCountryCode":"US","diedCity":"Tallahassee, FL","gender":"male","prizes":[{"year":"1933","category":"physics","share":"2","motivation":"\"for the discovery of new productive forms of atomic theory\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"41","firstname":"James","surname":"Chadwick","born":"1891-10-20","died":"1974-07-24","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Manchester","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1935","category":"physics","share":"1","motivation":"\"for the discovery of the neutron\"","affiliations":[{"name":"Liverpool University","city":"Liverpool","country":"United Kingdom"}]}]},{"id":"42","firstname":"Victor Franz","surname":"Hess","born":"1883-06-24","died":"1964-12-17","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Peggau","diedCountry":"USA","diedCountryCode":"US","diedCity":"Mount Verno, NY","gender":"male","prizes":[{"year":"1936","category":"physics","share":"2","motivation":"\"for his discovery of cosmic radiation\"","affiliations":[{"name":"Innsbruck University","city":"Innsbruck","country":"Austria"}]}]},{"id":"43","firstname":"Carl David","surname":"Anderson","born":"1905-09-03","died":"1991-01-11","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"San Marino, CA","gender":"male","prizes":[{"year":"1936","category":"physics","share":"2","motivation":"\"for his discovery of the positron\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"44","firstname":"Clinton Joseph","surname":"Davisson","born":"1881-10-22","died":"1958-02-01","bornCountry":"USA","bornCountryCode":"US","bornCity":"Bloomington, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"Charlottesville, VA","gender":"male","prizes":[{"year":"1937","category":"physics","share":"2","motivation":"\"for their experimental discovery of the diffraction of electrons by crystals\"","affiliations":[{"name":"Bell Telephone Laboratories","city":"New York, NY","country":"USA"}]}]},{"id":"45","firstname":"George Paget","surname":"Thomson","born":"1892-05-03","died":"1975-09-10","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Cambridge","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1937","category":"physics","share":"2","motivation":"\"for their experimental discovery of the diffraction of electrons by crystals\"","affiliations":[{"name":"London University","city":"London","country":"United Kingdom"}]}]},{"id":"46","firstname":"Enrico","surname":"Fermi","born":"1901-09-29","died":"1954-11-28","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Rome","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chicago, IL","gender":"male","prizes":[{"year":"1938","category":"physics","share":"1","motivation":"\"for his demonstrations of the existence of new radioactive elements produced by neutron irradiation, and for his related discovery of nuclear reactions brought about by slow neutrons\"","affiliations":[{"name":"Rome University","city":"Rome","country":"Italy"}]}]},{"id":"47","firstname":"Ernest Orlando","surname":"Lawrence","born":"1901-08-08","died":"1958-08-27","bornCountry":"USA","bornCountryCode":"US","bornCity":"Canton, SD","diedCountry":"USA","diedCountryCode":"US","diedCity":"Palo Alto, CA","gender":"male","prizes":[{"year":"1939","category":"physics","share":"1","motivation":"\"for the invention and development of the cyclotron and for results obtained with it, especially with regard to artificial radioactive elements\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"48","firstname":"Otto","surname":"Stern","born":"1888-02-17","died":"1969-08-17","bornCountry":"Germany (now Poland)","bornCountryCode":"PL","bornCity":"Sorau (now Zory)","diedCountry":"USA","diedCountryCode":"US","diedCity":"Berkeley, CA","gender":"male","prizes":[{"year":"1943","category":"physics","share":"1","motivation":"\"for his contribution to the development of the molecular ray method and his discovery of the magnetic moment of the proton\"","affiliations":[{"name":"Carnegie Institute of Technology","city":"Pittsburgh, PA","country":"USA"}]}]},{"id":"49","firstname":"Isidor Isaac","surname":"Rabi","born":"1898-07-29","died":"1988-01-11","bornCountry":"Austria-Hungary (now Poland)","bornCountryCode":"PL","bornCity":"Rymanow","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1944","category":"physics","share":"1","motivation":"\"for his resonance method for recording the magnetic properties of atomic nuclei\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"50","firstname":"Wolfgang","surname":"Pauli","born":"1900-04-25","died":"1958-12-15","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Zurich","gender":"male","prizes":[{"year":"1945","category":"physics","share":"1","motivation":"\"for the discovery of the Exclusion Principle, also called the Pauli Principle\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"51","firstname":"Percy Williams","surname":"Bridgman","born":"1882-04-21","died":"1961-08-20","bornCountry":"USA","bornCountryCode":"US","bornCity":"Cambridge, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Randolph, NH","gender":"male","prizes":[{"year":"1946","category":"physics","share":"1","motivation":"\"for the invention of an apparatus to produce extremely high pressures, and for the discoveries he made therewith in the field of high pressure physics\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"52","firstname":"Sir Edward Victor","surname":"Appleton","born":"1892-09-06","died":"1965-04-21","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Bradford","diedCountry":"Scotland","diedCountryCode":"GB","diedCity":"Edinburgh","gender":"male","prizes":[{"year":"1947","category":"physics","share":"1","motivation":"\"for his investigations of the physics of the upper atmosphere especially for the discovery of the so-called Appleton layer\"","affiliations":[{"name":"Department of Scientific and Industrial Research","city":"London","country":"United Kingdom"}]}]},{"id":"53","firstname":"Patrick Maynard Stuart","surname":"Blackett","born":"1897-11-18","died":"1974-07-13","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1948","category":"physics","share":"1","motivation":"\"for his development of the Wilson cloud chamber method, and his discoveries therewith in the fields of nuclear physics and cosmic radiation\"","affiliations":[{"name":"Victoria University","city":"Manchester","country":"United Kingdom"}]}]},{"id":"54","firstname":"Hideki","surname":"Yukawa","born":"1907-01-23","died":"1981-09-08","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Tokyo","diedCountry":"Japan","diedCountryCode":"JP","diedCity":"Kyoto","gender":"male","prizes":[{"year":"1949","category":"physics","share":"1","motivation":"\"for his prediction of the existence of mesons on the basis of theoretical work on nuclear forces\"","affiliations":[{"name":"Kyoto Imperial University","city":"Kyoto","country":"Japan"},{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"55","firstname":"Cecil Frank","surname":"Powell","born":"1903-12-05","died":"1969-08-09","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Tonbridge","diedCountry":"Italy","diedCountryCode":"IT","gender":"male","prizes":[{"year":"1950","category":"physics","share":"1","motivation":"\"for his development of the photographic method of studying nuclear processes and his discoveries regarding mesons made with this method\"","affiliations":[{"name":"Bristol University","city":"Bristol","country":"United Kingdom"}]}]},{"id":"56","firstname":"Sir John Douglas","surname":"Cockcroft","born":"1897-05-27","died":"1967-09-18","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Todmorden","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1951","category":"physics","share":"2","motivation":"\"for their pioneer work on the transmutation of atomic nuclei by artificially accelerated atomic particles\"","affiliations":[{"name":"Atomic Energy Research Establishment","city":"Harwell, Berkshire","country":"United Kingdom"}]}]},{"id":"57","firstname":"Ernest Thomas Sinton","surname":"Walton","born":"1903-10-06","died":"1995-06-25","bornCountry":"Ireland","bornCountryCode":"IE","bornCity":"Dungarvan","diedCountry":"Northern Ireland","diedCountryCode":"GB","diedCity":"Belfast","gender":"male","prizes":[{"year":"1951","category":"physics","share":"2","motivation":"\"for their pioneer work on the transmutation of atomic nuclei by artificially accelerated atomic particles\"","affiliations":[{"name":"Trinity College","city":"Dublin","country":"Ireland"}]}]},{"id":"58","firstname":"Felix","surname":"Bloch","born":"1905-10-23","died":"1983-09-10","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Zurich","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Zurich","gender":"male","prizes":[{"year":"1952","category":"physics","share":"2","motivation":"\"for their development of new methods for nuclear magnetic precision measurements and discoveries in connection therewith\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"59","firstname":"Edward Mills","surname":"Purcell","born":"1912-08-30","died":"1997-03-07","bornCountry":"USA","bornCountryCode":"US","bornCity":"Taylorville, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cambridge, MA","gender":"male","prizes":[{"year":"1952","category":"physics","share":"2","motivation":"\"for their development of new methods for nuclear magnetic precision measurements and discoveries in connection therewith\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"60","firstname":"Frits","surname":"Zernike","born":"1888-07-16","died":"1966-03-10","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Amsterdam","diedCountry":"the Netherlands","diedCountryCode":"NL","diedCity":"Groningen","gender":"male","prizes":[{"year":"1953","category":"physics","share":"1","motivation":"\"for his demonstration of the phase contrast method, especially for his invention of the phase contrast microscope\"","affiliations":[{"name":"Groningen University","city":"Groningen","country":"the Netherlands"}]}]},{"id":"61","firstname":"Max","surname":"Born","born":"1882-12-11","died":"1970-01-05","bornCountry":"Germany (now Poland)","bornCountryCode":"PL","bornCity":"Breslau (now Wroclaw)","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Göttingen","gender":"male","prizes":[{"year":"1954","category":"physics","share":"2","motivation":"\"for his fundamental research in quantum mechanics, especially for his statistical interpretation of the wavefunction\"","affiliations":[{"name":"Edinburgh University","city":"Edinburgh","country":"United Kingdom"}]}]},{"id":"62","firstname":"Walther","surname":"Bothe","born":"1891-01-08","died":"1957-02-08","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Oranienburg","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Heidelberg","gender":"male","prizes":[{"year":"1954","category":"physics","share":"2","motivation":"\"for the coincidence method and his discoveries made therewith\"","affiliations":[{"name":"University of Heidelberg","city":"Heidelberg","country":"Federal Republic of Germany"},{"name":"Max-Planck-Institut für medizinische Forschung","city":"Heidelberg","country":"Federal Republic of Germany"}]}]},{"id":"63","firstname":"Willis Eugene","surname":"Lamb","born":"1913-07-12","died":"2008-05-15","bornCountry":"USA","bornCountryCode":"US","bornCity":"Los Angeles, CA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Tucson, AZ","gender":"male","prizes":[{"year":"1955","category":"physics","share":"2","motivation":"\"for his discoveries concerning the fine structure of the hydrogen spectrum\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"64","firstname":"Polykarp","surname":"Kusch","born":"1911-01-26","died":"1993-03-20","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Blankenburg","diedCountry":"USA","diedCountryCode":"US","diedCity":"Dallas, TX","gender":"male","prizes":[{"year":"1955","category":"physics","share":"2","motivation":"\"for his precision determination of the magnetic moment of the electron\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"65","firstname":"William Bradford","surname":"Shockley","born":"1910-02-13","died":"1989-08-12","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"USA","diedCountryCode":"US","diedCity":"Palo Alto, CA","gender":"male","prizes":[{"year":"1956","category":"physics","share":"3","motivation":"\"for their researches on semiconductors and their discovery of the transistor effect\"","affiliations":[{"name":"Semiconductor Laboratory of Beckman Instruments, Inc.","city":"Mountain View, CA","country":"USA"}]}]},{"id":"66","firstname":"John","surname":"Bardeen","born":"1908-05-23","died":"1991-01-30","bornCountry":"USA","bornCountryCode":"US","bornCity":"Madison, WI","diedCountry":"USA","diedCountryCode":"US","diedCity":"Boston, MA","gender":"male","prizes":[{"year":"1956","category":"physics","share":"3","motivation":"\"for their researches on semiconductors and their discovery of the transistor effect\"","affiliations":[{"name":"University of Illinois","city":"Urbana, IL","country":"USA"}]},{"year":"1972","category":"physics","share":"3","motivation":"\"for their jointly developed theory of superconductivity, usually called the BCS-theory\"","affiliations":[{"name":"University of Illinois","city":"Urbana, IL","country":"USA"}]}]},{"id":"67","firstname":"Walter Houser","surname":"Brattain","born":"1902-02-10","died":"1987-10-13","bornCountry":"China","bornCountryCode":"CN","bornCity":"Amoy","diedCountry":"USA","diedCountryCode":"US","diedCity":"Seattle, WA","gender":"male","prizes":[{"year":"1956","category":"physics","share":"3","motivation":"\"for their researches on semiconductors and their discovery of the transistor effect\"","affiliations":[{"name":"Bell Telephone Laboratories","city":"Murray Hill, NJ","country":"USA"}]}]},{"id":"68","firstname":"Chen Ning","surname":"Yang","born":"1922-09-22","died":"0000-00-00","bornCountry":"China","bornCountryCode":"CN","bornCity":"Hofei, Anhwei","gender":"male","prizes":[{"year":"1957","category":"physics","share":"2","motivation":"\"for their penetrating investigation of the so-called parity laws which has led to important discoveries regarding the elementary particles\"","affiliations":[{"name":"Institute for Advanced Study","city":"Princeton, NJ","country":"USA"}]}]},{"id":"69","firstname":"Tsung-Dao (T.D.)","surname":"Lee","born":"1926-11-24","died":"0000-00-00","bornCountry":"China","bornCountryCode":"CN","bornCity":"Shanghai","gender":"male","prizes":[{"year":"1957","category":"physics","share":"2","motivation":"\"for their penetrating investigation of the so-called parity laws which has led to important discoveries regarding the elementary particles\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"70","firstname":"Pavel Alekseyevich","surname":"Cherenkov","born":"1904-07-28","died":"1990-01-06","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Novaya Chigla","diedCountry":"USSR","diedCountryCode":"RU","gender":"male","prizes":[{"year":"1958","category":"physics","share":"3","motivation":"\"for the discovery and the interpretation of the Cherenkov effect\"","affiliations":[{"name":"P.N. Lebedev Physical Institute","city":"Moscow","country":"USSR"}]}]},{"id":"71","firstname":"Igor Yevgenyevich","surname":"Tamm","born":"1895-07-08","died":"1971-04-12","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Vladivostok","diedCountry":"USSR (now Russia)","diedCountryCode":"RU","diedCity":"Moscow","gender":"male","prizes":[{"year":"1958","category":"physics","share":"3","motivation":"\"for the discovery and the interpretation of the Cherenkov effect\"","affiliations":[{"name":"University of Moscow","city":"Moscow","country":"USSR"},{"name":"P.N. Lebedev Physical Institute","city":"Moscow","country":"USSR"}]}]},{"id":"72","firstname":"Emilio Gino","surname":"Segrè","born":"1905-02-01","died":"1989-04-22","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Tivoli","diedCountry":"USA","diedCountryCode":"US","diedCity":"Lafayette, CA","gender":"male","prizes":[{"year":"1959","category":"physics","share":"2","motivation":"\"for their discovery of the antiproton\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"73","firstname":"Owen","surname":"Chamberlain","born":"1920-07-10","died":"2006-02-28","bornCountry":"USA","bornCountryCode":"US","bornCity":"San Francisco, CA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Berkeley, CA","gender":"male","prizes":[{"year":"1959","category":"physics","share":"2","motivation":"\"for their discovery of the antiproton\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"74","firstname":"Donald Arthur","surname":"Glaser","born":"1926-09-21","died":"2013-02-28","bornCountry":"USA","bornCountryCode":"US","bornCity":"Cleveland, OH","diedCountry":"USA","diedCountryCode":"US","diedCity":"Berkeley, CA","gender":"male","prizes":[{"year":"1960","category":"physics","share":"1","motivation":"\"for the invention of the bubble chamber\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"75","firstname":"Robert","surname":"Hofstadter","born":"1915-02-05","died":"1990-11-17","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Stanford, CA","gender":"male","prizes":[{"year":"1961","category":"physics","share":"2","motivation":"\"for his pioneering studies of electron scattering in atomic nuclei and for his thereby achieved discoveries concerning the structure of the nucleons\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"76","firstname":"Rudolf Ludwig","surname":"Mössbauer","born":"1929-01-31","died":"2011-09-14","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Munich","gender":"male","prizes":[{"year":"1961","category":"physics","share":"2","motivation":"\"for his researches concerning the resonance absorption of gamma radiation and his discovery in this connection of the effect which bears his name\"","affiliations":[{"name":"Technical University","city":"Munich","country":"Federal Republic of Germany"},{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"77","firstname":"Lev Davidovich","surname":"Landau","born":"1908-01-22","died":"1968-04-01","bornCountry":"Russian Empire (now Azerbaijan)","bornCountryCode":"AZ","bornCity":"Baku","diedCountry":"USSR (now Russia)","diedCountryCode":"RU","diedCity":"Moscow","gender":"male","prizes":[{"year":"1962","category":"physics","share":"1","motivation":"\"for his pioneering theories for condensed matter, especially liquid helium\"","affiliations":[{"name":"Academy of Sciences","city":"Moscow","country":"USSR"}]}]},{"id":"78","firstname":"Eugene Paul","surname":"Wigner","born":"1902-11-17","died":"1995-01-01","bornCountry":"Austria-Hungary (now Hungary)","bornCountryCode":"HU","bornCity":"Budapest","diedCountry":"USA","diedCountryCode":"US","diedCity":"Princeton, NJ","gender":"male","prizes":[{"year":"1963","category":"physics","share":"2","motivation":"\"for his contributions to the theory of the atomic nucleus and the elementary particles, particularly through the discovery and application of fundamental symmetry principles\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"79","firstname":"Maria","surname":"Goeppert Mayer","born":"1906-06-28","died":"1972-02-20","bornCountry":"Germany (now Poland)","bornCountryCode":"PL","bornCity":"Kattowitz (now Katowice)","diedCountry":"USA","diedCountryCode":"US","diedCity":"San Diego, CA","gender":"female","prizes":[{"year":"1963","category":"physics","share":"4","motivation":"\"for their discoveries concerning nuclear shell structure\"","affiliations":[{"name":"University of California","city":"San Diego, CA","country":"USA"}]}]},{"id":"80","firstname":"J. Hans D.","surname":"Jensen","born":"1907-06-25","died":"1973-02-11","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Hamburg","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Heidelberg","gender":"male","prizes":[{"year":"1963","category":"physics","share":"4","motivation":"\"for their discoveries concerning nuclear shell structure\"","affiliations":[{"name":"University of Heidelberg","city":"Heidelberg","country":"Federal Republic of Germany"}]}]},{"id":"81","firstname":"Charles Hard","surname":"Townes","born":"1915-07-28","died":"2015-01-27","bornCountry":"USA","bornCountryCode":"US","bornCity":"Greenville, SC","diedCountry":"USA","diedCountryCode":"US","diedCity":"Berkeley, CA","gender":"male","prizes":[{"year":"1964","category":"physics","share":"2","motivation":"\"for fundamental work in the field of quantum electronics, which has led to the construction of oscillators and amplifiers based on the maser-laser principle\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"82","firstname":"Nicolay Gennadiyevich","surname":"Basov","born":"1922-12-14","died":"2001-07-01","bornCountry":"USSR (now Russia)","bornCountryCode":"RU","bornCity":"Usman","diedCountry":"Russia","diedCountryCode":"RU","diedCity":"Moscow","gender":"male","prizes":[{"year":"1964","category":"physics","share":"4","motivation":"\"for fundamental work in the field of quantum electronics, which has led to the construction of oscillators and amplifiers based on the maser-laser principle\"","affiliations":[{"name":"P.N. Lebedev Physical Institute","city":"Moscow","country":"USSR"}]}]},{"id":"83","firstname":"Aleksandr Mikhailovich","surname":"Prokhorov","born":"1916-07-11","died":"2002-01-08","bornCountry":"Australia","bornCountryCode":"AU","bornCity":"Atherton","diedCountry":"Russia","diedCountryCode":"RU","diedCity":"Moscow","gender":"male","prizes":[{"year":"1964","category":"physics","share":"4","motivation":"\"for fundamental work in the field of quantum electronics, which has led to the construction of oscillators and amplifiers based on the maser-laser principle\"","affiliations":[{"name":"P.N. Lebedev Physical Institute","city":"Moscow","country":"USSR"}]}]},{"id":"84","firstname":"Sin-Itiro","surname":"Tomonaga","born":"1906-03-31","died":"1979-07-08","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Kyoto","diedCountry":"Japan","diedCountryCode":"JP","diedCity":"Tokyo","gender":"male","prizes":[{"year":"1965","category":"physics","share":"3","motivation":"\"for their fundamental work in quantum electrodynamics, with deep-ploughing consequences for the physics of elementary particles\"","affiliations":[{"name":"Tokyo University of Education","city":"Tokyo","country":"Japan"}]}]},{"id":"85","firstname":"Julian","surname":"Schwinger","born":"1918-02-12","died":"1994-07-16","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Los Angeles, CA","gender":"male","prizes":[{"year":"1965","category":"physics","share":"3","motivation":"\"for their fundamental work in quantum electrodynamics, with deep-ploughing consequences for the physics of elementary particles\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"86","firstname":"Richard P.","surname":"Feynman","born":"1918-05-11","died":"1988-02-15","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Los Angeles, CA","gender":"male","prizes":[{"year":"1965","category":"physics","share":"3","motivation":"\"for their fundamental work in quantum electrodynamics, with deep-ploughing consequences for the physics of elementary particles\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"87","firstname":"Alfred","surname":"Kastler","born":"1902-05-03","died":"1984-01-07","bornCountry":"Germany (now France)","bornCountryCode":"FR","bornCity":"Guebwiller","diedCountry":"France","diedCountryCode":"FR","diedCity":"Bandol","gender":"male","prizes":[{"year":"1966","category":"physics","share":"1","motivation":"\"for the discovery and development of optical methods for studying Hertzian resonances in atoms\"","affiliations":[{"name":"École Normale Supérieure","city":"Paris","country":"France"}]}]},{"id":"88","firstname":"Hans Albrecht","surname":"Bethe","born":"1906-07-02","died":"2005-03-06","bornCountry":"Germany (now France)","bornCountryCode":"FR","bornCity":"Strassburg (now Strasbourg)","diedCountry":"USA","diedCountryCode":"US","diedCity":"Ithaca, NY","gender":"male","prizes":[{"year":"1967","category":"physics","share":"1","motivation":"\"for his contributions to the theory of nuclear reactions, especially his discoveries concerning the energy production in stars\"","affiliations":[{"name":"Cornell University","city":"Ithaca, NY","country":"USA"}]}]},{"id":"89","firstname":"Luis Walter","surname":"Alvarez","born":"1911-06-13","died":"1988-09-01","bornCountry":"USA","bornCountryCode":"US","bornCity":"San Francisco, CA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Berkeley, CA","gender":"male","prizes":[{"year":"1968","category":"physics","share":"1","motivation":"\"for his decisive contributions to elementary particle physics, in particular the discovery of a large number of resonance states, made possible through his development of the technique of using hydrogen bubble chamber and data analysis\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"90","firstname":"Murray","surname":"Gell-Mann","born":"1929-09-15","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1969","category":"physics","share":"1","motivation":"\"for his contributions and discoveries concerning the classification of elementary particles and their interactions\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"91","firstname":"Hannes Olof Gösta","surname":"Alfvén","born":"1908-05-30","died":"1995-04-02","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Norrköping","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Djursholm","gender":"male","prizes":[{"year":"1970","category":"physics","share":"2","motivation":"\"for fundamental work and discoveries in magnetohydro-dynamics with fruitful applications in different parts of plasma physics\"","affiliations":[{"name":"Royal Institute of Technology","city":"Stockholm","country":"Sweden"}]}]},{"id":"92","firstname":"Louis Eugène Félix","surname":"Néel","born":"1904-11-22","died":"2000-11-17","bornCountry":"France","bornCountryCode":"FR","bornCity":"Lyon","diedCountry":"France","diedCountryCode":"FR","diedCity":"Brive-Corrèze","gender":"male","prizes":[{"year":"1970","category":"physics","share":"2","motivation":"\"for fundamental work and discoveries concerning antiferromagnetism and ferrimagnetism which have led to important applications in solid state physics\"","affiliations":[{"name":"University of Grenoble","city":"Grenoble","country":"France"}]}]},{"id":"93","firstname":"Dennis","surname":"Gabor","born":"1900-06-05","died":"1979-02-08","bornCountry":"Hungary","bornCountryCode":"HU","bornCity":"Budapest","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1971","category":"physics","share":"1","motivation":"\"for his invention and development of the holographic method\"","affiliations":[{"name":"Imperial College","city":"London","country":"United Kingdom"}]}]},{"id":"95","firstname":"Leon Neil","surname":"Cooper","born":"1930-02-28","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1972","category":"physics","share":"3","motivation":"\"for their jointly developed theory of superconductivity, usually called the BCS-theory\"","affiliations":[{"name":"Brown University","city":"Providence, RI","country":"USA"}]}]},{"id":"96","firstname":"John Robert","surname":"Schrieffer","born":"1931-05-31","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Oak Park, IL","gender":"male","prizes":[{"year":"1972","category":"physics","share":"3","motivation":"\"for their jointly developed theory of superconductivity, usually called the BCS-theory\"","affiliations":[{"name":"University of Pennsylvania","city":"Philadelphia, PA","country":"USA"}]}]},{"id":"97","firstname":"Leo","surname":"Esaki","born":"1925-03-12","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Osaka","gender":"male","prizes":[{"year":"1973","category":"physics","share":"4","motivation":"\"for their experimental discoveries regarding tunneling phenomena in semiconductors and superconductors, respectively\"","affiliations":[{"name":"IBM Thomas J. Watson Research Center","city":"Yorktown Heights, NY","country":"USA"}]}]},{"id":"98","firstname":"Ivar","surname":"Giaever","born":"1929-04-05","died":"0000-00-00","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Bergen","gender":"male","prizes":[{"year":"1973","category":"physics","share":"4","motivation":"\"for their experimental discoveries regarding tunneling phenomena in semiconductors and superconductors, respectively\"","affiliations":[{"name":"General Electric Company","city":"Schenectady, NY","country":"USA"}]}]},{"id":"99","firstname":"Brian David","surname":"Josephson","born":"1940-01-04","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Cardiff","gender":"male","prizes":[{"year":"1973","category":"physics","share":"2","motivation":"\"for his theoretical predictions of the properties of a supercurrent through a tunnel barrier, in particular those phenomena which are generally known as the Josephson effects\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"100","firstname":"Sir Martin","surname":"Ryle","born":"1918-09-27","died":"1984-10-14","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Brighton","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1974","category":"physics","share":"2","motivation":"\"for their pioneering research in radio astrophysics: Ryle for his observations and inventions, in particular of the aperture synthesis technique, and Hewish for his decisive role in the discovery of pulsars\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"101","firstname":"Antony","surname":"Hewish","born":"1924-05-11","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Fowey","gender":"male","prizes":[{"year":"1974","category":"physics","share":"2","motivation":"\"for their pioneering research in radio astrophysics: Ryle for his observations and inventions, in particular of the aperture synthesis technique, and Hewish for his decisive role in the discovery of pulsars\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"102","firstname":"Aage Niels","surname":"Bohr","born":"1922-06-19","died":"2009-09-08","bornCountry":"Denmark","bornCountryCode":"DK","bornCity":"Copenhagen","diedCountry":"Denmark","diedCountryCode":"DK","diedCity":"Copenhagen","gender":"male","prizes":[{"year":"1975","category":"physics","share":"3","motivation":"\"for the discovery of the connection between collective motion and particle motion in atomic nuclei and the development of the theory of the structure of the atomic nucleus based on this connection\"","affiliations":[{"name":"Niels Bohr Institute","city":"Copenhagen","country":"Denmark"}]}]},{"id":"103","firstname":"Ben Roy","surname":"Mottelson","born":"1926-07-09","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","gender":"male","prizes":[{"year":"1975","category":"physics","share":"3","motivation":"\"for the discovery of the connection between collective motion and particle motion in atomic nuclei and the development of the theory of the structure of the atomic nucleus based on this connection\"","affiliations":[{"name":"Nordita","city":"Copenhagen","country":"Denmark"}]}]},{"id":"104","firstname":"Leo James","surname":"Rainwater","born":"1917-12-09","died":"1986-03-31","bornCountry":"USA","bornCountryCode":"US","bornCity":"Council, ID","diedCountry":"USA","diedCountryCode":"US","diedCity":"Yonkers, NY","gender":"male","prizes":[{"year":"1975","category":"physics","share":"3","motivation":"\"for the discovery of the connection between collective motion and particle motion in atomic nuclei and the development of the theory of the structure of the atomic nucleus based on this connection\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"105","firstname":"Burton","surname":"Richter","born":"1931-03-22","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Brooklyn, NY","gender":"male","prizes":[{"year":"1976","category":"physics","share":"2","motivation":"\"for their pioneering work in the discovery of a heavy elementary particle of a new kind\"","affiliations":[{"name":"Stanford Linear Accelerator Center","city":"Stanford, CA","country":"USA"}]}]},{"id":"106","firstname":"Samuel Chao Chung","surname":"Ting","born":"1936-01-27","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Ann Arbor, MI","gender":"male","prizes":[{"year":"1976","category":"physics","share":"2","motivation":"\"for their pioneering work in the discovery of a heavy elementary particle of a new kind\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"107","firstname":"Philip Warren","surname":"Anderson","born":"1923-12-13","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Indianapolis, IN","gender":"male","prizes":[{"year":"1977","category":"physics","share":"3","motivation":"\"for their fundamental theoretical investigations of the electronic structure of magnetic and disordered systems\"","affiliations":[{"name":"Bell Telephone Laboratories","city":"Murray Hill, NJ","country":"USA"}]}]},{"id":"108","firstname":"Sir Nevill Francis","surname":"Mott","born":"1905-09-30","died":"1996-08-08","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Leeds","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Milton Keynes","gender":"male","prizes":[{"year":"1977","category":"physics","share":"3","motivation":"\"for their fundamental theoretical investigations of the electronic structure of magnetic and disordered systems\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"109","firstname":"John Hasbrouck","surname":"van Vleck","born":"1899-03-13","died":"1980-10-27","bornCountry":"USA","bornCountryCode":"US","bornCity":"Middletown, CT","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cambridge, MA","gender":"male","prizes":[{"year":"1977","category":"physics","share":"3","motivation":"\"for their fundamental theoretical investigations of the electronic structure of magnetic and disordered systems\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"110","firstname":"Pyotr Leonidovich","surname":"Kapitsa","born":"1894-07-09","died":"1984-04-08","bornCountry":"Russian Empire (now Russia)","bornCountryCode":"RU","bornCity":"Kronshtadt","diedCountry":"USSR (now Russia)","diedCountryCode":"RU","diedCity":"Moscow","gender":"male","prizes":[{"year":"1978","category":"physics","share":"2","motivation":"\"for his basic inventions and discoveries in the area of low-temperature physics\"","affiliations":[{"name":"Academy of Sciences","city":"Moscow","country":"USSR"}]}]},{"id":"111","firstname":"Arno Allan","surname":"Penzias","born":"1933-04-26","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Munich","gender":"male","prizes":[{"year":"1978","category":"physics","share":"4","motivation":"\"for their discovery of cosmic microwave background radiation\"","affiliations":[{"name":"Bell Laboratories","city":"Holmdel, NJ","country":"USA"}]}]},{"id":"112","firstname":"Robert Woodrow","surname":"Wilson","born":"1936-01-10","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Houston, TX","gender":"male","prizes":[{"year":"1978","category":"physics","share":"4","motivation":"\"for their discovery of cosmic microwave background radiation\"","affiliations":[{"name":"Bell Laboratories","city":"Holmdel, NJ","country":"USA"}]}]},{"id":"113","firstname":"Sheldon Lee","surname":"Glashow","born":"1932-12-05","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1979","category":"physics","share":"3","motivation":"\"for their contributions to the theory of the unified weak and electromagnetic interaction between elementary particles, including, inter alia, the prediction of the weak neutral current\"","affiliations":[{"name":"Harvard University, Lyman Laboratory","city":"Cambridge, MA","country":"USA"}]}]},{"id":"114","firstname":"Abdus","surname":"Salam","born":"1926-01-29","died":"1996-11-21","bornCountry":"India (now Pakistan)","bornCountryCode":"PK","bornCity":"Jhang Maghi&#257;na","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Oxford","gender":"male","prizes":[{"year":"1979","category":"physics","share":"3","motivation":"\"for their contributions to the theory of the unified weak and electromagnetic interaction between elementary particles, including, inter alia, the prediction of the weak neutral current\"","affiliations":[{"name":"International Centre for Theoretical Physics","city":"Trieste","country":"Italy"},{"name":"Imperial College","city":"London","country":"United Kingdom"}]}]},{"id":"115","firstname":"Steven","surname":"Weinberg","born":"1933-05-03","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1979","category":"physics","share":"3","motivation":"\"for their contributions to the theory of the unified weak and electromagnetic interaction between elementary particles, including, inter alia, the prediction of the weak neutral current\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"116","firstname":"James Watson","surname":"Cronin","born":"1931-09-29","died":"2016-08-25","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"St. Paul, MN","gender":"male","prizes":[{"year":"1980","category":"physics","share":"2","motivation":"\"for the discovery of violations of fundamental symmetry principles in the decay of neutral K-mesons\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"117","firstname":"Val Logsdon","surname":"Fitch","born":"1923-03-10","died":"2015-02-05","bornCountry":"USA","bornCountryCode":"US","bornCity":"Merriman, NE","diedCountry":"USA","diedCountryCode":"US","diedCity":"Princeton, NJ","gender":"male","prizes":[{"year":"1980","category":"physics","share":"2","motivation":"\"for the discovery of violations of fundamental symmetry principles in the decay of neutral K-mesons\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"118","firstname":"Nicolaas","surname":"Bloembergen","born":"1920-03-11","died":"2017-09-05","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Dordrecht","diedCountry":"USA","diedCountryCode":"US","diedCity":"Tucson, AZ","gender":"male","prizes":[{"year":"1981","category":"physics","share":"4","motivation":"\"for their contribution to the development of laser spectroscopy\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"119","firstname":"Arthur Leonard","surname":"Schawlow","born":"1921-05-05","died":"1999-04-28","bornCountry":"USA","bornCountryCode":"US","bornCity":"Mount Verno, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Palo Alto, CA","gender":"male","prizes":[{"year":"1981","category":"physics","share":"4","motivation":"\"for their contribution to the development of laser spectroscopy\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"120","firstname":"Kai M.","surname":"Siegbahn","born":"1918-04-20","died":"2007-07-20","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Lund","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Ängelholm","gender":"male","prizes":[{"year":"1981","category":"physics","share":"2","motivation":"\"for his contribution to the development of high-resolution electron spectroscopy\"","affiliations":[{"name":"Uppsala University","city":"Uppsala","country":"Sweden"}]}]},{"id":"121","firstname":"Kenneth G.","surname":"Wilson","born":"1936-06-08","died":"2013-06-15","bornCountry":"USA","bornCountryCode":"US","bornCity":"Waltham, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Saco, ME","gender":"male","prizes":[{"year":"1982","category":"physics","share":"1","motivation":"\"for his theory for critical phenomena in connection with phase transitions\"","affiliations":[{"name":"Cornell University","city":"Ithaca, NY","country":"USA"}]}]},{"id":"122","firstname":"Subramanyan","surname":"Chandrasekhar","born":"1910-10-19","died":"1995-08-21","bornCountry":"India (now Pakistan)","bornCountryCode":"PK","bornCity":"Lahore","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chicago, IL","gender":"male","prizes":[{"year":"1983","category":"physics","share":"2","motivation":"\"for his theoretical studies of the physical processes of importance to the structure and evolution of the stars\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"123","firstname":"William Alfred","surname":"Fowler","born":"1911-08-09","died":"1995-03-14","bornCountry":"USA","bornCountryCode":"US","bornCity":"Pittsburgh, PA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Pasadena, CA","gender":"male","prizes":[{"year":"1983","category":"physics","share":"2","motivation":"\"for his theoretical and experimental studies of the nuclear reactions of importance in the formation of the chemical elements in the universe\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"124","firstname":"Carlo","surname":"Rubbia","born":"1934-03-31","died":"0000-00-00","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Gorizia","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Geneva","gender":"male","prizes":[{"year":"1984","category":"physics","share":"2","motivation":"\"for their decisive contributions to the large project, which led to the discovery of the field particles W and Z, communicators of weak interaction\"","affiliations":[{"name":"CERN","city":"Geneva","country":"Switzerland"}]}]},{"id":"125","firstname":"Simon","surname":"van der Meer","born":"1925-11-24","died":"2011-03-04","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"the Hague","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Geneva","gender":"male","prizes":[{"year":"1984","category":"physics","share":"2","motivation":"\"for their decisive contributions to the large project, which led to the discovery of the field particles W and Z, communicators of weak interaction\"","affiliations":[{"name":"CERN","city":"Geneva","country":"Switzerland"}]}]},{"id":"126","firstname":"Klaus","surname":"von Klitzing","born":"1943-06-28","died":"0000-00-00","bornCountry":"German-occupied Poland (now Poland)","bornCountryCode":"PL","bornCity":"Schroda","gender":"male","prizes":[{"year":"1985","category":"physics","share":"1","motivation":"\"for the discovery of the quantized Hall effect\"","affiliations":[{"name":"Max-Planck-Institut für Festkörperforschung","city":"Stuttgart","country":"Federal Republic of Germany"}]}]},{"id":"127","firstname":"Ernst","surname":"Ruska","born":"1906-12-25","died":"1988-05-27","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Heidelberg","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"West Berlin","gender":"male","prizes":[{"year":"1986","category":"physics","share":"2","motivation":"\"for his fundamental work in electron optics, and for the design of the first electron microscope\"","affiliations":[{"name":"Fritz-Haber-Institut der Max-Planck-Gesellschaft","city":"Berlin","country":"Federal Republic of Germany"}]}]},{"id":"128","firstname":"Gerd","surname":"Binnig","born":"1947-07-20","died":"0000-00-00","bornCountry":"West Germany (now Germany)","bornCountryCode":"DE","bornCity":"Frankfurt-on-the-Main","gender":"male","prizes":[{"year":"1986","category":"physics","share":"4","motivation":"\"for their design of the scanning tunneling microscope\"","affiliations":[{"name":"IBM Zurich Research Laboratory","city":"Rüschlikon","country":"Switzerland"}]}]},{"id":"129","firstname":"Heinrich","surname":"Rohrer","born":"1933-06-06","died":"2013-05-16","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Buchs","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Wollerau","gender":"male","prizes":[{"year":"1986","category":"physics","share":"4","motivation":"\"for their design of the scanning tunneling microscope\"","affiliations":[{"name":"IBM Zurich Research Laboratory","city":"Rüschlikon","country":"Switzerland"}]}]},{"id":"130","firstname":"J. Georg","surname":"Bednorz","born":"1950-05-16","died":"0000-00-00","bornCountry":"West Germany (now Germany)","bornCountryCode":"DE","bornCity":"Neuenkirchen","gender":"male","prizes":[{"year":"1987","category":"physics","share":"2","motivation":"\"for their important break-through in the discovery of superconductivity in ceramic materials\"","affiliations":[{"name":"IBM Zurich Research Laboratory","city":"Rüschlikon","country":"Switzerland"}]}]},{"id":"131","firstname":"K. Alexander","surname":"Müller","born":"1927-04-20","died":"0000-00-00","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Basel","gender":"male","prizes":[{"year":"1987","category":"physics","share":"2","motivation":"\"for their important break-through in the discovery of superconductivity in ceramic materials\"","affiliations":[{"name":"IBM Zurich Research Laboratory","city":"Rüschlikon","country":"Switzerland"}]}]},{"id":"132","firstname":"Leon M.","surname":"Lederman","born":"1922-07-15","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1988","category":"physics","share":"3","motivation":"\"for the neutrino beam method and the demonstration of the doublet structure of the leptons through the discovery of the muon neutrino\"","affiliations":[{"name":"Fermi National Accelerator Laboratory","city":"Batavia, IL","country":"USA"}]}]},{"id":"133","firstname":"Melvin","surname":"Schwartz","born":"1932-11-02","died":"2006-08-28","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Twin Falls, ID","gender":"male","prizes":[{"year":"1988","category":"physics","share":"3","motivation":"\"for the neutrino beam method and the demonstration of the doublet structure of the leptons through the discovery of the muon neutrino\"","affiliations":[{"name":"Digital Pathways, Inc.","city":"Mountain View, CA","country":"USA"}]}]},{"id":"134","firstname":"Jack","surname":"Steinberger","born":"1921-05-25","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Bad Kissingen","gender":"male","prizes":[{"year":"1988","category":"physics","share":"3","motivation":"\"for the neutrino beam method and the demonstration of the doublet structure of the leptons through the discovery of the muon neutrino\"","affiliations":[{"name":"CERN","city":"Geneva","country":"Switzerland"}]}]},{"id":"135","firstname":"Norman F.","surname":"Ramsey","born":"1915-08-27","died":"2011-11-04","bornCountry":"USA","bornCountryCode":"US","bornCity":"Washington, DC","diedCountry":"USA","diedCountryCode":"US","diedCity":"Wayland, MA","gender":"male","prizes":[{"year":"1989","category":"physics","share":"2","motivation":"\"for the invention of the separated oscillatory fields method and its use in the hydrogen maser and other atomic clocks\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"136","firstname":"Hans G.","surname":"Dehmelt","born":"1922-09-09","died":"2017-03-07","bornCountry":"Prussia (now Germany)","bornCountryCode":"DE","bornCity":"Görlitz","diedCountry":"USA","diedCountryCode":"US","diedCity":"Seattle, WA","gender":"male","prizes":[{"year":"1989","category":"physics","share":"4","motivation":"\"for the development of the ion trap technique\"","affiliations":[{"name":"University of Washington","city":"Seattle, WA","country":"USA"}]}]},{"id":"137","firstname":"Wolfgang","surname":"Paul","born":"1913-08-10","died":"1993-12-07","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Lorenzkirch","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Bonn","gender":"male","prizes":[{"year":"1989","category":"physics","share":"4","motivation":"\"for the development of the ion trap technique\"","affiliations":[{"name":"University of Bonn","city":"Bonn","country":"Federal Republic of Germany"}]}]},{"id":"138","firstname":"Jerome I.","surname":"Friedman","born":"1930-03-28","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","gender":"male","prizes":[{"year":"1990","category":"physics","share":"3","motivation":"\"for their pioneering investigations concerning deep inelastic scattering of electrons on protons and bound neutrons, which have been of essential importance for the development of the quark model in particle physics\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"139","firstname":"Henry W.","surname":"Kendall","born":"1926-12-09","died":"1999-02-15","bornCountry":"USA","bornCountryCode":"US","bornCity":"Boston, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Wakulla Springs State Park, FL","gender":"male","prizes":[{"year":"1990","category":"physics","share":"3","motivation":"\"for their pioneering investigations concerning deep inelastic scattering of electrons on protons and bound neutrons, which have been of essential importance for the development of the quark model in particle physics\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"140","firstname":"Richard E.","surname":"Taylor","born":"1929-11-02","died":"0000-00-00","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Medicine Hat, Alberta","gender":"male","prizes":[{"year":"1990","category":"physics","share":"3","motivation":"\"for their pioneering investigations concerning deep inelastic scattering of electrons on protons and bound neutrons, which have been of essential importance for the development of the quark model in particle physics\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"141","firstname":"Pierre-Gilles","surname":"de Gennes","born":"1932-10-24","died":"2007-05-18","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Orsay","gender":"male","prizes":[{"year":"1991","category":"physics","share":"1","motivation":"\"for discovering that methods developed for studying order phenomena in simple systems can be generalized to more complex forms of matter, in particular to liquid crystals and polymers\"","affiliations":[{"name":"Collège de France","city":"Paris","country":"France"}]}]},{"id":"142","firstname":"Georges","surname":"Charpak","born":"1924-08-01","died":"2010-09-29","bornCountry":"Poland","bornCountryCode":"PL","bornCity":"Dabrovica","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1992","category":"physics","share":"1","motivation":"\"for his invention and development of particle detectors, in particular the multiwire proportional chamber\"","affiliations":[{"name":"École Supérieure de Physique et Chimie","city":"Paris","country":"France"},{"name":"CERN","city":"Geneva","country":"Switzerland"}]}]},{"id":"143","firstname":"Russell A.","surname":"Hulse","born":"1950-11-28","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1993","category":"physics","share":"2","motivation":"\"for the discovery of a new type of pulsar, a discovery that has opened up new possibilities for the study of gravitation\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"144","firstname":"Joseph H.","surname":"Taylor Jr.","born":"1941-03-29","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Philadelphia, PA","gender":"male","prizes":[{"year":"1993","category":"physics","share":"2","motivation":"\"for the discovery of a new type of pulsar, a discovery that has opened up new possibilities for the study of gravitation\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"145","firstname":"Bertram N.","surname":"Brockhouse","born":"1918-07-15","died":"2003-10-13","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Lethbridge, Alberta","diedCountry":"Canada","diedCountryCode":"CA","diedCity":"Hamilton, Ontario","gender":"male","prizes":[{"year":"1994","category":"physics","overallMotivation":"\"for pioneering contributions to the development of neutron scattering techniques for studies of condensed matter\"","share":"2","motivation":"\"for the development of neutron spectroscopy\"","affiliations":[{"name":"McMaster University","city":"Hamilton, Ontario","country":"Canada"}]}]},{"id":"146","firstname":"Clifford G.","surname":"Shull","born":"1915-09-23","died":"2001-03-31","bornCountry":"USA","bornCountryCode":"US","bornCity":"Pittsburgh, PA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Medford, MA","gender":"male","prizes":[{"year":"1994","category":"physics","overallMotivation":"\"for pioneering contributions to the development of neutron scattering techniques for studies of condensed matter\"","share":"2","motivation":"\"for the development of the neutron diffraction technique\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"147","firstname":"Martin L.","surname":"Perl","born":"1927-06-24","died":"2014-09-30","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Palo Alto, CA","gender":"male","prizes":[{"year":"1995","category":"physics","overallMotivation":"\"for pioneering experimental contributions to lepton physics\"","share":"2","motivation":"\"for the discovery of the tau lepton\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"148","firstname":"Frederick","surname":"Reines","born":"1918-03-16","died":"1998-08-26","bornCountry":"USA","bornCountryCode":"US","bornCity":"Paterson, NJ","diedCountry":"USA","diedCountryCode":"US","diedCity":"Orange, CA","gender":"male","prizes":[{"year":"1995","category":"physics","overallMotivation":"\"for pioneering experimental contributions to lepton physics\"","share":"2","motivation":"\"for the detection of the neutrino\"","affiliations":[{"name":"University of California","city":"Irvine, CA","country":"USA"}]}]},{"id":"149","firstname":"David M.","surname":"Lee","born":"1931-01-20","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Rye, NY","gender":"male","prizes":[{"year":"1996","category":"physics","share":"3","motivation":"\"for their discovery of superfluidity in helium-3\"","affiliations":[{"name":"Cornell University","city":"Ithaca, NY","country":"USA"}]}]},{"id":"150","firstname":"Douglas D.","surname":"Osheroff","born":"1945-08-01","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Aberdeen, WA","gender":"male","prizes":[{"year":"1996","category":"physics","share":"3","motivation":"\"for their discovery of superfluidity in helium-3\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"151","firstname":"Robert C.","surname":"Richardson","born":"1937-06-26","died":"2013-02-19","bornCountry":"USA","bornCountryCode":"US","bornCity":"Washington, DC","diedCountry":"USA","diedCountryCode":"US","diedCity":"Ithaca, NY","gender":"male","prizes":[{"year":"1996","category":"physics","share":"3","motivation":"\"for their discovery of superfluidity in helium-3\"","affiliations":[{"name":"Cornell University","city":"Ithaca, NY","country":"USA"}]}]},{"id":"152","firstname":"Steven","surname":"Chu","born":"1948-02-28","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"St. Louis, MO","gender":"male","prizes":[{"year":"1997","category":"physics","share":"3","motivation":"\"for development of methods to cool and trap atoms with laser light\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"153","firstname":"Claude","surname":"Cohen-Tannoudji","born":"1933-04-01","died":"0000-00-00","bornCountry":"French Algeria (now Algeria)","bornCountryCode":"DZ","bornCity":"Constantine","gender":"male","prizes":[{"year":"1997","category":"physics","share":"3","motivation":"\"for development of methods to cool and trap atoms with laser light\"","affiliations":[{"name":"Collège de France","city":"Paris","country":"France"},{"name":"École Normale Supérieure","city":"Paris","country":"France"}]}]},{"id":"154","firstname":"William D.","surname":"Phillips","born":"1948-11-05","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Wilkes-Barre, PA","gender":"male","prizes":[{"year":"1997","category":"physics","share":"3","motivation":"\"for development of methods to cool and trap atoms with laser light\"","affiliations":[{"name":"National Institute of Standards and Technology","city":"Gaithersburg, MD","country":"USA"}]}]},{"id":"155","firstname":"Robert B.","surname":"Laughlin","born":"1950-11-01","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Visalia, CA","gender":"male","prizes":[{"year":"1998","category":"physics","share":"3","motivation":"\"for their discovery of a new form of quantum fluid with fractionally charged excitations\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"156","firstname":"Horst L.","surname":"Störmer","born":"1949-04-06","died":"0000-00-00","bornCountry":"West Germany (now Germany)","bornCountryCode":"DE","bornCity":"Frankfurt-on-the-Main","gender":"male","prizes":[{"year":"1998","category":"physics","share":"3","motivation":"\"for their discovery of a new form of quantum fluid with fractionally charged excitations\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"157","firstname":"Daniel C.","surname":"Tsui","born":"1939-02-28","died":"0000-00-00","bornCountry":"China","bornCountryCode":"CN","bornCity":"Henan","gender":"male","prizes":[{"year":"1998","category":"physics","share":"3","motivation":"\"for their discovery of a new form of quantum fluid with fractionally charged excitations\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"158","firstname":"Gerardus","surname":"'t Hooft","born":"1946-07-05","died":"0000-00-00","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Den Helder","gender":"male","prizes":[{"year":"1999","category":"physics","share":"2","motivation":"\"for elucidating the quantum structure of electroweak interactions in physics\"","affiliations":[{"name":"Utrecht University","city":"Utrecht","country":"the Netherlands"}]}]},{"id":"159","firstname":"Martinus J.G.","surname":"Veltman","born":"1931-06-27","died":"0000-00-00","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Waalwijk","gender":"male","prizes":[{"year":"1999","category":"physics","share":"2","motivation":"\"for elucidating the quantum structure of electroweak interactions in physics\"","affiliations":[{"city":"Bilthoven","country":"the Netherlands"}]}]},{"id":"160","firstname":"Jacobus Henricus","surname":"van 't Hoff","born":"1852-08-30","died":"1911-03-01","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Rotterdam","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Berlin","gender":"male","prizes":[{"year":"1901","category":"chemistry","share":"1","motivation":"\"in recognition of the extraordinary services he has rendered by the discovery of the laws of chemical dynamics and osmotic pressure in solutions\"","affiliations":[{"name":"Berlin University","city":"Berlin","country":"Germany"}]}]},{"id":"161","firstname":"Hermann Emil","surname":"Fischer","born":"1852-10-09","died":"1919-07-15","bornCountry":"Prussia (now Germany)","bornCountryCode":"DE","bornCity":"Euskirchen","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Berlin","gender":"male","prizes":[{"year":"1902","category":"chemistry","share":"1","motivation":"\"in recognition of the extraordinary services he has rendered by his work on sugar and purine syntheses\"","affiliations":[{"name":"Berlin University","city":"Berlin","country":"Germany"}]}]},{"id":"162","firstname":"Svante August","surname":"Arrhenius","born":"1859-02-19","died":"1927-10-02","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Vik","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1903","category":"chemistry","share":"1","motivation":"\"in recognition of the extraordinary services he has rendered to the advancement of chemistry by his electrolytic theory of dissociation\"","affiliations":[{"name":"Stockholm University","city":"Stockholm","country":"Sweden"}]}]},{"id":"163","firstname":"Sir William","surname":"Ramsay","born":"1852-10-02","died":"1916-07-23","bornCountry":"Scotland","bornCountryCode":"GB","bornCity":"Glasgow","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"High Wycombe","gender":"male","prizes":[{"year":"1904","category":"chemistry","share":"1","motivation":"\"in recognition of his services in the discovery of the inert gaseous elements in air, and his determination of their place in the periodic system\"","affiliations":[{"name":"University College","city":"London","country":"United Kingdom"}]}]},{"id":"164","firstname":"Johann Friedrich Wilhelm Adolf","surname":"von Baeyer","born":"1835-10-31","died":"1917-08-20","bornCountry":"Prussia (now Germany)","bornCountryCode":"DE","bornCity":"Berlin","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Starnberg","gender":"male","prizes":[{"year":"1905","category":"chemistry","share":"1","motivation":"\"in recognition of his services in the advancement of organic chemistry and the chemical industry, through his work on organic dyes and hydroaromatic compounds\"","affiliations":[{"name":"Munich University","city":"Munich","country":"Germany"}]}]},{"id":"165","firstname":"Henri","surname":"Moissan","born":"1852-09-28","died":"1907-02-20","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1906","category":"chemistry","share":"1","motivation":"\"in recognition of the great services rendered by him in his investigation and isolation of the element fluorine, and for the adoption in the service of science of the electric furnace called after him\"","affiliations":[{"name":"Sorbonne University","city":"Paris","country":"France"}]}]},{"id":"166","firstname":"Eduard","surname":"Buchner","born":"1860-05-20","died":"1917-08-13","bornCountry":"Bavaria (now Germany)","bornCountryCode":"DE","bornCity":"Munich","diedCountry":"Romania","diedCountryCode":"RO","diedCity":"Focsani","gender":"male","prizes":[{"year":"1907","category":"chemistry","share":"1","motivation":"\"for his biochemical researches and his discovery of cell-free fermentation\"","affiliations":[{"name":"Landwirtschaftliche Hochschule (Agricultural College)","city":"Berlin","country":"Germany"}]}]},{"id":"167","firstname":"Ernest","surname":"Rutherford","born":"1871-08-30","died":"1937-10-19","bornCountry":"New Zealand","bornCountryCode":"NZ","bornCity":"Nelson","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1908","category":"chemistry","share":"1","motivation":"\"for his investigations into the disintegration of the elements, and the chemistry of radioactive substances\"","affiliations":[{"name":"Victoria University","city":"Manchester","country":"United Kingdom"}]}]},{"id":"168","firstname":"Wilhelm","surname":"Ostwald","born":"1853-09-02","died":"1932-04-04","bornCountry":"Russian Empire (now Latvia)","bornCountryCode":"LV","bornCity":"Riga","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Leipzig","gender":"male","prizes":[{"year":"1909","category":"chemistry","share":"1","motivation":"\"in recognition of his work on catalysis and for his investigations into the fundamental principles governing chemical equilibria and rates of reaction\"","affiliations":[{"name":"Leipzig University","city":"Leipzig","country":"Germany"}]}]},{"id":"169","firstname":"Otto","surname":"Wallach","born":"1847-03-27","died":"1931-02-26","bornCountry":"Germany (now Russia)","bornCountryCode":"RU","bornCity":"Koenigsberg (now Kaliningrad)","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Göttingen","gender":"male","prizes":[{"year":"1910","category":"chemistry","share":"1","motivation":"\"in recognition of his services to organic chemistry and the chemical industry by his pioneer work in the field of alicyclic compounds\"","affiliations":[{"name":"Goettingen University","city":"Göttingen","country":"Germany"}]}]},{"id":"172","firstname":"Victor","surname":"Grignard","born":"1871-05-06","died":"1935-12-13","bornCountry":"France","bornCountryCode":"FR","bornCity":"Cherbourg","diedCountry":"France","diedCountryCode":"FR","diedCity":"Lyon","gender":"male","prizes":[{"year":"1912","category":"chemistry","share":"2","motivation":"\"for the discovery of the so-called Grignard reagent, which in recent years has greatly advanced the progress of organic chemistry\"","affiliations":[{"name":"Nancy University","city":"Nancy","country":"France"}]}]},{"id":"173","firstname":"Paul","surname":"Sabatier","born":"1854-11-05","died":"1941-08-14","bornCountry":"France","bornCountryCode":"FR","bornCity":"Carcassonne","diedCountry":"France","diedCountryCode":"FR","diedCity":"Toulouse","gender":"male","prizes":[{"year":"1912","category":"chemistry","share":"2","motivation":"\"for his method of hydrogenating organic compounds in the presence of finely disintegrated metals whereby the progress of organic chemistry has been greatly advanced in recent years\"","affiliations":[{"name":"Toulouse University","city":"Toulouse","country":"France"}]}]},{"id":"174","firstname":"Alfred","surname":"Werner","born":"1866-12-12","died":"1919-11-15","bornCountry":"France","bornCountryCode":"FR","bornCity":"Mulhouse","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Zurich","gender":"male","prizes":[{"year":"1913","category":"chemistry","share":"1","motivation":"\"in recognition of his work on the linkage of atoms in molecules by which he has thrown new light on earlier investigations and opened up new fields of research especially in inorganic chemistry\"","affiliations":[{"name":"University of Zurich","city":"Zurich","country":"Switzerland"}]}]},{"id":"175","firstname":"Theodore William","surname":"Richards","born":"1868-01-31","died":"1928-04-02","bornCountry":"USA","bornCountryCode":"US","bornCity":"Germantown, PA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cambridge, MA","gender":"male","prizes":[{"year":"1914","category":"chemistry","share":"1","motivation":"\"in recognition of his accurate determinations of the atomic weight of a large number of chemical elements\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"176","firstname":"Richard Martin","surname":"Willstätter","born":"1872-08-13","died":"1942-08-03","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Karlsruhe","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Locarno","gender":"male","prizes":[{"year":"1915","category":"chemistry","share":"1","motivation":"\"for his researches on plant pigments, especially chlorophyll\"","affiliations":[{"name":"Munich University","city":"Munich","country":"Germany"}]}]},{"id":"177","firstname":"Fritz","surname":"Haber","born":"1868-12-09","died":"1934-01-29","bornCountry":"Prussia (now Poland)","bornCountryCode":"PL","bornCity":"Breslau (now Wroclaw)","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Basel","gender":"male","prizes":[{"year":"1918","category":"chemistry","share":"1","motivation":"\"for the synthesis of ammonia from its elements\"","affiliations":[{"name":"Kaiser-Wilhelm-Institut (now Fritz-Haber-Institut) für physikalische Chemie und Electrochemie","city":"Berlin-Dahlem","country":"Germany"}]}]},{"id":"178","firstname":"Walther Hermann","surname":"Nernst","born":"1864-06-25","died":"1941-11-18","bornCountry":"Prussia (now Germany)","bornCountryCode":"DE","bornCity":"Briesen","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Muskau","gender":"male","prizes":[{"year":"1920","category":"chemistry","share":"1","motivation":"\"in recognition of his work in thermochemistry\"","affiliations":[{"name":"Berlin University","city":"Berlin","country":"Germany"}]}]},{"id":"179","firstname":"Frederick","surname":"Soddy","born":"1877-09-02","died":"1956-09-22","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Eastbourne","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Brighton","gender":"male","prizes":[{"year":"1921","category":"chemistry","share":"1","motivation":"\"for his contributions to our knowledge of the chemistry of radioactive substances, and his investigations into the origin and nature of isotopes\"","affiliations":[{"name":"University of Oxford","city":"Oxford","country":"United Kingdom"}]}]},{"id":"180","firstname":"Francis William","surname":"Aston","born":"1877-09-01","died":"1945-11-20","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Harborne","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1922","category":"chemistry","share":"1","motivation":"\"for his discovery, by means of his mass spectrograph, of isotopes, in a large number of non-radioactive elements, and for his enunciation of the whole-number rule\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"181","firstname":"Fritz","surname":"Pregl","born":"1869-09-03","died":"1930-12-13","bornCountry":"Austria-Hungary (now Slovenia)","bornCountryCode":"SI","bornCity":"Laibach (now Ljubljana)","diedCountry":"Austria","diedCountryCode":"AT","diedCity":"Graz","gender":"male","prizes":[{"year":"1923","category":"chemistry","share":"1","motivation":"\"for his invention of the method of micro-analysis of organic substances\"","affiliations":[{"name":"Graz University","city":"Graz","country":"Austria"}]}]},{"id":"182","firstname":"Richard Adolf","surname":"Zsigmondy","born":"1865-04-01","died":"1929-09-24","bornCountry":"Austrian Empire (now Austria)","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Göttingen","gender":"male","prizes":[{"year":"1925","category":"chemistry","share":"1","motivation":"\"for his demonstration of the heterogenous nature of colloid solutions and for the methods he used, which have since become fundamental in modern colloid chemistry\"","affiliations":[{"name":"Goettingen University","city":"Göttingen","country":"Germany"}]}]},{"id":"183","firstname":"The (Theodor)","surname":"Svedberg","born":"1884-08-30","died":"1971-02-25","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Fleräng","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Örebro","gender":"male","prizes":[{"year":"1926","category":"chemistry","share":"1","motivation":"\"for his work on disperse systems\"","affiliations":[{"name":"Uppsala University","city":"Uppsala","country":"Sweden"}]}]},{"id":"184","firstname":"Heinrich Otto","surname":"Wieland","born":"1877-06-04","died":"1957-08-05","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Pforzheim","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Munich","gender":"male","prizes":[{"year":"1927","category":"chemistry","share":"1","motivation":"\"for his investigations of the constitution of the bile acids and related substances\"","affiliations":[{"name":"Munich University","city":"Munich","country":"Germany"}]}]},{"id":"185","firstname":"Adolf Otto Reinhold","surname":"Windaus","born":"1876-12-25","died":"1959-06-09","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Berlin","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Göttingen","gender":"male","prizes":[{"year":"1928","category":"chemistry","share":"1","motivation":"\"for the services rendered through his research into the constitution of the sterols and their connection with the vitamins\"","affiliations":[{"name":"Goettingen University","city":"Göttingen","country":"Germany"}]}]},{"id":"186","firstname":"Arthur","surname":"Harden","born":"1865-10-12","died":"1940-06-17","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Manchester","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Bourne","gender":"male","prizes":[{"year":"1929","category":"chemistry","share":"2","motivation":"\"for their investigations on the fermentation of sugar and fermentative enzymes\"","affiliations":[{"name":"London University","city":"London","country":"United Kingdom"}]}]},{"id":"187","firstname":"Hans Karl August Simon","surname":"von Euler-Chelpin","born":"1873-02-15","died":"1964-11-06","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Augsburg","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1929","category":"chemistry","share":"2","motivation":"\"for their investigations on the fermentation of sugar and fermentative enzymes\"","affiliations":[{"name":"Stockholm University","city":"Stockholm","country":"Sweden"}]}]},{"id":"188","firstname":"Hans","surname":"Fischer","born":"1881-07-27","died":"1945-03-31","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Hoechst","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Munich","gender":"male","prizes":[{"year":"1930","category":"chemistry","share":"1","motivation":"\"for his researches into the constitution of haemin and chlorophyll and especially for his synthesis of haemin\"","affiliations":[{"name":"Technische Hochschule (Institute of Technology)","city":"Munich","country":"Germany"}]}]},{"id":"189","firstname":"Carl","surname":"Bosch","born":"1874-08-27","died":"1940-04-26","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Cologne","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Heidelberg","gender":"male","prizes":[{"year":"1931","category":"chemistry","share":"2","motivation":"\"in recognition of their contributions to the invention and development of chemical high pressure methods\"","affiliations":[{"name":"University of Heidelberg","city":"Heidelberg","country":"Germany"},{"name":"I.G. Farbenindustrie A.G.","city":"Heidelberg","country":"Germany"}]}]},{"id":"190","firstname":"Friedrich","surname":"Bergius","born":"1884-10-11","died":"1949-03-30","bornCountry":"Germany (now Poland)","bornCountryCode":"PL","bornCity":"Goldschmieden, near Breslau","diedCountry":"Argentina","diedCountryCode":"AR","diedCity":"Buenos Aires","gender":"male","prizes":[{"year":"1931","category":"chemistry","share":"2","motivation":"\"in recognition of their contributions to the invention and development of chemical high pressure methods\"","affiliations":[{"name":"University of Heidelberg","city":"Heidelberg","country":"Germany"},{"name":"I.G. Farbenindustrie A.G.","city":"Mannheim-Rheinau","country":"Germany"}]}]},{"id":"191","firstname":"Irving","surname":"Langmuir","born":"1881-01-31","died":"1957-08-16","bornCountry":"USA","bornCountryCode":"US","bornCity":"Brooklyn, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Falmouth, MA","gender":"male","prizes":[{"year":"1932","category":"chemistry","share":"1","motivation":"\"for his discoveries and investigations in surface chemistry\"","affiliations":[{"name":"General Electric Company","city":"Schenectady, NY","country":"USA"}]}]},{"id":"192","firstname":"Harold Clayton","surname":"Urey","born":"1893-04-29","died":"1981-01-05","bornCountry":"USA","bornCountryCode":"US","bornCity":"Walkerton, IN","diedCountry":"USA","diedCountryCode":"US","diedCity":"La Jolla, CA","gender":"male","prizes":[{"year":"1934","category":"chemistry","share":"1","motivation":"\"for his discovery of heavy hydrogen\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"193","firstname":"Frédéric","surname":"Joliot","born":"1900-03-19","died":"1958-08-14","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1935","category":"chemistry","share":"2","motivation":"\"in recognition of their synthesis of new radioactive elements\"","affiliations":[{"name":"Institut du Radium","city":"Paris","country":"France"}]}]},{"id":"194","firstname":"Irène","surname":"Joliot-Curie","born":"1897-09-12","died":"1956-03-17","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"female","prizes":[{"year":"1935","category":"chemistry","share":"2","motivation":"\"in recognition of their synthesis of new radioactive elements\"","affiliations":[{"name":"Institut du Radium","city":"Paris","country":"France"}]}]},{"id":"195","firstname":"Petrus (Peter) Josephus Wilhelmus","surname":"Debye","born":"1884-03-24","died":"1966-11-02","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Maastricht","diedCountry":"USA","diedCountryCode":"US","diedCity":"Ithaca, NY","gender":"male","prizes":[{"year":"1936","category":"chemistry","share":"1","motivation":"\"for his contributions to our knowledge of molecular structure through his investigations on dipole moments and on the diffraction of X-rays and electrons in gases\"","affiliations":[{"name":"Berlin University","city":"Berlin","country":"Germany"},{"name":"Kaiser-Wilhelm-Institut (now Max-Planck-Institut) für Physik","city":"Berlin","country":"Germany"}]}]},{"id":"196","firstname":"Walter Norman","surname":"Haworth","born":"1883-03-19","died":"1950-03-19","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Chorley","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Birmingham","gender":"male","prizes":[{"year":"1937","category":"chemistry","share":"2","motivation":"\"for his investigations on carbohydrates and vitamin C\"","affiliations":[{"name":"Birmingham University","city":"Birmingham","country":"United Kingdom"}]}]},{"id":"197","firstname":"Paul","surname":"Karrer","born":"1889-04-21","died":"1971-06-18","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Moscow","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Zurich","gender":"male","prizes":[{"year":"1937","category":"chemistry","share":"2","motivation":"\"for his investigations on carotenoids, flavins and vitamins A and B2\"","affiliations":[{"name":"University of Zurich","city":"Zurich","country":"Switzerland"}]}]},{"id":"198","firstname":"Richard","surname":"Kuhn","born":"1900-12-03","died":"1967-07-31","bornCountry":"Austria-Hungary (now Austria)","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Heidelberg","gender":"male","prizes":[{"year":"1938","category":"chemistry","share":"1","motivation":"\"for his work on carotenoids and vitamins\"","affiliations":[{"name":"Kaiser-Wilhelm-Institut (now Max-Planck Institut) für Medizinische Forschung","city":"Heidelberg","country":"Germany"},{"name":"University of Heidelberg","city":"Heidelberg","country":"Germany"}]}]},{"id":"199","firstname":"Adolf Friedrich Johann","surname":"Butenandt","born":"1903-03-24","died":"1995-01-18","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Bremerhaven-Lehe","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Munich","gender":"male","prizes":[{"year":"1939","category":"chemistry","share":"2","motivation":"\"for his work on sex hormones\"","affiliations":[{"name":"Kaiser-Wilhelm-Institut (now Max-Planck-Institut) für Biochemie","city":"Berlin-Dahlem","country":"Germany"},{"name":"Berlin University","city":"Berlin","country":"Germany"}]}]},{"id":"200","firstname":"Leopold","surname":"Ruzicka","born":"1887-09-13","died":"1976-09-26","bornCountry":"Austria-Hungary (now Croatia)","bornCountryCode":"HR","bornCity":"Vukovar","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Zurich","gender":"male","prizes":[{"year":"1939","category":"chemistry","share":"2","motivation":"\"for his work on polymethylenes and higher terpenes\"","affiliations":[{"name":"Eidgenössische Technische Hochschule (Swiss Federal Institute of Technology)","city":"Zurich","country":"Switzerland"}]}]},{"id":"201","firstname":"George","surname":"de Hevesy","born":"1885-08-01","died":"1966-07-05","bornCountry":"Austria-Hungary (now Hungary)","bornCountryCode":"HU","bornCity":"Budapest","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Freiburg im Breisgau","gender":"male","prizes":[{"year":"1943","category":"chemistry","share":"1","motivation":"\"for his work on the use of isotopes as tracers in the study of chemical processes\"","affiliations":[{"name":"Stockholm University","city":"Stockholm","country":"Sweden"}]}]},{"id":"202","firstname":"Otto","surname":"Hahn","born":"1879-03-08","died":"1968-07-28","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Frankfurt-on-the-Main","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Göttingen","gender":"male","prizes":[{"year":"1944","category":"chemistry","share":"1","motivation":"\"for his discovery of the fission of heavy nuclei\"","affiliations":[{"name":"Kaiser-Wilhelm-Institut (now Max-Planck Institut) für Chemie","city":"Berlin-Dahlem","country":"Germany"}]}]},{"id":"203","firstname":"Artturi Ilmari","surname":"Virtanen","born":"1895-01-15","died":"1973-11-11","bornCountry":"Russian Empire (now Finland)","bornCountryCode":"FI","bornCity":"Helsinki","diedCountry":"Finland","diedCountryCode":"FI","diedCity":"Helsinki","gender":"male","prizes":[{"year":"1945","category":"chemistry","share":"1","motivation":"\"for his research and inventions in agricultural and nutrition chemistry, especially for his fodder preservation method\"","affiliations":[{"name":"University of Helsinki","city":"Helsinki","country":"Finland"}]}]},{"id":"204","firstname":"James Batcheller","surname":"Sumner","born":"1887-11-19","died":"1955-08-12","bornCountry":"USA","bornCountryCode":"US","bornCity":"Canton, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Buffalo, NY","gender":"male","prizes":[{"year":"1946","category":"chemistry","share":"2","motivation":"\"for his discovery that enzymes can be crystallized\"","affiliations":[{"name":"Cornell University","city":"Ithaca, NY","country":"USA"}]}]},{"id":"205","firstname":"John Howard","surname":"Northrop","born":"1891-07-05","died":"1987-05-27","bornCountry":"USA","bornCountryCode":"US","bornCity":"Yonkers, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Wickenberg, AZ","gender":"male","prizes":[{"year":"1946","category":"chemistry","share":"4","motivation":"\"for their preparation of enzymes and virus proteins in a pure form\"","affiliations":[{"name":"Rockefeller Institute for Medical Research","city":"Princeton, NJ","country":"USA"}]}]},{"id":"206","firstname":"Wendell Meredith","surname":"Stanley","born":"1904-08-16","died":"1971-06-15","bornCountry":"USA","bornCountryCode":"US","bornCity":"Ridgeville, IN","diedCountry":"Spain","diedCountryCode":"ES","diedCity":"Salamanca","gender":"male","prizes":[{"year":"1946","category":"chemistry","share":"4","motivation":"\"for their preparation of enzymes and virus proteins in a pure form\"","affiliations":[{"name":"Rockefeller Institute for Medical Research","city":"Princeton, NJ","country":"USA"}]}]},{"id":"207","firstname":"Sir Robert","surname":"Robinson","born":"1886-09-13","died":"1975-02-08","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Rufford, near Chesterfield","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Great Missenden","gender":"male","prizes":[{"year":"1947","category":"chemistry","share":"1","motivation":"\"for his investigations on plant products of biological importance, especially the alkaloids\"","affiliations":[{"name":"University of Oxford","city":"Oxford","country":"United Kingdom"}]}]},{"id":"208","firstname":"Arne Wilhelm Kaurin","surname":"Tiselius","born":"1902-08-10","died":"1971-10-29","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Stockholm","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Uppsala","gender":"male","prizes":[{"year":"1948","category":"chemistry","share":"1","motivation":"\"for his research on electrophoresis and adsorption analysis, especially for his discoveries concerning the complex nature of the serum proteins\"","affiliations":[{"name":"Uppsala University","city":"Uppsala","country":"Sweden"}]}]},{"id":"209","firstname":"William Francis","surname":"Giauque","born":"1895-05-12","died":"1982-03-28","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Niagara Falls","diedCountry":"USA","diedCountryCode":"US","diedCity":"Berkeley, CA","gender":"male","prizes":[{"year":"1949","category":"chemistry","share":"1","motivation":"\"for his contributions in the field of chemical thermodynamics, particularly concerning the behaviour of substances at extremely low temperatures\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"210","firstname":"Otto Paul Hermann","surname":"Diels","born":"1876-01-23","died":"1954-03-07","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Hamburg","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Kiel","gender":"male","prizes":[{"year":"1950","category":"chemistry","share":"2","motivation":"\"for their discovery and development of the diene synthesis\"","affiliations":[{"name":"Kiel University","city":"Kiel","country":"Federal Republic of Germany"}]}]},{"id":"211","firstname":"Kurt","surname":"Alder","born":"1902-07-10","died":"1958-06-20","bornCountry":"Prussia (now Poland)","bornCountryCode":"PL","bornCity":"Königshütte (now Chorzów)","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Cologne","gender":"male","prizes":[{"year":"1950","category":"chemistry","share":"2","motivation":"\"for their discovery and development of the diene synthesis\"","affiliations":[{"name":"Cologne University","city":"Cologne","country":"Federal Republic of Germany"}]}]},{"id":"212","firstname":"Edwin Mattison","surname":"McMillan","born":"1907-09-18","died":"1991-09-07","bornCountry":"USA","bornCountryCode":"US","bornCity":"Redondo Beach, CA","diedCountry":"USA","diedCountryCode":"US","diedCity":"El Cerrito, CA","gender":"male","prizes":[{"year":"1951","category":"chemistry","share":"2","motivation":"\"for their discoveries in the chemistry of the transuranium elements\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"213","firstname":"Glenn Theodore","surname":"Seaborg","born":"1912-04-19","died":"1999-02-25","bornCountry":"USA","bornCountryCode":"US","bornCity":"Ishpeming, MI","diedCountry":"USA","diedCountryCode":"US","diedCity":"Lafayette, CA","gender":"male","prizes":[{"year":"1951","category":"chemistry","share":"2","motivation":"\"for their discoveries in the chemistry of the transuranium elements\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"214","firstname":"Archer John Porter","surname":"Martin","born":"1910-03-01","died":"2002-07-28","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Llangarron","gender":"male","prizes":[{"year":"1952","category":"chemistry","share":"2","motivation":"\"for their invention of partition chromatography\"","affiliations":[{"name":"National Institute for Medical Research","city":"London","country":"United Kingdom"}]}]},{"id":"215","firstname":"Richard Laurence Millington","surname":"Synge","born":"1914-10-28","died":"1994-08-18","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Liverpool","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Norwich","gender":"male","prizes":[{"year":"1952","category":"chemistry","share":"2","motivation":"\"for their invention of partition chromatography\"","affiliations":[{"name":"Rowett Research Institute","city":"Bucksburn (Scotland)","country":"United Kingdom"}]}]},{"id":"216","firstname":"Hermann","surname":"Staudinger","born":"1881-03-23","died":"1965-09-08","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Worms","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Freiburg im Breisgau","gender":"male","prizes":[{"year":"1953","category":"chemistry","share":"1","motivation":"\"for his discoveries in the field of macromolecular chemistry\"","affiliations":[{"name":"University of Freiburg","city":"Breisgau","country":"Federal Republic of Germany"},{"name":"Staatliches Institut für makromolekulare Chemie (State Research Institute for Macromolecular Chemistry), Freiburg","city":"Breisgau","country":"Federal Republic of Germany"}]}]},{"id":"217","firstname":"Linus Carl","surname":"Pauling","born":"1901-02-28","died":"1994-08-19","bornCountry":"USA","bornCountryCode":"US","bornCity":"Portland, OR","diedCountry":"USA","diedCountryCode":"US","diedCity":"Big Sur, CA","gender":"male","prizes":[{"year":"1954","category":"chemistry","share":"1","motivation":"\"for his research into the nature of the chemical bond and its application to the elucidation of the structure of complex substances\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]},{"year":"1962","category":"peace","share":"1","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"218","firstname":"Vincent","surname":"du Vigneaud","born":"1901-05-18","died":"1978-12-11","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"White Plains, NY","gender":"male","prizes":[{"year":"1955","category":"chemistry","share":"1","motivation":"\"for his work on biochemically important sulphur compounds, especially for the first synthesis of a polypeptide hormone\"","affiliations":[{"name":"Cornell University","city":"Ithaca, NY","country":"USA"}]}]},{"id":"219","firstname":"Sir Cyril Norman","surname":"Hinshelwood","born":"1897-05-19","died":"1967-10-09","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1956","category":"chemistry","share":"2","motivation":"\"for their researches into the mechanism of chemical reactions\"","affiliations":[{"name":"University of Oxford","city":"Oxford","country":"United Kingdom"}]}]},{"id":"220","firstname":"Nikolay Nikolaevich","surname":"Semenov","born":"1896-04-03","died":"1986-09-25","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Saratov","diedCountry":"USSR","diedCountryCode":"RU","diedCity":"Moscow","gender":"male","prizes":[{"year":"1956","category":"chemistry","share":"2","motivation":"\"for their researches into the mechanism of chemical reactions\"","affiliations":[{"name":"Institute for Chemical Physics of the Academy of Sciences of the USSR","city":"Moscow","country":"USSR"}]}]},{"id":"221","firstname":"Lord (Alexander R.)","surname":"Todd","born":"1907-10-02","died":"1997-01-10","bornCountry":"Scotland","bornCountryCode":"GB","bornCity":"Glasgow","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1957","category":"chemistry","share":"1","motivation":"\"for his work on nucleotides and nucleotide co-enzymes\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"222","firstname":"Frederick","surname":"Sanger","born":"1918-08-13","died":"2013-11-19","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Rendcombe","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1958","category":"chemistry","share":"1","motivation":"\"for his work on the structure of proteins, especially that of insulin\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]},{"year":"1980","category":"chemistry","share":"4","motivation":"\"for their contributions concerning the determination of base sequences in nucleic acids\"","affiliations":[{"name":"MRC Laboratory of Molecular Biology","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"223","firstname":"Jaroslav","surname":"Heyrovsky","born":"1890-12-20","died":"1967-03-27","bornCountry":"Austria-Hungary (now Czech Republic)","bornCountryCode":"CZ","bornCity":"Prague","diedCountry":"Czechoslovakia","diedCountryCode":"CZ","diedCity":"Prague","gender":"male","prizes":[{"year":"1959","category":"chemistry","share":"1","motivation":"\"for his discovery and development of the polarographic methods of analysis\"","affiliations":[{"name":"Polarographic Institute of the Czechoslovak Academy of Science","city":"Prague","country":"Czechoslovakia"}]}]},{"id":"224","firstname":"Willard Frank","surname":"Libby","born":"1908-12-17","died":"1980-09-08","bornCountry":"USA","bornCountryCode":"US","bornCity":"Grand Valley, CO","diedCountry":"USA","diedCountryCode":"US","diedCity":"Los Angeles, CA","gender":"male","prizes":[{"year":"1960","category":"chemistry","share":"1","motivation":"\"for his method to use carbon-14 for age determination in archaeology, geology, geophysics, and other branches of science\"","affiliations":[{"name":"University of California","city":"Los Angeles, CA","country":"USA"}]}]},{"id":"225","firstname":"Melvin","surname":"Calvin","born":"1911-04-08","died":"1997-01-08","bornCountry":"USA","bornCountryCode":"US","bornCity":"St. Paul, MN","diedCountry":"USA","diedCountryCode":"US","diedCity":"Berkeley, CA","gender":"male","prizes":[{"year":"1961","category":"chemistry","share":"1","motivation":"\"for his research on the carbon dioxide assimilation in plants\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"226","firstname":"Max Ferdinand","surname":"Perutz","born":"1914-05-19","died":"2002-02-06","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1962","category":"chemistry","share":"2","motivation":"\"for their studies of the structures of globular proteins\"","affiliations":[{"name":"MRC Laboratory of Molecular Biology","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"227","firstname":"John Cowdery","surname":"Kendrew","born":"1917-03-24","died":"1997-08-23","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Oxford","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1962","category":"chemistry","share":"2","motivation":"\"for their studies of the structures of globular proteins\"","affiliations":[{"name":"MRC Laboratory of Molecular Biology","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"228","firstname":"Karl","surname":"Ziegler","born":"1898-11-26","died":"1973-08-12","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Helsa","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Mülheim","gender":"male","prizes":[{"year":"1963","category":"chemistry","share":"2","motivation":"\"for their discoveries in the field of the chemistry and technology of high polymers\"","affiliations":[{"name":"Max-Planck-Institut für Kohlenforschung (Max-Planck-Institute for Carbon Research)","city":"Mülheim/Ruhr","country":"Federal Republic of Germany"}]}]},{"id":"229","firstname":"Giulio","surname":"Natta","born":"1903-02-26","died":"1979-05-02","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Imperia","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Bergamo","gender":"male","prizes":[{"year":"1963","category":"chemistry","share":"2","motivation":"\"for their discoveries in the field of the chemistry and technology of high polymers\"","affiliations":[{"name":"Institute of Technology","city":"Milan","country":"Italy"}]}]},{"id":"230","firstname":"Dorothy Crowfoot","surname":"Hodgkin","born":"1910-05-12","died":"1994-07-29","bornCountry":"Egypt","bornCountryCode":"EG","bornCity":"Cairo","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Shipston-on-Stour","gender":"female","prizes":[{"year":"1964","category":"chemistry","share":"1","motivation":"\"for her determinations by X-ray techniques of the structures of important biochemical substances\"","affiliations":[{"name":"University of Oxford, Royal Society","city":"Oxford","country":"United Kingdom"}]}]},{"id":"231","firstname":"Robert Burns","surname":"Woodward","born":"1917-04-10","died":"1979-07-08","bornCountry":"USA","bornCountryCode":"US","bornCity":"Boston, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cambridge, MA","gender":"male","prizes":[{"year":"1965","category":"chemistry","share":"1","motivation":"\"for his outstanding achievements in the art of organic synthesis\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"232","firstname":"Robert S.","surname":"Mulliken","born":"1896-06-07","died":"1986-10-31","bornCountry":"USA","bornCountryCode":"US","bornCity":"Newburyport, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Arlington, VA","gender":"male","prizes":[{"year":"1966","category":"chemistry","share":"1","motivation":"\"for his fundamental work concerning chemical bonds and the electronic structure of molecules by the molecular orbital method\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"233","firstname":"Manfred","surname":"Eigen","born":"1927-05-09","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Bochum","gender":"male","prizes":[{"year":"1967","category":"chemistry","share":"2","motivation":"\"for their studies of extremely fast chemical reactions, effected by disturbing the equilibrium by means of very short pulses of energy\"","affiliations":[{"name":"Max-Planck-Institut für Physikalische Chemie","city":"Göttingen","country":"Federal Republic of Germany"}]}]},{"id":"234","firstname":"Ronald George Wreyford","surname":"Norrish","born":"1897-11-09","died":"1978-06-07","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Cambridge","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1967","category":"chemistry","share":"4","motivation":"\"for their studies of extremely fast chemical reactions, effected by disturbing the equilibrium by means of very short pulses of energy\"","affiliations":[{"name":"Institute of Physical Chemistry","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"235","firstname":"George","surname":"Porter","born":"1920-12-06","died":"2002-08-31","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Stainforth","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Canterbury","gender":"male","prizes":[{"year":"1967","category":"chemistry","share":"4","motivation":"\"for their studies of extremely fast chemical reactions, effected by disturbing the equilibrium by means of very short pulses of energy\"","affiliations":[{"name":"Royal Institution of Great Britain","city":"London","country":"United Kingdom"}]}]},{"id":"236","firstname":"Lars","surname":"Onsager","born":"1903-11-27","died":"1976-10-05","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Kristiania (now Oslo)","diedCountry":"USA","diedCountryCode":"US","diedCity":"Coral Gables, FL","gender":"male","prizes":[{"year":"1968","category":"chemistry","share":"1","motivation":"\"for the discovery of the reciprocal relations bearing his name, which are fundamental for the thermodynamics of irreversible processes\"","affiliations":[{"name":"Yale University","city":"New Haven, CT","country":"USA"}]}]},{"id":"237","firstname":"Derek H. R.","surname":"Barton","born":"1918-09-08","died":"1998-03-16","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Gravesend","diedCountry":"USA","diedCountryCode":"US","diedCity":"College Station, TX","gender":"male","prizes":[{"year":"1969","category":"chemistry","share":"2","motivation":"\"for their contributions to the development of the concept of conformation and its application in chemistry\"","affiliations":[{"name":"Imperial College","city":"London","country":"United Kingdom"}]}]},{"id":"238","firstname":"Odd","surname":"Hassel","born":"1897-05-17","died":"1981-05-11","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Kristiania (now Oslo)","diedCountry":"Norway","diedCountryCode":"NO","diedCity":"Oslo","gender":"male","prizes":[{"year":"1969","category":"chemistry","share":"2","motivation":"\"for their contributions to the development of the concept of conformation and its application in chemistry\"","affiliations":[{"name":"University of Oslo","city":"Oslo","country":"Norway"}]}]},{"id":"239","firstname":"Luis F.","surname":"Leloir","born":"1906-09-06","died":"1987-12-02","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"Argentina","diedCountryCode":"AR","diedCity":"Buenos Aires","gender":"male","prizes":[{"year":"1970","category":"chemistry","share":"1","motivation":"\"for his discovery of sugar nucleotides and their role in the biosynthesis of carbohydrates\"","affiliations":[{"name":"Institute for Biochemical Research","city":"Buenos Aires","country":"Argentina"}]}]},{"id":"240","firstname":"Gerhard","surname":"Herzberg","born":"1904-12-25","died":"1999-03-03","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Hamburg","diedCountry":"Canada","diedCountryCode":"CA","diedCity":"Ottawa","gender":"male","prizes":[{"year":"1971","category":"chemistry","share":"1","motivation":"\"for his contributions to the knowledge of electronic structure and geometry of molecules, particularly free radicals\"","affiliations":[{"name":"National Research Council of Canada","city":"Ottawa","country":"Canada"}]}]},{"id":"241","firstname":"Christian B.","surname":"Anfinsen","born":"1916-03-26","died":"1995-05-14","bornCountry":"USA","bornCountryCode":"US","bornCity":"Monessen, PA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Randallstown, MD","gender":"male","prizes":[{"year":"1972","category":"chemistry","share":"2","motivation":"\"for his work on ribonuclease, especially concerning the connection between the amino acid sequence and the biologically active conformation\"","affiliations":[{"name":"National Institutes of Health","city":"Bethesda, MD","country":"USA"}]}]},{"id":"242","firstname":"Stanford","surname":"Moore","born":"1913-09-04","died":"1982-08-23","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1972","category":"chemistry","share":"4","motivation":"\"for their contribution to the understanding of the connection between chemical structure and catalytic activity of the active centre of the ribonuclease molecule\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"}]}]},{"id":"243","firstname":"William H.","surname":"Stein","born":"1911-06-25","died":"1980-02-02","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1972","category":"chemistry","share":"4","motivation":"\"for their contribution to the understanding of the connection between chemical structure and catalytic activity of the active centre of the ribonuclease molecule\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"}]}]},{"id":"244","firstname":"Ernst Otto","surname":"Fischer","born":"1918-11-10","died":"2007-07-23","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Munich","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Munich","gender":"male","prizes":[{"year":"1973","category":"chemistry","share":"2","motivation":"\"for their pioneering work, performed independently, on the chemistry of the organometallic, so called sandwich compounds\"","affiliations":[{"name":"Technical University","city":"Munich","country":"Federal Republic of Germany"}]}]},{"id":"245","firstname":"Geoffrey","surname":"Wilkinson","born":"1921-07-14","died":"1996-09-26","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Todmorden","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1973","category":"chemistry","share":"2","motivation":"\"for their pioneering work, performed independently, on the chemistry of the organometallic, so called sandwich compounds\"","affiliations":[{"name":"Imperial College","city":"London","country":"United Kingdom"}]}]},{"id":"246","firstname":"Paul J.","surname":"Flory","born":"1910-06-19","died":"1985-09-08","bornCountry":"USA","bornCountryCode":"US","bornCity":"Sterling, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"Big Sur, CA","gender":"male","prizes":[{"year":"1974","category":"chemistry","share":"1","motivation":"\"for his fundamental achievements, both theoretical and experimental, in the physical chemistry of the macromolecules\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"247","firstname":"John Warcup","surname":"Cornforth","born":"1917-09-07","died":"2013-12-08","bornCountry":"Australia","bornCountryCode":"AU","bornCity":"Sydney","gender":"male","prizes":[{"year":"1975","category":"chemistry","share":"2","motivation":"\"for his work on the stereochemistry of enzyme-catalyzed reactions\"","affiliations":[{"name":"University of Sussex","city":"Brighton","country":"United Kingdom"}]}]},{"id":"248","firstname":"Vladimir","surname":"Prelog","born":"1906-07-23","died":"1998-01-07","bornCountry":"Austria-Hungary (now Bosnia and Herzegovina)","bornCountryCode":"BA","bornCity":"Sarajevo","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Zurich","gender":"male","prizes":[{"year":"1975","category":"chemistry","share":"2","motivation":"\"for his research into the stereochemistry of organic molecules and reactions\"","affiliations":[{"name":"Eidgenössische Technische Hochschule (Swiss Federal Institute of Technology)","city":"Zurich","country":"Switzerland"}]}]},{"id":"249","firstname":"William N.","surname":"Lipscomb","born":"1919-12-09","died":"2011-04-14","bornCountry":"USA","bornCountryCode":"US","bornCity":"Cleveland, OH","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cambridge, MA","gender":"male","prizes":[{"year":"1976","category":"chemistry","share":"1","motivation":"\"for his studies on the structure of boranes illuminating problems of chemical bonding\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"250","firstname":"Ilya","surname":"Prigogine","born":"1917-01-25","died":"2003-05-28","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Moscow","diedCountry":"Belgium","diedCountryCode":"BE","diedCity":"Brussels","gender":"male","prizes":[{"year":"1977","category":"chemistry","share":"1","motivation":"\"for his contributions to non-equilibrium thermodynamics, particularly the theory of dissipative structures\"","affiliations":[{"name":"Université Libre de Bruxelles","city":"Brussels","country":"Belgium"},{"name":"University of Texas","city":"Austin, TX","country":"USA"}]}]},{"id":"251","firstname":"Peter D.","surname":"Mitchell","born":"1920-09-29","died":"1992-04-10","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Mitcham","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Bodmin","gender":"male","prizes":[{"year":"1978","category":"chemistry","share":"1","motivation":"\"for his contribution to the understanding of biological energy transfer through the formulation of the chemiosmotic theory\"","affiliations":[{"name":"Glynn Research Laboratories","city":"Bodmin","country":"United Kingdom"}]}]},{"id":"252","firstname":"Herbert C.","surname":"Brown","born":"1912-05-22","died":"2004-12-19","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"USA","diedCountryCode":"US","diedCity":"Lafayette, IN","gender":"male","prizes":[{"year":"1979","category":"chemistry","share":"2","motivation":"\"for their development of the use of boron- and phosphorus-containing compounds, respectively, into important reagents in organic synthesis\"","affiliations":[{"name":"Purdue University","city":"West Lafayette, IN","country":"USA"}]}]},{"id":"253","firstname":"Georg","surname":"Wittig","born":"1897-06-16","died":"1987-08-26","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Berlin","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Heidelberg","gender":"male","prizes":[{"year":"1979","category":"chemistry","share":"2","motivation":"\"for their development of the use of boron- and phosphorus-containing compounds, respectively, into important reagents in organic synthesis\"","affiliations":[{"name":"University of Heidelberg","city":"Heidelberg","country":"Federal Republic of Germany"}]}]},{"id":"254","firstname":"Paul","surname":"Berg","born":"1926-06-30","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1980","category":"chemistry","share":"2","motivation":"\"for his fundamental studies of the biochemistry of nucleic acids, with particular regard to recombinant-DNA\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"255","firstname":"Walter","surname":"Gilbert","born":"1932-03-21","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Boston, MA","gender":"male","prizes":[{"year":"1980","category":"chemistry","share":"4","motivation":"\"for their contributions concerning the determination of base sequences in nucleic acids\"","affiliations":[{"name":"Harvard University, Biological Laboratories","city":"Cambridge, MA","country":"USA"}]}]},{"id":"257","firstname":"Kenichi","surname":"Fukui","born":"1918-10-04","died":"1998-01-09","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Nara","diedCountry":"Japan","diedCountryCode":"JP","diedCity":"Kyoto","gender":"male","prizes":[{"year":"1981","category":"chemistry","share":"2","motivation":"\"for their theories, developed independently, concerning the course of chemical reactions\"","affiliations":[{"name":"Kyoto University","city":"Kyoto","country":"Japan"}]}]},{"id":"258","firstname":"Roald","surname":"Hoffmann","born":"1937-07-18","died":"0000-00-00","bornCountry":"Poland (now Ukraine)","bornCountryCode":"UA","bornCity":"Zloczov","gender":"male","prizes":[{"year":"1981","category":"chemistry","share":"2","motivation":"\"for their theories, developed independently, concerning the course of chemical reactions\"","affiliations":[{"name":"Cornell University","city":"Ithaca, NY","country":"USA"}]}]},{"id":"259","firstname":"Aaron","surname":"Klug","born":"1926-08-11","died":"0000-00-00","bornCountry":"Lithuania","bornCountryCode":"LT","bornCity":"Zelvas","gender":"male","prizes":[{"year":"1982","category":"chemistry","share":"1","motivation":"\"for his development of crystallographic electron microscopy and his structural elucidation of biologically important nucleic acid-protein complexes\"","affiliations":[{"name":"MRC Laboratory of Molecular Biology","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"260","firstname":"Henry","surname":"Taube","born":"1915-11-30","died":"2005-11-16","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Neudorf","diedCountry":"USA","diedCountryCode":"US","diedCity":"Stanford, CA","gender":"male","prizes":[{"year":"1983","category":"chemistry","share":"1","motivation":"\"for his work on the mechanisms of electron transfer reactions, especially in metal complexes\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"261","firstname":"Robert Bruce","surname":"Merrifield","born":"1921-07-15","died":"2006-05-14","bornCountry":"USA","bornCountryCode":"US","bornCity":"Fort Worth, TX","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cresskill, NJ","gender":"male","prizes":[{"year":"1984","category":"chemistry","share":"1","motivation":"\"for his development of methodology for chemical synthesis on a solid matrix\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"}]}]},{"id":"262","firstname":"Herbert A.","surname":"Hauptman","born":"1917-02-14","died":"2011-10-23","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Buffalo, NY","gender":"male","prizes":[{"year":"1985","category":"chemistry","share":"2","motivation":"\"for their outstanding achievements in the development of direct methods for the determination of crystal structures\"","affiliations":[{"name":"The Medical Foundation of Buffalo","city":"Buffalo, NY","country":"USA"}]}]},{"id":"263","firstname":"Jerome","surname":"Karle","born":"1918-06-18","died":"2013-06-06","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1985","category":"chemistry","share":"2","motivation":"\"for their outstanding achievements in the development of direct methods for the determination of crystal structures\"","affiliations":[{"name":"US Naval Research Laboratory","city":"Washington, DC","country":"USA"}]}]},{"id":"264","firstname":"Dudley R.","surname":"Herschbach","born":"1932-06-18","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"San José, CA","gender":"male","prizes":[{"year":"1986","category":"chemistry","share":"3","motivation":"\"for their contributions concerning the dynamics of chemical elementary processes\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"265","firstname":"Yuan T.","surname":"Lee","born":"1936-11-19","died":"0000-00-00","bornCountry":"Taiwan","bornCountryCode":"TW","bornCity":"Hsinchu","gender":"male","prizes":[{"year":"1986","category":"chemistry","share":"3","motivation":"\"for their contributions concerning the dynamics of chemical elementary processes\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"266","firstname":"John C.","surname":"Polanyi","born":"1929-01-23","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Berlin","gender":"male","prizes":[{"year":"1986","category":"chemistry","share":"3","motivation":"\"for their contributions concerning the dynamics of chemical elementary processes\"","affiliations":[{"name":"University of Toronto","city":"Toronto","country":"Canada"}]}]},{"id":"267","firstname":"Donald J.","surname":"Cram","born":"1919-04-22","died":"2001-06-17","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chester, VT","diedCountry":"USA","diedCountryCode":"US","diedCity":"Palm Desert, CA","gender":"male","prizes":[{"year":"1987","category":"chemistry","share":"3","motivation":"\"for their development and use of molecules with structure-specific interactions of high selectivity\"","affiliations":[{"name":"University of California","city":"Los Angeles, CA","country":"USA"}]}]},{"id":"268","firstname":"Jean-Marie","surname":"Lehn","born":"1939-09-30","died":"0000-00-00","bornCountry":"France","bornCountryCode":"FR","bornCity":"Rosheim","gender":"male","prizes":[{"year":"1987","category":"chemistry","share":"3","motivation":"\"for their development and use of molecules with structure-specific interactions of high selectivity\"","affiliations":[{"name":"Université Louis Pasteur","city":"Strasbourg","country":"France"},{"name":"Collège de France","city":"Paris","country":"France"}]}]},{"id":"269","firstname":"Charles J.","surname":"Pedersen","born":"1904-10-03","died":"1989-10-26","bornCountry":"Korea (now South Korea)","bornCountryCode":"KR","bornCity":"Pusan","diedCountry":"USA","diedCountryCode":"US","diedCity":"Salem, NJ","gender":"male","prizes":[{"year":"1987","category":"chemistry","share":"3","motivation":"\"for their development and use of molecules with structure-specific interactions of high selectivity\"","affiliations":[{"name":"Du Pont","city":"Wilmington, DE","country":"USA"}]}]},{"id":"270","firstname":"Johann","surname":"Deisenhofer","born":"1943-09-30","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Zusamaltheim","gender":"male","prizes":[{"year":"1988","category":"chemistry","share":"3","motivation":"\"for the determination of the three-dimensional structure of a photosynthetic reaction centre\"","affiliations":[{"name":"University of Texas Southwestern Medical Center at Dallas","city":"Dallas, TX","country":"USA"},{"name":"Howard Hughes Medical Institute"}]}]},{"id":"271","firstname":"Robert","surname":"Huber","born":"1937-02-20","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Munich","gender":"male","prizes":[{"year":"1988","category":"chemistry","share":"3","motivation":"\"for the determination of the three-dimensional structure of a photosynthetic reaction centre\"","affiliations":[{"name":"Max-Planck-Institut für Biochemie","city":"Martinsried","country":"Federal Republic of Germany"}]}]},{"id":"272","firstname":"Hartmut","surname":"Michel","born":"1948-07-18","died":"0000-00-00","bornCountry":"West Germany (now Germany)","bornCountryCode":"DE","bornCity":"Ludwigsburg","gender":"male","prizes":[{"year":"1988","category":"chemistry","share":"3","motivation":"\"for the determination of the three-dimensional structure of a photosynthetic reaction centre\"","affiliations":[{"name":"Max-Planck-Institut für Biophysik","city":"Frankfurt-on-the-Main","country":"Federal Republic of Germany"}]}]},{"id":"273","firstname":"Sidney","surname":"Altman","born":"1939-05-07","died":"0000-00-00","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Montreal","gender":"male","prizes":[{"year":"1989","category":"chemistry","share":"2","motivation":"\"for their discovery of catalytic properties of RNA\"","affiliations":[{"name":"Yale University","city":"New Haven, CT","country":"USA"}]}]},{"id":"274","firstname":"Thomas R.","surname":"Cech","born":"1947-12-08","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","gender":"male","prizes":[{"year":"1989","category":"chemistry","share":"2","motivation":"\"for their discovery of catalytic properties of RNA\"","affiliations":[{"name":"University of Colorado","city":"Boulder, CO","country":"USA"}]}]},{"id":"275","firstname":"Elias James","surname":"Corey","born":"1928-07-12","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Methuen, MA","gender":"male","prizes":[{"year":"1990","category":"chemistry","share":"1","motivation":"\"for his development of the theory and methodology of organic synthesis\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"276","firstname":"Richard R.","surname":"Ernst","born":"1933-08-14","died":"0000-00-00","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Winterthur","gender":"male","prizes":[{"year":"1991","category":"chemistry","share":"1","motivation":"\"for his contributions to the development of the methodology of high resolution nuclear magnetic resonance (NMR) spectroscopy\"","affiliations":[{"name":"Eidgenössische Technische Hochschule (Swiss Federal Institute of Technology)","city":"Zurich","country":"Switzerland"}]}]},{"id":"277","firstname":"Rudolph A.","surname":"Marcus","born":"1923-07-21","died":"0000-00-00","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Montreal","gender":"male","prizes":[{"year":"1992","category":"chemistry","share":"1","motivation":"\"for his contributions to the theory of electron transfer reactions in chemical systems\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"278","firstname":"Kary B.","surname":"Mullis","born":"1944-12-28","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Lenoir, NC","gender":"male","prizes":[{"year":"1993","category":"chemistry","overallMotivation":"\"for contributions to the developments of methods within DNA-based chemistry\"","share":"2","motivation":"\"for his invention of the polymerase chain reaction (PCR) method\"","affiliations":[{"city":"La Jolla, CA","country":"USA"}]}]},{"id":"279","firstname":"Michael","surname":"Smith","born":"1932-04-26","died":"2000-10-04","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Blackpool","diedCountry":"Canada","diedCountryCode":"CA","diedCity":"Vancouver","gender":"male","prizes":[{"year":"1993","category":"chemistry","overallMotivation":"\"for contributions to the developments of methods within DNA-based chemistry\"","share":"2","motivation":"\"for his fundamental contributions to the establishment of oligonucleotide-based, site-directed mutagenesis and its development for protein studies\"","affiliations":[{"name":"University of British Columbia","city":"Vancouver","country":"Canada"}]}]},{"id":"280","firstname":"George A.","surname":"Olah","born":"1927-05-22","died":"2017-03-08","bornCountry":"Hungary","bornCountryCode":"HU","bornCity":"Budapest","diedCountry":"USA","diedCountryCode":"US","diedCity":"Los Angeles, CA","gender":"male","prizes":[{"year":"1994","category":"chemistry","share":"1","motivation":"\"for his contribution to carbocation chemistry\"","affiliations":[{"name":"University of Southern California","city":"Los Angeles, CA","country":"USA"}]}]},{"id":"281","firstname":"Paul J.","surname":"Crutzen","born":"1933-12-03","died":"0000-00-00","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Amsterdam","gender":"male","prizes":[{"year":"1995","category":"chemistry","share":"3","motivation":"\"for their work in atmospheric chemistry, particularly concerning the formation and decomposition of ozone\"","affiliations":[{"name":"Max-Planck-Institut für Chemie","city":"Mainz","country":"Federal Republic of Germany"}]}]},{"id":"282","firstname":"Mario J.","surname":"Molina","born":"1943-03-19","died":"0000-00-00","bornCountry":"Mexico","bornCountryCode":"MX","bornCity":"Mexico City","gender":"male","prizes":[{"year":"1995","category":"chemistry","share":"3","motivation":"\"for their work in atmospheric chemistry, particularly concerning the formation and decomposition of ozone\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"283","firstname":"F. Sherwood","surname":"Rowland","born":"1927-06-28","died":"2012-03-10","bornCountry":"USA","bornCountryCode":"US","bornCity":"Delaware, OH","diedCountry":"USA","diedCountryCode":"US","diedCity":"Corona del Mar, CA","gender":"male","prizes":[{"year":"1995","category":"chemistry","share":"3","motivation":"\"for their work in atmospheric chemistry, particularly concerning the formation and decomposition of ozone\"","affiliations":[{"name":"University of California","city":"Irvine, CA","country":"USA"}]}]},{"id":"284","firstname":"Robert F.","surname":"Curl Jr.","born":"1933-08-23","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Alice, TX","gender":"male","prizes":[{"year":"1996","category":"chemistry","share":"3","motivation":"\"for their discovery of fullerenes\"","affiliations":[{"name":"Rice University","city":"Houston, TX","country":"USA"}]}]},{"id":"285","firstname":"Sir Harold W.","surname":"Kroto","born":"1939-10-07","died":"2016-04-30","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Wisbech","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Lewes, East Sussex","gender":"male","prizes":[{"year":"1996","category":"chemistry","share":"3","motivation":"\"for their discovery of fullerenes\"","affiliations":[{"name":"University of Sussex","city":"Brighton","country":"United Kingdom"}]}]},{"id":"286","firstname":"Richard E.","surname":"Smalley","born":"1943-06-06","died":"2005-10-28","bornCountry":"USA","bornCountryCode":"US","bornCity":"Akron, OH","diedCountry":"USA","diedCountryCode":"US","diedCity":"Houston, TX","gender":"male","prizes":[{"year":"1996","category":"chemistry","share":"3","motivation":"\"for their discovery of fullerenes\"","affiliations":[{"name":"Rice University","city":"Houston, TX","country":"USA"}]}]},{"id":"287","firstname":"Paul D.","surname":"Boyer","born":"1918-07-31","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Provo, UT","gender":"male","prizes":[{"year":"1997","category":"chemistry","share":"4","motivation":"\"for their elucidation of the enzymatic mechanism underlying the synthesis of adenosine triphosphate (ATP)\"","affiliations":[{"name":"University of California","city":"Los Angeles, CA","country":"USA"}]}]},{"id":"288","firstname":"John E.","surname":"Walker","born":"1941-01-07","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Halifax","gender":"male","prizes":[{"year":"1997","category":"chemistry","share":"4","motivation":"\"for their elucidation of the enzymatic mechanism underlying the synthesis of adenosine triphosphate (ATP)\"","affiliations":[{"name":"MRC Laboratory of Molecular Biology","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"289","firstname":"Jens C.","surname":"Skou","born":"1918-10-08","died":"0000-00-00","bornCountry":"Denmark","bornCountryCode":"DK","bornCity":"Lemvig","gender":"male","prizes":[{"year":"1997","category":"chemistry","share":"2","motivation":"\"for the first discovery of an ion-transporting enzyme, Na+, K+ -ATPase\"","affiliations":[{"name":"Aarhus University","city":"Aarhus","country":"Denmark"}]}]},{"id":"290","firstname":"Walter","surname":"Kohn","born":"1923-03-09","died":"2016-04-19","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"USA","diedCountryCode":"US","diedCity":"Santa Barbara, CA","gender":"male","prizes":[{"year":"1998","category":"chemistry","share":"2","motivation":"\"for his development of the density-functional theory\"","affiliations":[{"name":"University of California","city":"Santa Barbara, CA","country":"USA"}]}]},{"id":"291","firstname":"John A.","surname":"Pople","born":"1925-10-31","died":"2004-03-15","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Burnham-on-Sea","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chicago, IL","gender":"male","prizes":[{"year":"1998","category":"chemistry","share":"2","motivation":"\"for his development of computational methods in quantum chemistry\"","affiliations":[{"name":"Northwestern University","city":"Evanston, IL","country":"USA"}]}]},{"id":"292","firstname":"Ahmed H.","surname":"Zewail","born":"1946-02-26","died":"2016-08-02","bornCountry":"Egypt","bornCountryCode":"EG","bornCity":"Damanhur","gender":"male","prizes":[{"year":"1999","category":"chemistry","share":"1","motivation":"\"for his studies of the transition states of chemical reactions using femtosecond spectroscopy\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"293","firstname":"Emil Adolf","surname":"von Behring","born":"1854-03-15","died":"1917-03-31","bornCountry":"Prussia (now Poland)","bornCountryCode":"PL","bornCity":"Hansdorf (now Lawice)","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Marburg","gender":"male","prizes":[{"year":"1901","category":"medicine","share":"1","motivation":"\"for his work on serum therapy, especially its application against diphtheria, by which he has opened a new road in the domain of medical science and thereby placed in the hands of the physician a victorious weapon against illness and deaths\"","affiliations":[{"name":"Marburg University","city":"Marburg","country":"Germany"}]}]},{"id":"294","firstname":"Ronald","surname":"Ross","born":"1857-05-13","died":"1932-09-16","bornCountry":"India","bornCountryCode":"IN","bornCity":"Almora","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Putney Heath","gender":"male","prizes":[{"year":"1902","category":"medicine","share":"1","motivation":"\"for his work on malaria, by which he has shown how it enters the organism and thereby has laid the foundation for successful research on this disease and methods of combating it\"","affiliations":[{"name":"University College","city":"Liverpool","country":"United Kingdom"}]}]},{"id":"295","firstname":"Niels Ryberg","surname":"Finsen","born":"1860-12-15","died":"1904-09-24","bornCountry":"Faroe Islands (Denmark)","bornCountryCode":"DK","bornCity":"Thorshavn","diedCountry":"Denmark","diedCountryCode":"DK","diedCity":"Copenhagen","gender":"male","prizes":[{"year":"1903","category":"medicine","share":"1","motivation":"\"in recognition of his contribution to the treatment of diseases, especially lupus vulgaris, with concentrated light radiation, whereby he has opened a new avenue for medical science\"","affiliations":[{"name":"Finsen Medical Light Institute","city":"Copenhagen","country":"Denmark"}]}]},{"id":"296","firstname":"Ivan Petrovich","surname":"Pavlov","born":"1849-09-14","died":"1936-02-27","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Ryazan","diedCountry":"Russia","diedCountryCode":"RU","diedCity":"Leningrad","gender":"male","prizes":[{"year":"1904","category":"medicine","share":"1","motivation":"\"in recognition of his work on the physiology of digestion, through which knowledge on vital aspects of the subject has been transformed and enlarged\"","affiliations":[{"name":"Military Medical Academy","city":"St. Petersburg","country":"Russia"}]}]},{"id":"297","firstname":"Robert","surname":"Koch","born":"1843-12-11","died":"1910-05-27","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Clausthal (now Clausthal-Zellerfeld)","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Baden-Baden","gender":"male","prizes":[{"year":"1905","category":"medicine","share":"1","motivation":"\"for his investigations and discoveries in relation to tuberculosis\"","affiliations":[{"name":"Institute for Infectious Diseases","city":"Berlin","country":"Germany"}]}]},{"id":"298","firstname":"Camillo","surname":"Golgi","born":"1843-07-07","died":"1926-01-21","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Corteno","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Pavia","gender":"male","prizes":[{"year":"1906","category":"medicine","share":"2","motivation":"\"in recognition of their work on the structure of the nervous system\"","affiliations":[{"name":"Pavia University","city":"Pavia","country":"Italy"}]}]},{"id":"299","firstname":"Santiago","surname":"Ramón y Cajal","born":"1852-05-01","died":"1934-10-17","bornCountry":"Spain","bornCountryCode":"ES","bornCity":"Petilla de Aragó","diedCountry":"Spain","diedCountryCode":"ES","diedCity":"Madrid","gender":"male","prizes":[{"year":"1906","category":"medicine","share":"2","motivation":"\"in recognition of their work on the structure of the nervous system\"","affiliations":[{"name":"Madrid University","city":"Madrid","country":"Spain"}]}]},{"id":"300","firstname":"Charles Louis Alphonse","surname":"Laveran","born":"1845-06-18","died":"1922-05-18","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1907","category":"medicine","share":"1","motivation":"\"in recognition of his work on the role played by protozoa in causing diseases\"","affiliations":[{"name":"Institut Pasteur","city":"Paris","country":"France"}]}]},{"id":"301","firstname":"Ilya Ilyich","surname":"Mechnikov","born":"1845-05-15","died":"1916-07-15","bornCountry":"Russian Empire (now Ukraine)","bornCountryCode":"UA","bornCity":"Kharkov (now Kharkiv)","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1908","category":"medicine","share":"2","motivation":"\"in recognition of their work on immunity\"","affiliations":[{"name":"Institut Pasteur","city":"Paris","country":"France"}]}]},{"id":"302","firstname":"Paul","surname":"Ehrlich","born":"1854-03-14","died":"1915-08-20","bornCountry":"Prussia (now Poland)","bornCountryCode":"PL","bornCity":"Strehlen (now Strzelin)","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Bad Homburg vor der Höhe","gender":"male","prizes":[{"year":"1908","category":"medicine","share":"2","motivation":"\"in recognition of their work on immunity\"","affiliations":[{"name":"Goettingen University","city":"Göttingen","country":"Germany"},{"name":"Königliches Institut für experimentelle Therapie (Royal Institute for Experimental Therapy)","city":"Frankfurt-on-the-Main","country":"Germany"}]}]},{"id":"303","firstname":"Emil Theodor","surname":"Kocher","born":"1841-08-25","died":"1917-07-27","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Berne","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Berne","gender":"male","prizes":[{"year":"1909","category":"medicine","share":"1","motivation":"\"for his work on the physiology, pathology and surgery of the thyroid gland\"","affiliations":[{"name":"Berne University","city":"Berne","country":"Switzerland"}]}]},{"id":"304","firstname":"Albrecht","surname":"Kossel","born":"1853-09-16","died":"1927-07-05","bornCountry":"Mecklenburg (now Germany)","bornCountryCode":"DE","bornCity":"Rostock","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Heidelberg","gender":"male","prizes":[{"year":"1910","category":"medicine","share":"1","motivation":"\"in recognition of the contributions to our knowledge of cell chemistry made through his work on proteins, including the nucleic substances\"","affiliations":[{"name":"University of Heidelberg","city":"Heidelberg","country":"Germany"}]}]},{"id":"305","firstname":"Allvar","surname":"Gullstrand","born":"1862-06-05","died":"1930-07-28","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Landskrona","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1911","category":"medicine","share":"1","motivation":"\"for his work on the dioptrics of the eye\"","affiliations":[{"name":"Uppsala University","city":"Uppsala","country":"Sweden"}]}]},{"id":"306","firstname":"Alexis","surname":"Carrel","born":"1873-06-28","died":"1944-11-05","bornCountry":"France","bornCountryCode":"FR","bornCity":"Sainte-Foy-lès-Lyon","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1912","category":"medicine","share":"1","motivation":"\"in recognition of his work on vascular suture and the transplantation of blood vessels and organs\"","affiliations":[{"name":"Rockefeller Institute for Medical Research","city":"New York, NY","country":"USA"}]}]},{"id":"307","firstname":"Charles Robert","surname":"Richet","born":"1850-08-26","died":"1935-12-04","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1913","category":"medicine","share":"1","motivation":"\"in recognition of his work on anaphylaxis\"","affiliations":[{"name":"Sorbonne University","city":"Paris","country":"France"}]}]},{"id":"308","firstname":"Robert","surname":"Bárány","born":"1876-04-22","died":"1936-04-08","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Uppsala","gender":"male","prizes":[{"year":"1914","category":"medicine","share":"1","motivation":"\"for his work on the physiology and pathology of the vestibular apparatus\"","affiliations":[{"name":"Vienna University","city":"Vienna","country":"Austria"}]}]},{"id":"309","firstname":"Jules","surname":"Bordet","born":"1870-06-13","died":"1961-04-06","bornCountry":"Belgium","bornCountryCode":"BE","bornCity":"Soignies","diedCountry":"Belgium","diedCountryCode":"BE","diedCity":"Brussels","gender":"male","prizes":[{"year":"1919","category":"medicine","share":"1","motivation":"\"for his discoveries relating to immunity\"","affiliations":[{"name":"Brussels University","city":"Brussels","country":"Belgium"}]}]},{"id":"310","firstname":"Schack August Steenberg","surname":"Krogh","born":"1874-11-15","died":"1949-09-13","bornCountry":"Denmark","bornCountryCode":"DK","bornCity":"Grenå","diedCountry":"Denmark","diedCountryCode":"DK","diedCity":"Copenhagen","gender":"male","prizes":[{"year":"1920","category":"medicine","share":"1","motivation":"\"for his discovery of the capillary motor regulating mechanism\"","affiliations":[{"name":"Copenhagen University","city":"Copenhagen","country":"Denmark"}]}]},{"id":"311","firstname":"Archibald Vivian","surname":"Hill","born":"1886-09-26","died":"1977-06-03","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Bristol","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1922","category":"medicine","share":"2","motivation":"\"for his discovery relating to the production of heat in the muscle\"","affiliations":[{"name":"London University","city":"London","country":"United Kingdom"}]}]},{"id":"312","firstname":"Otto Fritz","surname":"Meyerhof","born":"1884-04-12","died":"1951-10-06","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Hanover","diedCountry":"USA","diedCountryCode":"US","diedCity":"Philadelphia, PA","gender":"male","prizes":[{"year":"1922","category":"medicine","share":"2","motivation":"\"for his discovery of the fixed relationship between the consumption of oxygen and the metabolism of lactic acid in the muscle\"","affiliations":[{"name":"Kiel University","city":"Kiel","country":"Germany"}]}]},{"id":"313","firstname":"Frederick Grant","surname":"Banting","born":"1891-11-14","died":"1941-02-21","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Alliston","diedCountry":"Canada","diedCountryCode":"CA","diedCity":"Newfoundland","gender":"male","prizes":[{"year":"1923","category":"medicine","share":"2","motivation":"\"for the discovery of insulin\"","affiliations":[{"name":"University of Toronto","city":"Toronto","country":"Canada"}]}]},{"id":"314","firstname":"John James Rickard","surname":"Macleod","born":"1876-09-06","died":"1935-03-16","bornCountry":"Scotland","bornCountryCode":"GB","bornCity":"Cluny","diedCountry":"Scotland","diedCountryCode":"GB","diedCity":"Aberdeen","gender":"male","prizes":[{"year":"1923","category":"medicine","share":"2","motivation":"\"for the discovery of insulin\"","affiliations":[{"name":"University of Toronto","city":"Toronto","country":"Canada"}]}]},{"id":"315","firstname":"Willem","surname":"Einthoven","born":"1860-05-21","died":"1927-09-29","bornCountry":"Java, Dutch East Indies (now Indonesia)","bornCountryCode":"ID","bornCity":"Semarang","diedCountry":"the Netherlands","diedCountryCode":"NL","diedCity":"Leiden","gender":"male","prizes":[{"year":"1924","category":"medicine","share":"1","motivation":"\"for his discovery of the mechanism of the electrocardiogram\"","affiliations":[{"name":"Leiden University","city":"Leiden","country":"the Netherlands"}]}]},{"id":"316","firstname":"Johannes Andreas Grib","surname":"Fibiger","born":"1867-04-23","died":"1928-01-30","bornCountry":"Denmark","bornCountryCode":"DK","bornCity":"Silkeborg","diedCountry":"Denmark","diedCountryCode":"DK","diedCity":"Copenhagen","gender":"male","prizes":[{"year":"1926","category":"medicine","share":"1","motivation":"\"for his discovery of the Spiroptera carcinoma\"","affiliations":[{"name":"Copenhagen University","city":"Copenhagen","country":"Denmark"}]}]},{"id":"317","firstname":"Julius","surname":"Wagner-Jauregg","born":"1857-03-07","died":"1940-09-27","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Wels","diedCountry":"Austria","diedCountryCode":"AT","diedCity":"Vienna","gender":"male","prizes":[{"year":"1927","category":"medicine","share":"1","motivation":"\"for his discovery of the therapeutic value of malaria inoculation in the treatment of dementia paralytica\"","affiliations":[{"name":"Vienna University","city":"Vienna","country":"Austria"}]}]},{"id":"318","firstname":"Charles Jules Henri","surname":"Nicolle","born":"1866-09-21","died":"1936-02-28","bornCountry":"France","bornCountryCode":"FR","bornCity":"Rouen","diedCountry":"Tunisia","diedCountryCode":"TN","diedCity":"Tunis","gender":"male","prizes":[{"year":"1928","category":"medicine","share":"1","motivation":"\"for his work on typhus\"","affiliations":[{"name":"Institut Pasteur","city":"Tunis"}]}]},{"id":"319","firstname":"Christiaan","surname":"Eijkman","born":"1858-08-11","died":"1930-11-05","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Nijkerk","diedCountry":"the Netherlands","diedCountryCode":"NL","diedCity":"Utrecht","gender":"male","prizes":[{"year":"1929","category":"medicine","share":"2","motivation":"\"for his discovery of the antineuritic vitamin\"","affiliations":[{"name":"Utrecht University","city":"Utrecht","country":"the Netherlands"}]}]},{"id":"320","firstname":"Sir Frederick Gowland","surname":"Hopkins","born":"1861-06-20","died":"1947-05-16","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Eastbourne","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1929","category":"medicine","share":"2","motivation":"\"for his discovery of the growth-stimulating vitamins\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"321","firstname":"Karl","surname":"Landsteiner","born":"1868-06-14","died":"1943-06-26","bornCountry":"Austrian Empire (now Austria)","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1930","category":"medicine","share":"1","motivation":"\"for his discovery of human blood groups\"","affiliations":[{"name":"Rockefeller Institute for Medical Research","city":"New York, NY","country":"USA"}]}]},{"id":"322","firstname":"Otto Heinrich","surname":"Warburg","born":"1883-10-08","died":"1970-08-01","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Freiburg im Breisgau","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"West Berlin","gender":"male","prizes":[{"year":"1931","category":"medicine","share":"1","motivation":"\"for his discovery of the nature and mode of action of the respiratory enzyme\"","affiliations":[{"name":"Kaiser-Wilhelm-Institut (now Max-Planck-Institut) für Biologie","city":"Berlin-Dahlem","country":"Germany"}]}]},{"id":"323","firstname":"Sir Charles Scott","surname":"Sherrington","born":"1857-11-27","died":"1952-03-04","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Eastbourne","gender":"male","prizes":[{"year":"1932","category":"medicine","share":"2","motivation":"\"for their discoveries regarding the functions of neurons\"","affiliations":[{"name":"University of Oxford","city":"Oxford","country":"United Kingdom"}]}]},{"id":"324","firstname":"Edgar Douglas","surname":"Adrian","born":"1889-11-30","died":"1977-08-08","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1932","category":"medicine","share":"2","motivation":"\"for their discoveries regarding the functions of neurons\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"325","firstname":"Thomas Hunt","surname":"Morgan","born":"1866-09-25","died":"1945-12-04","bornCountry":"USA","bornCountryCode":"US","bornCity":"Lexington, KY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Pasadena, CA","gender":"male","prizes":[{"year":"1933","category":"medicine","share":"1","motivation":"\"for his discoveries concerning the role played by the chromosome in heredity\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"326","firstname":"George Hoyt","surname":"Whipple","born":"1878-08-28","died":"1976-02-01","bornCountry":"USA","bornCountryCode":"US","bornCity":"Ashland, NH","diedCountry":"USA","diedCountryCode":"US","diedCity":"Rochester, NY","gender":"male","prizes":[{"year":"1934","category":"medicine","share":"3","motivation":"\"for their discoveries concerning liver therapy in cases of anaemia\"","affiliations":[{"name":"University of Rochester","city":"Rochester, NY","country":"USA"}]}]},{"id":"327","firstname":"George Richards","surname":"Minot","born":"1885-12-02","died":"1950-02-25","bornCountry":"USA","bornCountryCode":"US","bornCity":"Boston, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Brookline, MA","gender":"male","prizes":[{"year":"1934","category":"medicine","share":"3","motivation":"\"for their discoveries concerning liver therapy in cases of anaemia\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"328","firstname":"William Parry","surname":"Murphy","born":"1892-02-06","died":"1987-10-09","bornCountry":"USA","bornCountryCode":"US","bornCity":"Stoughton, WI","diedCountry":"USA","diedCountryCode":"US","diedCity":"Brookline, MA","gender":"male","prizes":[{"year":"1934","category":"medicine","share":"3","motivation":"\"for their discoveries concerning liver therapy in cases of anaemia\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"},{"name":"Peter Brent Brigham Hospital","city":"Boston, MA","country":"USA"}]}]},{"id":"329","firstname":"Hans","surname":"Spemann","born":"1869-06-27","died":"1941-09-12","bornCountry":"W&uuml;rttemberg (now Germany)","bornCountryCode":"DE","bornCity":"Stuttgart","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Freiburg im Breisgau","gender":"male","prizes":[{"year":"1935","category":"medicine","share":"1","motivation":"\"for his discovery of the organizer effect in embryonic development\"","affiliations":[{"name":"University of Freiburg im Breisgau","city":"Breisgau","country":"Germany"}]}]},{"id":"330","firstname":"Sir Henry Hallett","surname":"Dale","born":"1875-06-09","died":"1968-07-23","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1936","category":"medicine","share":"2","motivation":"\"for their discoveries relating to chemical transmission of nerve impulses\"","affiliations":[{"name":"National Institute for Medical Research","city":"London","country":"United Kingdom"}]}]},{"id":"331","firstname":"Otto","surname":"Loewi","born":"1873-06-03","died":"1961-12-25","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Frankfurt-on-the-Main","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1936","category":"medicine","share":"2","motivation":"\"for their discoveries relating to chemical transmission of nerve impulses\"","affiliations":[{"name":"Graz University","city":"Graz","country":"Austria"}]}]},{"id":"332","firstname":"Albert","surname":"von Szent-Györgyi Nagyrápolt","born":"1893-09-16","died":"1986-10-22","bornCountry":"Austria-Hungary (now Hungary)","bornCountryCode":"HU","bornCity":"Budapest","diedCountry":"USA","diedCountryCode":"US","diedCity":"Woods Hole, MA","gender":"male","prizes":[{"year":"1937","category":"medicine","share":"1","motivation":"\"for his discoveries in connection with the biological combustion processes, with special reference to vitamin C and the catalysis of fumaric acid\"","affiliations":[{"name":"Szeged University","city":"Szeged","country":"Hungary"}]}]},{"id":"333","firstname":"Corneille Jean François","surname":"Heymans","born":"1892-03-28","died":"1968-07-18","bornCountry":"Belgium","bornCountryCode":"BE","bornCity":"Ghent","diedCountry":"Belgium","diedCountryCode":"BE","diedCity":"Knokke","gender":"male","prizes":[{"year":"1938","category":"medicine","share":"1","motivation":"\"for the discovery of the role played by the sinus and aortic mechanisms in the regulation of respiration\"","affiliations":[{"name":"Ghent University","city":"Ghent","country":"Belgium"}]}]},{"id":"334","firstname":"Gerhard","surname":"Domagk","born":"1895-10-30","died":"1964-04-24","bornCountry":"Germany (now Poland)","bornCountryCode":"PL","bornCity":"Lagow","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Burgberg","gender":"male","prizes":[{"year":"1939","category":"medicine","share":"1","motivation":"\"for the discovery of the antibacterial effects of prontosil\"","affiliations":[{"name":"Munster University","city":"Munster","country":"Germany"}]}]},{"id":"335","firstname":"Henrik Carl Peter","surname":"Dam","born":"1895-02-21","died":"1976-04-17","bornCountry":"Denmark","bornCountryCode":"DK","bornCity":"Copenhagen","diedCountry":"Denmark","diedCountryCode":"DK","diedCity":"Copenhagen","gender":"male","prizes":[{"year":"1943","category":"medicine","share":"2","motivation":"\"for his discovery of vitamin K\"","affiliations":[{"name":"Polytechnic Institute","city":"Copenhagen","country":"Denmark"}]}]},{"id":"336","firstname":"Edward Adelbert","surname":"Doisy","born":"1893-11-13","died":"1986-10-23","bornCountry":"USA","bornCountryCode":"US","bornCity":"Hume, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"St. Louis, MO","gender":"male","prizes":[{"year":"1943","category":"medicine","share":"2","motivation":"\"for his discovery of the chemical nature of vitamin K\"","affiliations":[{"name":"Saint Louis University","city":"St. Louis, MO","country":"USA"}]}]},{"id":"337","firstname":"Joseph","surname":"Erlanger","born":"1874-01-05","died":"1965-12-05","bornCountry":"USA","bornCountryCode":"US","bornCity":"San Francisco, CA","diedCountry":"USA","diedCountryCode":"US","diedCity":"St. Louis, MO","gender":"male","prizes":[{"year":"1944","category":"medicine","share":"2","motivation":"\"for their discoveries relating to the highly differentiated functions of single nerve fibres\"","affiliations":[{"name":"Washington University","city":"St. Louis, MO","country":"USA"}]}]},{"id":"338","firstname":"Herbert Spencer","surname":"Gasser","born":"1888-07-05","died":"1963-05-11","bornCountry":"USA","bornCountryCode":"US","bornCity":"Platteville, WI","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1944","category":"medicine","share":"2","motivation":"\"for their discoveries relating to the highly differentiated functions of single nerve fibres\"","affiliations":[{"name":"Rockefeller Institute for Medical Research","city":"New York, NY","country":"USA"}]}]},{"id":"339","firstname":"Sir Alexander","surname":"Fleming","born":"1881-08-06","died":"1955-03-11","bornCountry":"Scotland","bornCountryCode":"GB","bornCity":"Lochfield","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1945","category":"medicine","share":"3","motivation":"\"for the discovery of penicillin and its curative effect in various infectious diseases\"","affiliations":[{"name":"London University","city":"London","country":"United Kingdom"}]}]},{"id":"340","firstname":"Ernst Boris","surname":"Chain","born":"1906-06-19","died":"1979-08-12","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Berlin","diedCountry":"Ireland","diedCountryCode":"IE","diedCity":"Mulrany","gender":"male","prizes":[{"year":"1945","category":"medicine","share":"3","motivation":"\"for the discovery of penicillin and its curative effect in various infectious diseases\"","affiliations":[{"name":"University of Oxford","city":"Oxford","country":"United Kingdom"}]}]},{"id":"341","firstname":"Sir Howard Walter","surname":"Florey","born":"1898-09-24","died":"1968-02-21","bornCountry":"Australia","bornCountryCode":"AU","bornCity":"Adelaide","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Oxford","gender":"male","prizes":[{"year":"1945","category":"medicine","share":"3","motivation":"\"for the discovery of penicillin and its curative effect in various infectious diseases\"","affiliations":[{"name":"University of Oxford","city":"Oxford","country":"United Kingdom"}]}]},{"id":"342","firstname":"Hermann Joseph","surname":"Muller","born":"1890-12-21","died":"1967-04-05","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1946","category":"medicine","share":"1","motivation":"\"for the discovery of the production of mutations by means of X-ray irradiation\"","affiliations":[{"name":"Indiana University","city":"Bloomington, IN","country":"USA"}]}]},{"id":"343","firstname":"Carl Ferdinand","surname":"Cori","born":"1896-12-05","died":"1984-10-20","bornCountry":"Austria-Hungary (now Czech Republic)","bornCountryCode":"CZ","bornCity":"Prague","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cambridge, MA","gender":"male","prizes":[{"year":"1947","category":"medicine","share":"4","motivation":"\"for their discovery of the course of the catalytic conversion of glycogen\"","affiliations":[{"name":"Washington University","city":"St. Louis, MO","country":"USA"}]}]},{"id":"344","firstname":"Gerty Theresa","surname":"Cori, née Radnitz","born":"1896-08-15","died":"1957-10-26","bornCountry":"Austria-Hungary (now Czech Republic)","bornCountryCode":"CZ","bornCity":"Prague","diedCountry":"USA","diedCountryCode":"US","diedCity":"St. Louis, MO","gender":"female","prizes":[{"year":"1947","category":"medicine","share":"4","motivation":"\"for their discovery of the course of the catalytic conversion of glycogen\"","affiliations":[{"name":"Washington University","city":"St. Louis, MO","country":"USA"}]}]},{"id":"345","firstname":"Bernardo Alberto","surname":"Houssay","born":"1887-04-10","died":"1971-09-21","bornCountry":"Argentina","bornCountryCode":"AR","bornCity":"Buenos Aires","diedCountry":"Argentina","diedCountryCode":"AR","diedCity":"Buenos Aires","gender":"male","prizes":[{"year":"1947","category":"medicine","share":"2","motivation":"\"for his discovery of the part played by the hormone of the anterior pituitary lobe in the metabolism of sugar\"","affiliations":[{"name":"Instituto de Biologia y Medicina Experimental (Institute for Biology and Experimental Medicine)","city":"Buenos Aires","country":"Argentina"}]}]},{"id":"346","firstname":"Paul Hermann","surname":"Müller","born":"1899-01-12","died":"1965-10-12","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Olten","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Basel","gender":"male","prizes":[{"year":"1948","category":"medicine","share":"1","motivation":"\"for his discovery of the high efficiency of DDT as a contact poison against several arthropods\"","affiliations":[{"name":"Laboratorium der Farben-Fabriken J.R. Geigy A.G. (Laboratory of the J.R. Geigy Dye-Factory Co.)","city":"Basel","country":"Switzerland"}]}]},{"id":"347","firstname":"Walter Rudolf","surname":"Hess","born":"1881-03-17","died":"1973-08-12","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Frauenfeld","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Ascona","gender":"male","prizes":[{"year":"1949","category":"medicine","share":"2","motivation":"\"for his discovery of the functional organization of the interbrain as a coordinator of the activities of the internal organs\"","affiliations":[{"name":"University of Zurich","city":"Zurich","country":"Switzerland"}]}]},{"id":"348","firstname":"Antonio Caetano de Abreu Freire Egas","surname":"Moniz","born":"1874-11-29","died":"1955-12-13","bornCountry":"Portugal","bornCountryCode":"PT","bornCity":"Avanca","diedCountry":"Portugal","diedCountryCode":"PT","diedCity":"Lisbon","gender":"male","prizes":[{"year":"1949","category":"medicine","share":"2","motivation":"\"for his discovery of the therapeutic value of leucotomy in certain psychoses\"","affiliations":[{"name":"University of Lisbon","city":"Lisbon","country":"Portugal"},{"name":"Neurological Institute","city":"Lisbon","country":"Portugal"}]}]},{"id":"349","firstname":"Edward Calvin","surname":"Kendall","born":"1886-03-08","died":"1972-05-04","bornCountry":"USA","bornCountryCode":"US","bornCity":"South Norwalk, CT","diedCountry":"USA","diedCountryCode":"US","diedCity":"Princeton, NJ","gender":"male","prizes":[{"year":"1950","category":"medicine","share":"3","motivation":"\"for their discoveries relating to the hormones of the adrenal cortex, their structure and biological effects\"","affiliations":[{"name":"Mayo Clinic","city":"Rochester, MN","country":"USA"}]}]},{"id":"350","firstname":"Tadeus","surname":"Reichstein","born":"1897-07-20","died":"1996-08-01","bornCountry":"Poland","bornCountryCode":"PL","bornCity":"Wloclawek","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Basel","gender":"male","prizes":[{"year":"1950","category":"medicine","share":"3","motivation":"\"for their discoveries relating to the hormones of the adrenal cortex, their structure and biological effects\"","affiliations":[{"name":"Basel University","city":"Basel","country":"Switzerland"}]}]},{"id":"351","firstname":"Philip Showalter","surname":"Hench","born":"1896-02-28","died":"1965-03-30","bornCountry":"USA","bornCountryCode":"US","bornCity":"Pittsburgh, PA","diedCountry":"Jamaica","diedCountryCode":"JM","diedCity":"Ocho Rios","gender":"male","prizes":[{"year":"1950","category":"medicine","share":"3","motivation":"\"for their discoveries relating to the hormones of the adrenal cortex, their structure and biological effects\"","affiliations":[{"name":"Mayo Clinic","city":"Rochester, MN","country":"USA"}]}]},{"id":"352","firstname":"Max","surname":"Theiler","born":"1899-01-30","died":"1972-08-11","bornCountry":"South Africa","bornCountryCode":"ZA","bornCity":"Pretoria","diedCountry":"USA","diedCountryCode":"US","diedCity":"New Haven, CT","gender":"male","prizes":[{"year":"1951","category":"medicine","share":"1","motivation":"\"for his discoveries concerning yellow fever and how to combat it\"","affiliations":[{"name":"Laboratories of the Division of Medicine and Public Health, Rockefeller Foundation","city":"New York, NY","country":"USA"}]}]},{"id":"353","firstname":"Selman Abraham","surname":"Waksman","born":"1888-07-22","died":"1973-08-16","bornCountry":"Russian Empire (now Ukraine)","bornCountryCode":"UA","bornCity":"Priluka (now Nova Pryluka)","diedCountry":"USA","diedCountryCode":"US","diedCity":"Hyannis, MA","gender":"male","prizes":[{"year":"1952","category":"medicine","share":"1","motivation":"\"for his discovery of streptomycin, the first antibiotic effective against tuberculosis\"","affiliations":[{"name":"Rutgers University","city":"New Brunswick, NJ","country":"USA"}]}]},{"id":"354","firstname":"Hans Adolf","surname":"Krebs","born":"1900-08-25","died":"1981-11-22","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Hildesheim","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Oxford","gender":"male","prizes":[{"year":"1953","category":"medicine","share":"2","motivation":"\"for his discovery of the citric acid cycle\"","affiliations":[{"name":"Sheffield University","city":"Sheffield","country":"United Kingdom"}]}]},{"id":"355","firstname":"Fritz Albert","surname":"Lipmann","born":"1899-06-12","died":"1986-07-24","bornCountry":"Germany (now Russia)","bornCountryCode":"RU","bornCity":"Koenigsberg (now Kaliningrad)","diedCountry":"USA","diedCountryCode":"US","diedCity":"Poughkeepsie, NY","gender":"male","prizes":[{"year":"1953","category":"medicine","share":"2","motivation":"\"for his discovery of co-enzyme A and its importance for intermediary metabolism\"","affiliations":[{"name":"Harvard Medical School","city":"Boston, MA","country":"USA"},{"name":"Massachusetts General Hospital","city":"Boston, MA","country":"USA"}]}]},{"id":"356","firstname":"John Franklin","surname":"Enders","born":"1897-02-10","died":"1985-09-08","bornCountry":"USA","bornCountryCode":"US","bornCity":"West Hartford, CT","diedCountry":"USA","diedCountryCode":"US","diedCity":"Waterford, CT","gender":"male","prizes":[{"year":"1954","category":"medicine","share":"3","motivation":"\"for their discovery of the ability of poliomyelitis viruses to grow in cultures of various types of tissue\"","affiliations":[{"name":"Harvard Medical School","city":"Boston, MA","country":"USA"},{"name":"Research Division of Infectious Diseases, Children's Medical Center","city":"Boston, MA","country":"USA"}]}]},{"id":"357","firstname":"Thomas Huckle","surname":"Weller","born":"1915-06-15","died":"2008-08-23","bornCountry":"USA","bornCountryCode":"US","bornCity":"Ann Arbor, MI","diedCountry":"USA","diedCountryCode":"US","diedCity":"Needham, MA","gender":"male","prizes":[{"year":"1954","category":"medicine","share":"3","motivation":"\"for their discovery of the ability of poliomyelitis viruses to grow in cultures of various types of tissue\"","affiliations":[{"name":"Research Division of Infectious Diseases, Children's Medical Center","city":"Boston, MA","country":"USA"}]}]},{"id":"358","firstname":"Frederick Chapman","surname":"Robbins","born":"1916-08-25","died":"2003-08-04","bornCountry":"USA","bornCountryCode":"US","bornCity":"Auburn, AL","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cleveland, OH","gender":"male","prizes":[{"year":"1954","category":"medicine","share":"3","motivation":"\"for their discovery of the ability of poliomyelitis viruses to grow in cultures of various types of tissue\"","affiliations":[{"name":"Western Reserve University","city":"Cleveland, OH","country":"USA"}]}]},{"id":"359","firstname":"Axel Hugo Theodor","surname":"Theorell","born":"1903-07-06","died":"1982-08-15","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Linköping","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1955","category":"medicine","share":"1","motivation":"\"for his discoveries concerning the nature and mode of action of oxidation enzymes\"","affiliations":[{"name":"Karolinska Institutet, Nobel Medical Institute","city":"Stockholm","country":"Sweden"}]}]},{"id":"360","firstname":"André Frédéric","surname":"Cournand","born":"1895-09-24","died":"1988-02-19","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"USA","diedCountryCode":"US","diedCity":"Great Barrington, MA","gender":"male","prizes":[{"year":"1956","category":"medicine","share":"3","motivation":"\"for their discoveries concerning heart catheterization and pathological changes in the circulatory system\"","affiliations":[{"name":"Columbia University Division, Cardio-Pulmonary Laboratory, Bellevue Hospital","city":"New York, NY","country":"USA"}]}]},{"id":"361","firstname":"Werner","surname":"Forssmann","born":"1904-08-29","died":"1979-06-01","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Berlin","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Schopfheim","gender":"male","prizes":[{"year":"1956","category":"medicine","share":"3","motivation":"\"for their discoveries concerning heart catheterization and pathological changes in the circulatory system\"","affiliations":[{"name":"Mainz University","city":"Mainz","country":"Federal Republic of Germany"},{"city":"Bad Kreuznach","country":"Federal Republic of Germany"}]}]},{"id":"362","firstname":"Dickinson W.","surname":"Richards","born":"1895-10-30","died":"1973-02-23","bornCountry":"USA","bornCountryCode":"US","bornCity":"Orange, NJ","diedCountry":"USA","diedCountryCode":"US","diedCity":"Lakeville, CT","gender":"male","prizes":[{"year":"1956","category":"medicine","share":"3","motivation":"\"for their discoveries concerning heart catheterization and pathological changes in the circulatory system\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"363","firstname":"Daniel","surname":"Bovet","born":"1907-03-23","died":"1992-04-08","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Neuchâtel","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Rome","gender":"male","prizes":[{"year":"1957","category":"medicine","share":"1","motivation":"\"for his discoveries relating to synthetic compounds that inhibit the action of certain body substances, and especially their action on the vascular system and the skeletal muscles\"","affiliations":[{"name":"Istituto Superiore di Sanità (Chief Institute of Public Health)","city":"Rome","country":"Italy"}]}]},{"id":"364","firstname":"George Wells","surname":"Beadle","born":"1903-10-22","died":"1989-06-09","bornCountry":"USA","bornCountryCode":"US","bornCity":"Wahoo, NE","diedCountry":"USA","diedCountryCode":"US","diedCity":"Pomona, CA","gender":"male","prizes":[{"year":"1958","category":"medicine","share":"4","motivation":"\"for their discovery that genes act by regulating definite chemical events\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"365","firstname":"Edward Lawrie","surname":"Tatum","born":"1909-12-14","died":"1975-11-05","bornCountry":"USA","bornCountryCode":"US","bornCity":"Boulder, CO","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1958","category":"medicine","share":"4","motivation":"\"for their discovery that genes act by regulating definite chemical events\"","affiliations":[{"name":"Rockefeller Institute for Medical Research","city":"New York, NY","country":"USA"}]}]},{"id":"366","firstname":"Joshua","surname":"Lederberg","born":"1925-05-23","died":"2008-02-02","bornCountry":"USA","bornCountryCode":"US","bornCity":"Montclair, NJ","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1958","category":"medicine","share":"2","motivation":"\"for his discoveries concerning genetic recombination and the organization of the genetic material of bacteria\"","affiliations":[{"name":"University of Wisconsin","city":"Madison, WI","country":"USA"}]}]},{"id":"367","firstname":"Severo","surname":"Ochoa","born":"1905-09-24","died":"1993-11-01","bornCountry":"Spain","bornCountryCode":"ES","bornCity":"Luarca","diedCountry":"Spain","diedCountryCode":"ES","diedCity":"Madrid","gender":"male","prizes":[{"year":"1959","category":"medicine","share":"2","motivation":"\"for their discovery of the mechanisms in the biological synthesis of ribonucleic acid and deoxyribonucleic acid\"","affiliations":[{"name":"New York University, College of Medicine","city":"New York, NY","country":"USA"}]}]},{"id":"368","firstname":"Arthur","surname":"Kornberg","born":"1918-03-03","died":"2007-10-26","bornCountry":"USA","bornCountryCode":"US","bornCity":"Brooklyn, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Stanford, CA","gender":"male","prizes":[{"year":"1959","category":"medicine","share":"2","motivation":"\"for their discovery of the mechanisms in the biological synthesis of ribonucleic acid and deoxyribonucleic acid\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"369","firstname":"Sir Frank Macfarlane","surname":"Burnet","born":"1899-09-03","died":"1985-08-31","bornCountry":"Australia","bornCountryCode":"AU","bornCity":"Traralgon","diedCountry":"Australia","diedCountryCode":"AU","diedCity":"Melbourne","gender":"male","prizes":[{"year":"1960","category":"medicine","share":"2","motivation":"\"for discovery of acquired immunological tolerance\"","affiliations":[{"name":"Walter and Eliza Hall Institute for Medical Research","city":"Melbourne","country":"Australia"}]}]},{"id":"370","firstname":"Peter Brian","surname":"Medawar","born":"1915-02-28","died":"1987-10-02","bornCountry":"Brazil","bornCountryCode":"BR","bornCity":"Rio de Janeiro","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1960","category":"medicine","share":"2","motivation":"\"for discovery of acquired immunological tolerance\"","affiliations":[{"name":"University College","city":"London","country":"United Kingdom"}]}]},{"id":"371","firstname":"Georg","surname":"von Békésy","born":"1899-06-03","died":"1972-06-13","bornCountry":"Hungary","bornCountryCode":"HU","bornCity":"Budapest","diedCountry":"USA","diedCountryCode":"US","diedCity":"Honolulu, HI","gender":"male","prizes":[{"year":"1961","category":"medicine","share":"1","motivation":"\"for his discoveries of the physical mechanism of stimulation within the cochlea\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"372","firstname":"Francis Harry Compton","surname":"Crick","born":"1916-06-08","died":"2004-07-28","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Northampton","diedCountry":"USA","diedCountryCode":"US","diedCity":"San Diego, CA","gender":"male","prizes":[{"year":"1962","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the molecular structure of nucleic acids and its significance for information transfer in living material\"","affiliations":[{"name":"MRC Laboratory of Molecular Biology","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"373","firstname":"James Dewey","surname":"Watson","born":"1928-04-06","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","gender":"male","prizes":[{"year":"1962","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the molecular structure of nucleic acids and its significance for information transfer in living material\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"374","firstname":"Maurice Hugh Frederick","surname":"Wilkins","born":"1916-12-15","died":"2004-10-05","bornCountry":"New Zealand","bornCountryCode":"NZ","bornCity":"Pongaroa","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1962","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the molecular structure of nucleic acids and its significance for information transfer in living material\"","affiliations":[{"name":"London University","city":"London","country":"United Kingdom"}]}]},{"id":"375","firstname":"Sir John Carew","surname":"Eccles","born":"1903-01-27","died":"1997-05-02","bornCountry":"Australia","bornCountryCode":"AU","bornCity":"Melbourne","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Contra","gender":"male","prizes":[{"year":"1963","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the ionic mechanisms involved in excitation and inhibition in the peripheral and central portions of the nerve cell membrane\"","affiliations":[{"name":"Australian National University","city":"Canberra","country":"Australia"}]}]},{"id":"376","firstname":"Alan Lloyd","surname":"Hodgkin","born":"1914-02-05","died":"1998-12-20","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Banbury","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1963","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the ionic mechanisms involved in excitation and inhibition in the peripheral and central portions of the nerve cell membrane\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"377","firstname":"Andrew Fielding","surname":"Huxley","born":"1917-11-22","died":"2012-05-30","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Hampstead","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Grantchester","gender":"male","prizes":[{"year":"1963","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the ionic mechanisms involved in excitation and inhibition in the peripheral and central portions of the nerve cell membrane\"","affiliations":[{"name":"University College","city":"London","country":"United Kingdom"}]}]},{"id":"378","firstname":"Konrad","surname":"Bloch","born":"1912-01-21","died":"2000-10-15","bornCountry":"Germany (now Poland)","bornCountryCode":"PL","bornCity":"Neisse (now Nysa)","diedCountry":"USA","diedCountryCode":"US","diedCity":"Burlington, MA","gender":"male","prizes":[{"year":"1964","category":"medicine","share":"2","motivation":"\"for their discoveries concerning the mechanism and regulation of the cholesterol and fatty acid metabolism\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"379","firstname":"Feodor","surname":"Lynen","born":"1911-04-06","died":"1979-08-06","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Munich","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Munich","gender":"male","prizes":[{"year":"1964","category":"medicine","share":"2","motivation":"\"for their discoveries concerning the mechanism and regulation of the cholesterol and fatty acid metabolism\"","affiliations":[{"name":"Max-Planck-Institut für Zellchemie","city":"Munich","country":"Federal Republic of Germany"}]}]},{"id":"380","firstname":"François","surname":"Jacob","born":"1920-06-17","died":"2013-04-19","bornCountry":"France","bornCountryCode":"FR","bornCity":"Nancy","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1965","category":"medicine","share":"3","motivation":"\"for their discoveries concerning genetic control of enzyme and virus synthesis\"","affiliations":[{"name":"Institut Pasteur","city":"Paris","country":"France"}]}]},{"id":"381","firstname":"André","surname":"Lwoff","born":"1902-05-08","died":"1994-09-30","bornCountry":"France","bornCountryCode":"FR","bornCity":"Ainay-le-Château","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1965","category":"medicine","share":"3","motivation":"\"for their discoveries concerning genetic control of enzyme and virus synthesis\"","affiliations":[{"name":"Institut Pasteur","city":"Paris","country":"France"}]}]},{"id":"382","firstname":"Jacques","surname":"Monod","born":"1910-02-09","died":"1976-05-31","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Cannes","gender":"male","prizes":[{"year":"1965","category":"medicine","share":"3","motivation":"\"for their discoveries concerning genetic control of enzyme and virus synthesis\"","affiliations":[{"name":"Institut Pasteur","city":"Paris","country":"France"}]}]},{"id":"383","firstname":"Peyton","surname":"Rous","born":"1879-10-05","died":"1972-02-16","bornCountry":"USA","bornCountryCode":"US","bornCity":"Baltimore, MD","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1966","category":"medicine","share":"2","motivation":"\"for his discovery of tumour-inducing viruses\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"}]}]},{"id":"384","firstname":"Charles Brenton","surname":"Huggins","born":"1901-09-22","died":"1997-01-12","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Halifax","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chicago, IL","gender":"male","prizes":[{"year":"1966","category":"medicine","share":"2","motivation":"\"for his discoveries concerning hormonal treatment of prostatic cancer\"","affiliations":[{"name":"University of Chicago, Ben May Laboratory for Cancer Research","city":"Chicago, IL","country":"USA"}]}]},{"id":"385","firstname":"Ragnar","surname":"Granit","born":"1900-10-30","died":"1991-03-12","bornCountry":"Russian Empire (now Finland)","bornCountryCode":"FI","bornCity":"Helsinki","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1967","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the primary physiological and chemical visual processes in the eye\"","affiliations":[{"name":"Karolinska Institutet","city":"Stockholm","country":"Sweden"}]}]},{"id":"386","firstname":"Haldan Keffer","surname":"Hartline","born":"1903-12-22","died":"1983-03-17","bornCountry":"USA","bornCountryCode":"US","bornCity":"Bloomsburg, PA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Fallston, MD","gender":"male","prizes":[{"year":"1967","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the primary physiological and chemical visual processes in the eye\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"}]}]},{"id":"387","firstname":"George","surname":"Wald","born":"1906-11-18","died":"1997-04-12","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cambridge, MA","gender":"male","prizes":[{"year":"1967","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the primary physiological and chemical visual processes in the eye\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"388","firstname":"Robert W.","surname":"Holley","born":"1922-01-28","died":"1993-02-11","bornCountry":"USA","bornCountryCode":"US","bornCity":"Urbana, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"Los Gatos, CA","gender":"male","prizes":[{"year":"1968","category":"medicine","share":"3","motivation":"\"for their interpretation of the genetic code and its function in protein synthesis\"","affiliations":[{"name":"Cornell University","city":"Ithaca, NY","country":"USA"}]}]},{"id":"389","firstname":"Har Gobind","surname":"Khorana","born":"1922-01-09","died":"2011-11-09","bornCountry":"India","bornCountryCode":"IN","bornCity":"Raipur","diedCountry":"USA","diedCountryCode":"US","diedCity":"Concord, MA","gender":"male","prizes":[{"year":"1968","category":"medicine","share":"3","motivation":"\"for their interpretation of the genetic code and its function in protein synthesis\"","affiliations":[{"name":"University of Wisconsin","city":"Madison, WI","country":"USA"}]}]},{"id":"390","firstname":"Marshall W.","surname":"Nirenberg","born":"1927-04-10","died":"2010-01-15","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1968","category":"medicine","share":"3","motivation":"\"for their interpretation of the genetic code and its function in protein synthesis\"","affiliations":[{"name":"National Institutes of Health","city":"Bethesda, MD","country":"USA"}]}]},{"id":"391","firstname":"Max","surname":"Delbrück","born":"1906-09-04","died":"1981-03-09","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Berlin","diedCountry":"USA","diedCountryCode":"US","diedCity":"Pasadena, CA","gender":"male","prizes":[{"year":"1969","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the replication mechanism and the genetic structure of viruses\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"392","firstname":"Alfred D.","surname":"Hershey","born":"1908-12-04","died":"1997-05-22","bornCountry":"USA","bornCountryCode":"US","bornCity":"Owosso, MI","diedCountry":"USA","diedCountryCode":"US","diedCity":"Syosset, NY","gender":"male","prizes":[{"year":"1969","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the replication mechanism and the genetic structure of viruses\"","affiliations":[{"name":"Carnegie Institution of Washington","city":"Long Island, New York, NY","country":"USA"}]}]},{"id":"393","firstname":"Salvador E.","surname":"Luria","born":"1912-08-13","died":"1991-02-06","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Torino","diedCountry":"USA","diedCountryCode":"US","diedCity":"Lexington, MA","gender":"male","prizes":[{"year":"1969","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the replication mechanism and the genetic structure of viruses\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"394","firstname":"Sir Bernard","surname":"Katz","born":"1911-03-26","died":"2003-04-20","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Leipzig","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1970","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the humoral transmittors in the nerve terminals and the mechanism for their storage, release and inactivation\"","affiliations":[{"name":"University College","city":"London","country":"United Kingdom"}]}]},{"id":"395","firstname":"Ulf","surname":"von Euler","born":"1905-02-07","died":"1983-03-09","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Stockholm","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1970","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the humoral transmittors in the nerve terminals and the mechanism for their storage, release and inactivation\"","affiliations":[{"name":"Karolinska Institutet","city":"Stockholm","country":"Sweden"}]}]},{"id":"396","firstname":"Julius","surname":"Axelrod","born":"1912-05-30","died":"2004-12-29","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Rockville, MD","gender":"male","prizes":[{"year":"1970","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the humoral transmittors in the nerve terminals and the mechanism for their storage, release and inactivation\"","affiliations":[{"name":"National Institutes of Health","city":"Bethesda, MD","country":"USA"}]}]},{"id":"397","firstname":"Earl W.","surname":"Sutherland, Jr.","born":"1915-11-19","died":"1974-03-09","bornCountry":"USA","bornCountryCode":"US","bornCity":"Burlingame, KS","diedCountry":"USA","diedCountryCode":"US","diedCity":"Miami, FL","gender":"male","prizes":[{"year":"1971","category":"medicine","share":"1","motivation":"\"for his discoveries concerning the mechanisms of the action of hormones\"","affiliations":[{"name":"Vanderbilt University","city":"Nashville, TN","country":"USA"}]}]},{"id":"398","firstname":"Gerald M.","surname":"Edelman","born":"1929-07-01","died":"2014-05-17","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"La Jolla, CA","gender":"male","prizes":[{"year":"1972","category":"medicine","share":"2","motivation":"\"for their discoveries concerning the chemical structure of antibodies\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"}]}]},{"id":"399","firstname":"Rodney R.","surname":"Porter","born":"1917-10-08","died":"1985-09-06","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Newton-le-Willows","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Winchester","gender":"male","prizes":[{"year":"1972","category":"medicine","share":"2","motivation":"\"for their discoveries concerning the chemical structure of antibodies\"","affiliations":[{"name":"University of Oxford","city":"Oxford","country":"United Kingdom"}]}]},{"id":"400","firstname":"Karl","surname":"von Frisch","born":"1886-11-20","died":"1982-06-12","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Munich","gender":"male","prizes":[{"year":"1973","category":"medicine","share":"3","motivation":"\"for their discoveries concerning organization and elicitation of individual and social behaviour patterns\"","affiliations":[{"name":"Zoologisches Institut der Universität München","city":"Munich","country":"Federal Republic of Germany"}]}]},{"id":"401","firstname":"Konrad","surname":"Lorenz","born":"1903-11-07","died":"1989-02-27","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"Austria","diedCountryCode":"AT","diedCity":"Vienna","gender":"male","prizes":[{"year":"1973","category":"medicine","share":"3","motivation":"\"for their discoveries concerning organization and elicitation of individual and social behaviour patterns\"","affiliations":[{"name":"Konrad-Lorenz-Institut der Österreichischen Akademie der Wissen­schaften, Forschungsstelle für Ethologie","city":"Altenberg; Grünau im Almtal","country":"Austria"}]}]},{"id":"402","firstname":"Nikolaas","surname":"Tinbergen","born":"1907-04-15","died":"1988-12-21","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"the Hague","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Oxford","gender":"male","prizes":[{"year":"1973","category":"medicine","share":"3","motivation":"\"for their discoveries concerning organization and elicitation of individual and social behaviour patterns\"","affiliations":[{"name":"University of Oxford","city":"Oxford","country":"United Kingdom"}]}]},{"id":"403","firstname":"Albert","surname":"Claude","born":"1898-08-24","died":"1983-05-22","bornCountry":"Belgium","bornCountryCode":"BE","bornCity":"Longlier","diedCountry":"Belgium","diedCountryCode":"BE","diedCity":"Brussels","gender":"male","prizes":[{"year":"1974","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the structural and functional organization of the cell\"","affiliations":[{"name":"Université Catholique de Louvain","city":"Louvain","country":"Belgium"}]}]},{"id":"404","firstname":"Christian","surname":"de Duve","born":"1917-10-02","died":"2013-05-04","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Thames Ditton","diedCountry":"Belgium","diedCountryCode":"BE","diedCity":"Nethen","gender":"male","prizes":[{"year":"1974","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the structural and functional organization of the cell\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"},{"name":"Université Catholique de Louvain","city":"Louvain","country":"Belgium"}]}]},{"id":"405","firstname":"George E.","surname":"Palade","born":"1912-11-19","died":"2008-10-07","bornCountry":"Romania","bornCountryCode":"RO","bornCity":"Iasi","diedCountry":"USA","diedCountryCode":"US","diedCity":"Del Mar, CA","gender":"male","prizes":[{"year":"1974","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the structural and functional organization of the cell\"","affiliations":[{"name":"Yale University, School of Medicine","city":"New Haven, CT","country":"USA"}]}]},{"id":"406","firstname":"David","surname":"Baltimore","born":"1938-03-07","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1975","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the interaction between tumour viruses and the genetic material of the cell\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"407","firstname":"Renato","surname":"Dulbecco","born":"1914-02-22","died":"2012-02-19","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Catanzaro","diedCountry":"USA","diedCountryCode":"US","diedCity":"La Jolla, CA","gender":"male","prizes":[{"year":"1975","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the interaction between tumour viruses and the genetic material of the cell\"","affiliations":[{"name":"Imperial Cancer Research Fund Laboratory","city":"London","country":"United Kingdom"}]}]},{"id":"408","firstname":"Howard Martin","surname":"Temin","born":"1934-12-10","died":"1994-02-09","bornCountry":"USA","bornCountryCode":"US","bornCity":"Philadelphia, PA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Madison, WI","gender":"male","prizes":[{"year":"1975","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the interaction between tumour viruses and the genetic material of the cell\"","affiliations":[{"name":"University of Wisconsin","city":"Madison, WI","country":"USA"}]}]},{"id":"409","firstname":"Baruch S.","surname":"Blumberg","born":"1925-07-28","died":"2011-04-05","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Moffett Field, CA","gender":"male","prizes":[{"year":"1976","category":"medicine","share":"2","motivation":"\"for their discoveries concerning new mechanisms for the origin and dissemination of infectious diseases\"","affiliations":[{"name":"The Institute for Cancer Research","city":"Philadelphia, PA","country":"USA"}]}]},{"id":"410","firstname":"D. Carleton","surname":"Gajdusek","born":"1923-09-09","died":"2008-12-12","bornCountry":"USA","bornCountryCode":"US","bornCity":"Yonkers, NY","diedCountry":"Norway","diedCountryCode":"NO","diedCity":"Tromsø","gender":"male","prizes":[{"year":"1976","category":"medicine","share":"2","motivation":"\"for their discoveries concerning new mechanisms for the origin and dissemination of infectious diseases\"","affiliations":[{"name":"National Institutes of Health","city":"Bethesda, MD","country":"USA"}]}]},{"id":"411","firstname":"Roger","surname":"Guillemin","born":"1924-01-11","died":"0000-00-00","bornCountry":"France","bornCountryCode":"FR","bornCity":"Dijon","gender":"male","prizes":[{"year":"1977","category":"medicine","share":"4","motivation":"\"for their discoveries concerning the peptide hormone production of the brain\"","affiliations":[{"name":"The Salk Institute","city":"San Diego, CA","country":"USA"}]}]},{"id":"412","firstname":"Andrew V.","surname":"Schally","born":"1926-11-30","died":"0000-00-00","bornCountry":"Poland (now Lithuania)","bornCountryCode":"LT","bornCity":"Wilno (now Vilnius)","gender":"male","prizes":[{"year":"1977","category":"medicine","share":"4","motivation":"\"for their discoveries concerning the peptide hormone production of the brain\"","affiliations":[{"name":"Veterans Administration Hospital","city":"New Orleans, LA","country":"USA"}]}]},{"id":"413","firstname":"Rosalyn","surname":"Yalow","born":"1921-07-19","died":"2011-05-30","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"female","prizes":[{"year":"1977","category":"medicine","share":"2","motivation":"\"for the development of radioimmunoassays of peptide hormones\"","affiliations":[{"name":"Veterans Administration Hospital","city":"Bronx, NY","country":"USA"}]}]},{"id":"414","firstname":"Werner","surname":"Arber","born":"1929-06-03","died":"0000-00-00","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Gränichen","gender":"male","prizes":[{"year":"1978","category":"medicine","share":"3","motivation":"\"for the discovery of restriction enzymes and their application to problems of molecular genetics\"","affiliations":[{"name":"Biozentrum der Universität","city":"Basel","country":"Switzerland"}]}]},{"id":"415","firstname":"Daniel","surname":"Nathans","born":"1928-10-30","died":"1999-11-16","bornCountry":"USA","bornCountryCode":"US","bornCity":"Wilmington, DE","diedCountry":"USA","diedCountryCode":"US","diedCity":"Baltimore, MD","gender":"male","prizes":[{"year":"1978","category":"medicine","share":"3","motivation":"\"for the discovery of restriction enzymes and their application to problems of molecular genetics\"","affiliations":[{"name":"Johns Hopkins University School of Medicine","city":"Baltimore, MD","country":"USA"}]}]},{"id":"416","firstname":"Hamilton O.","surname":"Smith","born":"1931-08-23","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1978","category":"medicine","share":"3","motivation":"\"for the discovery of restriction enzymes and their application to problems of molecular genetics\"","affiliations":[{"name":"Johns Hopkins University School of Medicine","city":"Baltimore, MD","country":"USA"}]}]},{"id":"417","firstname":"Allan M.","surname":"Cormack","born":"1924-02-23","died":"1998-05-07","bornCountry":"South Africa","bornCountryCode":"ZA","bornCity":"Johannesburg","diedCountry":"USA","diedCountryCode":"US","diedCity":"Winchester, MA","gender":"male","prizes":[{"year":"1979","category":"medicine","share":"2","motivation":"\"for the development of computer assisted tomography\"","affiliations":[{"name":"Tufts University","city":"Medford, MA","country":"USA"}]}]},{"id":"418","firstname":"Godfrey N.","surname":"Hounsfield","born":"1919-08-28","died":"2004-08-12","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Newark","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Kingston upon Thames","gender":"male","prizes":[{"year":"1979","category":"medicine","share":"2","motivation":"\"for the development of computer assisted tomography\"","affiliations":[{"name":"Central Research Laboratories, EMI","city":"London","country":"United Kingdom"}]}]},{"id":"419","firstname":"Baruj","surname":"Benacerraf","born":"1920-10-29","died":"2011-08-02","bornCountry":"Venezuela","bornCountryCode":"VE","bornCity":"Caracas","diedCountry":"USA","diedCountryCode":"US","diedCity":"Boston, MA","gender":"male","prizes":[{"year":"1980","category":"medicine","share":"3","motivation":"\"for their discoveries concerning genetically determined structures on the cell surface that regulate immunological reactions\"","affiliations":[{"name":"Harvard Medical School","city":"Boston, MA","country":"USA"}]}]},{"id":"420","firstname":"Jean","surname":"Dausset","born":"1916-10-19","died":"2009-06-06","bornCountry":"France","bornCountryCode":"FR","bornCity":"Toulouse","diedCountry":"Spain","diedCountryCode":"ES","diedCity":"Palma, Majorca","gender":"male","prizes":[{"year":"1980","category":"medicine","share":"3","motivation":"\"for their discoveries concerning genetically determined structures on the cell surface that regulate immunological reactions\"","affiliations":[{"name":"Université de Paris, Laboratoire Immuno-Hématologie","city":"Paris","country":"France"}]}]},{"id":"421","firstname":"George D.","surname":"Snell","born":"1903-12-19","died":"1996-06-06","bornCountry":"USA","bornCountryCode":"US","bornCity":"Bradford, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Bar Harbor, ME","gender":"male","prizes":[{"year":"1980","category":"medicine","share":"3","motivation":"\"for their discoveries concerning genetically determined structures on the cell surface that regulate immunological reactions\"","affiliations":[{"name":"Jackson Laboratory","city":"Bar Harbor, ME","country":"USA"}]}]},{"id":"422","firstname":"Roger W.","surname":"Sperry","born":"1913-08-20","died":"1994-04-17","bornCountry":"USA","bornCountryCode":"US","bornCity":"Hartford, CT","diedCountry":"USA","diedCountryCode":"US","diedCity":"Pasadena, CA","gender":"male","prizes":[{"year":"1981","category":"medicine","share":"2","motivation":"\"for his discoveries concerning the functional specialization of the cerebral hemispheres\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"423","firstname":"David H.","surname":"Hubel","born":"1926-02-27","died":"2013-09-22","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Windsor, ON","diedCountry":"USA","diedCountryCode":"US","diedCity":"Lincoln, MA","gender":"male","prizes":[{"year":"1981","category":"medicine","share":"4","motivation":"\"for their discoveries concerning information processing in the visual system\"","affiliations":[{"name":"Harvard Medical School","city":"Boston, MA","country":"USA"}]}]},{"id":"424","firstname":"Torsten N.","surname":"Wiesel","born":"1924-06-03","died":"0000-00-00","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Uppsala","gender":"male","prizes":[{"year":"1981","category":"medicine","share":"4","motivation":"\"for their discoveries concerning information processing in the visual system\"","affiliations":[{"name":"Harvard Medical School","city":"Boston, MA","country":"USA"}]}]},{"id":"425","firstname":"Sune K.","surname":"Bergström","born":"1916-01-10","died":"2004-08-15","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Stockholm","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1982","category":"medicine","share":"3","motivation":"\"for their discoveries concerning prostaglandins and related biologically active substances\"","affiliations":[{"name":"Karolinska Institutet","city":"Stockholm","country":"Sweden"}]}]},{"id":"426","firstname":"Bengt I.","surname":"Samuelsson","born":"1934-05-21","died":"0000-00-00","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Halmstad","gender":"male","prizes":[{"year":"1982","category":"medicine","share":"3","motivation":"\"for their discoveries concerning prostaglandins and related biologically active substances\"","affiliations":[{"name":"Karolinska Institutet","city":"Stockholm","country":"Sweden"}]}]},{"id":"427","firstname":"John R.","surname":"Vane","born":"1927-03-29","died":"2004-11-19","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Tardebigg","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Farnborough","gender":"male","prizes":[{"year":"1982","category":"medicine","share":"3","motivation":"\"for their discoveries concerning prostaglandins and related biologically active substances\"","affiliations":[{"name":"The Wellcome Research Laboratories","city":"Beckenham","country":"United Kingdom"}]}]},{"id":"428","firstname":"Barbara","surname":"McClintock","born":"1902-06-16","died":"1992-09-02","bornCountry":"USA","bornCountryCode":"US","bornCity":"Hartford, CT","diedCountry":"USA","diedCountryCode":"US","diedCity":"Huntington, NY","gender":"female","prizes":[{"year":"1983","category":"medicine","share":"1","motivation":"\"for her discovery of mobile genetic elements\"","affiliations":[{"name":"Cold Spring Harbor Laboratory","city":"Cold Spring Harbor, NY","country":"USA"}]}]},{"id":"429","firstname":"Niels K.","surname":"Jerne","born":"1911-12-23","died":"1994-10-07","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"France","diedCountryCode":"FR","diedCity":"Castillon-du-Gard","gender":"male","prizes":[{"year":"1984","category":"medicine","share":"3","motivation":"\"for theories concerning the specificity in development and control of the immune system and the discovery of the principle for production of monoclonal antibodies\"","affiliations":[{"name":"Basel Institute for Immunology","city":"Basel","country":"Switzerland"}]}]},{"id":"430","firstname":"Georges J.F.","surname":"Köhler","born":"1946-04-17","died":"1995-03-01","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Munich","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Freiburg im Breisgau","gender":"male","prizes":[{"year":"1984","category":"medicine","share":"3","motivation":"\"for theories concerning the specificity in development and control of the immune system and the discovery of the principle for production of monoclonal antibodies\"","affiliations":[{"name":"Basel Institute for Immunology","city":"Basel","country":"Switzerland"}]}]},{"id":"431","firstname":"César","surname":"Milstein","born":"1927-10-08","died":"2002-03-24","bornCountry":"Argentina","bornCountryCode":"AR","bornCity":"Bahia Blanca","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1984","category":"medicine","share":"3","motivation":"\"for theories concerning the specificity in development and control of the immune system and the discovery of the principle for production of monoclonal antibodies\"","affiliations":[{"name":"MRC Laboratory of Molecular Biology","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"432","firstname":"Michael S.","surname":"Brown","born":"1941-04-13","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1985","category":"medicine","share":"2","motivation":"\"for their discoveries concerning the regulation of cholesterol metabolism\"","affiliations":[{"name":"University of Texas Southwestern Medical Center at Dallas","city":"Dallas, TX","country":"USA"}]}]},{"id":"433","firstname":"Joseph L.","surname":"Goldstein","born":"1940-04-18","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Sumter, SC","gender":"male","prizes":[{"year":"1985","category":"medicine","share":"2","motivation":"\"for their discoveries concerning the regulation of cholesterol metabolism\"","affiliations":[{"name":"University of Texas Southwestern Medical Center at Dallas","city":"Dallas, TX","country":"USA"}]}]},{"id":"434","firstname":"Stanley","surname":"Cohen","born":"1922-11-17","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Brooklyn, NY","gender":"male","prizes":[{"year":"1986","category":"medicine","share":"2","motivation":"\"for their discoveries of growth factors\"","affiliations":[{"name":"Vanderbilt University School of Medicine","city":"Nashville, TN","country":"USA"}]}]},{"id":"435","firstname":"Rita","surname":"Levi-Montalcini","born":"1909-04-22","died":"2012-12-30","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Turin","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Rome","gender":"female","prizes":[{"year":"1986","category":"medicine","share":"2","motivation":"\"for their discoveries of growth factors\"","affiliations":[{"name":"Institute of Cell Biology of the C.N.R.","city":"Rome","country":"Italy"}]}]},{"id":"436","firstname":"Susumu","surname":"Tonegawa","born":"1939-09-06","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Nagoya","gender":"male","prizes":[{"year":"1987","category":"medicine","share":"1","motivation":"\"for his discovery of the genetic principle for generation of antibody diversity\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"437","firstname":"Sir James W.","surname":"Black","born":"1924-06-14","died":"2010-03-21","bornCountry":"Scotland","bornCountryCode":"GB","bornCity":"Uddingston","gender":"male","prizes":[{"year":"1988","category":"medicine","share":"3","motivation":"\"for their discoveries of important principles for drug treatment\"","affiliations":[{"name":"London University, King's College Hospital Medical School","city":"London","country":"United Kingdom"}]}]},{"id":"438","firstname":"Gertrude B.","surname":"Elion","born":"1918-01-23","died":"1999-02-21","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chapel Hill, NC","gender":"female","prizes":[{"year":"1988","category":"medicine","share":"3","motivation":"\"for their discoveries of important principles for drug treatment\"","affiliations":[{"name":"Wellcome Research Laboratories","city":"Research Triangle Park, NC","country":"USA"}]}]},{"id":"439","firstname":"George H.","surname":"Hitchings","born":"1905-04-18","died":"1998-02-27","bornCountry":"USA","bornCountryCode":"US","bornCity":"Hoquiam, WA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chapel Hill, NC","gender":"male","prizes":[{"year":"1988","category":"medicine","share":"3","motivation":"\"for their discoveries of important principles for drug treatment\"","affiliations":[{"name":"Wellcome Research Laboratories","city":"Research Triangle Park, NC","country":"USA"}]}]},{"id":"440","firstname":"J. Michael","surname":"Bishop","born":"1936-02-22","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"York, PA","gender":"male","prizes":[{"year":"1989","category":"medicine","share":"2","motivation":"\"for their discovery of the cellular origin of retroviral oncogenes\"","affiliations":[{"name":"University of California School of Medicine","city":"San Francisco, CA","country":"USA"}]}]},{"id":"441","firstname":"Harold E.","surname":"Varmus","born":"1939-12-18","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Oceanside, NY","gender":"male","prizes":[{"year":"1989","category":"medicine","share":"2","motivation":"\"for their discovery of the cellular origin of retroviral oncogenes\"","affiliations":[{"name":"University of California School of Medicine","city":"San Francisco, CA","country":"USA"}]}]},{"id":"442","firstname":"Joseph E.","surname":"Murray","born":"1919-04-01","died":"2012-11-26","bornCountry":"USA","bornCountryCode":"US","bornCity":"Milford, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Boston, MA","gender":"male","prizes":[{"year":"1990","category":"medicine","share":"2","motivation":"\"for their discoveries concerning organ and cell transplantation in the treatment of human disease\"","affiliations":[{"name":"Brigham and Women's Hospital","city":"Boston, MA","country":"USA"}]}]},{"id":"443","firstname":"E. Donnall","surname":"Thomas","born":"1920-03-15","died":"2012-10-20","bornCountry":"USA","bornCountryCode":"US","bornCity":"Mart, TX","diedCountry":"USA","diedCountryCode":"US","diedCity":"Seattle, WA","gender":"male","prizes":[{"year":"1990","category":"medicine","share":"2","motivation":"\"for their discoveries concerning organ and cell transplantation in the treatment of human disease\"","affiliations":[{"name":"Fred Hutchinson Cancer Research Center","city":"Seattle, WA","country":"USA"}]}]},{"id":"444","firstname":"Erwin","surname":"Neher","born":"1944-03-20","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Landsberg","gender":"male","prizes":[{"year":"1991","category":"medicine","share":"2","motivation":"\"for their discoveries concerning the function of single ion channels in cells\"","affiliations":[{"name":"Max-Planck-Institut für Biophysikalische Chemie","city":"Göttingen","country":"Federal Republic of Germany"}]}]},{"id":"445","firstname":"Bert","surname":"Sakmann","born":"1942-06-12","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Stuttgart","gender":"male","prizes":[{"year":"1991","category":"medicine","share":"2","motivation":"\"for their discoveries concerning the function of single ion channels in cells\"","affiliations":[{"name":"Max-Planck-Institut für medizinische Forschung","city":"Heidelberg","country":"Federal Republic of Germany"}]}]},{"id":"446","firstname":"Edmond H.","surname":"Fischer","born":"1920-04-06","died":"0000-00-00","bornCountry":"China","bornCountryCode":"CN","bornCity":"Shanghai","gender":"male","prizes":[{"year":"1992","category":"medicine","share":"2","motivation":"\"for their discoveries concerning reversible protein phosphorylation as a biological regulatory mechanism\"","affiliations":[{"name":"University of Washington","city":"Seattle, WA","country":"USA"}]}]},{"id":"447","firstname":"Edwin G.","surname":"Krebs","born":"1918-06-06","died":"2009-12-21","bornCountry":"USA","bornCountryCode":"US","bornCity":"Lansing, IA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Seattle, WA","gender":"male","prizes":[{"year":"1992","category":"medicine","share":"2","motivation":"\"for their discoveries concerning reversible protein phosphorylation as a biological regulatory mechanism\"","affiliations":[{"name":"University of Washington","city":"Seattle, WA","country":"USA"}]}]},{"id":"448","firstname":"Richard J.","surname":"Roberts","born":"1943-09-06","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Derby","gender":"male","prizes":[{"year":"1993","category":"medicine","share":"2","motivation":"\"for their discoveries of split genes\"","affiliations":[{"name":"New England Biolabs","city":"Beverly, MA","country":"USA"}]}]},{"id":"449","firstname":"Phillip A.","surname":"Sharp","born":"1944-06-06","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Falmouth, KY","gender":"male","prizes":[{"year":"1993","category":"medicine","share":"2","motivation":"\"for their discoveries of split genes\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT), Center for Cancer Research","city":"Cambridge, MA","country":"USA"}]}]},{"id":"450","firstname":"Alfred G.","surname":"Gilman","born":"1941-07-01","died":"2015-12-23","bornCountry":"USA","bornCountryCode":"US","bornCity":"New Haven, CT","diedCountry":"USA","diedCountryCode":"US","diedCity":"Dallas, TX","gender":"male","prizes":[{"year":"1994","category":"medicine","share":"2","motivation":"\"for their discovery of G-proteins and the role of these proteins in signal transduction in cells\"","affiliations":[{"name":"University of Texas Southwestern Medical Center at Dallas","city":"Dallas, TX","country":"USA"}]}]},{"id":"451","firstname":"Martin","surname":"Rodbell","born":"1925-12-01","died":"1998-12-07","bornCountry":"USA","bornCountryCode":"US","bornCity":"Baltimore, MD","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chapel Hill, NC","gender":"male","prizes":[{"year":"1994","category":"medicine","share":"2","motivation":"\"for their discovery of G-proteins and the role of these proteins in signal transduction in cells\"","affiliations":[{"name":"National Institute of Environmental Health Sciences","city":"Research Triangle Park, NC","country":"USA"}]}]},{"id":"452","firstname":"Edward B.","surname":"Lewis","born":"1918-05-20","died":"2004-07-21","bornCountry":"USA","bornCountryCode":"US","bornCity":"Wilkes-Barre, PA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Pasadena, CA","gender":"male","prizes":[{"year":"1995","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the genetic control of early embryonic development\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"453","firstname":"Christiane","surname":"Nüsslein-Volhard","born":"1942-10-20","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Magdeburg","gender":"female","prizes":[{"year":"1995","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the genetic control of early embryonic development\"","affiliations":[{"name":"Max-Planck-Institut für Entwicklungsbiologie","city":"Tübingen","country":"Federal Republic of Germany"}]}]},{"id":"454","firstname":"Eric F.","surname":"Wieschaus","born":"1947-06-08","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"South Bend, IN","gender":"male","prizes":[{"year":"1995","category":"medicine","share":"3","motivation":"\"for their discoveries concerning the genetic control of early embryonic development\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"455","firstname":"Peter C.","surname":"Doherty","born":"1940-10-15","died":"0000-00-00","bornCountry":"Australia","bornCountryCode":"AU","bornCity":"Brisbane","gender":"male","prizes":[{"year":"1996","category":"medicine","share":"2","motivation":"\"for their discoveries concerning the specificity of the cell mediated immune defence\"","affiliations":[{"name":"St. Jude Children's Research Hospital","city":"Memphis, TN","country":"USA"}]}]},{"id":"456","firstname":"Rolf M.","surname":"Zinkernagel","born":"1944-01-06","died":"0000-00-00","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Basel","gender":"male","prizes":[{"year":"1996","category":"medicine","share":"2","motivation":"\"for their discoveries concerning the specificity of the cell mediated immune defence\"","affiliations":[{"name":"University of Zurich, Institute of Experimental Immunology","city":"Zurich","country":"Switzerland"}]}]},{"id":"457","firstname":"Stanley B.","surname":"Prusiner","born":"1942-05-28","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Des Moines, IA","gender":"male","prizes":[{"year":"1997","category":"medicine","share":"1","motivation":"\"for his discovery of Prions - a new biological principle of infection\"","affiliations":[{"name":"University of California School of Medicine","city":"San Francisco, CA","country":"USA"}]}]},{"id":"458","firstname":"Robert F.","surname":"Furchgott","born":"1916-06-04","died":"2009-05-19","bornCountry":"USA","bornCountryCode":"US","bornCity":"Charleston, SC","diedCountry":"USA","diedCountryCode":"US","diedCity":"Seattle, WA","gender":"male","prizes":[{"year":"1998","category":"medicine","share":"3","motivation":"\"for their discoveries concerning nitric oxide as a signalling molecule in the cardiovascular system\"","affiliations":[{"name":"SUNY Health Science Center","city":"Brooklyn, NY","country":"USA"}]}]},{"id":"459","firstname":"Louis J.","surname":"Ignarro","born":"1941-05-31","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Brooklyn, NY","gender":"male","prizes":[{"year":"1998","category":"medicine","share":"3","motivation":"\"for their discoveries concerning nitric oxide as a signalling molecule in the cardiovascular system\"","affiliations":[{"name":"University of California School of Medicine","city":"Los Angeles, CA","country":"USA"}]}]},{"id":"460","firstname":"Ferid","surname":"Murad","born":"1936-09-14","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Whiting, IN","gender":"male","prizes":[{"year":"1998","category":"medicine","share":"3","motivation":"\"for their discoveries concerning nitric oxide as a signalling molecule in the cardiovascular system\"","affiliations":[{"name":"University of Texas Medical School at Houston","city":"Houston, TX","country":"USA"}]}]},{"id":"461","firstname":"Günter","surname":"Blobel","born":"1936-05-21","died":"0000-00-00","bornCountry":"Germany (now Poland)","bornCountryCode":"PL","bornCity":"Waltersdorf (now Niegoslawice)","gender":"male","prizes":[{"year":"1999","category":"medicine","share":"1","motivation":"\"for the discovery that proteins have intrinsic signals that govern their transport and localization in the cell\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"},{"name":"Howard Hughes Medical Institute"}]}]},{"id":"462","firstname":"Jean Henry","surname":"Dunant","born":"1828-05-08","died":"1910-10-30","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Geneva","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Heiden","gender":"male","prizes":[{"year":"1901","category":"peace","share":"2","affiliations":[[]]}]},{"id":"463","firstname":"Frédéric","surname":"Passy","born":"1822-05-20","died":"1912-06-12","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1901","category":"peace","share":"2","affiliations":[[]]}]},{"id":"464","firstname":"Élie","surname":"Ducommun","born":"1833-02-19","died":"1906-12-07","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Geneva","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Bern","gender":"male","prizes":[{"year":"1902","category":"peace","share":"2","affiliations":[[]]}]},{"id":"465","firstname":"Charles Albert","surname":"Gobat","born":"1843-05-21","died":"1914-03-16","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Tramelan","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Bern","gender":"male","prizes":[{"year":"1902","category":"peace","share":"2","affiliations":[[]]}]},{"id":"466","firstname":"William Randal","surname":"Cremer","born":"1828-03-18","died":"1908-07-22","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Fareham","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1903","category":"peace","share":"1","affiliations":[[]]}]},{"id":"467","firstname":"Institut de droit international (Institute of International Law)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1904","category":"peace","share":"1","affiliations":[[]]}]},{"id":"468","firstname":"Baroness Bertha Sophie Felicita","surname":"von Suttner, née Countess Kinsky von Chinic und Tettau","born":"1843-06-09","died":"1914-06-21","bornCountry":"Austrian Empire (now Czech Republic)","bornCountryCode":"CZ","bornCity":"Prague","diedCountry":"Austria","diedCountryCode":"AT","diedCity":"Vienna","gender":"female","prizes":[{"year":"1905","category":"peace","share":"1","affiliations":[[]]}]},{"id":"470","firstname":"Theodore","surname":"Roosevelt","born":"1858-10-27","died":"1919-01-06","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Oyster Bay, NY","gender":"male","prizes":[{"year":"1906","category":"peace","share":"1","affiliations":[[]]}]},{"id":"471","firstname":"Ernesto Teodoro","surname":"Moneta","born":"1833-09-20","died":"1918-02-10","bornCountry":"Austrian Empire (now Italy)","bornCountryCode":"IT","bornCity":"Milan","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Milan","gender":"male","prizes":[{"year":"1907","category":"peace","share":"2","affiliations":[[]]}]},{"id":"472","firstname":"Louis","surname":"Renault","born":"1843-05-21","died":"1918-02-08","bornCountry":"France","bornCountryCode":"FR","bornCity":"Autun","diedCountry":"France","diedCountryCode":"FR","diedCity":"Barbizon","gender":"male","prizes":[{"year":"1907","category":"peace","share":"2","affiliations":[{"name":"Sorbonne University","city":"Paris","country":"France"}]}]},{"id":"473","firstname":"Klas Pontus","surname":"Arnoldson","born":"1844-10-27","died":"1916-02-20","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Gothenburg","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1908","category":"peace","share":"2","affiliations":[[]]}]},{"id":"474","firstname":"Fredrik","surname":"Bajer","born":"1837-04-21","died":"1922-01-22","bornCountry":"Denmark","bornCountryCode":"DK","bornCity":"Næstved","diedCountry":"Denmark","diedCountryCode":"DK","diedCity":"Copenhagen","gender":"male","prizes":[{"year":"1908","category":"peace","share":"2","affiliations":[[]]}]},{"id":"475","firstname":"Auguste Marie François","surname":"Beernaert","born":"1829-07-26","died":"1912-10-06","bornCountry":"Belgium","bornCountryCode":"BE","bornCity":"Ostend","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Lucerne","gender":"male","prizes":[{"year":"1909","category":"peace","share":"2","affiliations":[[]]}]},{"id":"476","firstname":"Paul Henri Benjamin Balluet","surname":"d'Estournelles de Constant, Baron de Constant de Rebecque","born":"1852-11-22","died":"1924-05-15","bornCountry":"France","bornCountryCode":"FR","bornCity":"La Flèche","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1909","category":"peace","share":"2","affiliations":[[]]}]},{"id":"477","firstname":"Bureau international permanent de la Paix (Permanent International Peace Bureau)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1910","category":"peace","share":"1","affiliations":[[]]}]},{"id":"478","firstname":"Tobias Michael Carel","surname":"Asser","born":"1838-04-28","died":"1913-07-29","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Amsterdam","diedCountry":"the Netherlands","diedCountryCode":"NL","diedCity":"the Hague","gender":"male","prizes":[{"year":"1911","category":"peace","share":"2","affiliations":[[]]}]},{"id":"479","firstname":"Alfred Hermann","surname":"Fried","born":"1864-11-11","died":"1921-05-05","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"Austria","diedCountryCode":"AT","diedCity":"Vienna","gender":"male","prizes":[{"year":"1911","category":"peace","share":"2","affiliations":[[]]}]},{"id":"480","firstname":"Elihu","surname":"Root","born":"1845-02-15","died":"1937-02-07","bornCountry":"USA","bornCountryCode":"US","bornCity":"Clinton, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1912","category":"peace","share":"1","affiliations":[[]]}]},{"id":"481","firstname":"Henri","surname":"La Fontaine","born":"1854-04-22","died":"1943-05-14","bornCountry":"Belgium","bornCountryCode":"BE","bornCity":"Brussels","diedCountry":"Belgium","diedCountryCode":"BE","diedCity":"Brussels","gender":"male","prizes":[{"year":"1913","category":"peace","share":"1","affiliations":[[]]}]},{"id":"482","firstname":"Comité international de la Croix Rouge (International Committee of the Red Cross)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1917","category":"peace","share":"1","affiliations":[[]]},{"year":"1944","category":"peace","share":"1","affiliations":[[]]},{"year":"1963","category":"peace","share":"2","affiliations":[[]]}]},{"id":"483","firstname":"Thomas Woodrow","surname":"Wilson","born":"1856-12-28","died":"1924-02-03","bornCountry":"USA","bornCountryCode":"US","bornCity":"Staunton, VA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Washington, DC","gender":"male","prizes":[{"year":"1919","category":"peace","share":"1","affiliations":[[]]}]},{"id":"484","firstname":"Léon Victor Auguste","surname":"Bourgeois","born":"1851-05-21","died":"1925-09-29","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Épernay","gender":"male","prizes":[{"year":"1920","category":"peace","share":"1","affiliations":[[]]}]},{"id":"485","firstname":"Karl Hjalmar","surname":"Branting","born":"1860-11-23","died":"1925-02-24","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Stockholm","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1921","category":"peace","share":"2","affiliations":[[]]}]},{"id":"486","firstname":"Christian Lous","surname":"Lange","born":"1869-09-17","died":"1938-12-11","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Stavanger","diedCountry":"Norway","diedCountryCode":"NO","diedCity":"Oslo","gender":"male","prizes":[{"year":"1921","category":"peace","share":"2","affiliations":[[]]}]},{"id":"487","firstname":"Fridtjof","surname":"Nansen","born":"1861-10-10","died":"1930-05-13","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Kristiania (now Oslo)","diedCountry":"Norway","diedCountryCode":"NO","diedCity":"Oslo","gender":"male","prizes":[{"year":"1922","category":"peace","share":"1","affiliations":[[]]}]},{"id":"488","firstname":"Sir Austen","surname":"Chamberlain","born":"1863-10-16","died":"1937-03-16","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Birmingham","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1925","category":"peace","share":"2","affiliations":[[]]}]},{"id":"489","firstname":"Charles Gates","surname":"Dawes","born":"1865-08-27","died":"1951-04-23","bornCountry":"USA","bornCountryCode":"US","bornCity":"Marietta, OH","diedCountry":"USA","diedCountryCode":"US","diedCity":"Evanston, IL","gender":"male","prizes":[{"year":"1925","category":"peace","share":"2","affiliations":[[]]}]},{"id":"490","firstname":"Aristide","surname":"Briand","born":"1862-03-28","died":"1932-03-07","bornCountry":"France","bornCountryCode":"FR","bornCity":"Nantes","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1926","category":"peace","share":"2","affiliations":[[]]}]},{"id":"491","firstname":"Gustav","surname":"Stresemann","born":"1878-05-10","died":"1929-10-03","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Berlin","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Berlin","gender":"male","prizes":[{"year":"1926","category":"peace","share":"2","affiliations":[[]]}]},{"id":"492","firstname":"Ferdinand","surname":"Buisson","born":"1841-12-20","died":"1932-02-16","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Thieuloy-Saint-Antoine","gender":"male","prizes":[{"year":"1927","category":"peace","share":"2","affiliations":[[]]}]},{"id":"493","firstname":"Ludwig","surname":"Quidde","born":"1858-03-23","died":"1941-03-04","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Bremen","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Geneva","gender":"male","prizes":[{"year":"1927","category":"peace","share":"2","affiliations":[[]]}]},{"id":"494","firstname":"Frank Billings","surname":"Kellogg","born":"1856-12-22","died":"1937-12-21","bornCountry":"USA","bornCountryCode":"US","bornCity":"Potsdam, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"St. Paul, MN","gender":"male","prizes":[{"year":"1929","category":"peace","share":"1","affiliations":[[]]}]},{"id":"495","firstname":"Lars Olof Jonathan (Nathan)","surname":"Söderblom","born":"1866-01-15","died":"1931-07-12","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Trönö","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Uppsala","gender":"male","prizes":[{"year":"1930","category":"peace","share":"1","affiliations":[[]]}]},{"id":"496","firstname":"Jane","surname":"Addams","born":"1860-09-06","died":"1935-05-21","bornCountry":"USA","bornCountryCode":"US","bornCity":"Cedarville, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chicago, IL","gender":"female","prizes":[{"year":"1931","category":"peace","share":"2","affiliations":[[]]}]},{"id":"497","firstname":"Nicholas Murray","surname":"Butler","born":"1862-04-02","died":"1947-12-07","bornCountry":"USA","bornCountryCode":"US","bornCity":"Elizabeth, NJ","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1931","category":"peace","share":"2","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"498","firstname":"Sir Norman","surname":"Angell (Ralph Lane)","born":"1872-12-26","died":"1967-10-07","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Holbeach","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Croydon","gender":"male","prizes":[{"year":"1933","category":"peace","share":"1","affiliations":[[]]}]},{"id":"499","firstname":"Arthur","surname":"Henderson","born":"1863-09-13","died":"1935-10-20","bornCountry":"Scotland","bornCountryCode":"GB","bornCity":"Glasgow","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1934","category":"peace","share":"1","affiliations":[[]]}]},{"id":"500","firstname":"Carl","surname":"von Ossietzky","born":"1889-10-03","died":"1938-05-04","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Hamburg","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Berlin","gender":"male","prizes":[{"year":"1935","category":"peace","share":"1","affiliations":[[]]}]},{"id":"501","firstname":"Carlos","surname":"Saavedra Lamas","born":"1878-11-01","died":"1959-05-05","bornCountry":"Argentina","bornCountryCode":"AR","bornCity":"Buenos Aires","diedCountry":"Argentina","diedCountryCode":"AR","diedCity":"Buenos Aires","gender":"male","prizes":[{"year":"1936","category":"peace","share":"1","affiliations":[[]]}]},{"id":"502","firstname":"Cecil of Chelwood, Viscount","surname":"(Lord Edgar Algernon Robert Gascoyne Cecil)","born":"1864-09-14","died":"1958-11-24","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Tunbridge Wells","gender":"male","prizes":[{"year":"1937","category":"peace","share":"1","affiliations":[[]]}]},{"id":"503","firstname":"Office international Nansen pour les Réfugiés (Nansen International Office for Refugees)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1938","category":"peace","share":"1","affiliations":[[]]}]},{"id":"505","firstname":"Cordell","surname":"Hull","born":"1871-10-02","died":"1955-07-23","bornCountry":"USA","bornCountryCode":"US","bornCity":"Olympus, TN","diedCountry":"USA","diedCountryCode":"US","diedCity":"Bethesda, MD","gender":"male","prizes":[{"year":"1945","category":"peace","share":"1","affiliations":[[]]}]},{"id":"506","firstname":"Emily Greene","surname":"Balch","born":"1867-01-08","died":"1961-01-09","bornCountry":"USA","bornCountryCode":"US","bornCity":"Jamaica Plain, MA (now Boston)","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cambridge, MA","gender":"female","prizes":[{"year":"1946","category":"peace","share":"2","affiliations":[[]]}]},{"id":"507","firstname":"John Raleigh","surname":"Mott","born":"1865-05-25","died":"1955-01-31","bornCountry":"USA","bornCountryCode":"US","bornCity":"Livingston Manor, NY","diedCountry":"USA","diedCountryCode":"US","gender":"male","prizes":[{"year":"1946","category":"peace","share":"2","affiliations":[[]]}]},{"id":"508","firstname":"Friends Service Council (The Quakers)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1947","category":"peace","share":"2","affiliations":[[]]}]},{"id":"509","firstname":"American Friends Service Committee (The Quakers)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1947","category":"peace","share":"2","affiliations":[[]]}]},{"id":"510","firstname":"Lord (John)","surname":"Boyd Orr of Brechin","born":"1880-09-23","died":"1971-06-25","bornCountry":"Scotland","bornCountryCode":"GB","bornCity":"Kilmaurs","diedCountry":"Scotland","diedCountryCode":"GB","diedCity":"Edzell","gender":"male","prizes":[{"year":"1949","category":"peace","share":"1","affiliations":[[]]}]},{"id":"511","firstname":"Ralph","surname":"Bunche","born":"1904-08-07","died":"1971-12-09","bornCountry":"USA","bornCountryCode":"US","bornCity":"Detroit, MI","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1950","category":"peace","share":"1","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"512","firstname":"Léon","surname":"Jouhaux","born":"1879-07-01","died":"1954-04-28","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1951","category":"peace","share":"1","affiliations":[[]]}]},{"id":"513","firstname":"Albert","surname":"Schweitzer","born":"1875-01-14","died":"1965-09-04","bornCountry":"Germany (now France)","bornCountryCode":"FR","bornCity":"Kaysersberg","diedCountry":"Gabon","diedCountryCode":"GA","diedCity":"Lambaréné","gender":"male","prizes":[{"year":"1952","category":"peace","share":"1","affiliations":[[]]}]},{"id":"514","firstname":"George Catlett","surname":"Marshall","born":"1880-12-31","died":"1959-10-16","bornCountry":"USA","bornCountryCode":"US","bornCity":"Uniontown, PA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Washington, DC","gender":"male","prizes":[{"year":"1953","category":"peace","share":"1","affiliations":[[]]}]},{"id":"515","firstname":"Office of the United Nations High Commissioner for Refugees (UNHCR)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1954","category":"peace","share":"1","affiliations":[[]]},{"year":"1981","category":"peace","share":"1","affiliations":[[]]}]},{"id":"516","firstname":"Lester Bowles","surname":"Pearson","born":"1897-04-23","died":"1972-12-27","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Toronto","diedCountry":"Canada","diedCountryCode":"CA","diedCity":"Ottawa","gender":"male","prizes":[{"year":"1957","category":"peace","share":"1","affiliations":[[]]}]},{"id":"517","firstname":"Georges","surname":"Pire","born":"1910-02-10","died":"1969-01-30","bornCountry":"Belgium","bornCountryCode":"BE","bornCity":"Dinant","diedCountry":"Belgium","diedCountryCode":"BE","diedCity":"Leuven","gender":"male","prizes":[{"year":"1958","category":"peace","share":"1","affiliations":[[]]}]},{"id":"518","firstname":"Philip J.","surname":"Noel-Baker","born":"1889-11-01","died":"1982-10-08","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1959","category":"peace","share":"1","affiliations":[[]]}]},{"id":"519","firstname":"Albert John","surname":"Lutuli","born":"1898-00-00","died":"1967-07-21","bornCountry":"Southern Rhodesia (now Zimbabwe)","bornCountryCode":"ZW","bornCity":"Bulawayo","diedCountry":"South Africa","diedCountryCode":"ZA","diedCity":"Stanger","gender":"male","prizes":[{"year":"1960","category":"peace","share":"1","affiliations":[[]]}]},{"id":"520","firstname":"Dag Hjalmar Agne Carl","surname":"Hammarskjöld","born":"1905-07-29","died":"1961-09-18","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Jönköping","diedCountry":"Northern Rhodesia (now Zambia)","diedCountryCode":"ZM","diedCity":"Ndola","gender":"male","prizes":[{"year":"1961","category":"peace","share":"1","affiliations":[[]]}]},{"id":"523","firstname":"Ligue des Sociétés de la Croix-Rouge (League of Red Cross Societies)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1963","category":"peace","share":"2","affiliations":[[]]}]},{"id":"524","firstname":"Martin Luther","surname":"King Jr.","born":"1929-01-15","died":"1968-04-04","bornCountry":"USA","bornCountryCode":"US","bornCity":"Atlanta, GA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Memphis, TN","gender":"male","prizes":[{"year":"1964","category":"peace","share":"1","affiliations":[[]]}]},{"id":"525","firstname":"United Nations Children's Fund (UNICEF)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1965","category":"peace","share":"1","affiliations":[[]]}]},{"id":"526","firstname":"René","surname":"Cassin","born":"1887-10-05","died":"1976-02-20","bornCountry":"France","bornCountryCode":"FR","bornCity":"Bayonne","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1968","category":"peace","share":"1","affiliations":[[]]}]},{"id":"527","firstname":"International Labour Organization (I.L.O.)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1969","category":"peace","share":"1","affiliations":[[]]}]},{"id":"528","firstname":"Norman E.","surname":"Borlaug","born":"1914-03-25","died":"2009-09-12","bornCountry":"USA","bornCountryCode":"US","bornCity":"Cresco, IA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Dallas, TX","gender":"male","prizes":[{"year":"1970","category":"peace","share":"1","affiliations":[[]]}]},{"id":"529","firstname":"Willy","surname":"Brandt","born":"1913-12-18","died":"1992-10-08","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Lübeck","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Unkel","gender":"male","prizes":[{"year":"1971","category":"peace","share":"1","affiliations":[[]]}]},{"id":"530","firstname":"Henry A.","surname":"Kissinger","born":"1923-05-27","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Fürth","gender":"male","prizes":[{"year":"1973","category":"peace","share":"2","affiliations":[[]]}]},{"id":"531","firstname":"Le Duc Tho","born":"1911-10-14","died":"1990-10-13","bornCountry":"Vietnam","bornCountryCode":"VN","bornCity":"Nam Ha province","diedCountry":"Vietnam","diedCountryCode":"VN","diedCity":"Hanoi","gender":"male","prizes":[{"year":"1973","category":"peace","share":"2","affiliations":[[]]}]},{"id":"532","firstname":"Seán","surname":"MacBride","born":"1904-01-26","died":"1988-01-15","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"Ireland","diedCountryCode":"IE","diedCity":"Dublin","gender":"male","prizes":[{"year":"1974","category":"peace","share":"2","affiliations":[[]]}]},{"id":"533","firstname":"Eisaku","surname":"Sato","born":"1901-03-27","died":"1975-06-03","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Tabuse","diedCountry":"Japan","diedCountryCode":"JP","diedCity":"Tokyo","gender":"male","prizes":[{"year":"1974","category":"peace","share":"2","affiliations":[[]]}]},{"id":"534","firstname":"Andrei Dmitrievich","surname":"Sakharov","born":"1921-05-21","died":"1989-12-14","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Moscow","diedCountry":"USSR (now Russia)","diedCountryCode":"RU","diedCity":"Moscow","gender":"male","prizes":[{"year":"1975","category":"peace","share":"1","affiliations":[[]]}]},{"id":"535","firstname":"Betty","surname":"Williams","born":"1943-05-22","died":"0000-00-00","bornCountry":"Northern Ireland","bornCountryCode":"GB","bornCity":"Belfast","gender":"female","prizes":[{"year":"1976","category":"peace","share":"2","affiliations":[[]]}]},{"id":"536","firstname":"Mairead","surname":"Corrigan","born":"1944-01-27","died":"0000-00-00","bornCountry":"Northern Ireland","bornCountryCode":"GB","bornCity":"Belfast","gender":"female","prizes":[{"year":"1976","category":"peace","share":"2","affiliations":[[]]}]},{"id":"537","firstname":"Amnesty International","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1977","category":"peace","share":"1","affiliations":[[]]}]},{"id":"538","firstname":"Mohamed Anwar","surname":"al-Sadat","born":"1918-12-25","died":"1981-10-06","bornCountry":"Egypt","bornCountryCode":"EG","bornCity":"Mit Abu al-Kawm","diedCountry":"Egypt","diedCountryCode":"EG","diedCity":"Cairo","gender":"male","prizes":[{"year":"1978","category":"peace","share":"2","affiliations":[[]]}]},{"id":"539","firstname":"Menachem","surname":"Begin","born":"1913-08-16","died":"1992-03-09","bornCountry":"Russian Empire (now Belarus)","bornCountryCode":"BY","bornCity":"Brest Litovsk","diedCountry":"Israel","diedCountryCode":"IL","diedCity":"Tel Aviv","gender":"male","prizes":[{"year":"1978","category":"peace","share":"2","affiliations":[[]]}]},{"id":"540","firstname":"Mother Teresa","born":"1910-08-26","died":"1997-09-05","bornCountry":"Ottoman Empire (now Republic of Macedonia)","bornCountryCode":"MK","bornCity":"Uskup (now Skopje)","diedCountry":"India","diedCountryCode":"IN","diedCity":"Calcutta","gender":"female","prizes":[{"year":"1979","category":"peace","share":"1","affiliations":[[]]}]},{"id":"541","firstname":"Adolfo","surname":"Pérez Esquivel","born":"1931-11-26","died":"0000-00-00","bornCountry":"Argentina","bornCountryCode":"AR","bornCity":"Buenos Aires","gender":"male","prizes":[{"year":"1980","category":"peace","share":"1","affiliations":[[]]}]},{"id":"543","firstname":"Alva","surname":"Myrdal","born":"1902-01-31","died":"1986-02-01","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Uppsala","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"female","prizes":[{"year":"1982","category":"peace","share":"2","affiliations":[[]]}]},{"id":"544","firstname":"Alfonso","surname":"García Robles","born":"1911-03-20","died":"1991-09-02","bornCountry":"Mexico","bornCountryCode":"MX","bornCity":"Zamora","diedCountry":"Mexico","diedCountryCode":"MX","diedCity":"Mexico City","gender":"male","prizes":[{"year":"1982","category":"peace","share":"2","affiliations":[[]]}]},{"id":"545","firstname":"Lech","surname":"Walesa","born":"1943-09-29","died":"0000-00-00","bornCountry":"Poland","bornCountryCode":"PL","bornCity":"Popowo","gender":"male","prizes":[{"year":"1983","category":"peace","share":"1","affiliations":[[]]}]},{"id":"546","firstname":"Desmond Mpilo","surname":"Tutu","born":"1931-10-07","died":"0000-00-00","bornCountry":"South Africa","bornCountryCode":"ZA","bornCity":"Klerksdorp","gender":"male","prizes":[{"year":"1984","category":"peace","share":"1","affiliations":[[]]}]},{"id":"547","firstname":"International Physicians for the Prevention of Nuclear War","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1985","category":"peace","share":"1","affiliations":[[]]}]},{"id":"548","firstname":"Elie","surname":"Wiesel","born":"1928-09-30","died":"2016-07-02","bornCountry":"Romania","bornCountryCode":"RO","bornCity":"Sighet","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1986","category":"peace","share":"1","affiliations":[[]]}]},{"id":"549","firstname":"Oscar","surname":"Arias Sánchez","born":"1941-09-13","died":"0000-00-00","bornCountry":"Costa Rica","bornCountryCode":"CR","bornCity":"Heredia","gender":"male","prizes":[{"year":"1987","category":"peace","share":"1","motivation":"\"for his work for peace in Central America, efforts which led to the accord signed in Guatemala on August 7 this year\"","affiliations":[[]]}]},{"id":"550","firstname":"United Nations Peacekeeping Forces","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1988","category":"peace","share":"1","affiliations":[[]]}]},{"id":"551","firstname":"The 14th Dalai Lama (Tenzin Gyatso)","born":"1935-07-06","died":"0000-00-00","bornCountry":"Tibet (now People's Republic of China)","bornCountryCode":"CN","bornCity":"Taktser","gender":"male","prizes":[{"year":"1989","category":"peace","share":"1","affiliations":[[]]}]},{"id":"552","firstname":"Mikhail Sergeyevich","surname":"Gorbachev","born":"1931-03-02","died":"0000-00-00","bornCountry":"USSR (now Russia)","bornCountryCode":"RU","bornCity":"Privolnoye","gender":"male","prizes":[{"year":"1990","category":"peace","share":"1","motivation":"\"for his leading role in the peace process which today characterizes important parts of the international community\"","affiliations":[[]]}]},{"id":"553","firstname":"Aung San Suu Kyi","born":"1945-06-19","died":"0000-00-00","bornCountry":"Burma (now Myanmar)","bornCountryCode":"MM","bornCity":"Rangoon (now Yangon)","gender":"female","prizes":[{"year":"1991","category":"peace","share":"1","motivation":"\"for her non-violent struggle for democracy and human rights\"","affiliations":[[]]}]},{"id":"554","firstname":"Rigoberta","surname":"Menchú Tum","born":"1959-01-09","died":"0000-00-00","bornCountry":"Guatemala","bornCountryCode":"GT","bornCity":"Aldea Chimel","gender":"female","prizes":[{"year":"1992","category":"peace","share":"1","motivation":"\"in recognition of her work for social justice and ethno-cultural reconciliation based on respect for the rights of indigenous peoples\"","affiliations":[[]]}]},{"id":"555","firstname":"Nelson","surname":"Mandela","born":"1918-07-18","died":"2013-12-05","bornCountry":"South Africa","bornCountryCode":"ZA","bornCity":"Qunu","diedCountry":"South Africa","diedCountryCode":"ZA","diedCity":"Johannesburg","gender":"male","prizes":[{"year":"1993","category":"peace","share":"2","motivation":"\"for their work for the peaceful termination of the apartheid regime, and for laying the foundations for a new democratic South Africa\"","affiliations":[[]]}]},{"id":"556","firstname":"Frederik Willem","surname":"de Klerk","born":"1936-03-18","died":"0000-00-00","bornCountry":"South Africa","bornCountryCode":"ZA","bornCity":"Johannesburg","gender":"male","prizes":[{"year":"1993","category":"peace","share":"2","motivation":"\"for their work for the peaceful termination of the apartheid regime, and for laying the foundations for a new democratic South Africa\"","affiliations":[[]]}]},{"id":"557","firstname":"Yasser","surname":"Arafat","born":"1929-08-24","died":"2004-11-11","bornCountry":"Egypt","bornCountryCode":"EG","bornCity":"Cairo","gender":"male","prizes":[{"year":"1994","category":"peace","share":"3","motivation":"\"for their efforts to create peace in the Middle East\"","affiliations":[[]]}]},{"id":"558","firstname":"Shimon","surname":"Peres","born":"1923-08-16","died":"2016-09-28","bornCountry":"Poland (now Belarus)","bornCountryCode":"BY","bornCity":"Vishneva","diedCountry":"Israel","diedCountryCode":"IL","diedCity":"Tel Aviv","gender":"male","prizes":[{"year":"1994","category":"peace","share":"3","motivation":"\"for their efforts to create peace in the Middle East\"","affiliations":[[]]}]},{"id":"559","firstname":"Yitzhak","surname":"Rabin","born":"1922-03-01","died":"1995-11-04","bornCountry":"British Mandate of Palestine (now Israel)","bornCountryCode":"IL","bornCity":"Jerusalem","diedCountry":"Israel","diedCountryCode":"IL","diedCity":"Tel Aviv","gender":"male","prizes":[{"year":"1994","category":"peace","share":"3","motivation":"\"for their efforts to create peace in the Middle East\"","affiliations":[[]]}]},{"id":"560","firstname":"Joseph","surname":"Rotblat","born":"1908-11-04","died":"2005-08-31","bornCountry":"Russian Empire (now Poland)","bornCountryCode":"PL","bornCity":"Warsaw","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1995","category":"peace","share":"2","motivation":"\"for their efforts to diminish the part played by nuclear arms in international politics and, in the longer run, to eliminate such arms\"","affiliations":[[]]}]},{"id":"561","firstname":"Pugwash Conferences on Science and World Affairs","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1995","category":"peace","share":"2","motivation":"\"for their efforts to diminish the part played by nuclear arms in international politics and, in the longer run, to eliminate such arms\"","affiliations":[[]]}]},{"id":"562","firstname":"Carlos Filipe Ximenes","surname":"Belo","born":"1948-02-03","died":"0000-00-00","bornCountry":"East Timor","bornCountryCode":"TL","bornCity":"Wailacama","gender":"male","prizes":[{"year":"1996","category":"peace","share":"2","motivation":"\"for their work towards a just and peaceful solution to the conflict in East Timor\"","affiliations":[[]]}]},{"id":"563","firstname":"José","surname":"Ramos-Horta","born":"1949-12-26","died":"0000-00-00","bornCountry":"East Timor","bornCountryCode":"TL","bornCity":"Dili","gender":"male","prizes":[{"year":"1996","category":"peace","share":"2","motivation":"\"for their work towards a just and peaceful solution to the conflict in East Timor\"","affiliations":[[]]}]},{"id":"564","firstname":"International Campaign to Ban Landmines (ICBL)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1997","category":"peace","share":"2","motivation":"\"for their work for the banning and clearing of anti-personnel mines\"","affiliations":[[]]}]},{"id":"565","firstname":"Jody","surname":"Williams","born":"1950-10-09","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Putney, VT","gender":"female","prizes":[{"year":"1997","category":"peace","share":"2","motivation":"\"for their work for the banning and clearing of anti-personnel mines\"","affiliations":[[]]}]},{"id":"566","firstname":"John","surname":"Hume","born":"1937-01-18","died":"0000-00-00","bornCountry":"Northern Ireland","bornCountryCode":"GB","bornCity":"Londonderry","gender":"male","prizes":[{"year":"1998","category":"peace","share":"2","motivation":"\"for their efforts to find a peaceful solution to the conflict in Northern Ireland\"","affiliations":[[]]}]},{"id":"567","firstname":"David","surname":"Trimble","born":"1944-10-15","died":"0000-00-00","bornCountry":"Northern Ireland","bornCountryCode":"GB","bornCity":"Belfast","gender":"male","prizes":[{"year":"1998","category":"peace","share":"2","motivation":"\"for their efforts to find a peaceful solution to the conflict in Northern Ireland\"","affiliations":[[]]}]},{"id":"568","firstname":"Médecins Sans Frontières","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"1999","category":"peace","share":"1","motivation":"\"in recognition of the organization's pioneering humanitarian work on several continents\"","affiliations":[[]]}]},{"id":"569","firstname":"Sully","surname":"Prudhomme","born":"1839-03-16","died":"1907-09-07","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Châtenay","gender":"male","prizes":[{"year":"1901","category":"literature","share":"1","motivation":"\"in special recognition of his poetic composition, which gives evidence of lofty idealism, artistic perfection and a rare combination of the qualities of both heart and intellect\"","affiliations":[[]]}]},{"id":"571","firstname":"Christian Matthias Theodor","surname":"Mommsen","born":"1817-11-30","died":"1903-11-01","bornCountry":"Schleswig (now Germany)","bornCountryCode":"DE","bornCity":"Garding","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Charlottenburg","gender":"male","prizes":[{"year":"1902","category":"literature","share":"1","motivation":"\"the greatest living master of the art of historical writing, with special reference to his monumental work, <I>A history of Rome</I>\"","affiliations":[[]]}]},{"id":"572","firstname":"Bjørnstjerne Martinus","surname":"Bjørnson","born":"1832-12-08","died":"1910-04-26","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Kvikne","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1903","category":"literature","share":"1","motivation":"\"as a tribute to his noble, magnificent and versatile poetry, which has always been distinguished by both the freshness of its inspiration and the rare purity of its spirit\"","affiliations":[[]]}]},{"id":"573","firstname":"Frédéric","surname":"Mistral","born":"1830-09-08","died":"1914-03-25","bornCountry":"France","bornCountryCode":"FR","bornCity":"Maillane","diedCountry":"France","diedCountryCode":"FR","diedCity":"Maillane","gender":"male","prizes":[{"year":"1904","category":"literature","share":"2","motivation":"\"in recognition of the fresh originality and true inspiration of his poetic production, which faithfully reflects the natural scenery and native spirit of his people, and, in addition, his significant work as a Proven&ccedil;al philologist\"","affiliations":[[]]}]},{"id":"574","firstname":"José","surname":"Echegaray y Eizaguirre","born":"1832-04-19","died":"1916-09-04","bornCountry":"Spain","bornCountryCode":"ES","bornCity":"Madrid","diedCountry":"Spain","diedCountryCode":"ES","diedCity":"Madrid","gender":"male","prizes":[{"year":"1904","category":"literature","share":"2","motivation":"\"in recognition of the numerous and brilliant compositions which, in an individual and original manner, have revived the great traditions of the Spanish drama\"","affiliations":[[]]}]},{"id":"575","firstname":"Henryk","surname":"Sienkiewicz","born":"1846-05-05","died":"1916-11-15","bornCountry":"Poland","bornCountryCode":"PL","bornCity":"Wola Okrzejska","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Vevey","gender":"male","prizes":[{"year":"1905","category":"literature","share":"1","motivation":"\"because of his outstanding merits as an epic writer\"","affiliations":[[]]}]},{"id":"576","firstname":"Giosuè","surname":"Carducci","born":"1835-07-27","died":"1907-02-16","bornCountry":"Tuscany (now Italy)","bornCountryCode":"IT","bornCity":"Val di Castello","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Bologna","gender":"male","prizes":[{"year":"1906","category":"literature","share":"1","motivation":"\"not only in consideration of his deep learning and critical research, but above all as a tribute to the creative energy, freshness of style, and lyrical force which characterize his poetic masterpieces\"","affiliations":[[]]}]},{"id":"577","firstname":"Rudyard","surname":"Kipling","born":"1865-12-30","died":"1936-01-18","bornCountry":"British India (now India)","bornCountryCode":"IN","bornCity":"Bombay","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1907","category":"literature","share":"1","motivation":"\"in consideration of the power of observation, originality of imagination, virility of ideas and remarkable talent for narration which characterize the creations of this world-famous author\"","affiliations":[[]]}]},{"id":"578","firstname":"Rudolf Christoph","surname":"Eucken","born":"1846-01-05","died":"1926-09-14","bornCountry":"East Friesland (now Germany)","bornCountryCode":"DE","bornCity":"Aurich","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Jena","gender":"male","prizes":[{"year":"1908","category":"literature","share":"1","motivation":"\"in recognition of his earnest search for truth, his penetrating power of thought, his wide range of vision, and the warmth and strength in presentation with which in his numerous works he has vindicated and developed an idealistic philosophy of life\"","affiliations":[[]]}]},{"id":"579","firstname":"Selma Ottilia Lovisa","surname":"Lagerlöf","born":"1858-11-20","died":"1940-03-16","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Mårbacka","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Mårbacka","gender":"female","prizes":[{"year":"1909","category":"literature","share":"1","motivation":"\"in appreciation of the lofty idealism, vivid imagination and spiritual perception that characterize her writings\"","affiliations":[[]]}]},{"id":"580","firstname":"Paul Johann Ludwig","surname":"Heyse","born":"1830-03-15","died":"1914-04-02","bornCountry":"Prussia (now Germany)","bornCountryCode":"DE","bornCity":"Berlin","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Munich","gender":"male","prizes":[{"year":"1910","category":"literature","share":"1","motivation":"\"as a tribute to the consummate artistry, permeated with idealism, which he has demonstrated during his long productive career as a lyric poet, dramatist, novelist and writer of world-renowned short stories\"","affiliations":[[]]}]},{"id":"581","firstname":"Count Maurice (Mooris) Polidore Marie Bernhard","surname":"Maeterlinck","born":"1862-08-29","died":"1949-05-06","bornCountry":"Belgium","bornCountryCode":"BE","bornCity":"Ghent","diedCountry":"France","diedCountryCode":"FR","diedCity":"Nice","gender":"male","prizes":[{"year":"1911","category":"literature","share":"1","motivation":"\"in appreciation of his many-sided literary activities, and especially of his dramatic works, which are distinguished by a wealth of imagination and by a poetic fancy, which reveals, sometimes in the guise of a fairy tale, a deep inspiration, while in a mysterious way they appeal to the readers' own feelings and stimulate their imaginations\"","affiliations":[[]]}]},{"id":"582","firstname":"Gerhart Johann Robert","surname":"Hauptmann","born":"1862-11-15","died":"1946-06-06","bornCountry":"Prussia (now Germany)","bornCountryCode":"DE","bornCity":"Bad Salzbrunn","diedCountry":"Germany (now Poland)","diedCountryCode":"PL","diedCity":"Agnetendorf (now Jagniatków)","gender":"male","prizes":[{"year":"1912","category":"literature","share":"1","motivation":"\"primarily in recognition of his fruitful, varied and outstanding production in the realm of dramatic art\"","affiliations":[[]]}]},{"id":"583","firstname":"Rabindranath","surname":"Tagore","born":"1861-05-07","died":"1941-08-07","bornCountry":"India","bornCountryCode":"IN","bornCity":"Calcutta","diedCountry":"India","diedCountryCode":"IN","diedCity":"Calcutta","gender":"male","prizes":[{"year":"1913","category":"literature","share":"1","motivation":"\"because of his profoundly sensitive, fresh and beautiful verse, by which, with consummate skill, he has made his poetic thought, expressed in his own English words, a part of the literature of the West\"","affiliations":[[]]}]},{"id":"584","firstname":"Romain","surname":"Rolland","born":"1866-01-29","died":"1944-12-30","bornCountry":"France","bornCountryCode":"FR","bornCity":"Clamecy","diedCountry":"France","diedCountryCode":"FR","diedCity":"Vézelay","gender":"male","prizes":[{"year":"1915","category":"literature","share":"1","motivation":"\"as a tribute to the lofty idealism of his literary production and to the sympathy and love of truth with which he has described different types of human beings\"","affiliations":[[]]}]},{"id":"585","firstname":"Carl Gustaf Verner","surname":"von Heidenstam","born":"1859-07-06","died":"1940-05-20","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Olshammar","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Övralid","gender":"male","prizes":[{"year":"1916","category":"literature","share":"1","motivation":"\"in recognition of his significance as the leading representative of a new era in our literature\"","affiliations":[[]]}]},{"id":"586","firstname":"Karl Adolph","surname":"Gjellerup","born":"1857-06-02","died":"1919-10-11","bornCountry":"Denmark","bornCountryCode":"DK","bornCity":"Roholte","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Klotzsche","gender":"male","prizes":[{"year":"1917","category":"literature","share":"2","motivation":"\"for his varied and rich poetry, which is inspired by lofty ideals\"","affiliations":[[]]}]},{"id":"587","firstname":"Henrik","surname":"Pontoppidan","born":"1857-07-24","died":"1943-08-21","bornCountry":"Denmark","bornCountryCode":"DK","bornCity":"Fredericia","diedCountry":"Denmark","diedCountryCode":"DK","diedCity":"Ordrup","gender":"male","prizes":[{"year":"1917","category":"literature","share":"2","motivation":"\"for his authentic descriptions of present-day life in Denmark\"","affiliations":[[]]}]},{"id":"588","firstname":"Carl Friedrich Georg","surname":"Spitteler","born":"1845-04-24","died":"1924-12-29","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Liestal","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Lucerne","gender":"male","prizes":[{"year":"1919","category":"literature","share":"1","motivation":"\"in special appreciation of his epic, <I>Olympian Spring</I>\"","affiliations":[[]]}]},{"id":"589","firstname":"Knut Pedersen","surname":"Hamsun","born":"1859-08-04","died":"1952-02-19","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Lom","diedCountry":"Norway","diedCountryCode":"NO","diedCity":"Grimstad","gender":"male","prizes":[{"year":"1920","category":"literature","share":"1","motivation":"\"for his monumental work, <I>Growth of the Soil</I>\"","affiliations":[[]]}]},{"id":"590","firstname":"Anatole","surname":"France","born":"1844-04-16","died":"1924-10-12","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Saint-Cyr-sur-Loire","gender":"male","prizes":[{"year":"1921","category":"literature","share":"1","motivation":"\"in recognition of his brilliant literary achievements, characterized as they are by a nobility of style, a profound human sympathy, grace, and a true Gallic temperament\"","affiliations":[[]]}]},{"id":"592","firstname":"Jacinto","surname":"Benavente","born":"1866-08-12","died":"1954-07-14","bornCountry":"Spain","bornCountryCode":"ES","bornCity":"Madrid","diedCountry":"Spain","diedCountryCode":"ES","diedCity":"Madrid","gender":"male","prizes":[{"year":"1922","category":"literature","share":"1","motivation":"\"for the happy manner in which he has continued the illustrious traditions of the Spanish drama\"","affiliations":[[]]}]},{"id":"593","firstname":"William Butler","surname":"Yeats","born":"1865-06-13","died":"1939-01-28","bornCountry":"Ireland","bornCountryCode":"IE","bornCity":"Dublin","diedCountry":"France","diedCountryCode":"FR","diedCity":"Roquebrune-Cap-Martin","gender":"male","prizes":[{"year":"1923","category":"literature","share":"1","motivation":"\"for his always inspired poetry, which in a highly artistic form gives expression to the spirit of a whole nation\"","affiliations":[[]]}]},{"id":"594","firstname":"Wladyslaw Stanislaw","surname":"Reymont","born":"1867-05-07","died":"1925-12-05","bornCountry":"Russian Empire (now Poland)","bornCountryCode":"PL","bornCity":"Kobiele Wielkie","diedCountry":"Poland","diedCountryCode":"PL","diedCity":"Warsaw","gender":"male","prizes":[{"year":"1924","category":"literature","share":"1","motivation":"\"for his great national epic, <I>The Peasants</I>\"","affiliations":[[]]}]},{"id":"596","firstname":"George Bernard","surname":"Shaw","born":"1856-07-26","died":"1950-11-02","bornCountry":"Ireland","bornCountryCode":"IE","bornCity":"Dublin","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Ayot St. Lawrence","gender":"male","prizes":[{"year":"1925","category":"literature","share":"1","motivation":"\"for his work which is marked by both idealism and humanity, its stimulating satire often being infused with a singular poetic beauty\"","affiliations":[[]]}]},{"id":"597","firstname":"Grazia","surname":"Deledda","born":"1871-09-27","died":"1936-08-15","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Nuoro, Sardinia","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Rome","gender":"female","prizes":[{"year":"1926","category":"literature","share":"1","motivation":"\"for her idealistically inspired writings which with plastic clarity picture the life on her native island and with depth and sympathy deal with human problems in general\"","affiliations":[[]]}]},{"id":"600","firstname":"Henri","surname":"Bergson","born":"1859-10-18","died":"1941-01-04","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1927","category":"literature","share":"1","motivation":"\"in recognition of his rich and vitalizing ideas and the brilliant skill with which they have been presented\"","affiliations":[[]]}]},{"id":"601","firstname":"Sigrid","surname":"Undset","born":"1882-05-20","died":"1949-06-10","bornCountry":"Denmark","bornCountryCode":"DK","bornCity":"Kalundborg","diedCountry":"Norway","diedCountryCode":"NO","diedCity":"Lillehammer","gender":"female","prizes":[{"year":"1928","category":"literature","share":"1","motivation":"\"principally for her powerful descriptions of Northern life during the Middle Ages\"","affiliations":[[]]}]},{"id":"602","firstname":"Thomas","surname":"Mann","born":"1875-06-06","died":"1955-08-12","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Lübeck","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Zurich","gender":"male","prizes":[{"year":"1929","category":"literature","share":"1","motivation":"\"principally for his great novel, <I>Buddenbrooks</I>, which has won steadily increased recognition as one of the classic works of contemporary literature\"","affiliations":[[]]}]},{"id":"603","firstname":"Sinclair","surname":"Lewis","born":"1885-02-07","died":"1951-01-10","bornCountry":"USA","bornCountryCode":"US","bornCity":"Sauk Centre, MN","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Rome","gender":"male","prizes":[{"year":"1930","category":"literature","share":"1","motivation":"\"for his vigorous and graphic art of description and his ability to create, with wit and humour, new types of characters\"","affiliations":[[]]}]},{"id":"604","firstname":"Erik Axel","surname":"Karlfeldt","born":"1864-07-20","died":"1931-04-08","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Karlbo","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1931","category":"literature","share":"1","motivation":"\"The poetry of Erik Axel Karlfeldt\"","affiliations":[[]]}]},{"id":"605","firstname":"John","surname":"Galsworthy","born":"1867-08-14","died":"1933-01-31","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Kingston Hill","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1932","category":"literature","share":"1","motivation":"\"for his distinguished art of narration which takes its highest form in <I>The Forsyte Saga</I>\"","affiliations":[[]]}]},{"id":"606","firstname":"Ivan Alekseyevich","surname":"Bunin","born":"1870-10-22","died":"1953-11-08","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Voronezh","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1933","category":"literature","share":"1","motivation":"\"for the strict artistry with which he has carried on the classical Russian traditions in prose writing\"","affiliations":[[]]}]},{"id":"607","firstname":"Luigi","surname":"Pirandello","born":"1867-06-28","died":"1936-12-10","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Agrigento, Sicily","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Rome","gender":"male","prizes":[{"year":"1934","category":"literature","share":"1","motivation":"\"for his bold and ingenious revival of dramatic and scenic art\"","affiliations":[[]]}]},{"id":"608","firstname":"Eugene Gladstone","surname":"O'Neill","born":"1888-10-16","died":"1953-11-27","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Boston, MA","gender":"male","prizes":[{"year":"1936","category":"literature","share":"1","motivation":"\"for the power, honesty and deep-felt emotions of his dramatic works, which embody an original concept of tragedy\"","affiliations":[[]]}]},{"id":"609","firstname":"Roger","surname":"Martin du Gard","born":"1881-03-23","died":"1958-08-22","bornCountry":"France","bornCountryCode":"FR","bornCity":"Neuilly-sur-Seine","diedCountry":"France","diedCountryCode":"FR","diedCity":"Bellême","gender":"male","prizes":[{"year":"1937","category":"literature","share":"1","motivation":"\"for the artistic power and truth with which he has depicted human conflict as well as some fundamental aspects of contemporary life in his novel-cycle <I>Les Thibault</I>\"","affiliations":[[]]}]},{"id":"610","firstname":"Pearl","surname":"Buck","born":"1892-06-26","died":"1973-03-06","bornCountry":"USA","bornCountryCode":"US","bornCity":"Hillsboro, WV","diedCountry":"USA","diedCountryCode":"US","diedCity":"Danby, VT","gender":"female","prizes":[{"year":"1938","category":"literature","share":"1","motivation":"\"for her rich and truly epic descriptions of peasant life in China and for her biographical masterpieces\"","affiliations":[[]]}]},{"id":"613","firstname":"Frans Eemil","surname":"Sillanpää","born":"1888-09-16","died":"1964-06-03","bornCountry":"Russian Empire (now Finland)","bornCountryCode":"FI","bornCity":"Hämeenkyrö","diedCountry":"Finland","diedCountryCode":"FI","diedCity":"Helsinki","gender":"male","prizes":[{"year":"1939","category":"literature","share":"1","motivation":"\"for his deep understanding of his country's peasantry and the exquisite art with which he has portrayed their way of life and their relationship with Nature\"","affiliations":[[]]}]},{"id":"614","firstname":"Johannes Vilhelm","surname":"Jensen","born":"1873-01-20","died":"1950-11-25","bornCountry":"Denmark","bornCountryCode":"DK","bornCity":"Farsø","diedCountry":"Denmark","diedCountryCode":"DK","diedCity":"Copenhagen","gender":"male","prizes":[{"year":"1944","category":"literature","share":"1","motivation":"\"for the rare strength and fertility of his poetic imagination with which is combined an intellectual curiosity of wide scope and a bold, freshly creative style\"","affiliations":[[]]}]},{"id":"615","firstname":"Gabriela","surname":"Mistral","born":"1889-04-07","died":"1957-01-10","bornCountry":"Chile","bornCountryCode":"CL","bornCity":"Vicuña","diedCountry":"USA","diedCountryCode":"US","diedCity":"Hempstead, NY","gender":"female","prizes":[{"year":"1945","category":"literature","share":"1","motivation":"\"for her lyric poetry which, inspired by powerful emotions, has made her name a symbol of the idealistic aspirations of the entire Latin American world\"","affiliations":[[]]}]},{"id":"617","firstname":"Hermann","surname":"Hesse","born":"1877-07-02","died":"1962-08-09","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Calw","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Montagnola","gender":"male","prizes":[{"year":"1946","category":"literature","share":"1","motivation":"\"for his inspired writings which, while growing in boldness and penetration, exemplify the classical humanitarian ideals and high qualities of style\"","affiliations":[[]]}]},{"id":"618","firstname":"André Paul Guillaume","surname":"Gide","born":"1869-11-22","died":"1951-02-19","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1947","category":"literature","share":"1","motivation":"\"for his comprehensive and artistically significant writings, in which human problems and conditions have been presented with a fearless love of truth and keen psychological insight\"","affiliations":[[]]}]},{"id":"619","firstname":"Thomas Stearns","surname":"Eliot","born":"1888-09-26","died":"1965-01-04","bornCountry":"USA","bornCountryCode":"US","bornCity":"St. Louis, MO","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1948","category":"literature","share":"1","motivation":"\"for his outstanding, pioneer contribution to present-day poetry\"","affiliations":[[]]}]},{"id":"620","firstname":"William","surname":"Faulkner","born":"1897-09-25","died":"1962-07-06","bornCountry":"USA","bornCountryCode":"US","bornCity":"New Albany, MS","diedCountry":"USA","diedCountryCode":"US","diedCity":"Byhalia, MS","gender":"male","prizes":[{"year":"1949","category":"literature","share":"1","motivation":"\"for his powerful and artistically unique contribution to the modern American novel\"","affiliations":[[]]}]},{"id":"621","firstname":"Earl (Bertrand Arthur William)","surname":"Russell","born":"1872-05-18","died":"1970-02-02","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Trelleck","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Penrhyndeudraeth","gender":"male","prizes":[{"year":"1950","category":"literature","share":"1","motivation":"\"in recognition of his varied and significant writings in which he champions humanitarian ideals and freedom of thought\"","affiliations":[[]]}]},{"id":"622","firstname":"Pär Fabian","surname":"Lagerkvist","born":"1891-05-23","died":"1974-07-11","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Växjö","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1951","category":"literature","share":"1","motivation":"\"for the artistic vigour and true independence of mind with which he endeavours in his poetry to find answers to the eternal questions confronting mankind\"","affiliations":[[]]}]},{"id":"623","firstname":"François","surname":"Mauriac","born":"1885-10-11","died":"1970-09-01","bornCountry":"France","bornCountryCode":"FR","bornCity":"Bordeaux","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1952","category":"literature","share":"1","motivation":"\"for the deep spiritual insight and the artistic intensity with which he has in his novels penetrated the drama of human life\"","affiliations":[[]]}]},{"id":"624","firstname":"Sir Winston Leonard Spencer","surname":"Churchill","born":"1874-11-30","died":"1965-01-24","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Woodstock","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"1953","category":"literature","share":"1","motivation":"\"for his mastery of historical and biographical description as well as for brilliant oratory in defending exalted human values\"","affiliations":[[]]}]},{"id":"625","firstname":"Ernest Miller","surname":"Hemingway","born":"1899-07-21","died":"1961-07-02","bornCountry":"USA","bornCountryCode":"US","bornCity":"Oak Park, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"Ketchum, ID","gender":"male","prizes":[{"year":"1954","category":"literature","share":"1","motivation":"\"for his mastery of the art of narrative, most recently demonstrated in <I>The Old Man and the Sea,</I> and for the influence that he has exerted on contemporary style\"","affiliations":[[]]}]},{"id":"626","firstname":"Halldór Kiljan","surname":"Laxness","born":"1902-04-23","died":"1998-02-08","bornCountry":"Iceland","bornCountryCode":"IS","bornCity":"Reykjavik","diedCountry":"Iceland","diedCountryCode":"IS","diedCity":"Reykjavik","gender":"male","prizes":[{"year":"1955","category":"literature","share":"1","motivation":"\"for his vivid epic power which has renewed the great narrative art of Iceland\"","affiliations":[[]]}]},{"id":"627","firstname":"Juan Ramón","surname":"Jiménez","born":"1881-12-24","died":"1958-05-29","bornCountry":"Spain","bornCountryCode":"ES","bornCity":"Moguer","diedCountry":"Puerto Rico","diedCountryCode":"PR","diedCity":"San Juan","gender":"male","prizes":[{"year":"1956","category":"literature","share":"1","motivation":"\"for his lyrical poetry, which in Spanish language constitutes an example of high spirit and artistical purity\"","affiliations":[[]]}]},{"id":"628","firstname":"Albert","surname":"Camus","born":"1913-11-07","died":"1960-01-04","bornCountry":"French Algeria (now Algeria)","bornCountryCode":"DZ","bornCity":"Mondovi","diedCountry":"France","diedCountryCode":"FR","diedCity":"Sens","gender":"male","prizes":[{"year":"1957","category":"literature","share":"1","motivation":"\"for his important literary production, which with clear-sighted earnestness illuminates the problems of the human conscience in our times\"","affiliations":[[]]}]},{"id":"629","firstname":"Boris Leonidovich","surname":"Pasternak","born":"1890-02-10","died":"1960-05-30","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Moscow","diedCountry":"Russia","diedCountryCode":"RU","diedCity":"Peredelkino","gender":"male","prizes":[{"year":"1958","category":"literature","share":"1","motivation":"\"for his important achievement both in contemporary lyrical poetry and in the field of the great Russian epic tradition\"","affiliations":[[]]}]},{"id":"630","firstname":"Salvatore","surname":"Quasimodo","born":"1901-08-20","died":"1968-06-14","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Modica","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Naples","gender":"male","prizes":[{"year":"1959","category":"literature","share":"1","motivation":"\"for his lyrical poetry, which with classical fire expresses the tragic experience of life in our own times\"","affiliations":[[]]}]},{"id":"631","firstname":"Saint-John","surname":"Perse","born":"1887-05-31","died":"1975-09-20","bornCountry":"Guadeloupe Island","bornCountryCode":"GP","bornCity":"Pointe-à-Pitre","diedCountry":"France","diedCountryCode":"FR","diedCity":"Presqu'île-de-Giens","gender":"male","prizes":[{"year":"1960","category":"literature","share":"1","motivation":"\"for the soaring flight and the evocative imagery of his poetry which in a visionary fashion reflects the conditions of our time\"","affiliations":[[]]}]},{"id":"633","firstname":"Ivo","surname":"Andric","born":"1892-10-10","died":"1975-03-13","bornCountry":"Bosnia (now Bosnia and Herzegovina)","bornCountryCode":"BA","bornCity":"Dolac","diedCountry":"Yugoslavia (now Serbia)","diedCountryCode":"RS","diedCity":"Belgrade","gender":"male","prizes":[{"year":"1961","category":"literature","share":"1","motivation":"\"for the epic force with which he has traced themes and depicted human destinies drawn from the history of his country\"","affiliations":[[]]}]},{"id":"634","firstname":"John","surname":"Steinbeck","born":"1902-02-27","died":"1968-12-20","bornCountry":"USA","bornCountryCode":"US","bornCity":"Salinas, CA","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1962","category":"literature","share":"1","motivation":"\"for his realistic and imaginative writings, combining as they do sympathetic humour and keen social perception\"","affiliations":[[]]}]},{"id":"635","firstname":"Giorgos","surname":"Seferis","born":"1900-03-13","died":"1971-09-20","bornCountry":"Ottoman Empire (now Turkey)","bornCountryCode":"TR","bornCity":"Smyrna (now Izmir)","diedCountry":"Greece","diedCountryCode":"GR","diedCity":"Athens","gender":"male","prizes":[{"year":"1963","category":"literature","share":"1","motivation":"\"for his eminent lyrical writing, inspired by a deep feeling for the Hellenic world of culture\"","affiliations":[[]]}]},{"id":"637","firstname":"Jean-Paul","surname":"Sartre","born":"1905-06-21","died":"1980-04-15","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1964","category":"literature","share":"1","motivation":"\"for his work which, rich in ideas and filled with the spirit of freedom and the quest for truth, has exerted a far-reaching influence on our age\"","affiliations":[[]]}]},{"id":"638","firstname":"Mikhail Aleksandrovich","surname":"Sholokhov","born":"1905-05-24","died":"1984-02-21","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Veshenskaya","diedCountry":"USSR","diedCountryCode":"RU","diedCity":"Veshenskaya","gender":"male","prizes":[{"year":"1965","category":"literature","share":"1","motivation":"\"for the artistic power and integrity with which, in his epic of the Don, he has given expression to a historic phase in the life of the Russian people\"","affiliations":[[]]}]},{"id":"639","firstname":"Shmuel Yosef","surname":"Agnon","born":"1888-07-17","died":"1970-02-17","bornCountry":"Austria-Hungary (now Ukraine)","bornCountryCode":"UA","bornCity":"Buczacz (now Buchach)","diedCountry":"Israel","diedCountryCode":"IL","diedCity":"Rehovot","gender":"male","prizes":[{"year":"1966","category":"literature","share":"2","motivation":"\"for his profoundly characteristic narrative art with motifs from the life of the Jewish people\"","affiliations":[[]]}]},{"id":"640","firstname":"Nelly","surname":"Sachs","born":"1891-12-10","died":"1970-05-12","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Berlin","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"female","prizes":[{"year":"1966","category":"literature","share":"2","motivation":"\"for her outstanding lyrical and dramatic writing, which interprets Israel's destiny with touching strength\" ","affiliations":[[]]}]},{"id":"641","firstname":"Miguel Angel","surname":"Asturias","born":"1899-10-19","died":"1974-06-09","bornCountry":"Guatemala","bornCountryCode":"GT","bornCity":"Guatemala City","diedCountry":"Spain","diedCountryCode":"ES","diedCity":"Madrid","gender":"male","prizes":[{"year":"1967","category":"literature","share":"1","motivation":"\"for his vivid literary achievement, deep-rooted in the national traits and traditions of Indian peoples of Latin America\"","affiliations":[[]]}]},{"id":"642","firstname":"Yasunari","surname":"Kawabata","born":"1899-06-11","died":"1972-04-16","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Osaka","diedCountry":"Japan","diedCountryCode":"JP","diedCity":"Zushi","gender":"male","prizes":[{"year":"1968","category":"literature","share":"1","motivation":"\"for his narrative mastery, which with great sensibility expresses the essence of the Japanese mind\"","affiliations":[[]]}]},{"id":"643","firstname":"Samuel","surname":"Beckett","born":"1906-04-13","died":"1989-12-22","bornCountry":"Ireland","bornCountryCode":"IE","bornCity":"Dublin","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1969","category":"literature","share":"1","motivation":"\"for his writing, which - in new forms for the novel and drama - in the destitution of modern man acquires its elevation\"","affiliations":[[]]}]},{"id":"644","firstname":"Aleksandr Isayevich","surname":"Solzhenitsyn","born":"1918-12-11","died":"2008-08-03","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Kislovodsk","diedCountry":"Russia","diedCountryCode":"RU","diedCity":"Troitse-Lykovo","gender":"male","prizes":[{"year":"1970","category":"literature","share":"1","motivation":"\"for the ethical force with which he has pursued the indispensable traditions of Russian literature\"","affiliations":[[]]}]},{"id":"645","firstname":"Pablo","surname":"Neruda","born":"1904-07-12","died":"1973-09-23","bornCountry":"Chile","bornCountryCode":"CL","bornCity":"Parral","diedCountry":"Chile","diedCountryCode":"CL","diedCity":"Santiago","gender":"male","prizes":[{"year":"1971","category":"literature","share":"1","motivation":"\"for a poetry that with the action of an elemental force brings alive a continent's destiny and dreams\"","affiliations":[[]]}]},{"id":"647","firstname":"Heinrich","surname":"Böll","born":"1917-12-21","died":"1985-07-16","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Cologne","diedCountry":"West Germany (now Germany)","diedCountryCode":"DE","diedCity":"Bornheim-Merten","gender":"male","prizes":[{"year":"1972","category":"literature","share":"1","motivation":"\"for his writing which through its combination of a broad perspective on his time and a sensitive skill in characterization has contributed to a renewal of German literature\"","affiliations":[[]]}]},{"id":"648","firstname":"Patrick","surname":"White","born":"1912-05-28","died":"1990-09-30","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"Australia","diedCountryCode":"AU","diedCity":"Sydney","gender":"male","prizes":[{"year":"1973","category":"literature","share":"1","motivation":"\"for an epic and psychological narrative art which has introduced a new continent into literature\"","affiliations":[[]]}]},{"id":"649","firstname":"Eyvind","surname":"Johnson","born":"1900-07-29","died":"1976-08-25","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Svartbjörnsbyn","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1974","category":"literature","share":"2","motivation":"\"for a narrative art, far-seeing in lands and ages, in the service of freedom\"","affiliations":[[]]}]},{"id":"650","firstname":"Harry","surname":"Martinson","born":"1904-05-06","died":"1978-02-11","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Jämshög","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1974","category":"literature","share":"2","motivation":"\"for writings that catch the dewdrop and reflect the cosmos\"","affiliations":[[]]}]},{"id":"651","firstname":"Eugenio","surname":"Montale","born":"1896-10-12","died":"1981-09-12","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Genoa","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Milan","gender":"male","prizes":[{"year":"1975","category":"literature","share":"1","motivation":"\"for his distinctive poetry which, with great artistic sensitivity, has interpreted human values under the sign of an outlook on life with no illusions\"","affiliations":[[]]}]},{"id":"652","firstname":"Saul","surname":"Bellow","born":"1915-06-10","died":"2005-04-05","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Montreal","diedCountry":"USA","diedCountryCode":"US","diedCity":"Brookline, MA","gender":"male","prizes":[{"year":"1976","category":"literature","share":"1","motivation":"\"for the human understanding and subtle analysis of contemporary culture that are combined in his work\"","affiliations":[[]]}]},{"id":"653","firstname":"Vicente","surname":"Aleixandre","born":"1898-04-26","died":"1984-12-14","bornCountry":"Spain","bornCountryCode":"ES","bornCity":"Sevilla","diedCountry":"Spain","diedCountryCode":"ES","diedCity":"Madrid","gender":"male","prizes":[{"year":"1977","category":"literature","share":"1","motivation":"\"for a creative poetic writing which illuminates man's condition in the cosmos and in present-day society, at the same time representing the great renewal of the traditions of Spanish poetry between the wars\"","affiliations":[[]]}]},{"id":"654","firstname":"Isaac Bashevis","surname":"Singer","born":"1904-07-14","died":"1991-07-24","bornCountry":"Russian Empire (now Poland)","bornCountryCode":"PL","bornCity":"Leoncin","diedCountry":"USA","diedCountryCode":"US","diedCity":"Surfside, FL","gender":"male","prizes":[{"year":"1978","category":"literature","share":"1","motivation":"\"for his impassioned narrative art which, with roots in a Polish-Jewish cultural tradition, brings universal human conditions to life\"","affiliations":[[]]}]},{"id":"655","firstname":"Odysseus","surname":"Elytis","born":"1911-11-02","died":"1996-03-18","bornCountry":"Crete (now Greece)","bornCountryCode":"GR","bornCity":"Iráklion","diedCountry":"Greece","diedCountryCode":"GR","diedCity":"Athens","gender":"male","prizes":[{"year":"1979","category":"literature","share":"1","motivation":"\"for his poetry, which, against the background of Greek tradition, depicts with sensuous strength and intellectual clear-sightedness modern man's struggle for freedom and creativeness\"","affiliations":[[]]}]},{"id":"657","firstname":"Czeslaw","surname":"Milosz","born":"1911-06-30","died":"2004-08-14","bornCountry":"Russian Empire (now Lithuania)","bornCountryCode":"LT","bornCity":"&#346;eteniai","diedCountry":"Poland","diedCountryCode":"PL","diedCity":"Kraków","gender":"male","prizes":[{"year":"1980","category":"literature","share":"1","motivation":"\"who with uncompromising clear-sightedness voices man's exposed condition in a world of severe conflicts\"","affiliations":[[]]}]},{"id":"658","firstname":"Elias","surname":"Canetti","born":"1905-07-25","died":"1994-08-14","bornCountry":"Bulgaria","bornCountryCode":"BG","bornCity":"Ruse","diedCountry":"Switzerland","diedCountryCode":"CH","diedCity":"Zurich","gender":"male","prizes":[{"year":"1981","category":"literature","share":"1","motivation":"\"for writings marked by a broad outlook, a wealth of ideas and artistic power\"","affiliations":[[]]}]},{"id":"659","firstname":"Gabriel","surname":"García Márquez","born":"1927-03-06","died":"2014-04-17","bornCountry":"Colombia","bornCountryCode":"CO","bornCity":"Aracataca","diedCountry":"Mexico","diedCountryCode":"MX","diedCity":"Mexico City","gender":"male","prizes":[{"year":"1982","category":"literature","share":"1","motivation":"\"for his novels and short stories, in which the fantastic and the realistic are combined in a richly composed world of imagination, reflecting a continent's life and conflicts\"","affiliations":[[]]}]},{"id":"660","firstname":"William","surname":"Golding","born":"1911-09-19","died":"1993-06-19","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"St. Columb Minor","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Perranarworthal","gender":"male","prizes":[{"year":"1983","category":"literature","share":"1","motivation":"\"for his novels which, with the perspicuity of realistic narrative art and the diversity and universality of myth, illuminate the human condition in the world of today\"","affiliations":[[]]}]},{"id":"661","firstname":"Jaroslav","surname":"Seifert","born":"1901-09-23","died":"1986-01-10","bornCountry":"Austria-Hungary (now Czech Republic)","bornCountryCode":"CZ","bornCity":"Prague","diedCountry":"Czechoslovakia","diedCountryCode":"CZ","diedCity":"Prague","gender":"male","prizes":[{"year":"1984","category":"literature","share":"1","motivation":"\"for his poetry which endowed with freshness, sensuality and rich inventiveness provides a liberating image of the indomitable spirit and versatility of man\"","affiliations":[[]]}]},{"id":"662","firstname":"Claude","surname":"Simon","born":"1913-10-10","died":"2005-07-06","bornCountry":"Madagascar","bornCountryCode":"MG","bornCity":"Tananarive (now Antananarivo)","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1985","category":"literature","share":"1","motivation":"\"who in his novel combines the poet's and the painter's creativeness with a deepened awareness of time in the depiction of the human condition\"","affiliations":[[]]}]},{"id":"663","firstname":"Wole","surname":"Soyinka","born":"1934-07-13","died":"0000-00-00","bornCountry":"Nigeria","bornCountryCode":"NG","bornCity":"Abeokuta","gender":"male","prizes":[{"year":"1986","category":"literature","share":"1","motivation":"\"who in a wide cultural perspective and with poetic overtones fashions the drama of existence\"","affiliations":[[]]}]},{"id":"664","firstname":"Joseph","surname":"Brodsky","born":"1940-05-24","died":"1996-01-28","bornCountry":"USSR (now Russia)","bornCountryCode":"RU","bornCity":"Leningrad (now Saint Petersburg)","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1987","category":"literature","share":"1","motivation":"\"for an all-embracing authorship, imbued with clarity of thought and poetic intensity\"","affiliations":[[]]}]},{"id":"665","firstname":"Naguib","surname":"Mahfouz","born":"1911-12-11","died":"2006-08-30","bornCountry":"Egypt","bornCountryCode":"EG","bornCity":"Cairo","diedCountry":"Egypt","diedCountryCode":"EG","diedCity":"Cairo","gender":"male","prizes":[{"year":"1988","category":"literature","share":"1","motivation":"\"who, through works rich in nuance - now clear-sightedly realistic, now evocatively ambiguous - has formed an Arabian narrative art that applies to all mankind\"","affiliations":[[]]}]},{"id":"666","firstname":"Camilo José","surname":"Cela","born":"1916-05-11","died":"2002-01-17","bornCountry":"Spain","bornCountryCode":"ES","bornCity":"Iria Flavia","diedCountry":"Spain","diedCountryCode":"ES","diedCity":"Madrid","gender":"male","prizes":[{"year":"1989","category":"literature","share":"1","motivation":"\"for a rich and intensive prose, which with restrained compassion forms a challenging vision of man's vulnerability\"","affiliations":[[]]}]},{"id":"667","firstname":"Octavio","surname":"Paz","born":"1914-03-31","died":"1998-04-19","bornCountry":"Mexico","bornCountryCode":"MX","bornCity":"Mexico City","diedCountry":"Mexico","diedCountryCode":"MX","diedCity":"Mexico City","gender":"male","prizes":[{"year":"1990","category":"literature","share":"1","motivation":"\"for impassioned writing with wide horizons, characterized by sensuous intelligence and humanistic integrity\"","affiliations":[[]]}]},{"id":"668","firstname":"Nadine","surname":"Gordimer","born":"1923-11-20","died":"2014-07-13","bornCountry":"South Africa","bornCountryCode":"ZA","bornCity":"Springs","diedCountry":"South Africa","diedCountryCode":"ZA","diedCity":"Johannesburg","gender":"female","prizes":[{"year":"1991","category":"literature","share":"1","motivation":"\"who through her magnificent epic writing has - in the words of Alfred Nobel - been of very great benefit to humanity\"","affiliations":[[]]}]},{"id":"669","firstname":"Derek","surname":"Walcott","born":"1930-01-23","died":"2017-03-17","bornCountry":"Saint Lucia","bornCountryCode":"LC","bornCity":"Castries","diedCountry":"Saint Lucia","diedCountryCode":"LC","diedCity":"Gros-Islet","gender":"male","prizes":[{"year":"1992","category":"literature","share":"1","motivation":"\"for a poetic oeuvre of great luminosity, sustained by a historical vision, the outcome of a multicultural commitment\"","affiliations":[[]]}]},{"id":"670","firstname":"Toni","surname":"Morrison","born":"1931-02-18","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Lorain, OH","gender":"female","prizes":[{"year":"1993","category":"literature","share":"1","motivation":"\"who in novels characterized by visionary force and poetic import, gives life to an essential aspect of American reality\"","affiliations":[[]]}]},{"id":"671","firstname":"Kenzaburo","surname":"Oe","born":"1935-01-31","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Uchiko","gender":"male","prizes":[{"year":"1994","category":"literature","share":"1","motivation":"\"who with poetic force creates an imagined world, where life and myth condense to form a disconcerting picture of the human predicament today\"","affiliations":[[]]}]},{"id":"672","firstname":"Seamus","surname":"Heaney","born":"1939-04-13","died":"2013-08-30","bornCountry":"Northern Ireland","bornCountryCode":"GB","bornCity":"Casteldàwson","diedCountry":"Ireland","diedCountryCode":"IE","diedCity":"Dublin","gender":"male","prizes":[{"year":"1995","category":"literature","share":"1","motivation":"\"for works of lyrical beauty and ethical depth, which exalt everyday miracles and the living past\"","affiliations":[[]]}]},{"id":"673","firstname":"Wislawa","surname":"Szymborska","born":"1923-07-02","died":"2012-02-01","bornCountry":"Poland","bornCountryCode":"PL","bornCity":"Bnin (now Kórnik)","diedCountry":"Poland","diedCountryCode":"PL","diedCity":"Kraków","gender":"female","prizes":[{"year":"1996","category":"literature","share":"1","motivation":"\"for poetry that with ironic precision allows the historical and biological context to come to light in fragments of human reality\"","affiliations":[[]]}]},{"id":"674","firstname":"Dario","surname":"Fo","born":"1926-03-24","died":"2016-10-13","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Leggiuno-Sangiano","diedCountry":"Italy","diedCountryCode":"IT","diedCity":"Milano","gender":"male","prizes":[{"year":"1997","category":"literature","share":"1","motivation":"\"who emulates the jesters of the Middle Ages in scourging authority and upholding the dignity of the downtrodden\"","affiliations":[[]]}]},{"id":"675","firstname":"José","surname":"Saramago","born":"1922-11-16","died":"2010-06-18","bornCountry":"Portugal","bornCountryCode":"PT","bornCity":"Azinhaga","diedCountry":"Spain","diedCountryCode":"ES","diedCity":"Lanzarote","gender":"male","prizes":[{"year":"1998","category":"literature","share":"1","motivation":"\"who with parables sustained by imagination, compassion and irony continually enables us once again to apprehend an elusory reality\"","affiliations":[[]]}]},{"id":"676","firstname":"Günter","surname":"Grass","born":"1927-10-16","died":"2015-04-13","bornCountry":"Free City of Danzig (now Poland)","bornCountryCode":"PL","bornCity":"Danzig (now Gdansk)","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Lübeck","gender":"male","prizes":[{"year":"1999","category":"literature","share":"1","motivation":"\"whose frolicsome black fables portray the forgotten face of history\"","affiliations":[[]]}]},{"id":"677","firstname":"Ragnar","surname":"Frisch","born":"1895-03-03","died":"1973-01-31","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Oslo","diedCountry":"Norway","diedCountryCode":"NO","diedCity":"Oslo","gender":"male","prizes":[{"year":"1969","category":"economics","share":"2","motivation":"\"for having developed and applied dynamic models for the analysis of economic processes\"","affiliations":[{"name":"University of Oslo","city":"Oslo","country":"Norway"}]}]},{"id":"678","firstname":"Jan","surname":"Tinbergen","born":"1903-04-12","died":"1994-06-09","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"the Hague","diedCountry":"the Netherlands","diedCountryCode":"NL","diedCity":"the Hague","gender":"male","prizes":[{"year":"1969","category":"economics","share":"2","motivation":"\"for having developed and applied dynamic models for the analysis of economic processes\"","affiliations":[{"name":"The Netherlands School of Economics","city":"Rotterdam","country":"the Netherlands"}]}]},{"id":"679","firstname":"Paul A.","surname":"Samuelson","born":"1915-05-15","died":"2009-12-13","bornCountry":"USA","bornCountryCode":"US","bornCity":"Gary, IN","diedCountry":"USA","diedCountryCode":"US","diedCity":"Belmont, MA","gender":"male","prizes":[{"year":"1970","category":"economics","share":"1","motivation":"\"for the scientific work through which he has developed static and dynamic economic theory and actively contributed to raising the level of analysis in economic science\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"680","firstname":"Simon","surname":"Kuznets","born":"1901-04-30","died":"1985-07-08","bornCountry":"Russian Empire (now Belarus)","bornCountryCode":"BY","bornCity":"Pinsk","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cambridge, MA","gender":"male","prizes":[{"year":"1971","category":"economics","share":"1","motivation":"\"for his empirically founded interpretation of economic growth which has led to new and deepened insight into the economic and social structure and process of development\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"681","firstname":"John R.","surname":"Hicks","born":"1904-04-08","died":"1989-05-20","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Warwick","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Blockley","gender":"male","prizes":[{"year":"1972","category":"economics","share":"2","motivation":"\"for their pioneering contributions to general economic equilibrium theory and welfare theory\"","affiliations":[{"name":"All Souls College","city":"Oxford","country":"United Kingdom"}]}]},{"id":"682","firstname":"Kenneth J.","surname":"Arrow","born":"1921-08-23","died":"2017-02-21","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Palo Alto, CA","gender":"male","prizes":[{"year":"1972","category":"economics","share":"2","motivation":"\"for their pioneering contributions to general economic equilibrium theory and welfare theory\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"683","firstname":"Wassily","surname":"Leontief","born":"1906-08-05","died":"1999-02-05","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"St. Petersburg","diedCountry":"USA","diedCountryCode":"US","diedCity":"New York, NY","gender":"male","prizes":[{"year":"1973","category":"economics","share":"1","motivation":"\"for the development of the input-output method and for its application to important economic problems\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"684","firstname":"Gunnar","surname":"Myrdal","born":"1898-12-06","died":"1987-05-17","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Skattungbyn","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"1974","category":"economics","share":"2","motivation":"\"for their pioneering work in the theory of money and economic fluctuations and for their penetrating analysis of the interdependence of economic, social and institutional phenomena\"","affiliations":[[]]}]},{"id":"685","firstname":"Friedrich August","surname":"von Hayek","born":"1899-05-08","died":"1992-03-23","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Vienna","diedCountry":"Germany","diedCountryCode":"DE","diedCity":"Freiburg","gender":"male","prizes":[{"year":"1974","category":"economics","share":"2","motivation":"\"for their pioneering work in the theory of money and economic fluctuations and for their penetrating analysis of the interdependence of economic, social and institutional phenomena\"","affiliations":[[]]}]},{"id":"686","firstname":"Leonid Vitaliyevich","surname":"Kantorovich","born":"1912-01-19","died":"1986-04-07","bornCountry":"Russian Empire (now Russia)","bornCountryCode":"RU","bornCity":"St. Petersburg","diedCountry":"USSR (now Russia)","diedCountryCode":"RU","diedCity":"Moscow","gender":"male","prizes":[{"year":"1975","category":"economics","share":"2","motivation":"\"for their contributions to the theory of optimum allocation of resources\"","affiliations":[{"name":"Academy of Sciences","city":"Moscow","country":"USSR"}]}]},{"id":"687","firstname":"Tjalling C.","surname":"Koopmans","born":"1910-08-28","died":"1985-02-26","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"'s Graveland","diedCountry":"USA","diedCountryCode":"US","diedCity":"New Haven, CT","gender":"male","prizes":[{"year":"1975","category":"economics","share":"2","motivation":"\"for their contributions to the theory of optimum allocation of resources\"","affiliations":[{"name":"Yale University","city":"New Haven, CT","country":"USA"}]}]},{"id":"688","firstname":"Milton","surname":"Friedman","born":"1912-07-31","died":"2006-11-16","bornCountry":"USA","bornCountryCode":"US","bornCity":"Brooklyn, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"San Francisco, CA","gender":"male","prizes":[{"year":"1976","category":"economics","share":"1","motivation":"\"for his achievements in the fields of consumption analysis, monetary history and theory and for his demonstration of the complexity of stabilization policy\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"689","firstname":"Bertil","surname":"Ohlin","born":"1899-04-23","died":"1979-08-03","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Klippan","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Vålådalen","gender":"male","prizes":[{"year":"1977","category":"economics","share":"2","motivation":"\"for their pathbreaking contribution to the theory of international trade and international capital movements\"","affiliations":[{"name":"Stockholm School of Economics","city":"Stockholm","country":"Sweden"}]}]},{"id":"690","firstname":"James E.","surname":"Meade","born":"1907-06-23","died":"1995-12-22","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Swanage","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1977","category":"economics","share":"2","motivation":"\"for their pathbreaking contribution to the theory of international trade and international capital movements\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"691","firstname":"Herbert A.","surname":"Simon","born":"1916-06-15","died":"2001-02-09","bornCountry":"USA","bornCountryCode":"US","bornCity":"Milwaukee, WI","diedCountry":"USA","diedCountryCode":"US","diedCity":"Pittsburgh, PA","gender":"male","prizes":[{"year":"1978","category":"economics","share":"1","motivation":"\"for his pioneering research into the decision-making process within economic organizations\"","affiliations":[{"name":"Carnegie Mellon University","city":"Pittsburgh, PA","country":"USA"}]}]},{"id":"692","firstname":"Theodore W.","surname":"Schultz","born":"1902-04-30","died":"1998-02-26","bornCountry":"USA","bornCountryCode":"US","bornCity":"Arlington, SD","diedCountry":"USA","diedCountryCode":"US","diedCity":"Evanston, IL","gender":"male","prizes":[{"year":"1979","category":"economics","share":"2","motivation":"\"for their pioneering research into economic development research with particular consideration of the problems of developing countries\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"693","firstname":"Sir Arthur","surname":"Lewis","born":"1915-01-23","died":"1991-06-15","bornCountry":"British West Indies (now Saint Lucia)","bornCountryCode":"LC","bornCity":"Castries","diedCountry":"Barbados","diedCountryCode":"BB","diedCity":"Bridgetown","gender":"male","prizes":[{"year":"1979","category":"economics","share":"2","motivation":"\"for their pioneering research into economic development research with particular consideration of the problems of developing countries\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"694","firstname":"Lawrence R.","surname":"Klein","born":"1920-09-14","died":"2013-10-20","bornCountry":"USA","bornCountryCode":"US","bornCity":"Omaha, NE","diedCountry":"USA","diedCountryCode":"US","diedCity":"Gladwyne, PA","gender":"male","prizes":[{"year":"1980","category":"economics","share":"1","motivation":"\"for the creation of econometric models and the application to the analysis of economic fluctuations and economic policies\"","affiliations":[{"name":"University of Pennsylvania","city":"Philadelphia, PA","country":"USA"}]}]},{"id":"695","firstname":"James","surname":"Tobin","born":"1918-03-05","died":"2002-03-11","bornCountry":"USA","bornCountryCode":"US","bornCity":"Champaign, IL","diedCountry":"USA","diedCountryCode":"US","diedCity":"New Haven, CT","gender":"male","prizes":[{"year":"1981","category":"economics","share":"1","motivation":"\"for his analysis of financial markets and their relations to expenditure decisions, employment, production and prices\"","affiliations":[{"name":"Yale University","city":"New Haven, CT","country":"USA"}]}]},{"id":"696","firstname":"George J.","surname":"Stigler","born":"1911-01-17","died":"1991-12-01","bornCountry":"USA","bornCountryCode":"US","bornCity":"Renton, WA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chicago, IL","gender":"male","prizes":[{"year":"1982","category":"economics","share":"1","motivation":"\"for his seminal studies of industrial structures, functioning of markets and causes and effects of public regulation\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"697","firstname":"Gerard","surname":"Debreu","born":"1921-07-04","died":"2004-12-31","bornCountry":"France","bornCountryCode":"FR","bornCity":"Calais","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1983","category":"economics","share":"1","motivation":"\"for having incorporated new analytical methods into economic theory and for his rigorous reformulation of the theory of general equilibrium\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"698","firstname":"Richard","surname":"Stone","born":"1913-08-30","died":"1991-12-06","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"1984","category":"economics","share":"1","motivation":"\"for having made fundamental contributions to the development of systems of national accounts and hence greatly improved the basis for empirical economic analysis\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"699","firstname":"Franco","surname":"Modigliani","born":"1918-06-18","died":"2003-09-25","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Rome","diedCountry":"USA","diedCountryCode":"US","diedCity":"Cambridge, MA","gender":"male","prizes":[{"year":"1985","category":"economics","share":"1","motivation":"\"for his pioneering analyses of saving and of financial markets\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"700","firstname":"James M.","surname":"Buchanan Jr.","born":"1919-10-03","died":"2013-01-09","bornCountry":"USA","bornCountryCode":"US","bornCity":"Murfreesboro, TN","diedCountry":"USA","diedCountryCode":"US","diedCity":"Blacksburg, VA","gender":"male","prizes":[{"year":"1986","category":"economics","share":"1","motivation":"\"for his development of the contractual and constitutional bases for the theory of economic and political decision-making\"","affiliations":[{"name":"Center for Study of Public Choice","city":"Fairfax, VA","country":"USA"}]}]},{"id":"701","firstname":"Robert M.","surname":"Solow","born":"1924-08-23","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Brooklyn, NY","gender":"male","prizes":[{"year":"1987","category":"economics","share":"1","motivation":"\"for his contributions to the theory of economic growth\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"702","firstname":"Maurice","surname":"Allais","born":"1911-05-31","died":"2010-10-09","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","diedCountry":"France","diedCountryCode":"FR","diedCity":"Paris","gender":"male","prizes":[{"year":"1988","category":"economics","share":"1","motivation":"\"for his pioneering contributions to the theory of markets and efficient utilization of resources\"","affiliations":[{"name":"École Nationale Supérieur des Mines de Paris","city":"Paris","country":"France"}]}]},{"id":"703","firstname":"Trygve","surname":"Haavelmo","born":"1911-12-13","died":"1999-07-26","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Skedsmo","diedCountry":"Norway","diedCountryCode":"NO","diedCity":"Oslo","gender":"male","prizes":[{"year":"1989","category":"economics","share":"1","motivation":"\"for his clarification of the probability theory foundations of econometrics and his analyses of simultaneous economic structures\"","affiliations":[{"name":"University of Oslo","city":"Oslo","country":"Norway"}]}]},{"id":"704","firstname":"Harry M.","surname":"Markowitz","born":"1927-08-24","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","gender":"male","prizes":[{"year":"1990","category":"economics","share":"3","motivation":"\"for their pioneering work in the theory of financial economics\"","affiliations":[{"name":"City University of New York","city":"New York, NY","country":"USA"}]}]},{"id":"705","firstname":"Merton H.","surname":"Miller","born":"1923-05-16","died":"2000-06-03","bornCountry":"USA","bornCountryCode":"US","bornCity":"Boston, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chicago, IL","gender":"male","prizes":[{"year":"1990","category":"economics","share":"3","motivation":"\"for their pioneering work in the theory of financial economics\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"706","firstname":"William F.","surname":"Sharpe","born":"1934-06-16","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Boston, MA","gender":"male","prizes":[{"year":"1990","category":"economics","share":"3","motivation":"\"for their pioneering work in the theory of financial economics\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"707","firstname":"Ronald H.","surname":"Coase","born":"1910-12-29","died":"2013-09-02","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Willesden","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chicago, IL","gender":"male","prizes":[{"year":"1991","category":"economics","share":"1","motivation":"\"for his discovery and clarification of the significance of transaction costs and property rights for the institutional structure and functioning of the economy\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"708","firstname":"Gary S.","surname":"Becker","born":"1930-12-02","died":"2014-05-03","bornCountry":"USA","bornCountryCode":"US","bornCity":"Pottsville, PA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chicago, IL","gender":"male","prizes":[{"year":"1992","category":"economics","share":"1","motivation":"\"for having extended the domain of microeconomic analysis to a wide range of human behaviour and interaction, including nonmarket behaviour\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"709","firstname":"Robert W.","surname":"Fogel","born":"1927-07-01","died":"2013-06-11","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Oak Lawn, IL","gender":"male","prizes":[{"year":"1993","category":"economics","share":"2","motivation":"\"for having renewed research in economic history by applying economic theory and quantitative methods in order to explain economic and institutional change\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"710","firstname":"Douglass C.","surname":"North","born":"1920-11-05","died":"2015-11-23","bornCountry":"USA","bornCountryCode":"US","bornCity":"Cambridge, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Benzonia, MI","gender":"male","prizes":[{"year":"1993","category":"economics","share":"2","motivation":"\"for having renewed research in economic history by applying economic theory and quantitative methods in order to explain economic and institutional change\"","affiliations":[{"name":"Washington University","city":"St. Louis, MO","country":"USA"}]}]},{"id":"711","firstname":"John C.","surname":"Harsanyi","born":"1920-05-29","died":"2000-08-09","bornCountry":"Hungary","bornCountryCode":"HU","bornCity":"Budapest","diedCountry":"USA","diedCountryCode":"US","diedCity":"Berkeley, CA","gender":"male","prizes":[{"year":"1994","category":"economics","share":"3","motivation":"\"for their pioneering analysis of equilibria in the theory of non-cooperative games\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"712","firstname":"John F.","surname":"Nash Jr.","born":"1928-06-13","died":"2015-05-23","bornCountry":"USA","bornCountryCode":"US","bornCity":"Bluefield, WV","diedCountry":"USA","diedCountryCode":"US","diedCity":"New Jersey, NJ","gender":"male","prizes":[{"year":"1994","category":"economics","share":"3","motivation":"\"for their pioneering analysis of equilibria in the theory of non-cooperative games\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"713","firstname":"Reinhard","surname":"Selten","born":"1930-10-05","died":"2016-08-23","bornCountry":"Germany (now Poland)","bornCountryCode":"PL","bornCity":"Breslau (now Wroclaw)","diedCountry":"Poland","diedCountryCode":"PL","diedCity":"Poznan","gender":"male","prizes":[{"year":"1994","category":"economics","share":"3","motivation":"\"for their pioneering analysis of equilibria in the theory of non-cooperative games\"","affiliations":[{"name":"Rheinische Friedrich-Wilhelms-Universität","city":"Bonn","country":"Federal Republic of Germany"}]}]},{"id":"714","firstname":"Robert E.","surname":"Lucas Jr.","born":"1937-09-15","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Yakima, WA","gender":"male","prizes":[{"year":"1995","category":"economics","share":"1","motivation":"\"for having developed and applied the hypothesis of rational expectations, and thereby having transformed macroeconomic analysis and deepened our understanding of economic policy\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"715","firstname":"James A.","surname":"Mirrlees","born":"1936-07-05","died":"0000-00-00","bornCountry":"Scotland","bornCountryCode":"GB","bornCity":"Minnigaff","gender":"male","prizes":[{"year":"1996","category":"economics","share":"2","motivation":"\"for their fundamental contributions to the economic theory of incentives under asymmetric information\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"716","firstname":"William","surname":"Vickrey","born":"1914-06-21","died":"1996-10-11","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Victoria, BC","diedCountry":"USA","diedCountryCode":"US","diedCity":"Harrison, NY","gender":"male","prizes":[{"year":"1996","category":"economics","share":"2","motivation":"\"for their fundamental contributions to the economic theory of incentives under asymmetric information\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"717","firstname":"Robert C.","surname":"Merton","born":"1944-07-31","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"1997","category":"economics","share":"2","motivation":"\"for a new method to determine the value of derivatives\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"718","firstname":"Myron S.","surname":"Scholes","born":"1941-07-01","died":"0000-00-00","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Timmins, ON","gender":"male","prizes":[{"year":"1997","category":"economics","share":"2","motivation":"\"for a new method to determine the value of derivatives\"","affiliations":[{"name":"Long Term Capital Management","city":"Greenwich, CT","country":"USA"}]}]},{"id":"719","firstname":"Amartya","surname":"Sen","born":"1933-11-03","died":"0000-00-00","bornCountry":"India","bornCountryCode":"IN","bornCity":"Santiniketan","gender":"male","prizes":[{"year":"1998","category":"economics","share":"1","motivation":"\"for his contributions to welfare economics\"","affiliations":[{"name":"Trinity College","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"720","firstname":"Robert A.","surname":"Mundell","born":"1932-10-24","died":"0000-00-00","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Kingston, ON","gender":"male","prizes":[{"year":"1999","category":"economics","share":"1","motivation":"\"for his analysis of monetary and fiscal policy under different exchange rate regimes and his analysis of optimum currency areas\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"721","firstname":"Il´ja Mikhailovich","surname":"Frank","born":"1908-10-23","died":"1990-06-22","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Leningrad (now Saint Petersburg)","diedCountry":"USSR (now Russia)","diedCountryCode":"RU","diedCity":"Moscow","gender":"male","prizes":[{"year":"1958","category":"physics","share":"3","motivation":"\"for the discovery and the interpretation of the Cherenkov effect\"","affiliations":[{"name":"University of Moscow","city":"Moscow","country":"USSR"},{"name":"P.N. Lebedev Physical Institute","city":"Moscow","country":"USSR"}]}]},{"id":"722","firstname":"Arvid","surname":"Carlsson","born":"1923-01-25","died":"0000-00-00","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Uppsala","gender":"male","prizes":[{"year":"2000","category":"medicine","share":"3","motivation":"\"for their discoveries concerning signal transduction in the nervous system\"","affiliations":[{"name":"Göteborg University","city":"Gothenburg","country":"Sweden"}]}]},{"id":"723","firstname":"Paul","surname":"Greengard","born":"1925-12-11","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2000","category":"medicine","share":"3","motivation":"\"for their discoveries concerning signal transduction in the nervous system\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"}]}]},{"id":"724","firstname":"Eric R.","surname":"Kandel","born":"1929-11-07","died":"0000-00-00","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Vienna","gender":"male","prizes":[{"year":"2000","category":"medicine","share":"3","motivation":"\"for their discoveries concerning signal transduction in the nervous system\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"725","firstname":"Kim","surname":"Dae-jung","born":"1925-12-03","died":"2009-08-18","bornCountry":"Korea (now South Korea)","bornCountryCode":"KR","bornCity":"Mokpo","gender":"male","prizes":[{"year":"2000","category":"peace","share":"1","motivation":"\"for his work for democracy and human rights in South Korea and in East Asia in general, and for peace and reconciliation with North Korea in particular\"","affiliations":[[]]}]},{"id":"726","firstname":"Zhores I.","surname":"Alferov","born":"1930-03-15","died":"0000-00-00","bornCountry":"USSR (now Belarus)","bornCountryCode":"BY","bornCity":"Vitebsk, Belorussia","gender":"male","prizes":[{"year":"2000","category":"physics","overallMotivation":"\"for basic work on information and communication technology\"","share":"4","motivation":"\"for developing semiconductor heterostructures used in high-speed- and opto-electronics\"","affiliations":[{"name":"A.F. Ioffe Physico-Technical Institute","city":"St. Petersburg","country":"Russia"}]}]},{"id":"727","firstname":"Herbert","surname":"Kroemer","born":"1928-08-25","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Weimar","gender":"male","prizes":[{"year":"2000","category":"physics","overallMotivation":"\"for basic work on information and communication technology\"","share":"4","motivation":"\"for developing semiconductor heterostructures used in high-speed- and opto-electronics\"","affiliations":[{"name":"University of California","city":"Santa Barbara, CA","country":"USA"}]}]},{"id":"728","firstname":"Jack S.","surname":"Kilby","born":"1923-11-08","died":"2005-06-20","bornCountry":"USA","bornCountryCode":"US","bornCity":"Jefferson City, MO","diedCountry":"USA","diedCountryCode":"US","diedCity":"Dallas, TX","gender":"male","prizes":[{"year":"2000","category":"physics","overallMotivation":"\"for basic work on information and communication technology\"","share":"2","motivation":"\"for his part in the invention of the integrated circuit\"","affiliations":[{"name":"Texas Instruments","city":"Dallas, TX","country":"USA"}]}]},{"id":"729","firstname":"Alan J.","surname":"Heeger","born":"1936-01-22","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Sioux City, IA","gender":"male","prizes":[{"year":"2000","category":"chemistry","share":"3","motivation":"\"for the discovery and development of conductive polymers\"","affiliations":[{"name":"University of California","city":"Santa Barbara, CA","country":"USA"}]}]},{"id":"730","firstname":"Alan G.","surname":"MacDiarmid","born":"1927-04-14","died":"2007-02-07","bornCountry":"New Zealand","bornCountryCode":"NZ","bornCity":"Masterton","diedCountry":"USA","diedCountryCode":"US","diedCity":"Drexel Hill, PA","gender":"male","prizes":[{"year":"2000","category":"chemistry","share":"3","motivation":"\"for the discovery and development of conductive polymers\"","affiliations":[{"name":"University of Pennsylvania","city":"Philadelphia, PA","country":"USA"}]}]},{"id":"731","firstname":"Hideki","surname":"Shirakawa","born":"1936-08-20","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Tokyo","gender":"male","prizes":[{"year":"2000","category":"chemistry","share":"3","motivation":"\"for the discovery and development of conductive polymers\"","affiliations":[{"name":"University of Tsukuba","city":"Tokyo","country":"Japan"}]}]},{"id":"732","firstname":"James J.","surname":"Heckman","born":"1944-04-19","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","gender":"male","prizes":[{"year":"2000","category":"economics","share":"2","motivation":"\"for his development of theory and methods for analyzing selective samples\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"733","firstname":"Daniel L.","surname":"McFadden","born":"1937-07-29","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Raleigh, NC","gender":"male","prizes":[{"year":"2000","category":"economics","share":"2","motivation":"\"for his development of theory and methods for analyzing discrete choice\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"734","firstname":"Gao","surname":"Xingjian","born":"1940-01-04","died":"0000-00-00","bornCountry":"China","bornCountryCode":"CN","bornCity":"Ganzhou","gender":"male","prizes":[{"year":"2000","category":"literature","share":"1","motivation":"\"for an &aelig;uvre of universal validity, bitter insights and linguistic ingenuity, which has opened new paths for the Chinese novel and drama\"","affiliations":[[]]}]},{"id":"735","firstname":"Leland H.","surname":"Hartwell","born":"1939-10-30","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Los Angeles, CA","gender":"male","prizes":[{"year":"2001","category":"medicine","share":"3","motivation":"\"for their discoveries of key regulators of the cell cycle\"","affiliations":[{"name":"Fred Hutchinson Cancer Research Center","city":"Seattle, WA","country":"USA"}]}]},{"id":"736","firstname":"Tim","surname":"Hunt","born":"1943-02-19","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Neston","gender":"male","prizes":[{"year":"2001","category":"medicine","share":"3","motivation":"\"for their discoveries of key regulators of the cell cycle\"","affiliations":[{"name":"Imperial Cancer Research Fund","city":"London","country":"United Kingdom"}]}]},{"id":"737","firstname":"Sir Paul M.","surname":"Nurse","born":"1949-01-25","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Norwich","gender":"male","prizes":[{"year":"2001","category":"medicine","share":"3","motivation":"\"for their discoveries of key regulators of the cell cycle\"","affiliations":[{"name":"Imperial Cancer Research Fund","city":"London","country":"United Kingdom"}]}]},{"id":"738","firstname":"Eric A.","surname":"Cornell","born":"1961-12-19","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Palo Alto, CA","gender":"male","prizes":[{"year":"2001","category":"physics","share":"3","motivation":"\"for the achievement of Bose-Einstein condensation in dilute gases of alkali atoms, and for early fundamental studies of the properties of the condensates\"","affiliations":[{"name":"University of Colorado, JILA","city":"Boulder, CO","country":"USA"}]}]},{"id":"739","firstname":"Wolfgang","surname":"Ketterle","born":"1957-10-21","died":"0000-00-00","bornCountry":"West Germany (now Germany)","bornCountryCode":"DE","bornCity":"Heidelberg","gender":"male","prizes":[{"year":"2001","category":"physics","share":"3","motivation":"\"for the achievement of Bose-Einstein condensation in dilute gases of alkali atoms, and for early fundamental studies of the properties of the condensates\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"740","firstname":"Carl E.","surname":"Wieman","born":"1951-03-26","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Corvallis, OR","gender":"male","prizes":[{"year":"2001","category":"physics","share":"3","motivation":"\"for the achievement of Bose-Einstein condensation in dilute gases of alkali atoms, and for early fundamental studies of the properties of the condensates\"","affiliations":[{"name":"University of Colorado, JILA","city":"Boulder, CO","country":"USA"}]}]},{"id":"741","firstname":"William S.","surname":"Knowles","born":"1917-06-01","died":"2012-06-13","bornCountry":"USA","bornCountryCode":"US","bornCity":"Taunton, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chesterfield, MO","gender":"male","prizes":[{"year":"2001","category":"chemistry","share":"4","motivation":"\"for their work on chirally catalysed hydrogenation reactions\"","affiliations":[{"city":"St. Louis, MO","country":"USA"}]}]},{"id":"742","firstname":"Ryoji","surname":"Noyori","born":"1938-09-03","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Kobe","gender":"male","prizes":[{"year":"2001","category":"chemistry","share":"4","motivation":"\"for their work on chirally catalysed hydrogenation reactions\"","affiliations":[{"name":"Nagoya University","city":"Nagoya","country":"Japan"}]}]},{"id":"743","firstname":"K. Barry","surname":"Sharpless","born":"1941-04-28","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Philadelphia, PA","gender":"male","prizes":[{"year":"2001","category":"chemistry","share":"2","motivation":"\"for his work on chirally catalysed oxidation reactions\"","affiliations":[{"name":"The Scripps Research Institute","city":"La Jolla, CA","country":"USA"}]}]},{"id":"744","firstname":"George A.","surname":"Akerlof","born":"1940-06-17","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New Haven, CT","gender":"male","prizes":[{"year":"2001","category":"economics","share":"3","motivation":"\"for their analyses of markets with asymmetric information\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"745","firstname":"A. Michael","surname":"Spence","born":"1943-00-00","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Montclair, NJ","gender":"male","prizes":[{"year":"2001","category":"economics","share":"3","motivation":"\"for their analyses of markets with asymmetric information\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"746","firstname":"Joseph E.","surname":"Stiglitz","born":"1943-02-09","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Gary, IN","gender":"male","prizes":[{"year":"2001","category":"economics","share":"3","motivation":"\"for their analyses of markets with asymmetric information\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"747","firstname":"Sir Vidiadhar Surajprasad","surname":"Naipaul","born":"1932-08-17","died":"0000-00-00","bornCountry":"Trinidad","bornCountryCode":"TT","gender":"male","prizes":[{"year":"2001","category":"literature","share":"1","motivation":"\"for having united perceptive narrative and incorruptible scrutiny in works that compel us to see the presence of suppressed histories\"","affiliations":[[]]}]},{"id":"748","firstname":"United Nations (U.N.)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"2001","category":"peace","share":"2","motivation":"\"for their work for a better organized and more peaceful world\"","affiliations":[[]]}]},{"id":"749","firstname":"Kofi","surname":"Annan","born":"1938-04-08","died":"0000-00-00","bornCountry":"Gold Coast (now Ghana)","bornCountryCode":"GH","bornCity":"Kumasi","gender":"male","prizes":[{"year":"2001","category":"peace","share":"2","motivation":"\"for their work for a better organized and more peaceful world\"","affiliations":[[]]}]},{"id":"750","firstname":"Sydney","surname":"Brenner","born":"1927-01-13","died":"0000-00-00","bornCountry":"South Africa","bornCountryCode":"ZA","bornCity":"Germiston","gender":"male","prizes":[{"year":"2002","category":"medicine","share":"3","motivation":"\"for their discoveries concerning genetic regulation of organ development and programmed cell death'\"","affiliations":[{"name":"The Molecular Sciences Institute","city":"Berkeley, CA","country":"USA"}]}]},{"id":"751","firstname":"H. Robert","surname":"Horvitz","born":"1947-05-08","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","gender":"male","prizes":[{"year":"2002","category":"medicine","share":"3","motivation":"\"for their discoveries concerning genetic regulation of organ development and programmed cell death'\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"752","firstname":"John E.","surname":"Sulston","born":"1942-03-27","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Cambridge","gender":"male","prizes":[{"year":"2002","category":"medicine","share":"3","motivation":"\"for their discoveries concerning genetic regulation of organ development and programmed cell death'\"","affiliations":[{"name":"The Wellcome Trust Sanger Institute","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"753","firstname":"Raymond","surname":"Davis Jr.","born":"1914-10-14","died":"2006-05-31","bornCountry":"USA","bornCountryCode":"US","bornCity":"Washington, DC","diedCountry":"USA","diedCountryCode":"US","diedCity":"Blue Point, NY","gender":"male","prizes":[{"year":"2002","category":"physics","share":"4","motivation":"\"for pioneering contributions to astrophysics, in particular for the detection of cosmic neutrinos\"","affiliations":[{"name":"University of Pennsylvania","city":"Philadelphia, PA","country":"USA"}]}]},{"id":"754","firstname":"Masatoshi","surname":"Koshiba","born":"1926-09-19","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Toyohashi","gender":"male","prizes":[{"year":"2002","category":"physics","share":"4","motivation":"\"for pioneering contributions to astrophysics, in particular for the detection of cosmic neutrinos\"","affiliations":[{"name":"University of Tokyo","city":"Tokyo","country":"Japan"}]}]},{"id":"755","firstname":"Riccardo","surname":"Giacconi","born":"1931-10-06","died":"0000-00-00","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Genoa","gender":"male","prizes":[{"year":"2002","category":"physics","share":"2","motivation":"\"for pioneering contributions to astrophysics, which have led to the discovery of cosmic X-ray sources\"","affiliations":[{"name":"Associated Universities Inc.","city":"Washington, DC","country":"USA"}]}]},{"id":"756","firstname":"John B.","surname":"Fenn","born":"1917-06-15","died":"2010-12-10","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Richmond, VA","gender":"male","prizes":[{"year":"2002","category":"chemistry","overallMotivation":"\"for the development of methods for identification and structure analyses of biological macromolecules\"","share":"4","motivation":"\"for their development of soft desorption ionisation methods for mass spectrometric analyses of biological macromolecules\"","affiliations":[{"name":"Virginia Commonwealth University","city":"Richmond, VA","country":"USA"}]}]},{"id":"757","firstname":"Koichi","surname":"Tanaka","born":"1959-08-03","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Toyama City","gender":"male","prizes":[{"year":"2002","category":"chemistry","overallMotivation":"\"for the development of methods for identification and structure analyses of biological macromolecules\"","share":"4","motivation":"\"for their development of soft desorption ionisation methods for mass spectrometric analyses of biological macromolecules\"","affiliations":[{"name":"Shimadzu Corp.","city":"Kyoto","country":"Japan"}]}]},{"id":"758","firstname":"Kurt","surname":"Wüthrich","born":"1938-10-04","died":"0000-00-00","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Aarberg","gender":"male","prizes":[{"year":"2002","category":"chemistry","overallMotivation":"\"for the development of methods for identification and structure analyses of biological macromolecules\"","share":"2","motivation":"\"for his development of nuclear magnetic resonance spectroscopy for determining the three-dimensional structure of biological macromolecules in solution\"","affiliations":[{"name":"Eidgenössische Technische Hochschule (Swiss Federal Institute of Technology)","city":"Zurich","country":"Switzerland"},{"name":"The Scripps Research Institute","city":"La Jolla, CA","country":"USA"}]}]},{"id":"759","firstname":"Daniel","surname":"Kahneman","born":"1934-03-05","died":"0000-00-00","bornCountry":"British Mandate of Palestine (now Israel)","bornCountryCode":"IL","bornCity":"Tel Aviv","gender":"male","prizes":[{"year":"2002","category":"economics","share":"2","motivation":"\"for having integrated insights from psychological research into economic science, especially concerning human judgment and decision-making under uncertainty\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"760","firstname":"Vernon L.","surname":"Smith","born":"1927-01-01","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Wichita, KS","gender":"male","prizes":[{"year":"2002","category":"economics","share":"2","motivation":"\"for having established laboratory experiments as a tool in empirical economic analysis, especially in the study of alternative market mechanisms\"","affiliations":[{"name":"George Mason University","city":"Fairfax, VA","country":"USA"}]}]},{"id":"761","firstname":"Imre","surname":"Kertész","born":"1929-11-09","died":"2016-03-31","bornCountry":"Hungary","bornCountryCode":"HU","bornCity":"Budapest","diedCountry":"Hungary","diedCountryCode":"HU","diedCity":"Budapest","gender":"male","prizes":[{"year":"2002","category":"literature","share":"1","motivation":"\"for writing that upholds the fragile experience of the individual against the barbaric arbitrariness of history\"","affiliations":[[]]}]},{"id":"762","firstname":"Jimmy","surname":"Carter","born":"1924-10-01","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Plains, GA","gender":"male","prizes":[{"year":"2002","category":"peace","share":"1","motivation":"\"for his decades of untiring effort to find peaceful solutions to international conflicts, to advance democracy and human rights, and to promote economic and social development\"","affiliations":[[]]}]},{"id":"763","firstname":"John M.","surname":"Coetzee","born":"1940-02-09","died":"0000-00-00","bornCountry":"South Africa","bornCountryCode":"ZA","bornCity":"Cape Town","gender":"male","prizes":[{"year":"2003","category":"literature","share":"1","motivation":"\"who in innumerable guises portrays the surprising involvement of the outsider\"","affiliations":[[]]}]},{"id":"764","firstname":"Paul C.","surname":"Lauterbur","born":"1929-05-06","died":"2007-03-27","bornCountry":"USA","bornCountryCode":"US","bornCity":"Sidney, OH","diedCountry":"USA","diedCountryCode":"US","diedCity":"Urbana, IL","gender":"male","prizes":[{"year":"2003","category":"medicine","share":"2","motivation":"\"for their discoveries concerning magnetic resonance imaging\"","affiliations":[{"name":"University of Illinois","city":"Urbana, IL","country":"USA"}]}]},{"id":"765","firstname":"Sir Peter","surname":"Mansfield","born":"1933-10-09","died":"2017-02-08","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","gender":"male","prizes":[{"year":"2003","category":"medicine","share":"2","motivation":"\"for their discoveries concerning magnetic resonance imaging\"","affiliations":[{"name":"University of Nottingham, School of Physics and Astronomy","city":"Nottingham","country":"United Kingdom"}]}]},{"id":"766","firstname":"Alexei A.","surname":"Abrikosov","born":"1928-06-25","died":"2017-03-29","bornCountry":"USSR (now Russia)","bornCountryCode":"RU","bornCity":"Moscow","gender":"male","prizes":[{"year":"2003","category":"physics","share":"3","motivation":"\"for pioneering contributions to the theory of superconductors and superfluids\"","affiliations":[{"name":"Argonne National Laboratory","city":"Argonne, IL","country":"USA"}]}]},{"id":"767","firstname":"Vitaly L.","surname":"Ginzburg","born":"1916-10-04","died":"2009-11-08","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Moscow","gender":"male","prizes":[{"year":"2003","category":"physics","share":"3","motivation":"\"for pioneering contributions to the theory of superconductors and superfluids\"","affiliations":[{"name":"P.N. Lebedev Physical Institute","city":"Moscow","country":"Russia"}]}]},{"id":"768","firstname":"Anthony J.","surname":"Leggett","born":"1938-03-26","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","gender":"male","prizes":[{"year":"2003","category":"physics","share":"3","motivation":"\"for pioneering contributions to the theory of superconductors and superfluids\"","affiliations":[{"name":"University of Illinois","city":"Urbana, IL","country":"USA"}]}]},{"id":"769","firstname":"Peter","surname":"Agre","born":"1949-01-30","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Northfield, MN","gender":"male","prizes":[{"year":"2003","category":"chemistry","overallMotivation":"\"for discoveries concerning channels in cell membranes\"","share":"2","motivation":"\"for the discovery of water channels\"","affiliations":[{"name":"Johns Hopkins University School of Medicine","city":"Baltimore, MD","country":"USA"}]}]},{"id":"770","firstname":"Roderick","surname":"MacKinnon","born":"1956-02-19","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Burlington, MA","gender":"male","prizes":[{"year":"2003","category":"chemistry","overallMotivation":"\"for discoveries concerning channels in cell membranes\"","share":"2","motivation":"\"for structural and mechanistic studies of ion channels\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"},{"name":"Howard Hughes Medical Institute"}]}]},{"id":"771","firstname":"Robert F.","surname":"Engle III","born":"1942-11-10","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Syracuse, NY","gender":"male","prizes":[{"year":"2003","category":"economics","share":"2","motivation":"\"for methods of analyzing economic time series with time-varying volatility (ARCH)\"","affiliations":[{"name":"New York University","city":"New York, NY","country":"USA"}]}]},{"id":"772","firstname":"Clive W.J.","surname":"Granger","born":"1934-09-04","died":"2009-05-27","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Swansea","diedCountry":"USA","diedCountryCode":"US","diedCity":"San Diego, CA","gender":"male","prizes":[{"year":"2003","category":"economics","share":"2","motivation":"\"for methods of analyzing economic time series with common trends (cointegration)\"","affiliations":[{"name":"University of California","city":"San Diego, CA","country":"USA"}]}]},{"id":"773","firstname":"Shirin","surname":"Ebadi","born":"1947-06-21","died":"0000-00-00","bornCountry":"Iran","bornCountryCode":"IR","bornCity":"Hamadan","gender":"female","prizes":[{"year":"2003","category":"peace","share":"1","motivation":"\"for her efforts for democracy and human rights. She has focused especially on the struggle for the rights of women and children\"","affiliations":[[]]}]},{"id":"774","firstname":"Richard","surname":"Axel","born":"1946-07-02","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2004","category":"medicine","share":"2","motivation":"\"for their discoveries of odorant receptors and the organization of the olfactory system\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"775","firstname":"Linda B.","surname":"Buck","born":"1947-01-29","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Seattle, WA","gender":"female","prizes":[{"year":"2004","category":"medicine","share":"2","motivation":"\"for their discoveries of odorant receptors and the organization of the olfactory system\"","affiliations":[{"name":"Fred Hutchinson Cancer Research Center","city":"Seattle, WA","country":"USA"}]}]},{"id":"776","firstname":"David J.","surname":"Gross","born":"1941-02-19","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Washington, DC","gender":"male","prizes":[{"year":"2004","category":"physics","share":"3","motivation":"\"for the discovery of asymptotic freedom in the theory of the strong interaction\"","affiliations":[{"name":"University of California, Kavli Institute for Theoretical Physics","city":"Santa Barbara, CA","country":"USA"}]}]},{"id":"777","firstname":"H. David","surname":"Politzer","born":"1949-08-31","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2004","category":"physics","share":"3","motivation":"\"for the discovery of asymptotic freedom in the theory of the strong interaction\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"778","firstname":"Frank","surname":"Wilczek","born":"1951-05-15","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2004","category":"physics","share":"3","motivation":"\"for the discovery of asymptotic freedom in the theory of the strong interaction\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"779","firstname":"Aaron","surname":"Ciechanover","born":"1947-10-01","died":"0000-00-00","bornCountry":"British Protectorate of Palestine (now Israel)","bornCountryCode":"IL","bornCity":"Haifa","gender":"male","prizes":[{"year":"2004","category":"chemistry","share":"3","motivation":"\"for the discovery of ubiquitin-mediated protein degradation\"","affiliations":[{"name":"Technion - Israel Institute of Technology","city":"Haifa","country":"Israel"}]}]},{"id":"780","firstname":"Avram","surname":"Hershko","born":"1937-12-31","died":"0000-00-00","bornCountry":"Hungary","bornCountryCode":"HU","bornCity":"Karcag","gender":"male","prizes":[{"year":"2004","category":"chemistry","share":"3","motivation":"\"for the discovery of ubiquitin-mediated protein degradation\"","affiliations":[{"name":"Technion - Israel Institute of Technology","city":"Haifa","country":"Israel"}]}]},{"id":"781","firstname":"Irwin","surname":"Rose","born":"1926-07-16","died":"2015-06-03","bornCountry":"USA","bornCountryCode":"US","bornCity":"Brooklyn, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Deerfield, MA","gender":"male","prizes":[{"year":"2004","category":"chemistry","share":"3","motivation":"\"for the discovery of ubiquitin-mediated protein degradation\"","affiliations":[{"name":"University of California","city":"Irvine, CA","country":"USA"}]}]},{"id":"782","firstname":"Elfriede","surname":"Jelinek","born":"1946-10-20","died":"0000-00-00","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Mürzzuschlag","gender":"female","prizes":[{"year":"2004","category":"literature","share":"1","motivation":"\"for her musical flow of voices and counter-voices in novels and plays that with extraordinary linguistic zeal reveal the absurdity of society's clich&eacute;s and their subjugating power\"","affiliations":[[]]}]},{"id":"783","firstname":"Wangari Muta","surname":"Maathai","born":"1940-04-01","died":"2011-09-25","bornCountry":"Kenya","bornCountryCode":"KE","bornCity":"Nyeri","diedCountry":"Kenya","diedCountryCode":"KE","diedCity":"Nairobi","gender":"female","prizes":[{"year":"2004","category":"peace","share":"1","motivation":"\"for her contribution to sustainable development, democracy and peace\"","affiliations":[[]]}]},{"id":"786","firstname":"Finn E.","surname":"Kydland","born":"1943-12-01","died":"0000-00-00","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Gjesdal","gender":"male","prizes":[{"year":"2004","category":"economics","share":"2","motivation":"\"for their contributions to dynamic macroeconomics: the time consistency of economic policy and the driving forces behind business cycles\"","affiliations":[{"name":"Carnegie Mellon University","city":"Pittsburgh, PA","country":"USA"},{"name":"University of California","city":"Santa Barbara, CA","country":"USA"}]}]},{"id":"787","firstname":"Edward C.","surname":"Prescott","born":"1940-12-26","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Glens Falls, NY","gender":"male","prizes":[{"year":"2004","category":"economics","share":"2","motivation":"\"for their contributions to dynamic macroeconomics: the time consistency of economic policy and the driving forces behind business cycles\"","affiliations":[{"name":"Arizona State University","city":"Tempe, AZ","country":"USA"},{"name":"Federal Reserve Bank of Minneapolis","city":"Minneapolis, MN","country":"USA"}]}]},{"id":"789","firstname":"Barry J.","surname":"Marshall","born":"1951-09-30","died":"0000-00-00","bornCountry":"Australia","bornCountryCode":"AU","bornCity":"Kalgoorlie","gender":"male","prizes":[{"year":"2005","category":"medicine","share":"2","motivation":"\"for their discovery of the bacterium <i>Helicobacter pylori</i> and its role in gastritis and peptic ulcer disease\"","affiliations":[{"name":"NHMRC Helicobacter pylori Research Laboratory, QEII Medical Centre","city":"Nedlands","country":"Australia"},{"name":"University of Western Australia","city":"Perth","country":"Australia"}]}]},{"id":"790","firstname":"J. Robin","surname":"Warren","born":"1937-06-11","died":"0000-00-00","bornCountry":"Australia","bornCountryCode":"AU","bornCity":"Adelaide","gender":"male","prizes":[{"year":"2005","category":"medicine","share":"2","motivation":"\"for their discovery of the bacterium <i>Helicobacter pylori</i> and its role in gastritis and peptic ulcer disease\"","affiliations":[{"city":"Perth","country":"Australia"}]}]},{"id":"791","firstname":"Roy J.","surname":"Glauber","born":"1925-09-01","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2005","category":"physics","share":"2","motivation":"\"for his contribution to the quantum theory of optical coherence\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"792","firstname":"John L.","surname":"Hall","born":"1934-08-21","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Denver, CO","gender":"male","prizes":[{"year":"2005","category":"physics","share":"4","motivation":"\"for their contributions to the development of laser-based precision spectroscopy, including the optical frequency comb technique\"","affiliations":[{"name":"University of Colorado, JILA","city":"Boulder, CO","country":"USA"},{"name":"National Institute of Standards and Technology","city":"Boulder, CO","country":"USA"}]}]},{"id":"793","firstname":"Theodor W.","surname":"Hänsch","born":"1941-10-30","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Heidelberg","gender":"male","prizes":[{"year":"2005","category":"physics","share":"4","motivation":"\"for their contributions to the development of laser-based precision spectroscopy, including the optical frequency comb technique\"","affiliations":[{"name":"Max-Planck-Institut für Quantenoptik","city":"Garching","country":"Germany"},{"name":"Ludwig-Maximilians- Universität","city":"Munich","country":"Germany"}]}]},{"id":"794","firstname":"Yves","surname":"Chauvin","born":"1930-10-10","died":"2015-01-27","bornCountry":"Belgium","bornCountryCode":"BE","bornCity":"Menin","diedCountry":"France","diedCountryCode":"FR","diedCity":"Tours","gender":"male","prizes":[{"year":"2005","category":"chemistry","share":"3","motivation":"\"for the development of the metathesis method in organic synthesis\"","affiliations":[{"name":"Institut Français du Pétrole","city":"Rueil-Malmaison","country":"France"}]}]},{"id":"795","firstname":"Robert H.","surname":"Grubbs","born":"1942-02-27","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Possum Trot, KY","gender":"male","prizes":[{"year":"2005","category":"chemistry","share":"3","motivation":"\"for the development of the metathesis method in organic synthesis\"","affiliations":[{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"796","firstname":"Richard R.","surname":"Schrock","born":"1945-01-04","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Berne, IN","gender":"male","prizes":[{"year":"2005","category":"chemistry","share":"3","motivation":"\"for the development of the metathesis method in organic synthesis\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"797","firstname":"International Atomic Energy Agency (IAEA)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"2005","category":"peace","share":"2","motivation":"\"for their efforts to prevent nuclear energy from being used for military purposes and to ensure that nuclear energy for peaceful purposes is used in the safest possible way\"","affiliations":[[]]}]},{"id":"798","firstname":"Mohamed","surname":"ElBaradei","born":"1942-06-17","died":"0000-00-00","bornCountry":"Egypt","bornCountryCode":"EG","bornCity":"Cairo","gender":"male","prizes":[{"year":"2005","category":"peace","share":"2","motivation":"\"for their efforts to prevent nuclear energy from being used for military purposes and to ensure that nuclear energy for peaceful purposes is used in the safest possible way\"","affiliations":[[]]}]},{"id":"799","firstname":"Robert J.","surname":"Aumann","born":"1930-06-08","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Frankfurt-on-the-Main","gender":"male","prizes":[{"year":"2005","category":"economics","share":"2","motivation":"\"for having enhanced our understanding of conflict and cooperation through game-theory analysis\"","affiliations":[{"name":"University of Jerusalem, Center for RationalityHebrew","city":"Jerusalem","country":"Israel"}]}]},{"id":"800","firstname":"Thomas C.","surname":"Schelling","born":"1921-04-14","died":"2016-12-13","bornCountry":"USA","bornCountryCode":"US","bornCity":"Oakland, CA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Bethesda, MD","gender":"male","prizes":[{"year":"2005","category":"economics","share":"2","motivation":"\"for having enhanced our understanding of conflict and cooperation through game-theory analysis\"","affiliations":[{"name":"University of Maryland, Department of Economics and School of Public Policy","city":"College Park, MD","country":"USA"}]}]},{"id":"801","firstname":"Harold","surname":"Pinter","born":"1930-10-10","died":"2008-12-24","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"male","prizes":[{"year":"2005","category":"literature","share":"1","motivation":"\"who in his plays uncovers the precipice under everyday prattle and forces entry into oppression's closed rooms\"","affiliations":[[]]}]},{"id":"802","firstname":"Andrew Z.","surname":"Fire","born":"1959-04-27","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Stanford, CA","gender":"male","prizes":[{"year":"2006","category":"medicine","share":"2","motivation":"\"for their discovery of RNA interference - gene silencing by double-stranded RNA\"","affiliations":[{"name":"Stanford University School of Medicine","city":"Stanford, CA","country":"USA"}]}]},{"id":"803","firstname":"Craig C.","surname":"Mello","born":"1960-10-19","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New Haven, CT","gender":"male","prizes":[{"year":"2006","category":"medicine","share":"2","motivation":"\"for their discovery of RNA interference - gene silencing by double-stranded RNA\"","affiliations":[{"name":"University of Massachusetts Medical School","city":"Worcester, MA","country":"USA"}]}]},{"id":"804","firstname":"John C.","surname":"Mather","born":"1946-08-07","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Roanoke, VA","gender":"male","prizes":[{"year":"2006","category":"physics","share":"2","motivation":"\"for their discovery of the blackbody form and anisotropy of the cosmic microwave background radiation\"","affiliations":[{"name":"NASA Goddard Space Flight Center","city":"Greenbelt, MD","country":"USA"}]}]},{"id":"805","firstname":"George F.","surname":"Smoot","born":"1945-02-20","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Yukon, FL","gender":"male","prizes":[{"year":"2006","category":"physics","share":"2","motivation":"\"for their discovery of the blackbody form and anisotropy of the cosmic microwave background radiation\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"806","firstname":"Roger D.","surname":"Kornberg","born":"1947-04-24","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"St. Louis, MO","gender":"male","prizes":[{"year":"2006","category":"chemistry","share":"1","motivation":"\"for his studies of the molecular basis of eukaryotic transcription\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"807","firstname":"Edmund S.","surname":"Phelps","born":"1933-07-26","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Evanston, IL","gender":"male","prizes":[{"year":"2006","category":"economics","share":"1","motivation":"\"for his analysis of intertemporal tradeoffs in macroeconomic policy\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"808","firstname":"Orhan","surname":"Pamuk","born":"1952-06-07","died":"0000-00-00","bornCountry":"Turkey","bornCountryCode":"TR","bornCity":"Istanbul","gender":"male","prizes":[{"year":"2006","category":"literature","share":"1","motivation":"\"who in the quest for the melancholic soul of his native city has discovered new symbols for the clash and interlacing of cultures\"","affiliations":[[]]}]},{"id":"809","firstname":"Muhammad","surname":"Yunus","born":"1940-06-28","died":"0000-00-00","bornCountry":"British India (now Bangladesh)","bornCountryCode":"BD","bornCity":"Chittagong","gender":"male","prizes":[{"year":"2006","category":"peace","share":"2","motivation":"\"for their efforts to create economic and social development from below\"","affiliations":[[]]}]},{"id":"810","firstname":"Grameen Bank","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"2006","category":"peace","share":"2","motivation":"\"for their efforts to create economic and social development from below\"","affiliations":[[]]}]},{"id":"811","firstname":"Mario R.","surname":"Capecchi","born":"1937-10-06","died":"0000-00-00","bornCountry":"Italy","bornCountryCode":"IT","bornCity":"Verona","gender":"male","prizes":[{"year":"2007","category":"medicine","share":"3","motivation":"\"for their discoveries of principles for introducing specific gene modifications in mice by the use of embryonic stem cells\"","affiliations":[{"name":"University of Utah","city":"Salt Lake City, UT","country":"USA"},{"name":"Howard Hughes Medical Institute"}]}]},{"id":"812","firstname":"Sir Martin J.","surname":"Evans","born":"1941-01-01","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Stroud","gender":"male","prizes":[{"year":"2007","category":"medicine","share":"3","motivation":"\"for their discoveries of principles for introducing specific gene modifications in mice by the use of embryonic stem cells\"","affiliations":[{"name":"Cardiff University","city":"Cardiff","country":"United Kingdom"}]}]},{"id":"813","firstname":"Oliver","surname":"Smithies","born":"1925-06-23","died":"2017-01-10","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Halifax","diedCountry":"USA","diedCountryCode":"US","diedCity":"Chapel Hill, NC","gender":"male","prizes":[{"year":"2007","category":"medicine","share":"3","motivation":"\"for their discoveries of principles for introducing specific gene modifications in mice by the use of embryonic stem cells\"","affiliations":[{"name":"University of North Carolina","city":"Chapel Hill, NC","country":"USA"}]}]},{"id":"814","firstname":"Albert","surname":"Fert","born":"1938-03-07","died":"0000-00-00","bornCountry":"France","bornCountryCode":"FR","bornCity":"Carcassonne","gender":"male","prizes":[{"year":"2007","category":"physics","share":"2","motivation":"\"for the discovery of Giant Magnetoresistance\"","affiliations":[{"name":"Universit&eacute; Paris-Sud","city":"Orsay","country":"France"},{"name":"Unit&eacute; Mixte de Physique CNRS/THALES","city":"Orsay","country":"France"}]}]},{"id":"815","firstname":"Peter","surname":"Grünberg","born":"1939-05-18","died":"0000-00-00","bornCountry":"Czechoslovakia (now Czech Republic)","bornCountryCode":"CZ","bornCity":"Plzen","gender":"male","prizes":[{"year":"2007","category":"physics","share":"2","motivation":"\"for the discovery of Giant Magnetoresistance\"","affiliations":[{"name":"Forschungszentrum J&uuml;lich","city":"J&uuml;lich","country":"Germany"}]}]},{"id":"816","firstname":"Gerhard","surname":"Ertl","born":"1936-10-10","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Bad Cannstatt","gender":"male","prizes":[{"year":"2007","category":"chemistry","share":"1","motivation":"\"for his studies of chemical processes on solid surfaces\"","affiliations":[{"name":"Fritz-Haber-Institut der Max-Planck-Gesellschaft","city":"Berlin","country":"Germany"}]}]},{"id":"817","firstname":"Doris","surname":"Lessing","born":"1919-10-22","died":"2013-11-17","bornCountry":"Persia (now Iran)","bornCountryCode":"IR","bornCity":"Kermanshah","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"London","gender":"female","prizes":[{"year":"2007","category":"literature","share":"1","motivation":"\"that epicist of the female experience, who with scepticism, fire and visionary power has subjected a divided civilisation to scrutiny\"","affiliations":[[]]}]},{"id":"818","firstname":"Intergovernmental Panel on Climate Change (IPCC)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"2007","category":"peace","share":"2","motivation":"\"for their efforts to build up and disseminate greater knowledge about man-made climate change, and to lay the foundations for the measures that are needed to counteract such change\"","affiliations":[[]]}]},{"id":"819","firstname":"Albert Arnold (Al)","surname":"Gore Jr.","born":"1948-03-31","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Washington, DC","gender":"male","prizes":[{"year":"2007","category":"peace","share":"2","motivation":"\"for their efforts to build up and disseminate greater knowledge about man-made climate change, and to lay the foundations for the measures that are needed to counteract such change\"","affiliations":[[]]}]},{"id":"820","firstname":"Leonid","surname":"Hurwicz","born":"1917-08-21","died":"2008-06-24","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Moscow","diedCountry":"USA","diedCountryCode":"US","diedCity":"Minneapolis, MN","gender":"male","prizes":[{"year":"2007","category":"economics","share":"3","motivation":"\"for having laid the foundations of mechanism design theory\"","affiliations":[{"name":"University of Minnesota","city":"Minneapolis, MN","country":"USA"}]}]},{"id":"821","firstname":"Eric S.","surname":"Maskin","born":"1950-12-12","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2007","category":"economics","share":"3","motivation":"\"for having laid the foundations of mechanism design theory\"","affiliations":[{"name":"Institute for Advanced Study","city":"Princeton, NJ","country":"USA"}]}]},{"id":"822","firstname":"Roger B.","surname":"Myerson","born":"1951-03-29","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Boston, MA","gender":"male","prizes":[{"year":"2007","category":"economics","share":"3","motivation":"\"for having laid the foundations of mechanism design theory\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"823","firstname":"Harald","surname":"zur Hausen","born":"1936-03-11","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Gelsenkirchen","gender":"male","prizes":[{"year":"2008","category":"medicine","share":"2","motivation":"\"for his discovery of human papilloma viruses causing cervical cancer\"","affiliations":[{"name":"German Cancer Research Center","city":"Heidelberg","country":"Germany"}]}]},{"id":"824","firstname":"Françoise","surname":"Barré-Sinoussi","born":"1947-07-30","died":"0000-00-00","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","gender":"female","prizes":[{"year":"2008","category":"medicine","share":"4","motivation":"\"for their discovery of human immunodeficiency virus\"","affiliations":[{"name":"Regulation of Retroviral Infections Unit, Virology Department, Institut Pasteur","city":"Paris","country":"France"}]}]},{"id":"825","firstname":"Luc","surname":"Montagnier","born":"1932-08-18","died":"0000-00-00","bornCountry":"France","bornCountryCode":"FR","bornCity":"Chabris","gender":"male","prizes":[{"year":"2008","category":"medicine","share":"4","motivation":"\"for their discovery of human immunodeficiency virus\"","affiliations":[{"name":"World Foundation for AIDS Research and Prevention","city":"Paris","country":"France"}]}]},{"id":"826","firstname":"Yoichiro","surname":"Nambu","born":"1921-01-18","died":"2015-07-05","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Tokyo","diedCountry":"Japan","diedCountryCode":"JP","diedCity":"Osaka","gender":"male","prizes":[{"year":"2008","category":"physics","share":"2","motivation":"\"for the discovery of the mechanism of spontaneous broken symmetry in subatomic physics\"","affiliations":[{"name":"Enrico Fermi Institute, University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"827","firstname":"Makoto","surname":"Kobayashi","born":"1944-04-07","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Nagoya","gender":"male","prizes":[{"year":"2008","category":"physics","share":"4","motivation":"\"for the discovery of the origin of the broken symmetry which predicts the existence of at least three families of quarks in nature\"","affiliations":[{"name":"High Energy Accelerator Research Organization (KEK)","city":"Tsukuba","country":"Japan"}]}]},{"id":"828","firstname":"Toshihide","surname":"Maskawa","born":"1940-02-07","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Nagoya","gender":"male","prizes":[{"year":"2008","category":"physics","share":"4","motivation":"\"for the discovery of the origin of the broken symmetry which predicts the existence of at least three families of quarks in nature\"","affiliations":[{"name":"Kyoto Sangyo University","city":"Kyoto","country":"Japan"},{"name":"Yukawa Institute for Theoretical Physics (YITP), Kyoto University","city":"Kyoto","country":"Japan"}]}]},{"id":"829","firstname":"Osamu","surname":"Shimomura","born":"1928-08-27","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Kyoto","gender":"male","prizes":[{"year":"2008","category":"chemistry","share":"3","motivation":"\"for the discovery and development of the green fluorescent protein, GFP\"","affiliations":[{"name":"Marine Biological Laboratory (MBL)","city":"Woods Hole, MA","country":"USA"},{"name":"Boston University Medical School","city":"Massachusetts, MA","country":"USA"}]}]},{"id":"830","firstname":"Martin","surname":"Chalfie","born":"1947-01-15","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","gender":"male","prizes":[{"year":"2008","category":"chemistry","share":"3","motivation":"\"for the discovery and development of the green fluorescent protein, GFP\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"831","firstname":"Roger Y.","surname":"Tsien","born":"1952-02-01","died":"2016-08-24","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","diedCountry":"USA","diedCountryCode":"US","diedCity":"Eugene, OR","gender":"male","prizes":[{"year":"2008","category":"chemistry","share":"3","motivation":"\"for the discovery and development of the green fluorescent protein, GFP\"","affiliations":[{"name":"University of California","city":"San Diego, CA","country":"USA"},{"name":"Howard Hughes Medical Institute"}]}]},{"id":"832","firstname":"Jean-Marie Gustave","surname":"Le Clézio","born":"1940-04-13","died":"0000-00-00","bornCountry":"France","bornCountryCode":"FR","bornCity":"Nice","gender":"male","prizes":[{"year":"2008","category":"literature","share":"1","motivation":"\"author of new departures, poetic adventure and sensual ecstasy, explorer of a humanity beyond and below the reigning civilization\"","affiliations":[[]]}]},{"id":"833","firstname":"Martti","surname":"Ahtisaari","born":"1937-06-23","died":"0000-00-00","bornCountry":"Finland","bornCountryCode":"FI","bornCity":"Viipuri (now Vyborg)","gender":"male","prizes":[{"year":"2008","category":"peace","share":"1","motivation":"\"for his important efforts, on several continents and over more than three decades, to resolve international conflicts\"","affiliations":[[]]}]},{"id":"834","firstname":"Paul","surname":"Krugman","born":"1953-02-28","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2008","category":"economics","share":"1","motivation":"\"for his analysis of trade patterns and location of economic activity\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"835","firstname":"Elizabeth H.","surname":"Blackburn","born":"1948-11-26","died":"0000-00-00","bornCountry":"Australia","bornCountryCode":"AU","bornCity":"Hobart, Tasmania","gender":"female","prizes":[{"year":"2009","category":"medicine","share":"3","motivation":"\"for the discovery of how chromosomes are protected by telomeres and the enzyme telomerase\"","affiliations":[{"name":"University of California","city":"San Francisco, CA","country":"USA"}]}]},{"id":"836","firstname":"Carol W.","surname":"Greider","born":"1961-04-15","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"San Diego, CA","gender":"female","prizes":[{"year":"2009","category":"medicine","share":"3","motivation":"\"for the discovery of how chromosomes are protected by telomeres and the enzyme telomerase\"","affiliations":[{"name":"Johns Hopkins University School of Medicine","city":"Baltimore, MD","country":"USA"}]}]},{"id":"837","firstname":"Jack W.","surname":"Szostak","born":"1952-11-09","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","gender":"male","prizes":[{"year":"2009","category":"medicine","share":"3","motivation":"\"for the discovery of how chromosomes are protected by telomeres and the enzyme telomerase\"","affiliations":[{"name":"Harvard Medical School","city":"Boston, MA","country":"USA"},{"name":"Massachusetts General Hospital","city":"Boston, MA","country":"USA"},{"name":"Howard Hughes Medical Institute"}]}]},{"id":"838","firstname":"Charles Kuen","surname":"Kao","born":"1933-11-04","died":"0000-00-00","bornCountry":"China","bornCountryCode":"CN","bornCity":"Shanghai","gender":"male","prizes":[{"year":"2009","category":"physics","share":"2","motivation":"\"for groundbreaking achievements concerning the transmission of light in fibers for optical communication\"","affiliations":[{"name":"Standard Telecommunication Laboratories","city":"Harlow","country":"United Kingdom"},{"name":"Chinese University of Hong Kong","city":"Hong Kong","country":"China"}]}]},{"id":"839","firstname":"Willard S.","surname":"Boyle","born":"1924-08-19","died":"2011-05-07","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Amherst, NS","diedCountry":"Canada","diedCountryCode":"CA","diedCity":"Truro, NS","gender":"male","prizes":[{"year":"2009","category":"physics","share":"4","motivation":"\"for the invention of an imaging semiconductor circuit - the CCD sensor\"","affiliations":[{"name":"Bell Laboratories","city":"Murray Hill, NJ","country":"USA"}]}]},{"id":"840","firstname":"George E.","surname":"Smith","born":"1930-05-10","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"White Plains, NY","gender":"male","prizes":[{"year":"2009","category":"physics","share":"4","motivation":"\"for the invention of an imaging semiconductor circuit - the CCD sensor\"","affiliations":[{"name":"Bell Laboratories","city":"Murray Hill, NJ","country":"USA"}]}]},{"id":"841","firstname":"Venkatraman","surname":"Ramakrishnan","born":"0000-00-00","died":"0000-00-00","bornCountry":"India","bornCountryCode":"IN","bornCity":"Chidambaram, Tamil Nadu","gender":"male","prizes":[{"year":"2009","category":"chemistry","share":"3","motivation":"\"for studies of the structure and function of the ribosome\"","affiliations":[{"name":"MRC Laboratory of Molecular Biology","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"842","firstname":"Thomas A.","surname":"Steitz","born":"1940-08-23","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Milwaukee, WI","gender":"male","prizes":[{"year":"2009","category":"chemistry","share":"3","motivation":"\"for studies of the structure and function of the ribosome\"","affiliations":[{"name":"Yale University","city":"New Haven, CT","country":"USA"},{"name":"Howard Hughes Medical Institute"}]}]},{"id":"843","firstname":"Ada E.","surname":"Yonath","born":"1939-06-22","died":"0000-00-00","bornCountry":"British Mandate of Palestine (now Israel)","bornCountryCode":"IL","bornCity":"Jerusalem","gender":"female","prizes":[{"year":"2009","category":"chemistry","share":"3","motivation":"\"for studies of the structure and function of the ribosome\"","affiliations":[{"name":"Weizmann Institute of Science","city":"Rehovot","country":"Israel"}]}]},{"id":"844","firstname":"Herta","surname":"Müller","born":"1953-08-17","died":"0000-00-00","bornCountry":"Romania","bornCountryCode":"RO","bornCity":"Nitzkydorf, Banat","gender":"female","prizes":[{"year":"2009","category":"literature","share":"1","motivation":"\"who, with the concentration of poetry and the frankness of prose, depicts the landscape of the dispossessed\"","affiliations":[[]]}]},{"id":"845","firstname":"Barack H.","surname":"Obama","born":"1961-08-04","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Honolulu, HI","gender":"male","prizes":[{"year":"2009","category":"peace","share":"1","motivation":"\"for his extraordinary efforts to strengthen international diplomacy and cooperation between peoples\"","affiliations":[[]]}]},{"id":"846","firstname":"Elinor","surname":"Ostrom","born":"1933-08-07","died":"2012-06-12","bornCountry":"USA","bornCountryCode":"US","bornCity":"Los Angeles, CA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Bloomington, IN","gender":"female","prizes":[{"year":"2009","category":"economics","share":"2","motivation":"\"for her analysis of economic governance, especially the commons\"","affiliations":[{"name":"Indiana University","city":"Bloomington, IN","country":"USA"},{"name":"Arizona State University","city":"Tempe, AZ","country":"USA"}]}]},{"id":"847","firstname":"Oliver E.","surname":"Williamson","born":"1932-09-27","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Superior, WI","gender":"male","prizes":[{"year":"2009","category":"economics","share":"2","motivation":"\"for his analysis of economic governance, especially the boundaries of the firm\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"848","firstname":"Robert G.","surname":"Edwards","born":"1925-09-27","died":"2013-04-10","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Batley","diedCountry":"United Kingdom","diedCountryCode":"GB","diedCity":"Cambridge","gender":"male","prizes":[{"year":"2010","category":"medicine","share":"1","motivation":"\"for the development of in vitro fertilization\"","affiliations":[{"name":"University of Cambridge","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"849","firstname":"Andre","surname":"Geim","born":"1958-10-21","died":"0000-00-00","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Sochi","gender":"male","prizes":[{"year":"2010","category":"physics","share":"2","motivation":"\"for groundbreaking experiments regarding the two-dimensional material graphene\"","affiliations":[{"name":"University of Manchester","city":"Manchester","country":"United Kingdom"}]}]},{"id":"850","firstname":"Konstantin","surname":"Novoselov","born":"1974-08-23","died":"0000-00-00","bornCountry":"Russia","bornCountryCode":"RU","bornCity":"Nizhny Tagil","gender":"male","prizes":[{"year":"2010","category":"physics","share":"2","motivation":"\"for groundbreaking experiments regarding the two-dimensional material graphene\"","affiliations":[{"name":"University of Manchester","city":"Manchester","country":"United Kingdom"}]}]},{"id":"851","firstname":"Richard F.","surname":"Heck","born":"1931-08-15","died":"2015-10-09","bornCountry":"USA","bornCountryCode":"US","bornCity":"Springfield, MA","diedCountry":"Philippines","diedCity":"Manila","gender":"male","prizes":[{"year":"2010","category":"chemistry","share":"3","motivation":"\"for palladium-catalyzed cross couplings in organic synthesis\"","affiliations":[{"name":"University of Delaware","country":"USA"}]}]},{"id":"852","firstname":"Ei-ichi","surname":"Negishi","born":"1935-07-14","died":"0000-00-00","bornCountry":"China","bornCountryCode":"CN","bornCity":"Changchun","gender":"male","prizes":[{"year":"2010","category":"chemistry","share":"3","motivation":"\"for palladium-catalyzed cross couplings in organic synthesis\"","affiliations":[{"name":"Purdue University","city":"West Lafayette, IN","country":"USA"}]}]},{"id":"853","firstname":"Akira","surname":"Suzuki","born":"1930-09-12","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Mukawa","gender":"male","prizes":[{"year":"2010","category":"chemistry","share":"3","motivation":"\"for palladium-catalyzed cross couplings in organic synthesis\"","affiliations":[{"name":"Hokkaido University","city":"Sapporo","country":"Japan"}]}]},{"id":"854","firstname":"Mario","surname":"Vargas Llosa","born":"1936-03-28","died":"0000-00-00","bornCountry":"Peru","bornCountryCode":"PE","bornCity":"Arequipa","gender":"male","prizes":[{"year":"2010","category":"literature","share":"1","motivation":"\"for his cartography of structures of power and his trenchant images of the individual's resistance, revolt, and defeat\"","affiliations":[[]]}]},{"id":"855","firstname":"Liu","surname":"Xiaobo","born":"1955-12-28","died":"2017-07-13","bornCountry":"China","bornCountryCode":"CN","bornCity":"Changchun","diedCountry":"China","diedCountryCode":"CN","diedCity":"Shenyang","gender":"male","prizes":[{"year":"2010","category":"peace","share":"1","motivation":"\"for his long and non-violent struggle for fundamental human rights in China\"","affiliations":[[]]}]},{"id":"856","firstname":"Peter A.","surname":"Diamond","born":"1940-04-29","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2010","category":"economics","share":"3","motivation":"\"for their analysis of markets with search frictions\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"857","firstname":"Dale T.","surname":"Mortensen","born":"1939-02-02","died":"2014-01-09","bornCountry":"USA","bornCountryCode":"US","bornCity":"Enterprise, OR","diedCountry":"USA","diedCountryCode":"US","diedCity":"Wilmette, IL","gender":"male","prizes":[{"year":"2010","category":"economics","share":"3","motivation":"\"for their analysis of markets with search frictions\"","affiliations":[{"name":"Northwestern University","city":"Evanston, IL","country":"USA"},{"name":"Aarhus University","city":"Aarhus","country":"Denmark"}]}]},{"id":"858","firstname":"Christopher A.","surname":"Pissarides","born":"1948-02-20","died":"0000-00-00","bornCountry":"Cyprus","bornCountryCode":"CY","bornCity":"Nicosia","gender":"male","prizes":[{"year":"2010","category":"economics","share":"3","motivation":"\"for their analysis of markets with search frictions\"","affiliations":[{"name":"London School of Economics and Political Science","city":"London","country":"United Kingdom"}]}]},{"id":"861","firstname":"Bruce A.","surname":"Beutler","born":"1957-12-29","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Chicago, IL","gender":"male","prizes":[{"year":"2011","category":"medicine","share":"4","motivation":"\"for their discoveries concerning the activation of innate immunity\"","affiliations":[{"name":"University of Texas Southwestern Medical Center at Dallas","city":"Dallas, TX","country":"USA"},{"name":"The Scripps Research Institute","city":"La Jolla, CA","country":"USA"}]}]},{"id":"862","firstname":"Jules A.","surname":"Hoffmann","born":"1941-08-02","died":"0000-00-00","bornCountry":"Luxembourg","bornCountryCode":"LU","bornCity":"Echternach","gender":"male","prizes":[{"year":"2011","category":"medicine","share":"4","motivation":"\"for their discoveries concerning the activation of innate immunity\"","affiliations":[{"name":"University of Strasbourg","city":"Strasbourg","country":"France"}]}]},{"id":"863","firstname":"Ralph M.","surname":"Steinman","born":"1943-01-14","died":"2011-09-30","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Montreal","gender":"male","prizes":[{"year":"2011","category":"medicine","share":"2","motivation":"\"for his discovery of the dendritic cell and its role in adaptive immunity\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"}]}]},{"id":"864","firstname":"Saul","surname":"Perlmutter","born":"0000-00-00","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Champaign-Urbana, IL","gender":"male","prizes":[{"year":"2011","category":"physics","share":"2","motivation":"\"for the discovery of the accelerating expansion of the Universe through observations of distant supernovae\"","affiliations":[{"name":"Lawrence Berkeley National Laboratory","city":"Berkeley, CA","country":"USA"},{"name":"University of California","city":"Berkeley, CA","country":"USA"}]}]},{"id":"865","firstname":"Brian P.","surname":"Schmidt","born":"1967-02-24","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Missoula, MT","gender":"male","prizes":[{"year":"2011","category":"physics","share":"4","motivation":"\"for the discovery of the accelerating expansion of the Universe through observations of distant supernovae\"","affiliations":[{"name":"Australian National University","city":"Weston Creek","country":"Australia"}]}]},{"id":"866","firstname":"Adam G.","surname":"Riess","born":"1969-12-16","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Washington, DC","gender":"male","prizes":[{"year":"2011","category":"physics","share":"4","motivation":"\"for the discovery of the accelerating expansion of the Universe through observations of distant supernovae\"","affiliations":[{"name":"Johns Hopkins University","city":"Baltimore, MD","country":"USA"},{"name":"Space Telescope Science Institute","city":"Baltimore, MD","country":"USA"}]}]},{"id":"867","firstname":"Dan","surname":"Shechtman","born":"1941-01-24","died":"0000-00-00","bornCountry":"British Mandate of Palestine (now Israel)","bornCountryCode":"IL","bornCity":"Tel Aviv","gender":"male","prizes":[{"year":"2011","category":"chemistry","share":"1","motivation":"\"for the discovery of quasicrystals\"","affiliations":[{"name":"Technion - Israel Institute of Technology","city":"Haifa","country":"Israel"}]}]},{"id":"868","firstname":"Tomas","surname":"Tranströmer","born":"1931-04-15","died":"2015-03-26","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Stockholm","diedCountry":"Sweden","diedCountryCode":"SE","diedCity":"Stockholm","gender":"male","prizes":[{"year":"2011","category":"literature","share":"1","motivation":"\"because, through his condensed, translucent images, he gives us fresh access to reality\"","affiliations":[[]]}]},{"id":"869","firstname":"Ellen","surname":"Johnson Sirleaf","born":"1938-10-29","died":"0000-00-00","bornCountry":"Liberia","bornCountryCode":"LR","bornCity":"Monrovia","gender":"female","prizes":[{"year":"2011","category":"peace","share":"3","motivation":"\"for their non-violent struggle for the safety of women and for women&apos;s rights to full participation in peace-building work\"","affiliations":[[]]}]},{"id":"870","firstname":"Leymah","surname":"Gbowee","born":"1972-02-01","died":"0000-00-00","bornCountry":"Liberia","bornCountryCode":"LR","bornCity":"Monrovia","gender":"female","prizes":[{"year":"2011","category":"peace","share":"3","motivation":"\"for their non-violent struggle for the safety of women and for women&apos;s rights to full participation in peace-building work\"","affiliations":[[]]}]},{"id":"871","firstname":"Tawakkol","surname":"Karman","born":"1979-02-07","died":"0000-00-00","bornCountry":"Yemen","bornCountryCode":"YE","bornCity":"Ta'izz","gender":"female","prizes":[{"year":"2011","category":"peace","share":"3","motivation":"\"for their non-violent struggle for the safety of women and for women&apos;s rights to full participation in peace-building work\"","affiliations":[[]]}]},{"id":"872","firstname":"Thomas J.","surname":"Sargent","born":"1943-07-19","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Pasadena, CA","gender":"male","prizes":[{"year":"2011","category":"economics","share":"2","motivation":"\"for their empirical research on cause and effect in the macroeconomy\"","affiliations":[{"name":"New York University","city":"New York, NY","country":"USA"}]}]},{"id":"873","firstname":"Christopher A.","surname":"Sims","born":"1942-10-21","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Washington, DC","gender":"male","prizes":[{"year":"2011","category":"economics","share":"2","motivation":"\"for their empirical research on cause and effect in the macroeconomy\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"874","firstname":"Sir John B.","surname":"Gurdon","born":"1933-10-02","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Dippenhall","gender":"male","prizes":[{"year":"2012","category":"medicine","share":"2","motivation":"\"for the discovery that mature cells can be reprogrammed to become pluripotent\"","affiliations":[{"name":"Gurdon Institute","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"875","firstname":"Shinya","surname":"Yamanaka","born":"1962-09-04","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Osaka","gender":"male","prizes":[{"year":"2012","category":"medicine","share":"2","motivation":"\"for the discovery that mature cells can be reprogrammed to become pluripotent\"","affiliations":[{"name":"Kyoto University","city":"Kyoto","country":"Japan"},{"name":"Gladstone Institutes","city":"San Francisco, CA","country":"USA"}]}]},{"id":"876","firstname":"Serge","surname":"Haroche","born":"1944-09-11","died":"0000-00-00","bornCountry":"Morocco","bornCountryCode":"MA","bornCity":"Casablanca","gender":"male","prizes":[{"year":"2012","category":"physics","share":"2","motivation":"\"for ground-breaking experimental methods that enable measuring and manipulation of individual quantum systems\"","affiliations":[{"name":"Collège de France","city":"Paris","country":"France"},{"name":"École Normale Supérieure","city":"Paris","country":"France"}]}]},{"id":"877","firstname":"David J.","surname":"Wineland","born":"1944-02-24","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Milwaukee, WI","gender":"male","prizes":[{"year":"2012","category":"physics","share":"2","motivation":"\"for ground-breaking experimental methods that enable measuring and manipulation of individual quantum systems\"","affiliations":[{"name":"National Institute of Standards and Technology","city":"Boulder, CO","country":"USA"},{"name":"University of Colorado","city":"Boulder, CO","country":"USA"}]}]},{"id":"878","firstname":"Robert J.","surname":"Lefkowitz","born":"1943-04-15","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2012","category":"chemistry","share":"2","motivation":"\"for studies of G-protein-coupled receptors\"","affiliations":[{"name":"Howard Hughes Medical Institute"},{"name":"Duke University Medical Center","city":"Durham, NC","country":"USA"}]}]},{"id":"879","firstname":"Brian K.","surname":"Kobilka","born":"1955-05-30","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Little Falls, MN","gender":"male","prizes":[{"year":"2012","category":"chemistry","share":"2","motivation":"\"for studies of G-protein-coupled receptors\"","affiliations":[{"name":"Stanford University School of Medicine","city":"Stanford, CA","country":"USA"}]}]},{"id":"880","firstname":"Mo","surname":"Yan","born":"1955-02-02","died":"0000-00-00","bornCountry":"China","bornCountryCode":"CN","bornCity":"Gaomi","gender":"male","prizes":[{"year":"2012","category":"literature","share":"1","motivation":"\"who with hallucinatory realism merges folk tales, history and the contemporary\"","affiliations":[[]]}]},{"id":"881","firstname":"European Union (EU)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"2012","category":"peace","share":"1","motivation":"\"for over six decades contributed to the advancement of peace and reconciliation, democracy and human rights in Europe\"","affiliations":[[]]}]},{"id":"882","firstname":"Alvin E.","surname":"Roth","born":"1951-12-18","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2012","category":"economics","share":"2","motivation":"\"for the theory of stable allocations and the practice of market design\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"},{"name":"Harvard Business School","city":"Boston, MA","country":"USA"}]}]},{"id":"883","firstname":"Lloyd S.","surname":"Shapley","born":"1923-06-02","died":"2016-03-12","bornCountry":"USA","bornCountryCode":"US","bornCity":"Cambridge, MA","diedCountry":"USA","diedCountryCode":"US","diedCity":"Tucson, AZ","gender":"male","prizes":[{"year":"2012","category":"economics","share":"2","motivation":"\"for the theory of stable allocations and the practice of market design\"","affiliations":[{"name":"University of California","city":"Los Angeles, CA","country":"USA"}]}]},{"id":"884","firstname":"James E.","surname":"Rothman","born":"1950-11-03","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Haverhill, MA","gender":"male","prizes":[{"year":"2013","category":"medicine","share":"3","motivation":"\"for their discoveries of machinery regulating vesicle traffic, a major transport system in our cells\"","affiliations":[{"name":"Yale University","city":"New Haven, CT","country":"USA"}]}]},{"id":"885","firstname":"Randy W.","surname":"Schekman","born":"1948-12-30","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"St. Paul, MN","gender":"male","prizes":[{"year":"2013","category":"medicine","share":"3","motivation":"\"for their discoveries of machinery regulating vesicle traffic, a major transport system in our cells\"","affiliations":[{"name":"University of California","city":"Berkeley, CA","country":"USA"},{"name":"Howard Hughes Medical Institute"}]}]},{"id":"886","firstname":"Thomas C.","surname":"Südhof","born":"1955-12-22","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Göttingen","gender":"male","prizes":[{"year":"2013","category":"medicine","share":"3","motivation":"\"for their discoveries of machinery regulating vesicle traffic, a major transport system in our cells\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"},{"name":"Howard Hughes Medical Institute"}]}]},{"id":"887","firstname":"François","surname":"Englert","born":"1932-11-06","died":"0000-00-00","bornCountry":"Belgium","bornCountryCode":"BE","bornCity":"Etterbeek","gender":"male","prizes":[{"year":"2013","category":"physics","share":"2","motivation":"\"for the theoretical discovery of a mechanism that contributes to our understanding of the origin of mass of subatomic particles, and which recently was confirmed through the discovery of the predicted fundamental particle, by the ATLAS and CMS experiments at CERN's Large Hadron Collider\"","affiliations":[{"name":"Université Libre de Bruxelles","city":"Brussels","country":"Belgium"}]}]},{"id":"888","firstname":"Peter W.","surname":"Higgs","born":"1929-05-29","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Newcastle upon Tyne","gender":"male","prizes":[{"year":"2013","category":"physics","share":"2","motivation":"\"for the theoretical discovery of a mechanism that contributes to our understanding of the origin of mass of subatomic particles, and which recently was confirmed through the discovery of the predicted fundamental particle, by the ATLAS and CMS experiments at CERN's Large Hadron Collider\"","affiliations":[{"name":"University of Edinburgh","city":"Edinburgh","country":"United Kingdom"}]}]},{"id":"889","firstname":"Martin","surname":"Karplus","born":"1930-03-15","died":"0000-00-00","bornCountry":"Austria","bornCountryCode":"AT","bornCity":"Vienna","gender":"male","prizes":[{"year":"2013","category":"chemistry","share":"3","motivation":"\"for the development of multiscale models for complex chemical systems\"","affiliations":[{"name":"Université de Strasbourg","city":"Strasbourg","country":"France"},{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"890","firstname":"Michael","surname":"Levitt","born":"1947-05-09","died":"0000-00-00","bornCountry":"South Africa","bornCountryCode":"ZA","bornCity":"Pretoria","gender":"male","prizes":[{"year":"2013","category":"chemistry","share":"3","motivation":"\"for the development of multiscale models for complex chemical systems\"","affiliations":[{"name":"Stanford University School of Medicine","city":"Stanford, CA","country":"USA"}]}]},{"id":"891","firstname":"Arieh","surname":"Warshel","born":"1940-11-20","died":"0000-00-00","bornCountry":"British Mandate of Palestine (now Israel)","bornCountryCode":"IL","bornCity":"Kibbutz Sde-Nahum","gender":"male","prizes":[{"year":"2013","category":"chemistry","share":"3","motivation":"\"for the development of multiscale models for complex chemical systems\"","affiliations":[{"name":"University of Southern California","city":"Los Angeles, CA","country":"USA"}]}]},{"id":"892","firstname":"Alice","surname":"Munro","born":"1931-07-10","died":"0000-00-00","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Wingham","gender":"female","prizes":[{"year":"2013","category":"literature","share":"1","motivation":"\"master of the contemporary short story\"","affiliations":[[]]}]},{"id":"893","firstname":"Organisation for the Prohibition of Chemical Weapons (OPCW)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"2013","category":"peace","share":"1","motivation":"\"for its extensive efforts to eliminate chemical weapons\"","affiliations":[[]]}]},{"id":"894","firstname":"Eugene F.","surname":"Fama","born":"1939-02-14","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Boston, MA","gender":"male","prizes":[{"year":"2013","category":"economics","share":"3","motivation":"\"for their empirical analysis of asset prices\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"895","firstname":"Lars Peter","surname":"Hansen","born":"1952-10-26","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Urbana, IL","gender":"male","prizes":[{"year":"2013","category":"economics","share":"3","motivation":"\"for their empirical analysis of asset prices\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]},{"id":"896","firstname":"Robert J.","surname":"Shiller","born":"1946-03-29","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Detroit, MI","gender":"male","prizes":[{"year":"2013","category":"economics","share":"3","motivation":"\"for their empirical analysis of asset prices\"","affiliations":[{"name":"Yale University","city":"New Haven, CT","country":"USA"}]}]},{"id":"897","born":"0000-00-00","died":"0000-00-00","gender":"male","prizes":[{"affiliations":[[]]}]},{"id":"898","born":"0000-00-00","died":"0000-00-00","gender":"male","prizes":[{"affiliations":[[]]}]},{"id":"899","born":"0000-00-00","died":"0000-00-00","gender":"male","prizes":[{"affiliations":[[]]}]},{"id":"900","born":"0000-00-00","died":"0000-00-00","gender":"male","prizes":[{"affiliations":[[]]}]},{"id":"901","born":"0000-00-00","died":"0000-00-00","gender":"male","prizes":[{"affiliations":[[]]}]},{"id":"902","born":"0000-00-00","died":"0000-00-00","gender":"male","prizes":[{"affiliations":[[]]}]},{"id":"903","firstname":"John","surname":"O'Keefe","born":"1939-11-18","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2014","category":"medicine","share":"2","motivation":"\"for their discoveries of cells that constitute a positioning system in the brain\"","affiliations":[{"name":"University College","city":"London","country":"United Kingdom"}]}]},{"id":"904","firstname":"May-Britt","surname":"Moser","born":"1963-01-04","died":"0000-00-00","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Fosnavåg","gender":"female","prizes":[{"year":"2014","category":"medicine","share":"4","motivation":"\"for their discoveries of cells that constitute a positioning system in the brain\"","affiliations":[{"name":"Norwegian University of Science and Technology (NTNU)","city":"Trondheim","country":"Norway"}]}]},{"id":"905","firstname":"Edvard I.","surname":"Moser","born":"1962-04-27","died":"0000-00-00","bornCountry":"Norway","bornCountryCode":"NO","bornCity":"Ålesund","gender":"male","prizes":[{"year":"2014","category":"medicine","share":"4","motivation":"\"for their discoveries of cells that constitute a positioning system in the brain\"","affiliations":[{"name":"Norwegian University of Science and Technology (NTNU)","city":"Trondheim","country":"Norway"}]}]},{"id":"906","firstname":"Isamu","surname":"Akasaki","born":"1929-01-30","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Chiran","gender":"male","prizes":[{"year":"2014","category":"physics","share":"3","motivation":"\"for the invention of efficient blue light-emitting diodes which has enabled bright and energy-saving white light sources\"","affiliations":[{"name":"Meijo University","city":"Nagoya","country":"Japan"},{"name":"Nagoya University","city":"Nagoya","country":"Japan"}]}]},{"id":"907","firstname":"Hiroshi","surname":"Amano","born":"1960-09-11","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Hamamatsu","gender":"male","prizes":[{"year":"2014","category":"physics","share":"3","motivation":"\"for the invention of efficient blue light-emitting diodes which has enabled bright and energy-saving white light sources\"","affiliations":[{"name":"Nagoya University","city":"Nagoya","country":"Japan"}]}]},{"id":"908","firstname":"Shuji","surname":"Nakamura","born":"1954-05-22","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Ikata","gender":"male","prizes":[{"year":"2014","category":"physics","share":"3","motivation":"\"for the invention of efficient blue light-emitting diodes which has enabled bright and energy-saving white light sources\"","affiliations":[{"name":"University of California","city":"Santa Barbara, CA","country":"USA"}]}]},{"id":"909","firstname":"Eric","surname":"Betzig","born":"1960-01-13","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Ann Arbor, MI","gender":"male","prizes":[{"year":"2014","category":"chemistry","share":"3","motivation":"\"for the development of super-resolved fluorescence microscopy\"","affiliations":[{"name":"Janelia Research Campus, Howard Hughes Medical Institute","city":"Ashburn, VA","country":"USA"}]}]},{"id":"910","firstname":"Stefan W.","surname":"Hell","born":"1962-12-23","died":"0000-00-00","bornCountry":"Romania","bornCountryCode":"RO","bornCity":"Arad","gender":"male","prizes":[{"year":"2014","category":"chemistry","share":"3","motivation":"\"for the development of super-resolved fluorescence microscopy\"","affiliations":[{"name":"Max Planck Institute for Biophysical Chemistry","city":"Göttingen","country":"Germany"},{"name":"German Cancer Research Center","city":"Heidelberg","country":"Germany"}]}]},{"id":"911","firstname":"William E.","surname":"Moerner","born":"1953-06-24","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Pleasanton, CA","gender":"male","prizes":[{"year":"2014","category":"chemistry","share":"3","motivation":"\"for the development of super-resolved fluorescence microscopy\"","affiliations":[{"name":"Stanford University","city":"Stanford, CA","country":"USA"}]}]},{"id":"912","firstname":"Patrick","surname":"Modiano","born":"1945-07-30","died":"0000-00-00","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","gender":"male","prizes":[{"year":"2014","category":"literature","share":"1","motivation":"\"for the art of memory with which he has evoked the most ungraspable human destinies and\r\nuncovered the life-world of the occupation\"","affiliations":[[]]}]},{"id":"913","firstname":"Kailash","surname":"Satyarthi","born":"1954-01-11","died":"0000-00-00","bornCountry":"India","bornCountryCode":"IN","bornCity":"Vidisha","gender":"male","prizes":[{"year":"2014","category":"peace","share":"2","motivation":"\"for their struggle against the suppression of children and young people and for the right of all children to education\"","affiliations":[[]]}]},{"id":"914","firstname":"Malala","surname":"Yousafzai","born":"1997-07-12","died":"0000-00-00","bornCountry":"Pakistan","bornCountryCode":"PK","bornCity":"Mingora","gender":"female","prizes":[{"year":"2014","category":"peace","share":"2","motivation":"\"for their struggle against the suppression of children and young people and for the right of all children to education\"","affiliations":[[]]}]},{"id":"915","firstname":"Jean","surname":"Tirole","born":"1953-08-09","died":"0000-00-00","bornCountry":"France","bornCountryCode":"FR","bornCity":"Troyes","gender":"male","prizes":[{"year":"2014","category":"economics","share":"1","motivation":"\"for his analysis of market power and regulation\"","affiliations":[{"name":"Toulouse School of Economics (TSE)","city":"Toulouse","country":"France"}]}]},{"id":"916","firstname":"William C.","surname":"Campbell","born":"1930-06-28","died":"0000-00-00","bornCountry":"Ireland","bornCountryCode":"IE","bornCity":"Ramelton","gender":"male","prizes":[{"year":"2015","category":"medicine","share":"4","motivation":"\"for their discoveries concerning a novel therapy against infections caused by roundworm parasites\"","affiliations":[{"name":"Drew University","city":"Madison, NJ","country":"USA"}]}]},{"id":"917","firstname":"Satoshi","surname":"Ōmura","born":"1935-07-12","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Yamanashi Prefecture","gender":"male","prizes":[{"year":"2015","category":"medicine","share":"4","motivation":"\"for their discoveries concerning a novel therapy against infections caused by roundworm parasites\"","affiliations":[{"name":"Kitasato University","city":"Tokyo","country":"Japan"}]}]},{"id":"918","firstname":"Youyou","surname":"Tu","born":"1930-12-30","died":"0000-00-00","bornCountry":"China","bornCountryCode":"CN","bornCity":"Zhejiang Ningbo","gender":"female","prizes":[{"year":"2015","category":"medicine","share":"2","motivation":"\"for her discoveries concerning a novel therapy against Malaria\"","affiliations":[{"name":"China Academy of Traditional Chinese Medicine","city":"Beijing","country":"China"}]}]},{"id":"919","firstname":"Takaaki","surname":"Kajita","born":"1959-03-09","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Higashimatsuyama","gender":"male","prizes":[{"year":"2015","category":"physics","share":"2","motivation":"\"for the discovery of neutrino oscillations, which shows that neutrinos have mass\"","affiliations":[{"name":"University of Tokyo","city":"Kashiwa","country":"Japan"}]}]},{"id":"920","firstname":"Arthur B.","surname":"McDonald","born":"1943-08-29","died":"0000-00-00","bornCountry":"Canada","bornCountryCode":"CA","bornCity":"Sydney","gender":"male","prizes":[{"year":"2015","category":"physics","share":"2","motivation":"\"for the discovery of neutrino oscillations, which shows that neutrinos have mass\"","affiliations":[{"name":"Queen's University","city":"Kingston","country":"Canada"}]}]},{"id":"921","firstname":"Tomas","surname":"Lindahl","born":"1938-01-28","died":"0000-00-00","bornCountry":"Sweden","bornCountryCode":"SE","bornCity":"Stockholm","gender":"male","prizes":[{"year":"2015","category":"chemistry","share":"3","motivation":"\"for mechanistic studies of DNA repair\"","affiliations":[{"name":"Francis Crick Institute","city":"Hertfordshire","country":"United Kingdom"},{"name":"Clare Hall Laboratory","city":"Hertfordshire","country":"United Kingdom"}]}]},{"id":"922","firstname":"Paul","surname":"Modrich","born":"1946-06-13","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Raton, NM","gender":"male","prizes":[{"year":"2015","category":"chemistry","share":"3","motivation":"\"for mechanistic studies of DNA repair\"","affiliations":[{"name":"Howard Hughes Medical Institute","city":"Durham, NC","country":"USA"},{"name":"Duke University School of Medicine","city":"Durham, NC","country":"USA"}]}]},{"id":"923","firstname":"Aziz","surname":"Sancar","born":"1946-09-08","died":"0000-00-00","bornCountry":"Turkey","bornCountryCode":"TR","bornCity":"Savur","gender":"male","prizes":[{"year":"2015","category":"chemistry","share":"3","motivation":"\"for mechanistic studies of DNA repair\"","affiliations":[{"name":"University of North Carolina","city":"Chapel Hill, NC","country":"USA"}]}]},{"id":"924","firstname":"Svetlana","surname":"Alexievich","born":"1948-05-31","died":"0000-00-00","bornCountry":"Ukraine","bornCountryCode":"UA","bornCity":"Ivano-Frankivsk","gender":"female","prizes":[{"year":"2015","category":"literature","share":"1","motivation":"\"for her polyphonic writings, a monument to suffering and courage in our time\"","affiliations":[[]]}]},{"id":"925","firstname":"National Dialogue Quartet","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"2015","category":"peace","share":"1","motivation":"\"for its decisive contribution to the building of a pluralistic democracy in Tunisia in the wake of the Jasmine Revolution of 2011\"","affiliations":[[]]}]},{"id":"926","firstname":"Angus","surname":"Deaton","born":"1945-10-19","died":"0000-00-00","bornCountry":"Scotland","bornCountryCode":"GB","bornCity":"Edinburgh","gender":"male","prizes":[{"year":"2015","category":"economics","share":"1","motivation":"\"for his analysis of consumption, poverty, and welfare\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"927","firstname":"Yoshinori","surname":"Ohsumi","born":"1945-02-09","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Fukuoka","gender":"male","prizes":[{"year":"2016","category":"medicine","share":"1","motivation":"\"for his discoveries of mechanisms for autophagy\"","affiliations":[{"name":"Tokyo Institute of Technology","city":"Tokyo","country":"Japan"}]}]},{"id":"928","firstname":"David J.","surname":"Thouless","born":"1934-09-21","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Bearsden","gender":"male","prizes":[{"year":"2016","category":"physics","share":"2","motivation":"\"for theoretical discoveries of topological phase transitions and topological phases of matter\"","affiliations":[{"name":"University of Washington","city":"Seattle, WA","country":"USA"}]}]},{"id":"929","firstname":"F. Duncan M.","surname":"Haldane","born":"1951-09-14","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","gender":"male","prizes":[{"year":"2016","category":"physics","share":"4","motivation":"\"for theoretical discoveries of topological phase transitions and topological phases of matter\"","affiliations":[{"name":"Princeton University","city":"Princeton, NJ","country":"USA"}]}]},{"id":"930","firstname":"J. Michael","surname":"Kosterlitz","born":"1943-06-22","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Aberdeen","gender":"male","prizes":[{"year":"2016","category":"physics","share":"4","motivation":"\"for theoretical discoveries of topological phase transitions and topological phases of matter\"","affiliations":[{"name":"Brown University","city":"Providence, RI","country":"USA"}]}]},{"id":"931","firstname":"Jean-Pierre","surname":"Sauvage","born":"1944-10-21","died":"0000-00-00","bornCountry":"France","bornCountryCode":"FR","bornCity":"Paris","gender":"male","prizes":[{"year":"2016","category":"chemistry","share":"3","motivation":"\"for the design and synthesis of molecular machines\"","affiliations":[{"name":"University of Strasbourg","city":"Strasbourg","country":"France"}]}]},{"id":"932","firstname":"Sir J. Fraser","surname":"Stoddart","born":"1942-05-24","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"Edinburgh","gender":"male","prizes":[{"year":"2016","category":"chemistry","share":"3","motivation":"\"for the design and synthesis of molecular machines\"","affiliations":[{"name":"Northwestern University","city":"Evanston, IL","country":"USA"}]}]},{"id":"933","firstname":"Bernard L.","surname":"Feringa","born":"1951-05-18","died":"0000-00-00","bornCountry":"the Netherlands","bornCountryCode":"NL","bornCity":"Barger-Compascuum","gender":"male","prizes":[{"year":"2016","category":"chemistry","share":"3","motivation":"\"for the design and synthesis of molecular machines\"","affiliations":[{"name":"University of Groningen","city":"Groningen","country":"the Netherlands"}]}]},{"id":"934","firstname":"Juan Manuel","surname":"Santos","born":"1951-08-10","died":"0000-00-00","bornCountry":"Colombia","bornCountryCode":"CO","bornCity":"Bogotá","gender":"male","prizes":[{"year":"2016","category":"peace","share":"1","motivation":"\"for his resolute efforts to bring the country's more than 50-year-long civil war to an end\"","affiliations":[[]]}]},{"id":"935","firstname":"Oliver","surname":"Hart","born":"1948-10-09","died":"0000-00-00","bornCountry":"United Kingdom","bornCountryCode":"GB","bornCity":"London","gender":"male","prizes":[{"year":"2016","category":"economics","share":"2","motivation":"\"for their contributions to contract theory\"","affiliations":[{"name":"Harvard University","city":"Cambridge, MA","country":"USA"}]}]},{"id":"936","firstname":"Bengt","surname":"Holmström","born":"1949-04-18","died":"0000-00-00","bornCountry":"Finland","bornCountryCode":"FI","bornCity":"Helsinki","gender":"male","prizes":[{"year":"2016","category":"economics","share":"2","motivation":"\"for their contributions to contract theory\"","affiliations":[{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"937","firstname":"Bob","surname":"Dylan","born":"1941-05-24","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Duluth, MN","gender":"male","prizes":[{"year":"2016","category":"literature","share":"1","motivation":"\"for having created new poetic expressions within the great American song tradition\"","affiliations":[[]]}]},{"id":"938","firstname":"Jeffrey C.","surname":"Hall","born":"0000-00-00","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"New York, NY","gender":"male","prizes":[{"year":"2017","category":"medicine","share":"3","motivation":"\"for their discoveries of molecular mechanisms controlling the circadian rhythm\"","affiliations":[{"name":"University of Maine","city":"Maine, ME","country":"USA"}]}]},{"id":"939","firstname":"Michael","surname":"Rosbash","born":"0000-00-00","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Kansas City, MO","gender":"male","prizes":[{"year":"2017","category":"medicine","share":"3","motivation":"\"for their discoveries of molecular mechanisms controlling the circadian rhythm\"","affiliations":[{"name":"Brandeis University","city":"Waltham, MA","country":"USA"},{"name":"Howard Hughes Medical Institute"}]}]},{"id":"940","firstname":"Michael W.","surname":"Young","born":"0000-00-00","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Miami, FL","gender":"male","prizes":[{"year":"2017","category":"medicine","share":"3","motivation":"\"for their discoveries of molecular mechanisms controlling the circadian rhythm\"","affiliations":[{"name":"Rockefeller University","city":"New York, NY","country":"USA"}]}]},{"id":"941","firstname":"Rainer","surname":"Weiss","born":"1932-09-29","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Berlin","gender":"male","prizes":[{"year":"2017","category":"physics","share":"2","motivation":"\"for decisive contributions to the LIGO detector and the observation of gravitational waves\"","affiliations":[{"name":"LIGO/VIRGO Collaboration"},{"name":"Massachusetts Institute of Technology (MIT)","city":"Cambridge, MA","country":"USA"}]}]},{"id":"942","firstname":"Barry C.","surname":"Barish","born":"1936-01-27","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Omaha, NE","gender":"male","prizes":[{"year":"2017","category":"physics","share":"4","motivation":"\"for decisive contributions to the LIGO detector and the observation of gravitational waves\"","affiliations":[{"name":"LIGO/VIRGO Collaboration"},{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"943","firstname":"Kip S.","surname":"Thorne","born":"1940-06-01","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"Logan, UT","gender":"male","prizes":[{"year":"2017","category":"physics","share":"4","motivation":"\"for decisive contributions to the LIGO detector and the observation of gravitational waves\"","affiliations":[{"name":"LIGO/VIRGO Collaboration"},{"name":"California Institute of Technology (Caltech)","city":"Pasadena, CA","country":"USA"}]}]},{"id":"944","firstname":"Jacques","surname":"Dubochet","born":"1942-06-08","died":"0000-00-00","bornCountry":"Switzerland","bornCountryCode":"CH","bornCity":"Aigle","gender":"male","prizes":[{"year":"2017","category":"chemistry","share":"3","motivation":"\"for developing cryo-electron microscopy for the high-resolution structure determination of biomolecules in solution\"","affiliations":[{"name":"University of Lausanne","city":"Lausanne","country":"Switzerland"}]}]},{"id":"945","firstname":"Joachim","surname":"Frank","born":"1940-09-12","died":"0000-00-00","bornCountry":"Germany","bornCountryCode":"DE","bornCity":"Siegen","gender":"male","prizes":[{"year":"2017","category":"chemistry","share":"3","motivation":"\"for developing cryo-electron microscopy for the high-resolution structure determination of biomolecules in solution\"","affiliations":[{"name":"Columbia University","city":"New York, NY","country":"USA"}]}]},{"id":"946","firstname":"Richard","surname":"Henderson","born":"1945-07-19","died":"0000-00-00","bornCountry":"Scotland","bornCountryCode":"GB","bornCity":"Edinburgh","gender":"male","prizes":[{"year":"2017","category":"chemistry","share":"3","motivation":"\"for developing cryo-electron microscopy for the high-resolution structure determination of biomolecules in solution\"","affiliations":[{"name":"MRC Laboratory of Molecular Biology","city":"Cambridge","country":"United Kingdom"}]}]},{"id":"947","firstname":"Kazuo","surname":"Ishiguro","born":"1954-11-08","died":"0000-00-00","bornCountry":"Japan","bornCountryCode":"JP","bornCity":"Nagasaki","gender":"male","prizes":[{"year":"2017","category":"literature","share":"1","motivation":"\"who, in novels of great emotional force, has uncovered the abyss beneath our illusory sense of connection with the world\"","affiliations":[[]]}]},{"id":"948","firstname":"International Campaign to Abolish Nuclear Weapons (ICAN)","born":"0000-00-00","died":"0000-00-00","gender":"org","prizes":[{"year":"2017","category":"peace","share":"1","motivation":"\"for its work to draw attention to the catastrophic humanitarian consequences of any use of nuclear weapons and for its ground-breaking efforts to achieve a treaty-based prohibition of such weapons\"","affiliations":[[]]}]},{"id":"949","firstname":"Richard H.","surname":"Thaler","born":"1945-09-12","died":"0000-00-00","bornCountry":"USA","bornCountryCode":"US","bornCity":"East Orange, NJ","gender":"male","prizes":[{"year":"2017","category":"economics","share":"1","motivation":"\"for his contributions to behavioural economics\"","affiliations":[{"name":"University of Chicago","city":"Chicago, IL","country":"USA"}]}]}]

/***/ })
/******/ ]);