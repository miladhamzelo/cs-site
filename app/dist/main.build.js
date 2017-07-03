/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueResource = __webpack_require__(2);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	var _vueCookie = __webpack_require__(4);

	var _vueCookie2 = _interopRequireDefault(_vueCookie);

	var _jalaliDate = __webpack_require__(6);

	var _jalaliDate2 = _interopRequireDefault(_jalaliDate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(12);

	_vue2.default.use(_vueCookie2.default);
	_vue2.default.use(_vueResource2.default);
	_vue2.default.http.options.emulateJSON = true;
	_vue2.default.http.options.emulateHTTP = true;

	if (SERVER['root'] != '/') _vue2.default.http.options.root = SERVER['root'];else _vue2.default.http.options.root = "";

	var page;

	try {

	  page = __webpack_require__(16)("./" + SERVER["ctrl"].replaceAll("-", "_") + '/index.js');
	} catch (err) {

	  page = {};
	}

	new _vue2.default({

	  el: '#app',

	  mixins: [page],

	  data: function data() {
	    return {
	      rootUrl: SERVER['root']
	    };
	  },
	  created: function created() {

	    console.log("Main Hook");
	  },
	  mounted: function mounted() {

	    document.getElementsByTagName("body")[0].style.visibility = "visible";
	  },

	  methods: {
	    getDay: function getDay(date) {
	      var days = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
	      var jdate = new _jalaliDate2.default(date.split("/"));
	      var j = jdate.getDay() + 1 > 6 ? 0 : jdate.getDay() + 1;
	      return days[j];
	    },
	    getFullDay: function getFullDay(date) {
	      var jdate = new _jalaliDate2.default(date.split("/"));
	      return jdate.format('dddd DD MMMM YYYY');
	    }
	  }

	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * Vue.js v2.1.10
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Vue = factory());
	}(this, (function () { 'use strict';

	/*  */

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Remove an item from an array
	 */
	function remove$1 (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}

	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind$1 (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 */
	function noop () {}

	/**
	 * Always return false.
	 */
	var no = function () { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    return JSON.stringify(a) === JSON.stringify(b)
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/*  */

	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],

	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],

	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100
	};

	/*  */

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  } else {
	    var segments = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]];
	      }
	      return obj
	    }
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;

	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }

	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) { cb.call(ctx); }
	      if (_resolve) { _resolve(ctx); }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	var warn = noop;
	var formatComponentName;

	{
	  var hasConsole = typeof console !== 'undefined';

	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm) {
	    if (vm.$root === vm) {
	      return 'root instance'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name;
	    return (
	      (name ? ("component <" + name + ">") : "anonymous component") +
	      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
	    )
	  };

	  var formatLocation = function (str) {
	    if (str === 'anonymous component') {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}

	/*  */


	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$1++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove$1(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;

	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if ("development" !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set$1 (obj, key, val) {
	  if (Array.isArray(obj)) {
	    obj.length = Math.max(obj.length, key);
	    obj.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return
	  }
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return
	  }
	  if (!ob) {
	    obj[key] = val;
	    return
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (obj, key) {
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(obj, key)) {
	    return
	  }
	  delete obj[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set$1(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      "development" !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  {
	    checkComponents(child);
	  }
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$3) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if ("development" !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isType(Boolean, prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    "development" !== 'production' && warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm[key] !== undefined) {
	    return vm[key]
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}

	function isType (type, fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === getType(type)
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === getType(type)) {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}



	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		identity: identity,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		inBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		isServerRendering: isServerRendering,
		devtools: devtools,
		nextTick: nextTick,
		get _Set () { return _Set; },
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		get warn () { return warn; },
		get formatComponentName () { return formatComponentName; },
		validateProp: validateProp
	});

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };

	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };

	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};

	var prototypeAccessors = { child: {} };

	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
	  return this.componentInstance
	};

	Object.defineProperties( VNode.prototype, prototypeAccessors );

	var createEmptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}

	function cloneVNodes (vnodes) {
	  var res = new Array(vnodes.length);
	  for (var i = 0; i < vnodes.length; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}

	/*  */

	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
	var hooksToMerge = Object.keys(hooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }

	  var baseCtor = context.$options._base;
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  data = data || {};

	  // extract props
	  var propsData = extractProps(data, Ctor);

	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;

	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    props: props,
	    data: data,
	    parent: context,
	    children: children,
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function init (
	  vnode,
	  hydrating,
	  parentElm,
	  refElm
	) {
	  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	    var child = vnode.componentInstance = createComponentInstanceForVnode(
	      vnode,
	      activeInstance,
	      parentElm,
	      refElm
	    );
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	  } else if (vnode.data.keepAlive) {
	    // kept-alive components, treat as a patch
	    var mountedNode = vnode; // work around flow
	    prepatch(mountedNode, mountedNode);
	  }
	}

	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions;
	  var child = vnode.componentInstance = oldVnode.componentInstance;
	  child._updateFromParent(
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  );
	}

	function insert (vnode) {
	  if (!vnode.componentInstance._isMounted) {
	    vnode.componentInstance._isMounted = true;
	    callHook(vnode.componentInstance, 'mounted');
	  }
	  if (vnode.data.keepAlive) {
	    vnode.componentInstance._inactive = false;
	    callHook(vnode.componentInstance, 'activated');
	  }
	}

	function destroy$1 (vnode) {
	  if (!vnode.componentInstance._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.componentInstance.$destroy();
	    } else {
	      vnode.componentInstance._inactive = true;
	      callHook(vnode.componentInstance, 'deactivated');
	    }
	  }
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;

	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = baseCtor.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };

	    var reject = function (reason) {
	      "development" !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };

	    var res = factory(resolve, reject);

	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}

	function extractProps (data, Ctor) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = hooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook, key) {
	  key = key + hookKey;
	  var injectedHash = def.__injected || (def.__injected = {});
	  if (!injectedHash[key]) {
	    injectedHash[key] = true;
	    var oldHook = def[hookKey];
	    if (oldHook) {
	      def[hookKey] = function () {
	        oldHook.apply(this, arguments);
	        hook.apply(this, arguments);
	      };
	    } else {
	      def[hookKey] = hook;
	    }
	  }
	}

	/*  */

	var normalizeEvent = cached(function (name) {
	  var once = name.charAt(0) === '~'; // Prefixed last, checked first
	  name = once ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  return {
	    name: name,
	    once: once,
	    capture: capture
	  }
	});

	function createEventHandle (fn) {
	  var handle = {
	    fn: fn,
	    invoker: function () {
	      var arguments$1 = arguments;

	      var fn = handle.fn;
	      if (Array.isArray(fn)) {
	        for (var i = 0; i < fn.length; i++) {
	          fn[i].apply(null, arguments$1);
	        }
	      } else {
	        fn.apply(null, arguments);
	      }
	    }
	  };
	  return handle
	}

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, event;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);
	    if (!cur) {
	      "development" !== 'production' && warn(
	        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      if (!cur.invoker) {
	        cur = on[name] = createEventHandle(cur);
	      }
	      add(event.name, cur.invoker, event.once, event.capture);
	    } else if (cur !== old) {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name].invoker, event.capture);
	    }
	  }
	}

	/*  */

	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:

	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// nomralization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}

	// 2. When the children contains constrcuts that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}

	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (c == null || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (last && last.text) {
	        last.text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (c.text && last && last.text) {
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (c.tag && c.key == null && nestedIndex != null) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}

	/*  */

	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}

	/*  */

	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
	  return _createElement(context, tag, data, children, normalizationType)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (data && data.__ob__) {
	    "development" !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	      typeof children[0] === 'function') {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (vnode) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}

	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    return
	  }
	  if (vnode.children) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (child.tag && !child.ns) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}

	/*  */

	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$options._parentVnode;
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = {};
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }

	    if (_parentVnode && _parentVnode.data.scopedSlots) {
	      vm.$scopedSlots = _parentVnode.data.scopedSlots;
	    }

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      /* istanbul ignore else */
	      if (config.errorHandler) {
	        config.errorHandler.call(null, e, vm);
	      } else {
	        {
	          warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
	        }
	        throw e
	      }
	      // return previous vnode to prevent render error causing blank component
	      vnode = vm._vnode;
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if ("development" !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };

	  // toString for mustaches
	  Vue.prototype._s = _toString;
	  // convert text to vnode
	  Vue.prototype._v = createTextVNode;
	  // number conversion
	  Vue.prototype._n = toNumber;
	  // empty vnode
	  Vue.prototype._e = createEmptyVNode;
	  // loose equal
	  Vue.prototype._q = looseEqual;
	  // loose indexOf
	  Vue.prototype._i = looseIndexOf;

	  // render static tree by index
	  Vue.prototype._m = function renderStatic (
	    index,
	    isInFor
	  ) {
	    var tree = this._staticTrees[index];
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree)
	        ? cloneVNodes(tree)
	        : cloneVNode(tree)
	    }
	    // otherwise, render a fresh tree.
	    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
	    markStatic(tree, ("__static__" + index), false);
	    return tree
	  };

	  // mark node as static (v-once)
	  Vue.prototype._o = function markOnce (
	    tree,
	    index,
	    key
	  ) {
	    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	    return tree
	  };

	  function markStatic (tree, key, isOnce) {
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        if (tree[i] && typeof tree[i] !== 'string') {
	          markStaticNode(tree[i], (key + "_" + i), isOnce);
	        }
	      }
	    } else {
	      markStaticNode(tree, key, isOnce);
	    }
	  }

	  function markStaticNode (node, key, isOnce) {
	    node.isStatic = true;
	    node.key = key;
	    node.isOnce = isOnce;
	  }

	  // filter resolution helper
	  Vue.prototype._f = function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  };

	  // render v-for
	  Vue.prototype._l = function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key;
	    if (Array.isArray(val) || typeof val === 'string') {
	      ret = new Array(val.length);
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i);
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val);
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i);
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val);
	      ret = new Array(keys.length);
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        ret[i] = render(val[key], key, i);
	      }
	    }
	    return ret
	  };

	  // renderSlot
	  Vue.prototype._t = function (
	    name,
	    fallback,
	    props,
	    bindObject
	  ) {
	    var scopedSlotFn = this.$scopedSlots[name];
	    if (scopedSlotFn) { // scoped slot
	      props = props || {};
	      if (bindObject) {
	        extend(props, bindObject);
	      }
	      return scopedSlotFn(props) || fallback
	    } else {
	      var slotNodes = this.$slots[name];
	      // warn duplicate slot usage
	      if (slotNodes && "development" !== 'production') {
	        slotNodes._rendered && warn(
	          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	          "- this will likely cause render errors.",
	          this
	        );
	        slotNodes._rendered = true;
	      }
	      return slotNodes || fallback
	    }
	  };

	  // apply v-bind object
	  Vue.prototype._b = function bindProps (
	    data,
	    tag,
	    value,
	    asProp
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        "development" !== 'production' && warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        );
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value);
	        }
	        for (var key in value) {
	          if (key === 'class' || key === 'style') {
	            data[key] = value[key];
	          } else {
	            var type = data.attrs && data.attrs.type;
	            var hash = asProp || config.mustUseProp(tag, type, key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {});
	            hash[key] = value[key];
	          }
	        }
	      }
	    }
	    return data
	  };

	  // check v-on keyCodes
	  Vue.prototype._k = function checkKeyCodes (
	    eventKeyCode,
	    key,
	    builtInAlias
	  ) {
	    var keyCodes = config.keyCodes[key] || builtInAlias;
	    if (Array.isArray(keyCodes)) {
	      return keyCodes.indexOf(eventKeyCode) === -1
	    } else {
	      return keyCodes !== eventKeyCode
	    }
	  };
	}

	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore single whitespace
	  if (defaultSlot.length && !(
	    defaultSlot.length === 1 &&
	    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
	  )) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}

	var target;

	function add$1 (event, fn, once) {
	  if (once) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}

	function remove$2 (event, fn) {
	  target.$off(event, fn);
	}

	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add$1, remove$2, vm);
	}

	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
	    // optimize hook:event cost by using a boolean flag marked at registration
	    // instead of a hash lookup
	    if (hookRE.test(event)) {
	      vm._hasHookEvent = true;
	    }
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}

	/*  */

	var activeInstance = null;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._mount = function (
	    el,
	    hydrating
	  ) {
	    var vm = this;
	    vm.$el = el;
	    if (!vm.$options.render) {
	      vm.$options.render = createEmptyVNode;
	      {
	        /* istanbul ignore if */
	        if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'option is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          );
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          );
	        }
	      }
	    }
	    callHook(vm, 'beforeMount');
	    vm._watcher = new Watcher(vm, function updateComponent () {
	      vm._update(vm._render(), hydrating);
	    }, noop);
	    hydrating = false;
	    // manually mounted instance, call mounted on self
	    // mounted is called for render-created child components in its inserted hook
	    if (vm.$vnode == null) {
	      vm._isMounted = true;
	      callHook(vm, 'mounted');
	    }
	    return vm
	  };

	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.
	  };

	  Vue.prototype._updateFromParent = function (
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    var vm = this;
	    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
	    vm.$options._parentVnode = parentVnode;
	    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	    if (vm._vnode) { // update child tree's parent
	      vm._vnode.parent = parentVnode;
	    }
	    vm.$options._renderChildren = renderChildren;
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false;
	      {
	        observerState.isSettingProps = true;
	      }
	      var propKeys = vm.$options._propKeys || [];
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i];
	        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
	      }
	      observerState.shouldConvert = true;
	      {
	        observerState.isSettingProps = false;
	      }
	      vm.$options.propsData = propsData;
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners;
	      vm.$options._parentListeners = listeners;
	      updateComponentListeners(vm, listeners, oldListeners);
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	      vm.$forceUpdate();
	    }
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove$1(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	  };
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm);
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	}

	/*  */


	var queue = [];
	var has$1 = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has$1 = {};
	  {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	  var watcher, id, vm;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    watcher = queue[index];
	    id = watcher.id;
	    has$1[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if ("development" !== 'production' && has$1[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // call updated hooks
	  index = queue.length;
	  while (index--) {
	    watcher = queue[index];
	    vm = watcher.vm;
	    if (vm._watcher === watcher && vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  }

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }

	  resetSchedulerState();
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has$1[id] == null) {
	    has$1[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = expOrFn.toString();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      "development" !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          /* istanbul ignore else */
	          if (config.errorHandler) {
	            config.errorHandler.call(null, e, this.vm);
	          } else {
	            "development" !== 'production' && warn(
	              ("Error in watcher \"" + (this.expression) + "\""),
	              this.vm
	            );
	            throw e
	          }
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove$1(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	/*  */

	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch) { initWatch(vm, opts.watch); }
	}

	var isReservedProp = { key: 1, ref: 1, slot: 1 };

	function initProps (vm, props) {
	  var propsData = vm.$options.propsData || {};
	  var keys = vm.$options._propKeys = Object.keys(props);
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  observerState.shouldConvert = isRoot;
	  var loop = function ( i ) {
	    var key = keys[i];
	    /* istanbul ignore else */
	    {
	      if (isReservedProp[key]) {
	        warn(
	          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
	        if (vm.$parent && !observerState.isSettingProps) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    }
	  };

	  for (var i = 0; i < keys.length; i++) loop( i );
	  observerState.shouldConvert = true;
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    "development" !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      "development" !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else {
	      proxy(vm, keys[i]);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}

	var computedSharedDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function initComputed (vm, computed) {
	  for (var key in computed) {
	    /* istanbul ignore if */
	    if ("development" !== 'production' && key in vm) {
	      warn(
	        "existing instance property \"" + key + "\" will be " +
	        "overwritten by a computed property with the same name.",
	        vm
	      );
	    }
	    var userDef = computed[key];
	    if (typeof userDef === 'function') {
	      computedSharedDefinition.get = makeComputedGetter(userDef, vm);
	      computedSharedDefinition.set = noop;
	    } else {
	      computedSharedDefinition.get = userDef.get
	        ? userDef.cache !== false
	          ? makeComputedGetter(userDef.get, vm)
	          : bind$1(userDef.get, vm)
	        : noop;
	      computedSharedDefinition.set = userDef.set
	        ? bind$1(userDef.set, vm)
	        : noop;
	    }
	    Object.defineProperty(vm, key, computedSharedDefinition);
	  }
	}

	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, noop, {
	    lazy: true
	  });
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (Dep.target) {
	      watcher.depend();
	    }
	    return watcher.value
	  }
	}

	function initMethods (vm, methods) {
	  for (var key in methods) {
	    vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
	    if ("development" !== 'production' && methods[key] == null) {
	      warn(
	        "method \"" + key + "\" has an undefined value in the component definition. " +
	        "Did you reference the function correctly?",
	        vm
	      );
	    }
	  }
	}

	function initWatch (vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}

	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () {
	    return this._data
	  };
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);

	  Vue.prototype.$set = set$1;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	function proxy (vm, key) {
	  if (!isReserved(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return vm._data[key]
	      },
	      set: function proxySetter (val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}

	/*  */

	var uid = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;
	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm);
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initState(vm);
	    callHook(vm, 'created');
	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = Ctor.super.options;
	    var cachedSuperOptions = Ctor.superOptions;
	    var extendOptions = Ctor.extendOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed
	      Ctor.superOptions = superOptions;
	      extendOptions.render = options.render;
	      extendOptions.staticRenderFns = options.staticRenderFns;
	      extendOptions._scopeId = options._scopeId;
	      options = Ctor.options = mergeOptions(superOptions, extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function Vue$3 (options) {
	  if ("development" !== 'production' &&
	    !(this instanceof Vue$3)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }
	    var name = extendOptions.name || Super.options.name;
	    {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }
	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;
	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	/*  */

	var patternTypes = [String, RegExp];

	function getComponentName (opts) {
	  return opts && (opts.Ctor.options.name || opts.tag)
	}

	function matches (pattern, name) {
	  if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else {
	    return pattern.test(name)
	  }
	}

	function pruneCache (cache, filter) {
	  for (var key in cache) {
	    var cachedNode = cache[key];
	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);
	      if (name && !filter(name)) {
	        pruneCacheEntry(cachedNode);
	        cache[key] = null;
	      }
	    }
	  }
	}

	function pruneCacheEntry (vnode) {
	  if (vnode) {
	    if (!vnode.componentInstance._inactive) {
	      callHook(vnode.componentInstance, 'deactivated');
	    }
	    vnode.componentInstance.$destroy();
	  }
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,

	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },

	  created: function created () {
	    this.cache = Object.create(null);
	  },

	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this.cache) {
	      pruneCacheEntry(this$1.cache[key]);
	    }
	  },

	  watch: {
	    include: function include (val) {
	      pruneCache(this.cache, function (name) { return matches(val, name); });
	    },
	    exclude: function exclude (val) {
	      pruneCache(this.cache, function (name) { return !matches(val, name); });
	    }
	  },

	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    var componentOptions = vnode && vnode.componentOptions;
	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.componentInstance = this.cache[key].componentInstance;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);
	  Vue.util = util;
	  Vue.set = set$1;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});

	Vue$3.version = '2.1.10';

	/*  */

	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, type, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.componentInstance) {
	    childNode = childNode.componentInstance._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,' +
	  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);

	var isPreTag = function (tag) { return tag === 'pre'; };

	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      "development" !== 'production' && warn(
	        'Cannot find element: ' + selector
	      );
	      return document.createElement('div')
	    }
	  }
	  return el
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove$1(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

	function isUndef (s) {
	  return s == null
	}

	function isDef (s) {
	  return s != null
	}

	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }

	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (parent) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);

	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }

	      if ("development" !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isReactivated) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.componentInstance.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert (parent, elm, ref) {
	    if (parent) {
	      if (ref) {
	        nodeOps.insertBefore(parent, elm, ref);
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode); }
	      if (i.insert) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        (vnode.isCloned || vnode.isOnce)) {
	      vnode.elm = oldVnode.elm;
	      vnode.componentInstance = oldVnode.componentInstance;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    var hasData = isDef(data);
	    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (hasData) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          var childNode = elm.firstChild;
	          for (var i$1 = 0; i$1 < children.length; i$1++) {
	            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	              childrenMatch = false;
	              break
	            }
	            childNode = childNode.nextSibling;
	          }
	          // if childNode is not null, it means the actual childNodes list is
	          // longer than the virtual children list.
	          if (!childrenMatch || childNode) {
	            if ("development" !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (!vnode) {
	      if (oldVnode) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (!oldVnode) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        // replacing existing element
	        var oldElm = oldVnode.elm;
	        var parentElm$1 = nodeOps.parentNode(oldElm);
	        createElm(
	          vnode,
	          insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1,
	          nodeOps.nextSibling(oldElm)
	        );

	        if (vnode.parent) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          while (ancestor) {
	            ancestor.elm = vnode.elm;
	            ancestor = ancestor.parent;
	          }
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }

	        if (parentElm$1 !== null) {
	          removeVnodes(parentElm$1, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    }, 'dir-postpatch');
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	/*  */

	var target$1;

	function add$2 (
	  event,
	  handler,
	  once,
	  capture
	) {
	  if (once) {
	    var oldHandler = handler;
	    var _target = target$1; // save current target element in closure
	    handler = function (ev) {
	      remove$3(event, handler, capture, _target);
	      arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	    };
	  }
	  target$1.addEventListener(event, handler, capture);
	}

	function remove$3 (
	  event,
	  handler,
	  capture,
	  _target
	) {
	  (_target || target$1).removeEventListener(event, handler, capture);
	}

	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  updateListeners(on, oldOn, add$2, remove$3, vnode.context);
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }

	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (shouldUpdateValue(elm, vnode, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	// check platforms/web/util/attrs.js acceptValue


	function shouldUpdateValue (
	  elm,
	  vnode,
	  checkVal
	) {
	  return (!elm.composing && (
	    vnode.tag === 'option' ||
	    isDirty(elm, checkVal) ||
	    isInputChanged(vnode, checkVal)
	  ))
	}

	function isDirty (elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
	  return document.activeElement !== elm && elm.value !== checkVal
	}

	function isInputChanged (vnode, newVal) {
	  var value = vnode.elm.value;
	  var modifiers = vnode.elm._vModifiers; // injected by v-model runtime
	  if ((modifiers && modifiers.number) || vnode.elm.type === 'number') {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (modifiers && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    el.style[normalize(name)] = val;
	  }
	};

	var prefixes = ['Webkit', 'Moz', 'ms'];

	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (!data.staticStyle && !data.style &&
	      !oldData.staticStyle && !oldData.style) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldVnode.data.staticStyle;
	  var oldStyleBinding = oldVnode.data.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  vnode.data.style = style.__ob__ ? extend({}, style) : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (newStyle[name] == null) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}

	/*  */

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser && window.requestAnimationFrame
	  ? window.requestAnimationFrame.bind(window)
	  : setTimeout;

	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove$1(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }

	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear ? appearClass : enterClass;
	  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
	  var toClass = isAppear ? appearToClass : enterToClass;
	  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
	  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
	  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
	  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    enterHook &&
	    // enterHook may be a bound method which exposes
	    // the length of original fn as _length
	    (enterHook._length || enterHook.length) > 1;

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	          pendingNode.tag === vnode.tag &&
	          pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    }, 'transition-insert');
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      addTransitionClass(el, toClass);
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        whenTransitionEnds(el, type, cb);
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    leave &&
	    // leave hook may be a bound method which exposes
	    // the length of original fn as _length
	    (leave._length || leave.length) > 1;

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        addTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          whenTransitionEnds(el, type, cb);
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    leaveClass: (name + "-leave"),
	    appearClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    leaveToClass: (name + "-leave-to"),
	    appearToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveActiveClass: (name + "-leave-active"),
	    appearActiveClass: (name + "-enter-active")
	  }
	});

	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}

	function _enter (_, vnode) {
	  if (!vnode.data.show) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var model = {
	  inserted: function inserted (el, binding, vnode) {
	    {
	      if (!modelableTagRE.test(vnode.tag)) {
	        warn(
	          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
	          'If you are working with contenteditable, it\'s recommended to ' +
	          'wrap a library dedicated for that purpose inside a custom component.',
	          vnode.context
	        );
	      }
	    }
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text') {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    "development" !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.componentInstance._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition && !isIE9) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },

	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },

	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};

	var platformDirectives = {
	  model: model,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1].fn;
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,

	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if ("development" !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if ("development" !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.
	    var id = "__transition-" + (this._uid) + "-";
	    var key = child.key = child.key == null
	      ? id + child.tag
	      : isPrimitive(child.key)
	        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	        : child.key;
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        }, key);
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave, key);
	        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave;
	        }, key);
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final disired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts
	            ? (opts.Ctor.options.name || opts.tag)
	            : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    var f = document.body.offsetHeight; // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      addTransitionClass(el, moveClass);
	      var info = getTransitionInfo(el);
	      removeTransitionClass(el, moveClass);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$3.config.isUnknownElement = isUnknownElement;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.mustUseProp = mustUseProp;

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch$1 : noop;

	// wrap mount
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return this._mount(el, hydrating)
	};

	if ("development" !== 'production' &&
	    inBrowser && typeof console !== 'undefined') {
	  console[console.info ? 'info' : 'log'](
	    "You are running Vue in development mode.\n" +
	    "Make sure to turn on production mode when deploying for production.\n" +
	    "See more tips at https://vuejs.org/guide/deployment.html"
	  );
	}

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if (
	      "development" !== 'production' &&
	      inBrowser && !isEdge && /Chrome\/\d+/.test(window.navigator.userAgent)
	    ) {
	      console[console.info ? 'info' : 'log'](
	        'Download the Vue Devtools extension for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	}, 0);

	/*  */

	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}

	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

	/*  */

	var decoder;

	function decode (html) {
	  decoder = decoder || document.createElement('div');
	  decoder.innerHTML = html;
	  return decoder.textContent
	}

	/*  */

	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr',
	  true
	);

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
	  true
	);

	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track',
	  true
	);

	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */

	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */

	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);

	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;

	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});

	// Special Elements (can contain anything)
	var isScriptOrStyle = makeMap('script,style', true);
	var reCache = {};

	var ltRE = /&lt;/g;
	var gtRE = /&gt;/g;
	var nlRE = /&#10;/g;
	var ampRE = /&amp;/g;
	var quoteRE = /&quot;/g;

	function decodeAttr (value, shouldDecodeNewlines) {
	  if (shouldDecodeNewlines) {
	    value = value.replace(nlRE, '\n');
	  }
	  return value
	    .replace(ltRE, '<')
	    .replace(gtRE, '>')
	    .replace(ampRE, '&')
	    .replace(quoteRE, '"')
	}

	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a script or style element
	    if (!lastTag || !isScriptOrStyle(lastTag)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');

	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }

	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');

	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }

	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }

	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[1], curIndex, index);
	          continue
	        }

	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }

	      var text = (void 0), rest$1 = (void 0), next = (void 0);
	      if (textEnd > 0) {
	        rest$1 = html.slice(textEnd);
	        while (
	          !endTag.test(rest$1) &&
	          !startTagOpen.test(rest$1) &&
	          !comment.test(rest$1) &&
	          !conditionalComment.test(rest$1)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest$1.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest$1 = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }

	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }

	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag(stackedTag, index - endTagLength, index);
	    }

	    if (html === last && options.chars) {
	      options.chars(html);
	      break
	    }
	  }

	  // Clean up any remaining tags
	  parseEndTag();

	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }

	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }

	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;

	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag(lastTag);
	      }
	      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
	        parseEndTag(tagName);
	      }
	    }

	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }

	    if (!unary) {
	      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
	      lastTag = tagName;
	      unarySlash = '';
	    }

	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }

	  function parseEndTag (tagName, start, end) {
	    var pos, lowerCasedTagName;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }

	    if (tagName) {
	      lowerCasedTagName = tagName.toLowerCase();
	    }

	    // Find the closest opened tag of the same type
	    if (tagName) {
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }

	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }

	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (lowerCasedTagName === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (lowerCasedTagName === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}

	/*  */

	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var inTemplateString = false;
	  var inRegex = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;

	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
	    } else if (inDouble) {
	      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
	    } else if (inTemplateString) {
	      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
	    } else if (inRegex) {
	      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break         // "
	        case 0x27: inSingle = true; break         // '
	        case 0x60: inTemplateString = true; break // `
	        case 0x28: paren++; break                 // (
	        case 0x29: paren--; break                 // )
	        case 0x5B: square++; break                // [
	        case 0x5D: square--; break                // ]
	        case 0x7B: curly++; break                 // {
	        case 0x7D: curly--; break                 // }
	      }
	      if (c === 0x2f) { // /
	        var j = i - 1;
	        var p = (void 0);
	        // find first non-whitespace prev char
	        for (; j >= 0; j--) {
	          p = exp.charAt(j);
	          if (p !== ' ') { break }
	        }
	        if (!p || !/[\w$]/.test(p)) {
	          inRegex = true;
	        }
	      }
	    }
	  }

	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }

	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }

	  return expression
	}

	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});

	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}

	/*  */

	function baseWarn (msg) {
	  console.error(("[Vue parser]: " + msg));
	}

	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}

	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}

	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}

	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}

	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  if (modifiers && modifiers.once) {
	    delete modifiers.once;
	    name = '~' + name; // mark the event as once
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}

	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return parseFilters(dynamicValue)
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}

	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}

	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;

	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */

	function parseModel (val) {
	  str = val;
	  len = str.length;
	  index$1 = expressionPos = expressionEndPos = 0;

	  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	    return {
	      exp: val,
	      idx: null
	    }
	  }

	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }

	  return {
	    exp: val.substring(0, expressionPos),
	    idx: val.substring(expressionPos + 1, expressionEndPos)
	  }
	}

	function next () {
	  return str.charCodeAt(++index$1)
	}

	function eof () {
	  return index$1 >= len
	}

	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}

	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}

	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}

	/*  */

	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
	var bindRE = /^:|^v-bind:/;
	var onRE = /^@|^v-on:/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^.]+/g;

	var decodeHTMLCached = cached(decode);

	// configurable state
	var warn$1;
	var platformGetTagNamespace;
	var platformMustUseProp;
	var platformIsPreTag;
	var preTransforms;
	var transforms;
	var postTransforms;
	var delimiters;

	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$1 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;
	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;
	  parseHTML(template, {
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }

	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }

	      if (isForbiddenTag(element) && !isServerRendering()) {
	        element.forbidden = true;
	        "development" !== 'production' && warn$1(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">" + ', as they will not be parsed.'
	        );
	      }

	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }

	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);

	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;

	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }

	      function checkRootConstraints (el) {
	        if ("development" !== 'production' && !warned) {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warned = true;
	            warn$1(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes:\n' + template
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warned = true;
	            warn$1(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements:\n' + template
	            );
	          }
	        }
	      }

	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow root elements with v-if, v-else-if and v-else
	        if (root.if && (element.elseif || element.else)) {
	          checkRootConstraints(element);
	          addIfCondition(root, {
	            exp: element.elseif,
	            block: element
	          });
	        } else if ("development" !== 'production' && !warned) {
	          warned = true;
	          warn$1(
	            "Component template should contain exactly one root element:" +
	            "\n\n" + template + "\n\n" +
	            "If you are using v-if on multiple elements, " +
	            "use v-else-if to chain them instead."
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.elseif || element.else) {
	          processIfConditions(element, currentParent);
	        } else if (element.slotScope) { // scoped slot
	          currentParent.plain = false;
	          var name = element.slotTarget || 'default';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },

	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      // check pre state
	      if (element.pre) {
	        inVPre = false;
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = false;
	      }
	    },

	    chars: function chars (text) {
	      if (!currentParent) {
	        if ("development" !== 'production' && !warned && text === template) {
	          warned = true;
	          warn$1(
	            'Component template requires a root element, rather than just text:\n\n' + template
	          );
	        }
	        return
	      }
	      // IE textarea placeholder bug
	      /* istanbul ignore if */
	      if (isIE &&
	          currentParent.tag === 'textarea' &&
	          currentParent.attrsMap.placeholder === text) {
	        return
	      }
	      var children = currentParent.children;
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else if (text !== ' ' || children[children.length - 1].text !== ' ') {
	          currentParent.children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}

	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}

	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}

	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if ("development" !== 'production' && el.tag === 'template') {
	      warn$1("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}

	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}

	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      "development" !== 'production' && warn$1(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}

	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	    addIfCondition(el, {
	      exp: exp,
	      block: el
	    });
	  } else {
	    if (getAndRemoveAttr(el, 'v-else') != null) {
	      el.else = true;
	    }
	    var elseif = getAndRemoveAttr(el, 'v-else-if');
	    if (elseif) {
	      el.elseif = elseif;
	    }
	  }
	}

	function processIfConditions (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    addIfCondition(prev, {
	      exp: el.elseif,
	      block: el
	    });
	  } else {
	    warn$1(
	      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
	      "used on element <" + (el.tag) + "> without corresponding v-if."
	    );
	  }
	}

	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].type === 1) {
	      return children[i]
	    } else {
	      if ("development" !== 'production' && children[i].text !== ' ') {
	        warn$1(
	          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
	          "will be ignored."
	        );
	      }
	      children.pop();
	    }
	  }
	}

	function addIfCondition (el, condition) {
	  if (!el.ifConditions) {
	    el.ifConditions = [];
	  }
	  el.ifConditions.push(condition);
	}

	function processOnce (el) {
	  var once = getAndRemoveAttr(el, 'v-once');
	  if (once != null) {
	    el.once = true;
	  }
	}

	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	    if ("development" !== 'production' && el.key) {
	      warn$1(
	        "`key` does not work on <slot> because slots are abstract outlets " +
	        "and can possibly expand into multiple elements. " +
	        "Use the key on a wrapping element instead."
	      );
	    }
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	    }
	    if (el.tag === 'template') {
	      el.slotScope = getAndRemoveAttr(el, 'scope');
	    }
	  }
	}

	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}

	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, arg, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        value = parseFilters(value);
	        isProp = false;
	        if (modifiers) {
	          if (modifiers.prop) {
	            isProp = true;
	            name = camelize(name);
	            if (name === 'innerHtml') { name = 'innerHTML'; }
	          }
	          if (modifiers.camel) {
	            name = camelize(name);
	          }
	        }
	        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        if (argMatch && (arg = argMatch[1])) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if ("development" !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$1(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	    }
	  }
	}

	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}

	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}

	function makeAttrsMap (attrs) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
	      warn$1('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}

	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}

	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;

	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}

	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}

	/*  */

	var isStaticKey;
	var isPlatformReservedTag;

	var genStaticKeysCached = cached(genStaticKeys$1);

	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || no;
	  // first pass: mark all non-static nodes.
	  markStatic(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}

	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}

	function markStatic (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    // do not make component slot content static. this avoids
	    // 1. components not able to mutate slot nodes
	    // 2. static slot content fails for hot-reloading
	    if (
	      !isPlatformReservedTag(node.tag) &&
	      node.tag !== 'slot' &&
	      node.attrsMap['inline-template'] == null
	    ) {
	      return
	    }
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}

	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    // For a node to qualify as a static root, it should have children that
	    // are not just static text. Otherwise the cost of hoisting out will
	    // outweigh the benefits and it's better off to just always render it fresh.
	    if (node.static && node.children.length && !(
	      node.children.length === 1 &&
	      node.children[0].type === 3
	    )) {
	      node.staticRoot = true;
	      return
	    } else {
	      node.staticRoot = false;
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	    if (node.ifConditions) {
	      walkThroughConditionsBlocks(node.ifConditions, isInFor);
	    }
	  }
	}

	function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
	  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
	    markStaticRoots(conditionBlocks[i].block, isInFor);
	  }
	}

	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}

	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}

	/*  */

	var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};

	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: 'if($event.target !== $event.currentTarget)return;',
	  ctrl: 'if(!$event.ctrlKey)return;',
	  shift: 'if(!$event.shiftKey)return;',
	  alt: 'if(!$event.altKey)return;',
	  meta: 'if(!$event.metaKey)return;'
	};

	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}

	function genHandler (
	  name,
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  } else if (Array.isArray(handler)) {
	    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
	  } else if (!handler.modifiers) {
	    return fnExpRE.test(handler.value) || simplePathRE.test(handler.value)
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}")
	  } else {
	    var code = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        code += modifierCode[key];
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code = genKeyFilter(keys) + code;
	    }
	    var handlerCode = simplePathRE.test(handler.value)
	      ? handler.value + '($event)'
	      : handler.value;
	    return 'function($event){' + code + handlerCode + '}'
	  }
	}

	function genKeyFilter (keys) {
	  return ("if(" + (keys.map(genFilterCode).join('&&')) + ")return;")
	}

	function genFilterCode (key) {
	  var keyVal = parseInt(key, 10);
	  if (keyVal) {
	    return ("$event.keyCode!==" + keyVal)
	  }
	  var alias = keyCodes[key];
	  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
	}

	/*  */

	function bind$2 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}

	/*  */

	var baseDirectives = {
	  bind: bind$2,
	  cloak: noop
	};

	/*  */

	// configurable state
	var warn$2;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var isPlatformReservedTag$1;
	var staticRenderFns;
	var onceCount;
	var currentOptions;

	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  var prevOnceCount = onceCount;
	  onceCount = 0;
	  currentOptions = options;
	  warn$2 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  isPlatformReservedTag$1 = options.isReservedTag || no;
	  var code = ast ? genElement(ast) : '_c("div")';
	  staticRenderFns = prevStaticRenderFns;
	  onceCount = prevOnceCount;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}

	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el);
	    } else {
	      var data = el.plain ? undefined : genData(el);

	      var children = el.inlineTemplate ? null : genChildren(el, true);
	      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}

	// hoist static sub-trees out
	function genStatic (el) {
	  el.staticProcessed = true;
	  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}

	// v-once
	function genOnce (el) {
	  el.onceProcessed = true;
	  if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      "development" !== 'production' && warn$2(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el)
	    }
	    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
	  } else {
	    return genStatic(el)
	  }
	}

	function genIf (el) {
	  el.ifProcessed = true; // avoid recursion
	  return genIfConditions(el.ifConditions.slice())
	}

	function genIfConditions (conditions) {
	  if (!conditions.length) {
	    return '_e()'
	  }

	  var condition = conditions.shift();
	  if (condition.exp) {
	    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
	  } else {
	    return ("" + (genTernaryExp(condition.block)))
	  }

	  // v-if with v-once should generate code like (a)?_m(0):_m(1)
	  function genTernaryExp (el) {
	    return el.once ? genOnce(el) : genElement(el)
	  }
	}

	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}

	function genData (el) {
	  var data = '{';

	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }

	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // pre
	  if (el.pre) {
	    data += "pre:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // scoped slots
	  if (el.scopedSlots) {
	    data += (genScopedSlots(el.scopedSlots)) + ",";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var inlineTemplate = genInlineTemplate(el);
	    if (inlineTemplate) {
	      data += inlineTemplate + ",";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}

	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$2);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}

	function genInlineTemplate (el) {
	  var ast = el.children[0];
	  if ("development" !== 'production' && (
	    el.children.length > 1 || ast.type !== 1
	  )) {
	    warn$2('Inline-template components must have exactly one child element.');
	  }
	  if (ast.type === 1) {
	    var inlineRenderFns = generate(ast, currentOptions);
	    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
	  }
	}

	function genScopedSlots (slots) {
	  return ("scopedSlots:{" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "}")
	}

	function genScopedSlot (key, el) {
	  return key + ":function(" + (String(el.attrsMap.scope)) + "){" +
	    "return " + (el.tag === 'template'
	      ? genChildren(el) || 'void 0'
	      : genElement(el)) + "}"
	}

	function genChildren (el, checkSkip) {
	  var children = el.children;
	  if (children.length) {
	    var el$1 = children[0];
	    // optimize single v-for
	    if (children.length === 1 &&
	        el$1.for &&
	        el$1.tag !== 'template' &&
	        el$1.tag !== 'slot') {
	      return genElement(el$1)
	    }
	    var normalizationType = getNormalizationType(children);
	    return ("[" + (children.map(genNode).join(',')) + "]" + (checkSkip
	        ? normalizationType ? ("," + normalizationType) : ''
	        : ''))
	  }
	}

	// determine the normalization needed for the children array.
	// 0: no normalization needed
	// 1: simple normalization needed (possible 1-level deep nested array)
	// 2: full normalization needed
	function getNormalizationType (children) {
	  var res = 0;
	  for (var i = 0; i < children.length; i++) {
	    var el = children[i];
	    if (el.type !== 1) {
	      continue
	    }
	    if (needsNormalization(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
	      res = 2;
	      break
	    }
	    if (maybeComponent(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
	      res = 1;
	    }
	  }
	  return res
	}

	function needsNormalization (el) {
	  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
	}

	function maybeComponent (el) {
	  return !isPlatformReservedTag$1(el.tag)
	}

	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}

	function genText (text) {
	  return ("_v(" + (text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	}

	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  var res = "_t(" + slotName + (children ? ("," + children) : '');
	  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
	  var bind$$1 = el.attrsMap['v-bind'];
	  if ((attrs || bind$$1) && !children) {
	    res += ",null";
	  }
	  if (attrs) {
	    res += "," + attrs;
	  }
	  if (bind$$1) {
	    res += (attrs ? '' : ',null') + "," + bind$$1;
	  }
	  return res + ')'
	}

	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (componentName, el) {
	  var children = el.inlineTemplate ? null : genChildren(el, true);
	  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}

	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
	  }
	  return res.slice(0, -1)
	}

	// #3895, #4268
	function transformSpecialNewlines (text) {
	  return text
	    .replace(/\u2028/g, '\\u2028')
	    .replace(/\u2029/g, '\\u2029')
	}

	/*  */

	/**
	 * Compile a template.
	 */
	function compile$1 (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}

	/*  */

	// operators like typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}

	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}

	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}

	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("- invalid " + type + " \"" + ident + "\" in expression: " + text));
	  }
	}

	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "- avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + text
	      );
	    } else {
	      errors.push(("- invalid expression: " + text));
	    }
	  }
	}

	/*  */

	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if ("development" !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}

	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}

	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};

	/*  */

	function transformNode$1 (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticStyle = getAndRemoveAttr(el, 'style');
	  if (staticStyle) {
	    /* istanbul ignore if */
	    {
	      var expression = parseText(staticStyle, options.delimiters);
	      if (expression) {
	        warn(
	          "style=\"" + staticStyle + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div style="{{ val }}">, use <div :style="val">.'
	        );
	      }
	    }
	    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	  }

	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}

	function genData$2 (el) {
	  var data = '';
	  if (el.staticStyle) {
	    data += "staticStyle:" + (el.staticStyle) + ",";
	  }
	  if (el.styleBinding) {
	    data += "style:(" + (el.styleBinding) + "),";
	  }
	  return data
	}

	var style$1 = {
	  staticKeys: ['staticStyle'],
	  transformNode: transformNode$1,
	  genData: genData$2
	};

	var modules$1 = [
	  klass$1,
	  style$1
	];

	/*  */

	var warn$3;

	function model$1 (
	  el,
	  dir,
	  _warn
	) {
	  warn$3 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;
	  {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$3(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	  }
	  if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else {
	    genDefaultModel(el, value, modifiers);
	  }
	  // ensure runtime directive metadata
	  return true
	}

	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" + (
	        trueValueBinding === 'true'
	          ? (":(" + value + ")")
	          : (":_q(" + value + "," + trueValueBinding + ")")
	      )
	  );
	  addHandler(el, 'click',
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  );
	}

	function genRadioModel (
	    el,
	    value,
	    modifiers
	) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, 'click', genAssignmentCode(value, valueBinding), null, true);
	}

	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  {
	    if (el.tag === 'input' && el.attrsMap.value) {
	      warn$3(
	        "<" + (el.tag) + " v-model=\"" + value + "\" value=\"" + (el.attrsMap.value) + "\">:\n" +
	        'inline value attributes will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	    if (el.tag === 'textarea' && el.children.length) {
	      warn$3(
	        "<textarea v-model=\"" + value + "\">:\n" +
	        'inline content inside <textarea> will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	  }

	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var event = lazy || (isIE && type === 'range') ? 'change' : 'input';
	  var needCompositionGuard = !lazy && type !== 'range';
	  var isNative = el.tag === 'input' || el.tag === 'textarea';

	  var valueExpression = isNative
	    ? ("$event.target.value" + (trim ? '.trim()' : ''))
	    : trim ? "(typeof $event === 'string' ? $event.trim() : $event)" : "$event";
	  valueExpression = number || type === 'number'
	    ? ("_n(" + valueExpression + ")")
	    : valueExpression;

	  var code = genAssignmentCode(value, valueExpression);
	  if (isNative && needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }

	  // inputs with type="file" are read only and setting the input's
	  // value will throw an error.
	  if ("development" !== 'production' &&
	      type === 'file') {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	      "File inputs are read only. Use a v-on:change listener instead."
	    );
	  }

	  addProp(el, 'value', isNative ? ("_s(" + value + ")") : ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	  if (trim || number || type === 'number') {
	    addHandler(el, 'blur', '$forceUpdate()');
	  }
	}

	function genSelect (
	    el,
	    value,
	    modifiers
	) {
	  {
	    el.children.some(checkOptionWarning);
	  }

	  var number = modifiers && modifiers.number;
	  var assignment = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})" +
	    (el.attrsMap.multiple == null ? '[0]' : '');

	  var code = genAssignmentCode(value, assignment);
	  addHandler(el, 'change', code, null, true);
	}

	function checkOptionWarning (option) {
	  if (option.type === 1 &&
	    option.tag === 'option' &&
	    option.attrsMap.selected != null) {
	    warn$3(
	      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
	      'inline selected attributes on <option> will be ignored when using v-model. ' +
	      'Declare initial values in the component\'s data option instead.'
	    );
	    return true
	  }
	  return false
	}

	function genAssignmentCode (value, assignment) {
	  var modelRs = parseModel(value);
	  if (modelRs.idx === null) {
	    return (value + "=" + assignment)
	  } else {
	    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
	      "if (!Array.isArray($$exp)){" +
	        value + "=" + assignment + "}" +
	      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
	  }
	}

	/*  */

	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}

	/*  */

	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}

	var directives$1 = {
	  model: model$1,
	  text: text,
	  html: html
	};

	/*  */

	var cache = Object.create(null);

	var baseOptions = {
	  expectHTML: true,
	  modules: modules$1,
	  staticKeys: genStaticKeys(modules$1),
	  directives: directives$1,
	  isReservedTag: isReservedTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  getTagNamespace: getTagNamespace,
	  isPreTag: isPreTag
	};

	function compile$$1 (
	  template,
	  options
	) {
	  options = options
	    ? extend(extend({}, baseOptions), options)
	    : baseOptions;
	  return compile$1(template, options)
	}

	function compileToFunctions (
	  template,
	  options,
	  vm
	) {
	  var _warn = (options && options.warn) || warn;
	  // detect possible CSP restriction
	  /* istanbul ignore if */
	  {
	    try {
	      new Function('return 1');
	    } catch (e) {
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        _warn(
	          'It seems you are using the standalone build of Vue.js in an ' +
	          'environment with Content Security Policy that prohibits unsafe-eval. ' +
	          'The template compiler cannot work in this environment. Consider ' +
	          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	          'templates into render functions.'
	        );
	      }
	    }
	  }
	  var key = options && options.delimiters
	    ? String(options.delimiters) + template
	    : template;
	  if (cache[key]) {
	    return cache[key]
	  }
	  var res = {};
	  var compiled = compile$$1(template, options);
	  res.render = makeFunction(compiled.render);
	  var l = compiled.staticRenderFns.length;
	  res.staticRenderFns = new Array(l);
	  for (var i = 0; i < l; i++) {
	    res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i]);
	  }
	  {
	    if (res.render === noop || res.staticRenderFns.some(function (fn) { return fn === noop; })) {
	      _warn(
	        "failed to compile template:\n\n" + template + "\n\n" +
	        detectErrors(compiled.ast).join('\n') +
	        '\n\n',
	        vm
	      );
	    }
	  }
	  return (cache[key] = res)
	}

	function makeFunction (code) {
	  try {
	    return new Function(code)
	  } catch (e) {
	    return noop
	  }
	}

	/*  */

	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});

	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);

	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    "development" !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }

	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !template) {
	            warn(
	              ("Template element not found or is empty: " + (options.template)),
	              this
	            );
	          }
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      var ref = compileToFunctions(template, {
	        warn: warn,
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;
	    }
	  }
	  return mount.call(this, el, hydrating)
	};

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}

	Vue$3.compile = compileToFunctions;

	return Vue$3;

	})));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-resource v1.2.1
	 * https://github.com/pagekit/vue-resource
	 * Released under the MIT License.
	 */

	'use strict';

	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */

	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING  = 2;

	function Promise$1(executor) {

	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];

	    var promise = this;

	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}

	Promise$1.reject = function (r) {
	    return new Promise$1(function (resolve, reject) {
	        reject(r);
	    });
	};

	Promise$1.resolve = function (x) {
	    return new Promise$1(function (resolve, reject) {
	        resolve(x);
	    });
	};

	Promise$1.all = function all(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        var count = 0, result = [];

	        if (iterable.length === 0) {
	            resolve(result);
	        }

	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;

	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }

	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};

	Promise$1.race = function race(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};

	var p$1 = Promise$1.prototype;

	p$1.resolve = function resolve(x) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        var called = false;

	        try {
	            var then = x && x['then'];

	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;

	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }

	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};

	p$1.reject = function reject(reason) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};

	p$1.notify = function notify() {
	    var promise = this;

	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];

	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};

	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;

	    return new Promise$1(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};

	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};

	/**
	 * Promise adapter.
	 */

	if (typeof Promise === 'undefined') {
	    window.Promise = Promise$1;
	}

	function PromiseObj(executor, context) {

	    if (executor instanceof Promise) {
	        this.promise = executor;
	    } else {
	        this.promise = new Promise(executor.bind(context));
	    }

	    this.context = context;
	}

	PromiseObj.all = function (iterable, context) {
	    return new PromiseObj(Promise.all(iterable), context);
	};

	PromiseObj.resolve = function (value, context) {
	    return new PromiseObj(Promise.resolve(value), context);
	};

	PromiseObj.reject = function (reason, context) {
	    return new PromiseObj(Promise.reject(reason), context);
	};

	PromiseObj.race = function (iterable, context) {
	    return new PromiseObj(Promise.race(iterable), context);
	};

	var p = PromiseObj.prototype;

	p.bind = function (context) {
	    this.context = context;
	    return this;
	};

	p.then = function (fulfilled, rejected) {

	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
	};

	p.catch = function (rejected) {

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.catch(rejected), this.context);
	};

	p.finally = function (callback) {

	    return this.then(function (value) {
	            callback.call(this);
	            return value;
	        }, function (reason) {
	            callback.call(this);
	            return Promise.reject(reason);
	        }
	    );
	};

	/**
	 * Utility functions.
	 */

	var ref = {};
	var hasOwnProperty = ref.hasOwnProperty;

	var ref$1 = [];
	var slice = ref$1.slice;
	var debug = false;
	var ntick;

	var inBrowser = typeof window !== 'undefined';

	var Util = function (ref) {
	    var config = ref.config;
	    var nextTick = ref.nextTick;

	    ntick = nextTick;
	    debug = config.debug || !config.silent;
	};

	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}

	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}

	function nextTick(cb, ctx) {
	    return ntick(cb, ctx);
	}

	function trim(str) {
	    return str ? str.replace(/^\s*|\s*$/g, '') : '';
	}

	function toLower(str) {
	    return str ? str.toLowerCase() : '';
	}

	function toUpper(str) {
	    return str ? str.toUpperCase() : '';
	}

	var isArray = Array.isArray;

	function isString(val) {
	    return typeof val === 'string';
	}



	function isFunction(val) {
	    return typeof val === 'function';
	}

	function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	}

	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}

	function isBlob(obj) {
	    return typeof Blob !== 'undefined' && obj instanceof Blob;
	}

	function isFormData(obj) {
	    return typeof FormData !== 'undefined' && obj instanceof FormData;
	}

	function when(value, fulfilled, rejected) {

	    var promise = PromiseObj.resolve(value);

	    if (arguments.length < 2) {
	        return promise;
	    }

	    return promise.then(fulfilled, rejected);
	}

	function options(fn, obj, opts) {

	    opts = opts || {};

	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }

	    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
	}

	function each(obj, iterator) {

	    var i, key;

	    if (isArray(obj)) {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (hasOwnProperty.call(obj, key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }

	    return obj;
	}

	var assign = Object.assign || _assign;

	function merge(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source, true);
	    });

	    return target;
	}

	function defaults(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {

	        for (var key in source) {
	            if (target[key] === undefined) {
	                target[key] = source[key];
	            }
	        }

	    });

	    return target;
	}

	function _assign(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source);
	    });

	    return target;
	}

	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}

	/**
	 * Root Prefix Transform.
	 */

	var root = function (options$$1, next) {

	    var url = next(options$$1);

	    if (isString(options$$1.root) && !url.match(/^(https?:)?\//)) {
	        url = options$$1.root + '/' + url;
	    }

	    return url;
	};

	/**
	 * Query Parameter Transform.
	 */

	var query = function (options$$1, next) {

	    var urlParams = Object.keys(Url.options.params), query = {}, url = next(options$$1);

	    each(options$$1.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });

	    query = Url.params(query);

	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }

	    return url;
	};

	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */

	function expand(url, params, variables) {

	    var tmpl = parse(url), expanded = tmpl.expand(params);

	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }

	    return expanded;
	}

	function parse(template) {

	    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];

	    return {
	        vars: variables,
	        expand: function expand(context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {

	                    var operator = null, values = [];

	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }

	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });

	                    if (operator && operator !== '+') {

	                        var separator = ',';

	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }

	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }

	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}

	function getValues(context, operator, key, modifier) {

	    var value = context[key], result = [];

	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();

	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }

	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];

	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }

	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }

	    return result;
	}

	function isDefined(value) {
	    return value !== undefined && value !== null;
	}

	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}

	function encodeValue(operator, value, key) {

	    value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeURIComponent(value);

	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}

	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}

	/**
	 * URL Template (RFC 6570) Transform.
	 */

	var template = function (options) {

	    var variables = [], url = expand(options.url, options.params, variables);

	    variables.forEach(function (key) {
	        delete options.params[key];
	    });

	    return url;
	};

	/**
	 * Service for URL templating.
	 */

	function Url(url, params) {

	    var self = this || {}, options$$1 = url, transform;

	    if (isString(url)) {
	        options$$1 = {url: url, params: params};
	    }

	    options$$1 = merge({}, Url.options, self.$options, options$$1);

	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, self.$vm);
	    });

	    return transform(options$$1);
	}

	/**
	 * Url options.
	 */

	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};

	/**
	 * Url transforms.
	 */

	Url.transforms = [template, query, root];

	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */

	Url.params = function (obj) {

	    var params = [], escape = encodeURIComponent;

	    params.add = function (key, value) {

	        if (isFunction(value)) {
	            value = value();
	        }

	        if (value === null) {
	            value = '';
	        }

	        this.push(escape(key) + '=' + escape(value));
	    };

	    serialize(params, obj);

	    return params.join('&').replace(/%20/g, '+');
	};

	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */

	Url.parse = function (url) {

	    var el = document.createElement('a');

	    if (document.documentMode) {
	        el.href = url;
	        url = el.href;
	    }

	    el.href = url;

	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};

	function factory(handler, next, vm) {
	    return function (options$$1) {
	        return handler.call(vm, options$$1, next);
	    };
	}

	function serialize(params, obj, scope) {

	    var array = isArray(obj), plain = isPlainObject(obj), hash;

	    each(obj, function (value, key) {

	        hash = isObject(value) || isArray(value);

	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }

	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}

	/**
	 * XDomain client (Internet Explorer).
	 */

	var xdrClient = function (request) {
	    return new PromiseObj(function (resolve) {

	        var xdr = new XDomainRequest(), handler = function (ref) {
	            var type = ref.type;


	            var status = 0;

	            if (type === 'load') {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            resolve(request.respondWith(xdr.responseText, {status: status}));
	        };

	        request.abort = function () { return xdr.abort(); };

	        xdr.open(request.method, request.getUrl());

	        if (request.timeout) {
	            xdr.timeout = request.timeout;
	        }

	        xdr.onload = handler;
	        xdr.onabort = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = handler;
	        xdr.onprogress = function () {};
	        xdr.send(request.getBody());
	    });
	};

	/**
	 * CORS Interceptor.
	 */

	var SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();

	var cors = function (request, next) {

	    if (inBrowser) {

	        var orgUrl = Url.parse(location.href);
	        var reqUrl = Url.parse(request.getUrl());

	        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {

	            request.crossOrigin = true;
	            request.emulateHTTP = false;

	            if (!SUPPORTS_CORS) {
	                request.client = xdrClient;
	            }
	        }
	    }

	    next();
	};

	/**
	 * Body Interceptor.
	 */

	var body = function (request, next) {

	    if (isFormData(request.body)) {

	        request.headers.delete('Content-Type');

	    } else if (isObject(request.body) || isArray(request.body)) {

	        if (request.emulateJSON) {
	            request.body = Url.params(request.body);
	            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
	        } else {
	            request.body = JSON.stringify(request.body);
	        }
	    }

	    next(function (response) {

	        Object.defineProperty(response, 'data', {

	            get: function get() {
	                return this.body;
	            },

	            set: function set(body) {
	                this.body = body;
	            }

	        });

	        return response.bodyText ? when(response.text(), function (text) {

	            var type = response.headers.get('Content-Type') || '';

	            if (type.indexOf('application/json') === 0 || isJson(text)) {

	                try {
	                    response.body = JSON.parse(text);
	                } catch (e) {
	                    response.body = null;
	                }

	            } else {
	                response.body = text;
	            }

	            return response;

	        }) : response;

	    });
	};

	function isJson(str) {

	    var start = str.match(/^\[|^\{(?!\{)/), end = {'[': /]$/, '{': /}$/};

	    return start && end[start[0]].test(str);
	}

	/**
	 * JSONP client (Browser).
	 */

	var jsonpClient = function (request) {
	    return new PromiseObj(function (resolve) {

	        var name = request.jsonp || 'callback', callback = request.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2), body = null, handler, script;

	        handler = function (ref) {
	            var type = ref.type;


	            var status = 0;

	            if (type === 'load' && body !== null) {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            if (status && window[callback]) {
	                delete window[callback];
	                document.body.removeChild(script);
	            }

	            resolve(request.respondWith(body, {status: status}));
	        };

	        window[callback] = function (result) {
	            body = JSON.stringify(result);
	        };

	        request.abort = function () {
	            handler({type: 'abort'});
	        };

	        request.params[name] = callback;

	        if (request.timeout) {
	            setTimeout(request.abort, request.timeout);
	        }

	        script = document.createElement('script');
	        script.src = request.getUrl();
	        script.type = 'text/javascript';
	        script.async = true;
	        script.onload = handler;
	        script.onerror = handler;

	        document.body.appendChild(script);
	    });
	};

	/**
	 * JSONP Interceptor.
	 */

	var jsonp = function (request, next) {

	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }

	    next();
	};

	/**
	 * Before Interceptor.
	 */

	var before = function (request, next) {

	    if (isFunction(request.before)) {
	        request.before.call(this, request);
	    }

	    next();
	};

	/**
	 * HTTP method override Interceptor.
	 */

	var method = function (request, next) {

	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers.set('X-HTTP-Method-Override', request.method);
	        request.method = 'POST';
	    }

	    next();
	};

	/**
	 * Header Interceptor.
	 */

	var header = function (request, next) {

	    var headers = assign({}, Http.headers.common,
	        !request.crossOrigin ? Http.headers.custom : {},
	        Http.headers[toLower(request.method)]
	    );

	    each(headers, function (value, name) {
	        if (!request.headers.has(name)) {
	            request.headers.set(name, value);
	        }
	    });

	    next();
	};

	/**
	 * XMLHttp client (Browser).
	 */

	var SUPPORTS_BLOB = typeof Blob !== 'undefined' && typeof FileReader !== 'undefined';

	var xhrClient = function (request) {
	    return new PromiseObj(function (resolve) {

	        var xhr = new XMLHttpRequest(), handler = function (event) {

	            var response = request.respondWith(
	                'response' in xhr ? xhr.response : xhr.responseText, {
	                    status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
	                    statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
	                }
	            );

	            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
	                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
	            });

	            resolve(response);
	        };

	        request.abort = function () { return xhr.abort(); };

	        if (request.progress) {
	            if (request.method === 'GET') {
	                xhr.addEventListener('progress', request.progress);
	            } else if (/^(POST|PUT)$/i.test(request.method)) {
	                xhr.upload.addEventListener('progress', request.progress);
	            }
	        }

	        xhr.open(request.method, request.getUrl(), true);

	        if (request.timeout) {
	            xhr.timeout = request.timeout;
	        }

	        if (request.credentials === true) {
	            xhr.withCredentials = true;
	        }

	        if (!request.crossOrigin) {
	            request.headers.set('X-Requested-With', 'XMLHttpRequest');
	        }

	        if ('responseType' in xhr && SUPPORTS_BLOB) {
	            xhr.responseType = 'blob';
	        }

	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });

	        xhr.onload = handler;
	        xhr.onabort = handler;
	        xhr.onerror = handler;
	        xhr.ontimeout = handler;
	        xhr.send(request.getBody());
	    });
	};

	/**
	 * Http client (Node).
	 */

	var nodeClient = function (request) {

	    var client = __webpack_require__(3);

	    return new PromiseObj(function (resolve) {

	        var url = request.getUrl();
	        var body = request.getBody();
	        var method = request.method;
	        var headers = {}, handler;

	        request.headers.forEach(function (value, name) {
	            headers[name] = value;
	        });

	        client(url, {body: body, method: method, headers: headers}).then(handler = function (resp) {

	            var response = request.respondWith(resp.body, {
	                    status: resp.statusCode,
	                    statusText: trim(resp.statusMessage)
	                }
	            );

	            each(resp.headers, function (value, name) {
	                response.headers.set(name, value);
	            });

	            resolve(response);

	        }, function (error$$1) { return handler(error$$1.response); });
	    });
	};

	/**
	 * Base client.
	 */

	var Client = function (context) {

	    var reqHandlers = [sendRequest], resHandlers = [], handler;

	    if (!isObject(context)) {
	        context = null;
	    }

	    function Client(request) {
	        return new PromiseObj(function (resolve) {

	            function exec() {

	                handler = reqHandlers.pop();

	                if (isFunction(handler)) {
	                    handler.call(context, request, next);
	                } else {
	                    warn(("Invalid interceptor of type " + (typeof handler) + ", must be a function"));
	                    next();
	                }
	            }

	            function next(response) {

	                if (isFunction(response)) {

	                    resHandlers.unshift(response);

	                } else if (isObject(response)) {

	                    resHandlers.forEach(function (handler) {
	                        response = when(response, function (response) {
	                            return handler.call(context, response) || response;
	                        });
	                    });

	                    when(response, resolve);

	                    return;
	                }

	                exec();
	            }

	            exec();

	        }, context);
	    }

	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };

	    return Client;
	};

	function sendRequest(request, resolve) {

	    var client = request.client || (inBrowser ? xhrClient : nodeClient);

	    resolve(client(request));
	}

	/**
	 * HTTP Headers.
	 */

	var Headers = function Headers(headers) {
	    var this$1 = this;


	    this.map = {};

	    each(headers, function (value, name) { return this$1.append(name, value); });
	};

	Headers.prototype.has = function has (name) {
	    return getName(this.map, name) !== null;
	};

	Headers.prototype.get = function get (name) {

	    var list = this.map[getName(this.map, name)];

	    return list ? list.join() : null;
	};

	Headers.prototype.getAll = function getAll (name) {
	    return this.map[getName(this.map, name)] || [];
	};

	Headers.prototype.set = function set (name, value) {
	    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
	};

	Headers.prototype.append = function append (name, value){

	    var list = this.map[getName(this.map, name)];

	    if (list) {
	        list.push(trim(value));
	    } else {
	        this.set(name, value);
	    }
	};

	Headers.prototype.delete = function delete$1 (name){
	    delete this.map[getName(this.map, name)];
	};

	Headers.prototype.deleteAll = function deleteAll (){
	    this.map = {};
	};

	Headers.prototype.forEach = function forEach (callback, thisArg) {
	        var this$1 = this;

	    each(this.map, function (list, name) {
	        each(list, function (value) { return callback.call(thisArg, value, name, this$1); });
	    });
	};

	function getName(map, name) {
	    return Object.keys(map).reduce(function (prev, curr) {
	        return toLower(name) === toLower(curr) ? curr : prev;
	    }, null);
	}

	function normalizeName(name) {

	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }

	    return trim(name);
	}

	/**
	 * HTTP Response.
	 */

	var Response = function Response(body, ref) {
	    var url = ref.url;
	    var headers = ref.headers;
	    var status = ref.status;
	    var statusText = ref.statusText;


	    this.url = url;
	    this.ok = status >= 200 && status < 300;
	    this.status = status || 0;
	    this.statusText = statusText || '';
	    this.headers = new Headers(headers);
	    this.body = body;

	    if (isString(body)) {

	        this.bodyText = body;

	    } else if (isBlob(body)) {

	        this.bodyBlob = body;

	        if (isBlobText(body)) {
	            this.bodyText = blobText(body);
	        }
	    }
	};

	Response.prototype.blob = function blob () {
	    return when(this.bodyBlob);
	};

	Response.prototype.text = function text () {
	    return when(this.bodyText);
	};

	Response.prototype.json = function json () {
	    return when(this.text(), function (text) { return JSON.parse(text); });
	};

	function blobText(body) {
	    return new PromiseObj(function (resolve) {

	        var reader = new FileReader();

	        reader.readAsText(body);
	        reader.onload = function () {
	            resolve(reader.result);
	        };

	    });
	}

	function isBlobText(body) {
	    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
	}

	/**
	 * HTTP Request.
	 */

	var Request = function Request(options$$1) {

	    this.body = null;
	    this.params = {};

	    assign(this, options$$1, {
	        method: toUpper(options$$1.method || 'GET')
	    });

	    if (!(this.headers instanceof Headers)) {
	        this.headers = new Headers(this.headers);
	    }
	};

	Request.prototype.getUrl = function getUrl (){
	    return Url(this);
	};

	Request.prototype.getBody = function getBody (){
	    return this.body;
	};

	Request.prototype.respondWith = function respondWith (body, options$$1) {
	    return new Response(body, assign(options$$1 || {}, {url: this.getUrl()}));
	};

	/**
	 * Service for sending network requests.
	 */

	var COMMON_HEADERS = {'Accept': 'application/json, text/plain, */*'};
	var JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=utf-8'};

	function Http(options$$1) {

	    var self = this || {}, client = Client(self.$vm);

	    defaults(options$$1 || {}, self.$options, Http.options);

	    Http.interceptors.forEach(function (handler) {
	        client.use(handler);
	    });

	    return client(new Request(options$$1)).then(function (response) {

	        return response.ok ? response : PromiseObj.reject(response);

	    }, function (response) {

	        if (response instanceof Error) {
	            error(response);
	        }

	        return PromiseObj.reject(response);
	    });
	}

	Http.options = {};

	Http.headers = {
	    put: JSON_CONTENT_TYPE,
	    post: JSON_CONTENT_TYPE,
	    patch: JSON_CONTENT_TYPE,
	    delete: JSON_CONTENT_TYPE,
	    common: COMMON_HEADERS,
	    custom: {}
	};

	Http.interceptors = [before, method, body, jsonp, header, cors];

	['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {

	    Http[method$$1] = function (url, options$$1) {
	        return this(assign(options$$1 || {}, {url: url, method: method$$1}));
	    };

	});

	['post', 'put', 'patch'].forEach(function (method$$1) {

	    Http[method$$1] = function (url, body$$1, options$$1) {
	        return this(assign(options$$1 || {}, {url: url, method: method$$1, body: body$$1}));
	    };

	});

	/**
	 * Service for interacting with RESTful services.
	 */

	function Resource(url, params, actions, options$$1) {

	    var self = this || {}, resource = {};

	    actions = assign({},
	        Resource.actions,
	        actions
	    );

	    each(actions, function (action, name) {

	        action = merge({url: url, params: assign({}, params)}, options$$1, action);

	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });

	    return resource;
	}

	function opts(action, args) {

	    var options$$1 = assign({}, action), params = {}, body;

	    switch (args.length) {

	        case 2:

	            params = args[0];
	            body = args[1];

	            break;

	        case 1:

	            if (/^(POST|PUT|PATCH)$/i.test(options$$1.method)) {
	                body = args[0];
	            } else {
	                params = args[0];
	            }

	            break;

	        case 0:

	            break;

	        default:

	            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
	    }

	    options$$1.body = body;
	    options$$1.params = assign({}, options$$1.params, params);

	    return options$$1;
	}

	Resource.actions = {

	    get: {method: 'GET'},
	    save: {method: 'POST'},
	    query: {method: 'GET'},
	    update: {method: 'PUT'},
	    remove: {method: 'DELETE'},
	    delete: {method: 'DELETE'}

	};

	/**
	 * Install plugin.
	 */

	function plugin(Vue) {

	    if (plugin.installed) {
	        return;
	    }

	    Util(Vue);

	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = PromiseObj;

	    Object.defineProperties(Vue.prototype, {

	        $url: {
	            get: function get() {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },

	        $http: {
	            get: function get() {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },

	        $resource: {
	            get: function get() {
	                return Vue.resource.bind(this);
	            }
	        },

	        $promise: {
	            get: function get() {
	                var this$1 = this;

	                return function (executor) { return new Vue.Promise(executor, this$1); };
	            }
	        }

	    });
	}

	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}

	module.exports = plugin;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

	    var Cookie = __webpack_require__(5);

	    var VueCookie = {

	        install: function (Vue) {
	            Vue.prototype.$cookie = this;
	            Vue.cookie = this;
	        },
	        set: function (name, value, daysOrOptions) {
	            var opts = daysOrOptions;
	            if(Number.isInteger(daysOrOptions)) {
	                opts = {expires: daysOrOptions};
	            }
	            return Cookie.set(name, value, opts);
	        },

	        get: function (name) {
	            return Cookie.get(name);
	        },

	        delete: function (name, options) {
	            var opts = {expires: -1};
	            if(options !== undefined) {
	                opts = Object.assign(options, opts);
	            }
	            this.set(name, '', opts);
	        }
	    };

	    if (true) {
	        module.exports = VueCookie;
	    } else if (typeof define == "function" && define.amd) {
	        define([], function(){ return VueCookie; })
	    } else if (window.Vue) {
	        window.VueCookie = VueCookie;
	        Vue.use(VueCookie);
	    }

	})();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * tiny-cookie - A tiny cookie manipulation plugin
	 * https://github.com/Alex1990/tiny-cookie
	 * Under the MIT license | (c) Alex Chao
	 */

	!(function(root, factory) {

	  // Uses CommonJS, AMD or browser global to create a jQuery plugin.
	  // See: https://github.com/umdjs/umd
	  if (true) {
	    // Expose this plugin as an AMD module. Register an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node/CommonJS module
	    module.exports = factory();
	  } else {
	    // Browser globals 
	    root.Cookie = factory();
	  }

	}(this, function() {

	  'use strict';

	  // The public function which can get/set/remove cookie.
	  function Cookie(key, value, opts) {
	    if (value === void 0) {
	      return Cookie.get(key);
	    } else if (value === null) {
	      Cookie.remove(key);
	    } else {
	      Cookie.set(key, value, opts);
	    }
	  }

	  // Check if the cookie is enabled.
	  Cookie.enabled = function() {
	    var key = '__test_key';
	    var enabled;

	    document.cookie = key + '=1';
	    enabled = !!document.cookie;

	    if (enabled) Cookie.remove(key);

	    return enabled;
	  };

	  // Get the cookie value by the key.
	  Cookie.get = function(key, raw) {
	    if (typeof key !== 'string' || !key) return null;

	    key = '(?:^|; )' + escapeRe(key) + '(?:=([^;]*?))?(?:;|$)';

	    var reKey = new RegExp(key);
	    var res = reKey.exec(document.cookie);

	    return res !== null ? (raw ? res[1] : decodeURIComponent(res[1])) : null;
	  };

	  // Get the cookie's value without decoding.
	  Cookie.getRaw = function(key) {
	    return Cookie.get(key, true);
	  };

	  // Set a cookie.
	  Cookie.set = function(key, value, raw, opts) {
	    if (raw !== true) {
	      opts = raw;
	      raw = false;
	    }
	    opts = opts ? convert(opts) : convert({});
	    var cookie = key + '=' + (raw ? value : encodeURIComponent(value)) + opts;
	    document.cookie = cookie;
	  };

	  // Set a cookie without encoding the value.
	  Cookie.setRaw = function(key, value, opts) {
	    Cookie.set(key, value, true, opts);
	  };

	  // Remove a cookie by the specified key.
	  Cookie.remove = function(key) {
	    Cookie.set(key, 'a', { expires: new Date() });
	  };

	  // Helper function
	  // ---------------

	  // Escape special characters.
	  function escapeRe(str) {
	    return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
	  }

	  // Convert an object to a cookie option string.
	  function convert(opts) {
	    var res = '';

	    for (var p in opts) {
	      if (opts.hasOwnProperty(p)) {

	        if (p === 'expires') {
	          var expires = opts[p];
	          if (typeof expires !== 'object') {
	            expires += typeof expires === 'number' ? 'D' : '';
	            expires = computeExpires(expires);
	          }
	          opts[p] = expires.toUTCString();
	        }

	        if (p === 'secure') {
	          if (opts[p]) {
	            res += ';' + p;
	          }

	          continue;
	        }

	        res += ';' + p + '=' + opts[p];
	      }
	    }

	    if (!opts.hasOwnProperty('path')) {
	      res += ';path=/';
	    }

	    return res;
	  }

	  // Return a future date by the given string.
	  function computeExpires(str) {
	    var expires = new Date();
	    var lastCh = str.charAt(str.length - 1);
	    var value = parseInt(str, 10);

	    switch (lastCh) {
	      case 'Y': expires.setFullYear(expires.getFullYear() + value); break;
	      case 'M': expires.setMonth(expires.getMonth() + value); break;
	      case 'D': expires.setDate(expires.getDate() + value); break;
	      case 'h': expires.setHours(expires.getHours() + value); break;
	      case 'm': expires.setMinutes(expires.getMinutes() + value); break;
	      case 's': expires.setSeconds(expires.getSeconds() + value); break;
	      default: expires = new Date(str);
	    }

	    return expires;
	  }

	  return Cookie;

	}));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * https://github.com/arashm/JDate
	 * @author: Arash Mousavi
	 * @version: 0.1.5
	 */
	var jalali = __webpack_require__(8);
	//try {
	//  var map = require('map');
	//} catch (e) {
	  var map = __webpack_require__(9)
	//}

	module.exports = JDate;

	var MONTH_NAMES = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'امرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
	var ABBR_DAYS = ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش'];
	var DAYS_NAMES = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];

	/*
	 * Helper Functions
	 */
	var fix_month = function(year, month) {
	  if (month > 12 || month <= 0) {
	    var yearDiff = Math.floor((month - 1) / 12);
	    year += yearDiff;
	    month = month - yearDiff * 12;
	  }
	  return [year, month]
	}

	var replaceYear = function(str, date) {
	  match = str.match(/[yY]+/);
	  if (match) {
	    switch (match[0]) {
	    case 'YYYY':
	    case 'YYY':
	      var value = replaceYear(str.replace(match, date.getFullYear()), date);
	      return value;
	    case 'YY':
	      var value = replaceYear(str.replace(match, String(date.getFullYear()).slice(2)), date);
	      return value;
	    }
	  } else {
	    return str;
	  }
	}

	var replaceMonth = function(str, date) {
	  match = str.match(/[mM]+/);
	  if (match) {
	    switch (match[0]) {
	    case 'M':
	    case 'MM':
	      var value = replaceMonth(str.replace(match, date.getMonth()), date);
	      return value;
	    case 'MMM':
	    case 'MMMM':
	      var value = replaceMonth(str.replace(match, MONTH_NAMES[date.getMonth() - 1]), date);
	      return value;
	    }
	  } else {
	    return str
	  }
	}

	var replaceDay = function(str, date) {
	  match = str.match(/[dD]+/);
	  if (match) {
	    switch (match[0]) {
	    case 'D':
	    case 'DD':
	      var value = replaceDay(str.replace(match, date.getDate()), date);
	      return value;
	    case 'd':
	    case 'dd':
	      var value = replaceDay(str.replace(match, ABBR_DAYS[date.getDay()]), date);
	      return value;
	    case 'ddd':
	    case 'dddd':
	      var value = replaceDay(str.replace(match, DAYS_NAMES[date.getDay()]), date);
	      return value;
	    }
	  } else {
	    return str;
	  }
	 }

	 /*
	  * Initialize JDate with either a Date object or an Array of
	  * Jalali date: [1393, 5, 3]
	  *
	  * @params {Array, Date} date
	  */
	function JDate(_date) {
	  var date, _d
	  this._d = _date || new Date;
	  if (this._d instanceof Array) {
	    this.date = map(this._d, function(v){
	      return parseInt(v);
	    });
	    this._d = this.to_gregorian();
	  } else if (this._d instanceof Date) {
	    this.date = JDate.to_jalali(this._d);
	  }
	}

	/*
	 * Converts JDate date to Gregorian
	 */
	JDate.prototype.to_gregorian = function() {
	  return JDate.to_gregorian(this.date[0], this.date[1], this.date[2]);
	}

	/*
	 * Shows Jalali's full year, ex: 1393
	 *
	 * @return {Integer}
	 */
	JDate.prototype.getFullYear = function() {
	  return this.date[0];
	}

	/*
	 * Sets the Jalali full year
	 *
	 * @params {Number} year
	 * @return {JDate}
	 */
	JDate.prototype.setFullYear = function(year) {
	  this.date[0] = parseInt(year);
	  this._d = this.to_gregorian();
	  return this
	}

	/*
	 * Shows Jalali month number.
	 *
	 * @return {Number} Jalali month number
	 */
	JDate.prototype.getMonth = function() {
	  return this.date[1];
	}

	/*
	 * Sets the Jalali month number. An integer between 0 and 11
	 *
	 * @params {Number} month
	 * @returns {JDate}
	 */
	JDate.prototype.setMonth = function(month) {
	  fixed = fix_month(this.getFullYear(), parseInt(month));
	  this.date[0] = fixed[0];
	  this.date[1] = fixed[1];
	  this._d = this.to_gregorian();
	  return this
	}

	/*
	 * Shows Jalali day number. A number between 0 to 31
	 *
	 * @return {Number} Jalali day number
	 */
	JDate.prototype.getDate = function() {
	  return this.date[2];
	}

	/*
	 * Sets Jalali day number. A number between 0 to 31
	 *
	 * @params {Number} date
	 * @return {JDate}
	 */
	JDate.prototype.setDate = function(date) {
	  this.date[2] = parseInt(date);
	  this._d = this.to_gregorian();
	  return this
	}

	/*
	 * Returns the day of the week for the specified date. A number between 0 to 6
	 *
	 * @returns {Number}
	 */
	JDate.prototype.getDay = function() {
	  return this._d.getDay()
	}

	/*
	 * Returns a formated output of current date
	 *
	 * @params {String} format
	 * @return {String}
	 */
	JDate.prototype.format = function(format) {
	  format = replaceYear(format, this);
	  format = replaceMonth(format, this);
	  format = replaceDay(format, this);
	  return format;
	}

	/*
	 * Coverts a Gregorian date to Jalali date
	 *
	 * @params {Date} date
	 * @return {Array}
	 */
	JDate.to_jalali = function(date) {
	  var jdate = jalali.d2j(jalali.g2d(date.getFullYear(), date.getMonth() + 1, date.getDate()));
	  return [jdate.jy, jdate.jm, jdate.jd]
	}

	/*
	 * converts a Jalali date to Gregorian
	 *
	 * @params {Number} year
	 * @params {Number} month
	 * @params {Number} day
	 * @return {Date}
	 */
	JDate.to_gregorian = function(year, month, day) {
	  var gdate = jalali.d2g(jalali.j2d(year, month, day));
	  return new Date(gdate.gy, gdate.gm - 1, gdate.gd);
	}

	/*
	 * Checks if a given year is a leap year or not
	 *
	 * @params {Number} year
	 * @return {Boolean}
	 */
	JDate.isLeapYear = function(year) {
	  return jalali.jalCal(year).leap === 0
	}

	/*
	 * Returns month length
	 *
	 * @params {Number} year
	 * @params {Number} month
	 * @return {Number}
	 */
	JDate.daysInMonth = function (year, month) {
	  year += ~~(month / 12)
	  month = month - ~~(month / 12) * 12
	  if (month < 0) {
	    month += 12
	    year -= 1
	  } else if (month == 0) {
	    month = 12
	  }
	  if (month <= 6) {
	    return 31
	  } else if (month <= 11) {
	    return 30
	  } else if (JDate.isLeapYear(year)) {
	    return 30
	  } else {
	    return 29
	  }
	}



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function (root) {

	/*
	  Expose.
	*/

	var jalaali = { jalCal: jalCal
	              , j2d: j2d
	              , d2j: d2j
	              , g2d: g2d
	              , d2g: d2g
	              }
	if (true) module.exports = jalaali
	else root.jalaali = jalaali

	/*
	  Utility helper functions.
	*/

	function div(a, b) {
	  return ~~(a / b)
	}

	function mod(a, b) {
	  return a - ~~(a / b) * b
	}

	/*
	  This function determines if the Jalaali (Persian) year is
	  leap (366-day long) or is the common year (365 days), and
	  finds the day in March (Gregorian calendar) of the first
	  day of the Jalaali year (jy).

	  @param jy Jalaali calendar year (-61 to 3177)
	  @return
	    leap: number of years since the last leap year (0 to 4)
	    gy: Gregorian year of the beginning of Jalaali year
	    march: the March day of Farvardin the 1st (1st day of jy)
	  @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
	  @see: http://www.fourmilab.ch/documents/calendar/
	*/

	function jalCal(jy) {
	  // Jalaali years starting the 33-year rule.
	  var breaks =  [ -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210
	                , 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
	                ]
	    , bl = breaks.length
	    , gy = jy + 621
	    , leapJ = -14
	    , jp = breaks[0]
	    , jm
	    , jump
	    , leap
	    , leapG
	    , march
	    , n
	    , i

	  if (jy < jp || jy >= breaks[bl - 1])
	    throw new Error('Invalid Jalaali year ' + jy)

	  // Find the limiting years for the Jalaali year jy.
	  for (i = 1; i < bl; i += 1) {
	    jm = breaks[i]
	    jump = jm - jp
	    if (jy < jm)
	      break
	    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4)
	    jp = jm
	  }
	  n = jy - jp

	  // Find the number of leap years from AD 621 to the beginning
	  // of the current Jalaali year in the Persian calendar.
	  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4)
	  if (mod(jump, 33) === 4 && jump - n === 4)
	    leapJ += 1

	  // And the same in the Gregorian calendar (until the year gy).
	  leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150

	  // Determine the Gregorian date of Farvardin the 1st.
	  march = 20 + leapJ - leapG

	  // Find how many years have passed since the last leap year.
	  if (jump - n < 6)
	    n = n - jump + div(jump + 4, 33) * 33
	  leap = mod(mod(n + 1, 33) - 1, 4)
	  if (leap === -1) {
	    leap = 4
	  }

	  return  { leap: leap
	          , gy: gy
	          , march: march
	          }
	}

	/*
	  Converts a date of the Jalaali calendar to the Julian Day number.

	  @param jy Jalaali year (1 to 3100)
	  @param jm Jalaali month (1 to 12)
	  @param jd Jalaali day (1 to 29/31)
	  @return Julian Day number
	*/

	function j2d(jy, jm, jd) {
	  var r = jalCal(jy)
	  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1
	}

	/*
	  Converts the Julian Day number to a date in the Jalaali calendar.

	  @param jdn Julian Day number
	  @return
	    jy: Jalaali year (1 to 3100)
	    jm: Jalaali month (1 to 12)
	    jd: Jalaali day (1 to 29/31)
	*/

	function d2j(jdn) {
	  var gy = d2g(jdn).gy // Calculate Gregorian year (gy).
	    , jy = gy - 621
	    , r = jalCal(jy)
	    , jdn1f = g2d(gy, 3, r.march)
	    , jd
	    , jm
	    , k

	  // Find number of days that passed since 1 Farvardin.
	  k = jdn - jdn1f
	  if (k >= 0) {
	    if (k <= 185) {
	      // The first 6 months.
	      jm = 1 + div(k, 31)
	      jd = mod(k, 31) + 1
	      return  { jy: jy
	              , jm: jm
	              , jd: jd
	              }
	    } else {
	      // The remaining months.
	      k -= 186
	    }
	  } else {
	    // Previous Jalaali year.
	    jy -= 1
	    k += 179
	    if (r.leap === 1)
	      k += 1
	  }
	  jm = 7 + div(k, 30)
	  jd = mod(k, 30) + 1
	  return  { jy: jy
	          , jm: jm
	          , jd: jd
	          }
	}

	/*
	  Calculates the Julian Day number from Gregorian or Julian
	  calendar dates. This integer number corresponds to the noon of
	  the date (i.e. 12 hours of Universal Time).
	  The procedure was tested to be good since 1 March, -100100 (of both
	  calendars) up to a few million years into the future.

	  @param gy Calendar year (years BC numbered 0, -1, -2, ...)
	  @param gm Calendar month (1 to 12)
	  @param gd Calendar day of the month (1 to 28/29/30/31)
	  @return Julian Day number
	*/

	function g2d(gy, gm, gd) {
	  var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
	      + div(153 * mod(gm + 9, 12) + 2, 5)
	      + gd - 34840408
	  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752
	  return d
	}

	/*
	  Calculates Gregorian and Julian calendar dates from the Julian Day number
	  (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
	  calendars) to some millions years ahead of the present.

	  @param jdn Julian Day number
	  @return
	    gy: Calendar year (years BC numbered 0, -1, -2, ...)
	    gm: Calendar month (1 to 12)
	    gd: Calendar day of the month M (1 to 28/29/30/31)
	*/

	function d2g(jdn) {
	  var j
	    , i
	    , gd
	    , gm
	    , gy
	  j = 4 * jdn + 139361631
	  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908
	  i = div(mod(j, 1461), 4) * 5 + 308
	  gd = div(mod(i, 153), 5) + 1
	  gm = mod(div(i, 153), 12) + 1
	  gy = div(j, 1461) - 100100 + div(8 - gm, 6)
	  return  { gy: gy
	          , gm: gm
	          , gd: gd
	          }
	}

	}(this))



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var toFunction = __webpack_require__(10);

	/**
	 * Map the given `arr` with callback `fn(val, i)`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @return {Array}
	 * @api public
	 */

	module.exports = function(arr, fn){
	  var ret = [];
	  fn = toFunction(fn);
	  for (var i = 0; i < arr.length; ++i) {
	    ret.push(fn(arr[i], i));
	  }
	  return ret;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module Dependencies
	 */

	var expr;
	try {
	  expr = __webpack_require__(11);
	} catch(e) {
	  expr = __webpack_require__(11);
	}

	/**
	 * Expose `toFunction()`.
	 */

	module.exports = toFunction;

	/**
	 * Convert `obj` to a `Function`.
	 *
	 * @param {Mixed} obj
	 * @return {Function}
	 * @api private
	 */

	function toFunction(obj) {
	  switch ({}.toString.call(obj)) {
	    case '[object Object]':
	      return objectToFunction(obj);
	    case '[object Function]':
	      return obj;
	    case '[object String]':
	      return stringToFunction(obj);
	    case '[object RegExp]':
	      return regexpToFunction(obj);
	    default:
	      return defaultToFunction(obj);
	  }
	}

	/**
	 * Default to strict equality.
	 *
	 * @param {Mixed} val
	 * @return {Function}
	 * @api private
	 */

	function defaultToFunction(val) {
	  return function(obj){
	    return val === obj;
	  };
	}

	/**
	 * Convert `re` to a function.
	 *
	 * @param {RegExp} re
	 * @return {Function}
	 * @api private
	 */

	function regexpToFunction(re) {
	  return function(obj){
	    return re.test(obj);
	  };
	}

	/**
	 * Convert property `str` to a function.
	 *
	 * @param {String} str
	 * @return {Function}
	 * @api private
	 */

	function stringToFunction(str) {
	  // immediate such as "> 20"
	  if (/^ *\W+/.test(str)) return new Function('_', 'return _ ' + str);

	  // properties such as "name.first" or "age > 18" or "age > 18 && age < 36"
	  return new Function('_', 'return ' + get(str));
	}

	/**
	 * Convert `object` to a function.
	 *
	 * @param {Object} object
	 * @return {Function}
	 * @api private
	 */

	function objectToFunction(obj) {
	  var match = {};
	  for (var key in obj) {
	    match[key] = typeof obj[key] === 'string'
	      ? defaultToFunction(obj[key])
	      : toFunction(obj[key]);
	  }
	  return function(val){
	    if (typeof val !== 'object') return false;
	    for (var key in match) {
	      if (!(key in val)) return false;
	      if (!match[key](val[key])) return false;
	    }
	    return true;
	  };
	}

	/**
	 * Built the getter function. Supports getter style functions
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function get(str) {
	  var props = expr(str);
	  if (!props.length) return '_.' + str;

	  var val, i, prop;
	  for (i = 0; i < props.length; i++) {
	    prop = props[i];
	    val = '_.' + prop;
	    val = "('function' == typeof " + val + " ? " + val + "() : " + val + ")";

	    // mimic negative lookbehind to avoid problems with nested properties
	    str = stripNested(prop, str, val);
	  }

	  return str;
	}

	/**
	 * Mimic negative lookbehind to avoid problems with nested properties.
	 *
	 * See: http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript
	 *
	 * @param {String} prop
	 * @param {String} str
	 * @param {String} val
	 * @return {String}
	 * @api private
	 */

	function stripNested (prop, str, val) {
	  return str.replace(new RegExp('(\\.)?' + prop, 'g'), function($0, $1) {
	    return $1 ? $0 : val;
	  });
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Global Names
	 */

	var globals = /\b(Array|Date|Object|Math|JSON)\b/g;

	/**
	 * Return immediate identifiers parsed from `str`.
	 *
	 * @param {String} str
	 * @param {String|Function} map function or prefix
	 * @return {Array}
	 * @api public
	 */

	module.exports = function(str, fn){
	  var p = unique(props(str));
	  if (fn && 'string' == typeof fn) fn = prefixed(fn);
	  if (fn) return map(str, p, fn);
	  return p;
	};

	/**
	 * Return immediate identifiers in `str`.
	 *
	 * @param {String} str
	 * @return {Array}
	 * @api private
	 */

	function props(str) {
	  return str
	    .replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '')
	    .replace(globals, '')
	    .match(/[a-zA-Z_]\w*/g)
	    || [];
	}

	/**
	 * Return `str` with `props` mapped with `fn`.
	 *
	 * @param {String} str
	 * @param {Array} props
	 * @param {Function} fn
	 * @return {String}
	 * @api private
	 */

	function map(str, props, fn) {
	  var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;
	  return str.replace(re, function(_){
	    if ('(' == _[_.length - 1]) return fn(_);
	    if (!~props.indexOf(_)) return _;
	    return fn(_);
	  });
	}

	/**
	 * Return unique array.
	 *
	 * @param {Array} arr
	 * @return {Array}
	 * @api private
	 */

	function unique(arr) {
	  var ret = [];

	  for (var i = 0; i < arr.length; i++) {
	    if (~ret.indexOf(arr[i])) continue;
	    ret.push(arr[i]);
	  }

	  return ret;
	}

	/**
	 * Map with prefix `str`.
	 */

	function prefixed(str) {
	  return function(_){
	    return str + _;
	  };
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(13);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	String.prototype.toFaDigit = function () {
	    return this.replace(/\d+/g, function (digit) {
	        var ret = '';
	        for (var i = 0, len = digit.length; i < len; i++) {
	            ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
	        }

	        return ret;
	    });
	};

	Number.prototype.toFaDigit = function () {
	    return this.toString().replace(/\d+/g, function (digit) {
	        var ret = '';
	        for (var i = 0, len = digit.length; i < len; i++) {
	            ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
	        }

	        return ret;
	    });
	};

	Array.prototype.freeze = function () {

	    return JSON.parse((0, _stringify2.default)(this));
	};

	String.prototype.toMoney = function () {

	    return parseInt(this).toLocaleString();
	};

	Number.prototype.toMoney = function () {

	    return this.toLocaleString();
	};

	String.prototype.replaceAll = function (search, replacement) {
	    var target = this;
	    return target.replace(new RegExp(search, 'g'), replacement);
	};

	Object.getByString = function (o, s) {
	    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	    s = s.replace(/^\./, ''); // strip a leading dot
	    var a = s.split('.');
	    for (var i = 0, n = a.length; i < n; ++i) {
	        var k = a[i];
	        if (k in o) {
	            o = o[k];
	        } else {
	            return;
	        }
	    }
	    return o;
	};

	Object.setByString = function assign(obj, prop, value) {
	    if (typeof prop === "string") prop = prop.split(".");

	    if (prop.length > 1) {
	        var e = prop.shift();
	        assign(obj[e] = Object.prototype.toString.call(obj[e]) === "[object Object]" ? obj[e] : {}, prop, value);
	    } else obj[prop[0]] = value;
	};

	window.mytest = function () {
	    alert("hey");
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(15);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./admin/index.js": 17,
		"./finishPay/index.js": 209,
		"./index/index.js": 217,
		"./page/index.js": 218,
		"./self_service/index.js": 219,
		"./ticket/index.js": 220,
		"./ticket_concert/index.js": 236
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 16;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _routes = __webpack_require__(18);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {

		router: _routes2.default,

		//  el : "#test",

		data: function data() {
			return {
				loading: true,
				showTimes: [],

				movies: [],
				movie: {},

				selectedChairs: [],
				purchasedChairs: [],
				selectedSans: {}
			};
		},
		created: function created() {
			console.log('Admin Stuff');
			/*
	  		this.$http.get('app/components/test.html').then(data=>{
	  	        var parser = new DOMParser();
	  	        var $doc = parser.parseFromString(data, "text/html");
	  	   
	  	        setTimeout(()=>{
	  	        	$("document").html($doc)
	  	        },1000)
	  	    });
	  */

			this.get_show_times();
		},

		methods: {
			get_sold_chairs: function get_sold_chairs(uid, callback) {
				var _this = this;

				var params = { uid: uid };

				this.$http.get('api/get_chairs_sold', { params: params }).then(function (res) {

					_this.purchasedChairs = [];
					console.log(res);
					if (res.body.chairs_sold != "" && res.body.chairs_sold != "null" && res.body.chairs_sold != undefined) _this.purchasedChairs = JSON.parse(res.body.chairs_sold);

					if (callback != undefined) callback();
				});
			},
			get_show_times: function get_show_times() {
				var _this2 = this;

				this.$http.get('api/get_all_showtimes').then(function (res) {

					var data = res.body;
					console.log(res);

					if (data.status == "1") {

						_this2.showTimes = data.showTimes;
					}
				});
			},
			logout: function logout() {

				this.$cookie.delete("cinema-setareh-admin-id");
				window.location.replace(SERVER["root"] + "login");
			}
		}

	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(19);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _dashboard = __webpack_require__(21);

	var _dashboard2 = _interopRequireDefault(_dashboard);

	var _users = __webpack_require__(31);

	var _users2 = _interopRequireDefault(_users);

	var _sms = __webpack_require__(36);

	var _sms2 = _interopRequireDefault(_sms);

	var _slider = __webpack_require__(41);

	var _slider2 = _interopRequireDefault(_slider);

	var _payments = __webpack_require__(56);

	var _payments2 = _interopRequireDefault(_payments);

	var _setting = __webpack_require__(61);

	var _setting2 = _interopRequireDefault(_setting);

	var _promotion = __webpack_require__(66);

	var _promotion2 = _interopRequireDefault(_promotion);

	var _movieTrailer = __webpack_require__(71);

	var _movieTrailer2 = _interopRequireDefault(_movieTrailer);

	var _purchases = __webpack_require__(76);

	var _purchases2 = _interopRequireDefault(_purchases);

	var _checkTicket = __webpack_require__(129);

	var _checkTicket2 = _interopRequireDefault(_checkTicket);

	var _buy = __webpack_require__(134);

	var _buy2 = _interopRequireDefault(_buy);

	var _nextFilm = __webpack_require__(144);

	var _nextFilm2 = _interopRequireDefault(_nextFilm);

	var _news = __webpack_require__(149);

	var _news2 = _interopRequireDefault(_news);

	var _pages = __webpack_require__(154);

	var _pages2 = _interopRequireDefault(_pages);

	var _movies = __webpack_require__(159);

	var _movies2 = _interopRequireDefault(_movies);

	var _concerts = __webpack_require__(164);

	var _concerts2 = _interopRequireDefault(_concerts);

	var _archiveMovies = __webpack_require__(169);

	var _archiveMovies2 = _interopRequireDefault(_archiveMovies);

	var _releaseMovie = __webpack_require__(174);

	var _releaseMovie2 = _interopRequireDefault(_releaseMovie);

	var _releaseConcert = __webpack_require__(189);

	var _releaseConcert2 = _interopRequireDefault(_releaseConcert);

	var _releasePage = __webpack_require__(194);

	var _releasePage2 = _interopRequireDefault(_releasePage);

	var _releaseNews = __webpack_require__(204);

	var _releaseNews2 = _interopRequireDefault(_releaseNews);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Container = {
	  template: '\n\n    <router-view :key="$route.fullPath"></router-view>\n    \n  '
	};

	_vue2.default.use(_vueRouter2.default);

	var router = new _vueRouter2.default({

	  mode: 'history',
	  base: SERVER['root'] + "admin-panel/",
	  routes: [{ path: '/', component: Container,

	    children: [{ path: 'dashboard', component: _dashboard2.default }, { path: 'main', component: Container, children: [{ path: 'next-movie', component: _nextFilm2.default }, { path: 'promotion', component: _promotion2.default }, { path: 'slider', component: _slider2.default }, { path: 'movie-trailer', component: _movieTrailer2.default }, { path: '', redirect: 'slider' }] }, { path: 'movies', component: Container, children: [{ path: 'release-movie', component: _releaseMovie2.default }, { path: 'edit-movie', component: _releaseMovie2.default, meta: { active: "list-movies" } }, { path: 'list-movies', component: _movies2.default }, { path: 'archive-movies', component: _archiveMovies2.default }, { path: '', redirect: 'list-movies' }] }, { path: 'concerts', component: Container, children: [{ path: 'release-concert', component: _releaseConcert2.default }, { path: 'edit-concert', component: _releaseConcert2.default, meta: { active: "list-concerts" } }, { path: 'list-concerts', component: _concerts2.default },

	      //{ path: 'archive-movies', component: archiveMovies },

	      { path: '', redirect: 'list-concerts' }] }, { path: 'news', component: Container, children: [{ path: 'release-news', component: _releaseNews2.default }, { path: 'edit-news', component: _releaseNews2.default, meta: { active: "list-news" } }, { path: 'list-news', component: _news2.default }, { path: '', redirect: 'list-news' }] }, { path: 'pages', component: Container, children: [{ path: 'release-page', component: _releasePage2.default }, { path: 'edit-page', component: _releasePage2.default, meta: { active: "list-pages" } }, { path: 'list-pages', component: _pages2.default }, { path: '', redirect: 'list-pages' }] }, { path: 'tickets', component: Container, children: [{ path: 'sale-tickets', component: _purchases2.default }, { path: 'buy-ticket', component: _buy2.default }, { path: 'payments', component: _payments2.default }, { path: 'check-ticket', component: _checkTicket2.default }, { path: '', redirect: 'sale-tickets' }] }, { path: 'sms-subcribe', component: _sms2.default }, { path: 'setting', component: _setting2.default }, { path: 'users', component: _users2.default }, { path: '', redirect: 'dashboard' }, { path: '*', redirect: 'dashboard' }]

	  }]
	});

	router.beforeEach(function (to, from, next) {

	  router.app.loading = true;

	  setTimeout(function () {
	    router.app.loading = false;
	    next();
	  }, 300);

	  //======================================
	});

	router.afterEach(function (to, from, next) {

	  if (to.meta.active) {
	    var page = to.meta.active;
	    $("#sidebar a[href*='" + page + "']").addClass("my-router-link-active").parent().addClass("my-router-link-active");
	  } else {
	    $("#sidebar .my-router-link-active").removeClass("my-router-link-active");
	  }
	});

	exports.default = router;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	  * vue-router v2.5.1
	  * (c) 2017 Evan You
	  * @license MIT
	  */
	'use strict';

	/*  */

	function assert (condition, message) {
	  if (!condition) {
	    throw new Error(("[vue-router] " + message))
	  }
	}

	function warn (condition, message) {
	  if (process.env.NODE_ENV !== 'production' && !condition) {
	    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
	  }
	}

	var View = {
	  name: 'router-view',
	  functional: true,
	  props: {
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render (h, ref) {
	    var props = ref.props;
	    var children = ref.children;
	    var parent = ref.parent;
	    var data = ref.data;

	    data.routerView = true;

	    var name = props.name;
	    var route = parent.$route;
	    var cache = parent._routerViewCache || (parent._routerViewCache = {});

	    // determine current view depth, also check to see if the tree
	    // has been toggled inactive but kept-alive.
	    var depth = 0;
	    var inactive = false;
	    while (parent) {
	      if (parent.$vnode && parent.$vnode.data.routerView) {
	        depth++;
	      }
	      if (parent._inactive) {
	        inactive = true;
	      }
	      parent = parent.$parent;
	    }
	    data.routerViewDepth = depth;

	    // render previous view if the tree is inactive and kept-alive
	    if (inactive) {
	      return h(cache[name], data, children)
	    }

	    var matched = route.matched[depth];
	    // render empty node if no matched route
	    if (!matched) {
	      cache[name] = null;
	      return h()
	    }

	    var component = cache[name] = matched.components[name];

	    // attach instance registration hook
	    // this will be called in the instance's injected lifecycle hooks
	    data.registerRouteInstance = function (vm, val) {
	      // val could be undefined for unregistration
	      if (matched.instances[name] !== vm) {
	        matched.instances[name] = val;
	      }
	    }

	    // also regiseter instance in prepatch hook
	    // in case the same component instance is reused across different routes
	    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
	      matched.instances[name] = vnode.componentInstance;
	    };

	    // resolve props
	    data.props = resolveProps(route, matched.props && matched.props[name]);

	    return h(component, data, children)
	  }
	};

	function resolveProps (route, config) {
	  switch (typeof config) {
	    case 'undefined':
	      return
	    case 'object':
	      return config
	    case 'function':
	      return config(route)
	    case 'boolean':
	      return config ? route.params : undefined
	    default:
	      if (process.env.NODE_ENV !== 'production') {
	        warn(
	          false,
	          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
	          "expecting an object, function or boolean."
	        );
	      }
	  }
	}

	/*  */

	var encodeReserveRE = /[!'()*]/g;
	var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
	var commaRE = /%2C/g;

	// fixed encodeURIComponent which is more conformant to RFC3986:
	// - escapes [!'()*]
	// - preserve commas
	var encode = function (str) { return encodeURIComponent(str)
	  .replace(encodeReserveRE, encodeReserveReplacer)
	  .replace(commaRE, ','); };

	var decode = decodeURIComponent;

	function resolveQuery (
	  query,
	  extraQuery,
	  _parseQuery
	) {
	  if ( extraQuery === void 0 ) extraQuery = {};

	  var parse = _parseQuery || parseQuery;
	  var parsedQuery;
	  try {
	    parsedQuery = parse(query || '');
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn(false, e.message);
	    parsedQuery = {};
	  }
	  for (var key in extraQuery) {
	    var val = extraQuery[key];
	    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
	  }
	  return parsedQuery
	}

	function parseQuery (query) {
	  var res = {};

	  query = query.trim().replace(/^(\?|#|&)/, '');

	  if (!query) {
	    return res
	  }

	  query.split('&').forEach(function (param) {
	    var parts = param.replace(/\+/g, ' ').split('=');
	    var key = decode(parts.shift());
	    var val = parts.length > 0
	      ? decode(parts.join('='))
	      : null;

	    if (res[key] === undefined) {
	      res[key] = val;
	    } else if (Array.isArray(res[key])) {
	      res[key].push(val);
	    } else {
	      res[key] = [res[key], val];
	    }
	  });

	  return res
	}

	function stringifyQuery (obj) {
	  var res = obj ? Object.keys(obj).map(function (key) {
	    var val = obj[key];

	    if (val === undefined) {
	      return ''
	    }

	    if (val === null) {
	      return encode(key)
	    }

	    if (Array.isArray(val)) {
	      var result = [];
	      val.slice().forEach(function (val2) {
	        if (val2 === undefined) {
	          return
	        }
	        if (val2 === null) {
	          result.push(encode(key));
	        } else {
	          result.push(encode(key) + '=' + encode(val2));
	        }
	      });
	      return result.join('&')
	    }

	    return encode(key) + '=' + encode(val)
	  }).filter(function (x) { return x.length > 0; }).join('&') : null;
	  return res ? ("?" + res) : ''
	}

	/*  */


	var trailingSlashRE = /\/?$/;

	function createRoute (
	  record,
	  location,
	  redirectedFrom,
	  router
	) {
	  var stringifyQuery$$1 = router && router.options.stringifyQuery;
	  var route = {
	    name: location.name || (record && record.name),
	    meta: (record && record.meta) || {},
	    path: location.path || '/',
	    hash: location.hash || '',
	    query: location.query || {},
	    params: location.params || {},
	    fullPath: getFullPath(location, stringifyQuery$$1),
	    matched: record ? formatMatch(record) : []
	  };
	  if (redirectedFrom) {
	    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
	  }
	  return Object.freeze(route)
	}

	// the starting route that represents the initial state
	var START = createRoute(null, {
	  path: '/'
	});

	function formatMatch (record) {
	  var res = [];
	  while (record) {
	    res.unshift(record);
	    record = record.parent;
	  }
	  return res
	}

	function getFullPath (
	  ref,
	  _stringifyQuery
	) {
	  var path = ref.path;
	  var query = ref.query; if ( query === void 0 ) query = {};
	  var hash = ref.hash; if ( hash === void 0 ) hash = '';

	  var stringify = _stringifyQuery || stringifyQuery;
	  return (path || '/') + stringify(query) + hash
	}

	function isSameRoute (a, b) {
	  if (b === START) {
	    return a === b
	  } else if (!b) {
	    return false
	  } else if (a.path && b.path) {
	    return (
	      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query)
	    )
	  } else if (a.name && b.name) {
	    return (
	      a.name === b.name &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query) &&
	      isObjectEqual(a.params, b.params)
	    )
	  } else {
	    return false
	  }
	}

	function isObjectEqual (a, b) {
	  if ( a === void 0 ) a = {};
	  if ( b === void 0 ) b = {};

	  var aKeys = Object.keys(a);
	  var bKeys = Object.keys(b);
	  if (aKeys.length !== bKeys.length) {
	    return false
	  }
	  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
	}

	function isIncludedRoute (current, target) {
	  return (
	    current.path.replace(trailingSlashRE, '/').indexOf(
	      target.path.replace(trailingSlashRE, '/')
	    ) === 0 &&
	    (!target.hash || current.hash === target.hash) &&
	    queryIncludes(current.query, target.query)
	  )
	}

	function queryIncludes (current, target) {
	  for (var key in target) {
	    if (!(key in current)) {
	      return false
	    }
	  }
	  return true
	}

	/*  */

	// work around weird flow bug
	var toTypes = [String, Object];
	var eventTypes = [String, Array];

	var Link = {
	  name: 'router-link',
	  props: {
	    to: {
	      type: toTypes,
	      required: true
	    },
	    tag: {
	      type: String,
	      default: 'a'
	    },
	    exact: Boolean,
	    append: Boolean,
	    replace: Boolean,
	    activeClass: String,
	    exactActiveClass: String,
	    event: {
	      type: eventTypes,
	      default: 'click'
	    }
	  },
	  render: function render (h) {
	    var this$1 = this;

	    var router = this.$router;
	    var current = this.$route;
	    var ref = router.resolve(this.to, current, this.append);
	    var location = ref.location;
	    var route = ref.route;
	    var href = ref.href;

	    var classes = {};
	    var globalActiveClass = router.options.linkActiveClass;
	    var globalExactActiveClass = router.options.linkExactActiveClass;
	    // Support global empty active class
	    var activeClassFallback = globalActiveClass == null
	            ? 'router-link-active'
	            : globalActiveClass;
	    var exactActiveClassFallback = globalExactActiveClass == null
	            ? 'router-link-exact-active'
	            : globalExactActiveClass;
	    var activeClass = this.activeClass == null
	            ? activeClassFallback
	            : this.activeClass;
	    var exactActiveClass = this.exactActiveClass == null
	            ? exactActiveClassFallback
	            : this.exactActiveClass;
	    var compareTarget = location.path
	      ? createRoute(null, location, null, router)
	      : route;

	    classes[exactActiveClass] = isSameRoute(current, compareTarget);
	    classes[activeClass] = this.exact
	      ? classes[exactActiveClass]
	      : isIncludedRoute(current, compareTarget);

	    var handler = function (e) {
	      if (guardEvent(e)) {
	        if (this$1.replace) {
	          router.replace(location);
	        } else {
	          router.push(location);
	        }
	      }
	    };

	    var on = { click: guardEvent };
	    if (Array.isArray(this.event)) {
	      this.event.forEach(function (e) { on[e] = handler; });
	    } else {
	      on[this.event] = handler;
	    }

	    var data = {
	      class: classes
	    };

	    if (this.tag === 'a') {
	      data.on = on;
	      data.attrs = { href: href };
	    } else {
	      // find the first <a> child and apply listener and href
	      var a = findAnchor(this.$slots.default);
	      if (a) {
	        // in case the <a> is a static node
	        a.isStatic = false;
	        var extend = _Vue.util.extend;
	        var aData = a.data = extend({}, a.data);
	        aData.on = on;
	        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
	        aAttrs.href = href;
	      } else {
	        // doesn't have <a> child, apply listener to self
	        data.on = on;
	      }
	    }

	    return h(this.tag, data, this.$slots.default)
	  }
	};

	function guardEvent (e) {
	  // don't redirect with control keys
	  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
	  // don't redirect when preventDefault called
	  if (e.defaultPrevented) { return }
	  // don't redirect on right click
	  if (e.button !== undefined && e.button !== 0) { return }
	  // don't redirect if `target="_blank"`
	  if (e.currentTarget && e.currentTarget.getAttribute) {
	    var target = e.currentTarget.getAttribute('target');
	    if (/\b_blank\b/i.test(target)) { return }
	  }
	  // this may be a Weex event which doesn't have this method
	  if (e.preventDefault) {
	    e.preventDefault();
	  }
	  return true
	}

	function findAnchor (children) {
	  if (children) {
	    var child;
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      if (child.tag === 'a') {
	        return child
	      }
	      if (child.children && (child = findAnchor(child.children))) {
	        return child
	      }
	    }
	  }
	}

	var _Vue;

	function install (Vue) {
	  if (install.installed) { return }
	  install.installed = true;

	  _Vue = Vue;

	  Object.defineProperty(Vue.prototype, '$router', {
	    get: function get () { return this.$root._router }
	  });

	  Object.defineProperty(Vue.prototype, '$route', {
	    get: function get () { return this.$root._route }
	  });

	  var isDef = function (v) { return v !== undefined; };

	  var registerInstance = function (vm, callVal) {
	    var i = vm.$options._parentVnode;
	    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
	      i(vm, callVal);
	    }
	  };

	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      if (isDef(this.$options.router)) {
	        this._router = this.$options.router;
	        this._router.init(this);
	        Vue.util.defineReactive(this, '_route', this._router.history.current);
	      }
	      registerInstance(this, this);
	    },
	    destroyed: function destroyed () {
	      registerInstance(this);
	    }
	  });

	  Vue.component('router-view', View);
	  Vue.component('router-link', Link);

	  var strats = Vue.config.optionMergeStrategies;
	  // use the same hook merging strategy for route hooks
	  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
	}

	/*  */

	var inBrowser = typeof window !== 'undefined';

	/*  */

	function resolvePath (
	  relative,
	  base,
	  append
	) {
	  var firstChar = relative.charAt(0);
	  if (firstChar === '/') {
	    return relative
	  }

	  if (firstChar === '?' || firstChar === '#') {
	    return base + relative
	  }

	  var stack = base.split('/');

	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop();
	  }

	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/');
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];
	    if (segment === '..') {
	      stack.pop();
	    } else if (segment !== '.') {
	      stack.push(segment);
	    }
	  }

	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('');
	  }

	  return stack.join('/')
	}

	function parsePath (path) {
	  var hash = '';
	  var query = '';

	  var hashIndex = path.indexOf('#');
	  if (hashIndex >= 0) {
	    hash = path.slice(hashIndex);
	    path = path.slice(0, hashIndex);
	  }

	  var queryIndex = path.indexOf('?');
	  if (queryIndex >= 0) {
	    query = path.slice(queryIndex + 1);
	    path = path.slice(0, queryIndex);
	  }

	  return {
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function cleanPath (path) {
	  return path.replace(/\/\//g, '/')
	}

	var index$1 = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

	var isarray = index$1;

	/**
	 * Expose `pathToRegexp`.
	 */
	var index = pathToRegexp;
	var parse_1 = parse;
	var compile_1 = compile;
	var tokensToFunction_1 = tokensToFunction;
	var tokensToRegExp_1 = tokensToRegExp;

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g');

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = [];
	  var key = 0;
	  var index = 0;
	  var path = '';
	  var defaultDelimiter = options && options.delimiter || '/';
	  var res;

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0];
	    var escaped = res[1];
	    var offset = res.index;
	    path += str.slice(index, offset);
	    index = offset + m.length;

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1];
	      continue
	    }

	    var next = str[index];
	    var prefix = res[2];
	    var name = res[3];
	    var capture = res[4];
	    var group = res[5];
	    var modifier = res[6];
	    var asterisk = res[7];

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path);
	      path = '';
	    }

	    var partial = prefix != null && next != null && next !== prefix;
	    var repeat = modifier === '+' || modifier === '*';
	    var optional = modifier === '?' || modifier === '*';
	    var delimiter = res[2] || defaultDelimiter;
	    var pattern = capture || group;

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    });
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index);
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path);
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length);

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
	    }
	  }

	  return function (obj, opts) {
	    var path = '';
	    var data = obj || {};
	    var options = opts || {};
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i];

	      if (typeof token === 'string') {
	        path += token;

	        continue
	      }

	      var value = data[token.name];
	      var segment;

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix;
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j]);

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment;
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment;
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys;
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g);

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      });
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = [];

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source);
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options);
	    keys = [];
	  }

	  options = options || {};

	  var strict = options.strict;
	  var end = options.end !== false;
	  var route = '';

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i];

	    if (typeof token === 'string') {
	      route += escapeString(token);
	    } else {
	      var prefix = escapeString(token.prefix);
	      var capture = '(?:' + token.pattern + ')';

	      keys.push(token);

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*';
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?';
	        } else {
	          capture = prefix + '(' + capture + ')?';
	        }
	      } else {
	        capture = prefix + '(' + capture + ')';
	      }

	      route += capture;
	    }
	  }

	  var delimiter = escapeString(options.delimiter || '/');
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
	  }

	  if (end) {
	    route += '$';
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
	  }

	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options);
	    keys = [];
	  }

	  options = options || {};

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}

	index.parse = parse_1;
	index.compile = compile_1;
	index.tokensToFunction = tokensToFunction_1;
	index.tokensToRegExp = tokensToRegExp_1;

	/*  */

	var regexpCompileCache = Object.create(null);

	function fillParams (
	  path,
	  params,
	  routeMsg
	) {
	  try {
	    var filler =
	      regexpCompileCache[path] ||
	      (regexpCompileCache[path] = index.compile(path));
	    return filler(params || {}, { pretty: true })
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
	    }
	    return ''
	  }
	}

	/*  */

	function createRouteMap (
	  routes,
	  oldPathList,
	  oldPathMap,
	  oldNameMap
	) {
	  // the path list is used to control path matching priority
	  var pathList = oldPathList || [];
	  var pathMap = oldPathMap || Object.create(null);
	  var nameMap = oldNameMap || Object.create(null);

	  routes.forEach(function (route) {
	    addRouteRecord(pathList, pathMap, nameMap, route);
	  });

	  // ensure wildcard routes are always at the end
	  for (var i = 0, l = pathList.length; i < l; i++) {
	    if (pathList[i] === '*') {
	      pathList.push(pathList.splice(i, 1)[0]);
	      l--;
	      i--;
	    }
	  }

	  return {
	    pathList: pathList,
	    pathMap: pathMap,
	    nameMap: nameMap
	  }
	}

	function addRouteRecord (
	  pathList,
	  pathMap,
	  nameMap,
	  route,
	  parent,
	  matchAs
	) {
	  var path = route.path;
	  var name = route.name;
	  if (process.env.NODE_ENV !== 'production') {
	    assert(path != null, "\"path\" is required in a route configuration.");
	    assert(
	      typeof route.component !== 'string',
	      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
	      "string id. Use an actual component instead."
	    );
	  }

	  var normalizedPath = normalizePath(path, parent);
	  var record = {
	    path: normalizedPath,
	    regex: compileRouteRegex(normalizedPath),
	    components: route.components || { default: route.component },
	    instances: {},
	    name: name,
	    parent: parent,
	    matchAs: matchAs,
	    redirect: route.redirect,
	    beforeEnter: route.beforeEnter,
	    meta: route.meta || {},
	    props: route.props == null
	      ? {}
	      : route.components
	        ? route.props
	        : { default: route.props }
	  };

	  if (route.children) {
	    // Warn if route is named and has a default child route.
	    // If users navigate to this route by name, the default child will
	    // not be rendered (GH Issue #629)
	    if (process.env.NODE_ENV !== 'production') {
	      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
	        warn(
	          false,
	          "Named Route '" + (route.name) + "' has a default child route. " +
	          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
	          "the default child route will not be rendered. Remove the name from " +
	          "this route and use the name of the default child route for named " +
	          "links instead."
	        );
	      }
	    }
	    route.children.forEach(function (child) {
	      var childMatchAs = matchAs
	        ? cleanPath((matchAs + "/" + (child.path)))
	        : undefined;
	      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
	    });
	  }

	  if (route.alias !== undefined) {
	    if (Array.isArray(route.alias)) {
	      route.alias.forEach(function (alias) {
	        var aliasRoute = {
	          path: alias,
	          children: route.children
	        };
	        addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path);
	      });
	    } else {
	      var aliasRoute = {
	        path: route.alias,
	        children: route.children
	      };
	      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path);
	    }
	  }

	  if (!pathMap[record.path]) {
	    pathList.push(record.path);
	    pathMap[record.path] = record;
	  }

	  if (name) {
	    if (!nameMap[name]) {
	      nameMap[name] = record;
	    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
	      warn(
	        false,
	        "Duplicate named routes definition: " +
	        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
	      );
	    }
	  }
	}

	function compileRouteRegex (path) {
	  var regex = index(path);
	  if (process.env.NODE_ENV !== 'production') {
	    var keys = {};
	    regex.keys.forEach(function (key) {
	      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
	      keys[key.name] = true;
	    });
	  }
	  return regex
	}

	function normalizePath (path, parent) {
	  path = path.replace(/\/$/, '');
	  if (path[0] === '/') { return path }
	  if (parent == null) { return path }
	  return cleanPath(((parent.path) + "/" + path))
	}

	/*  */


	function normalizeLocation (
	  raw,
	  current,
	  append,
	  router
	) {
	  var next = typeof raw === 'string' ? { path: raw } : raw;
	  // named target
	  if (next.name || next._normalized) {
	    return next
	  }

	  // relative params
	  if (!next.path && next.params && current) {
	    next = assign({}, next);
	    next._normalized = true;
	    var params = assign(assign({}, current.params), next.params);
	    if (current.name) {
	      next.name = current.name;
	      next.params = params;
	    } else if (current.matched) {
	      var rawPath = current.matched[current.matched.length - 1].path;
	      next.path = fillParams(rawPath, params, ("path " + (current.path)));
	    } else if (process.env.NODE_ENV !== 'production') {
	      warn(false, "relative params navigation requires a current route.");
	    }
	    return next
	  }

	  var parsedPath = parsePath(next.path || '');
	  var basePath = (current && current.path) || '/';
	  var path = parsedPath.path
	    ? resolvePath(parsedPath.path, basePath, append || next.append)
	    : basePath;

	  var query = resolveQuery(
	    parsedPath.query,
	    next.query,
	    router && router.options.parseQuery
	  );

	  var hash = next.hash || parsedPath.hash;
	  if (hash && hash.charAt(0) !== '#') {
	    hash = "#" + hash;
	  }

	  return {
	    _normalized: true,
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function assign (a, b) {
	  for (var key in b) {
	    a[key] = b[key];
	  }
	  return a
	}

	/*  */


	function createMatcher (
	  routes,
	  router
	) {
	  var ref = createRouteMap(routes);
	  var pathList = ref.pathList;
	  var pathMap = ref.pathMap;
	  var nameMap = ref.nameMap;

	  function addRoutes (routes) {
	    createRouteMap(routes, pathList, pathMap, nameMap);
	  }

	  function match (
	    raw,
	    currentRoute,
	    redirectedFrom
	  ) {
	    var location = normalizeLocation(raw, currentRoute, false, router);
	    var name = location.name;

	    if (name) {
	      var record = nameMap[name];
	      if (process.env.NODE_ENV !== 'production') {
	        warn(record, ("Route with name '" + name + "' does not exist"));
	      }
	      var paramNames = record.regex.keys
	        .filter(function (key) { return !key.optional; })
	        .map(function (key) { return key.name; });

	      if (typeof location.params !== 'object') {
	        location.params = {};
	      }

	      if (currentRoute && typeof currentRoute.params === 'object') {
	        for (var key in currentRoute.params) {
	          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
	            location.params[key] = currentRoute.params[key];
	          }
	        }
	      }

	      if (record) {
	        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
	        return _createRoute(record, location, redirectedFrom)
	      }
	    } else if (location.path) {
	      location.params = {};
	      for (var i = 0; i < pathList.length; i++) {
	        var path = pathList[i];
	        var record$1 = pathMap[path];
	        if (matchRoute(record$1.regex, location.path, location.params)) {
	          return _createRoute(record$1, location, redirectedFrom)
	        }
	      }
	    }
	    // no match
	    return _createRoute(null, location)
	  }

	  function redirect (
	    record,
	    location
	  ) {
	    var originalRedirect = record.redirect;
	    var redirect = typeof originalRedirect === 'function'
	        ? originalRedirect(createRoute(record, location, null, router))
	        : originalRedirect;

	    if (typeof redirect === 'string') {
	      redirect = { path: redirect };
	    }

	    if (!redirect || typeof redirect !== 'object') {
	      if (process.env.NODE_ENV !== 'production') {
	        warn(
	          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
	        );
	      }
	      return _createRoute(null, location)
	    }

	    var re = redirect;
	    var name = re.name;
	    var path = re.path;
	    var query = location.query;
	    var hash = location.hash;
	    var params = location.params;
	    query = re.hasOwnProperty('query') ? re.query : query;
	    hash = re.hasOwnProperty('hash') ? re.hash : hash;
	    params = re.hasOwnProperty('params') ? re.params : params;

	    if (name) {
	      // resolved named direct
	      var targetRecord = nameMap[name];
	      if (process.env.NODE_ENV !== 'production') {
	        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
	      }
	      return match({
	        _normalized: true,
	        name: name,
	        query: query,
	        hash: hash,
	        params: params
	      }, undefined, location)
	    } else if (path) {
	      // 1. resolve relative redirect
	      var rawPath = resolveRecordPath(path, record);
	      // 2. resolve params
	      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
	      // 3. rematch with existing query and hash
	      return match({
	        _normalized: true,
	        path: resolvedPath,
	        query: query,
	        hash: hash
	      }, undefined, location)
	    } else {
	      if (process.env.NODE_ENV !== 'production') {
	        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
	      }
	      return _createRoute(null, location)
	    }
	  }

	  function alias (
	    record,
	    location,
	    matchAs
	  ) {
	    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
	    var aliasedMatch = match({
	      _normalized: true,
	      path: aliasedPath
	    });
	    if (aliasedMatch) {
	      var matched = aliasedMatch.matched;
	      var aliasedRecord = matched[matched.length - 1];
	      location.params = aliasedMatch.params;
	      return _createRoute(aliasedRecord, location)
	    }
	    return _createRoute(null, location)
	  }

	  function _createRoute (
	    record,
	    location,
	    redirectedFrom
	  ) {
	    if (record && record.redirect) {
	      return redirect(record, redirectedFrom || location)
	    }
	    if (record && record.matchAs) {
	      return alias(record, location, record.matchAs)
	    }
	    return createRoute(record, location, redirectedFrom, router)
	  }

	  return {
	    match: match,
	    addRoutes: addRoutes
	  }
	}

	function matchRoute (
	  regex,
	  path,
	  params
	) {
	  var m = path.match(regex);

	  if (!m) {
	    return false
	  } else if (!params) {
	    return true
	  }

	  for (var i = 1, len = m.length; i < len; ++i) {
	    var key = regex.keys[i - 1];
	    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
	    if (key) {
	      params[key.name] = val;
	    }
	  }

	  return true
	}

	function resolveRecordPath (path, record) {
	  return resolvePath(path, record.parent ? record.parent.path : '/', true)
	}

	/*  */


	var positionStore = Object.create(null);

	function setupScroll () {
	  window.addEventListener('popstate', function (e) {
	    saveScrollPosition();
	    if (e.state && e.state.key) {
	      setStateKey(e.state.key);
	    }
	  });
	}

	function handleScroll (
	  router,
	  to,
	  from,
	  isPop
	) {
	  if (!router.app) {
	    return
	  }

	  var behavior = router.options.scrollBehavior;
	  if (!behavior) {
	    return
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert(typeof behavior === 'function', "scrollBehavior must be a function");
	  }

	  // wait until re-render finishes before scrolling
	  router.app.$nextTick(function () {
	    var position = getScrollPosition();
	    var shouldScroll = behavior(to, from, isPop ? position : null);
	    if (!shouldScroll) {
	      return
	    }
	    var isObject = typeof shouldScroll === 'object';
	    if (isObject && typeof shouldScroll.selector === 'string') {
	      var el = document.querySelector(shouldScroll.selector);
	      if (el) {
	        position = getElementPosition(el);
	      } else if (isValidPosition(shouldScroll)) {
	        position = normalizePosition(shouldScroll);
	      }
	    } else if (isObject && isValidPosition(shouldScroll)) {
	      position = normalizePosition(shouldScroll);
	    }

	    if (position) {
	      window.scrollTo(position.x, position.y);
	    }
	  });
	}

	function saveScrollPosition () {
	  var key = getStateKey();
	  if (key) {
	    positionStore[key] = {
	      x: window.pageXOffset,
	      y: window.pageYOffset
	    };
	  }
	}

	function getScrollPosition () {
	  var key = getStateKey();
	  if (key) {
	    return positionStore[key]
	  }
	}

	function getElementPosition (el) {
	  var docEl = document.documentElement;
	  var docRect = docEl.getBoundingClientRect();
	  var elRect = el.getBoundingClientRect();
	  return {
	    x: elRect.left - docRect.left,
	    y: elRect.top - docRect.top
	  }
	}

	function isValidPosition (obj) {
	  return isNumber(obj.x) || isNumber(obj.y)
	}

	function normalizePosition (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
	    y: isNumber(obj.y) ? obj.y : window.pageYOffset
	  }
	}

	function isNumber (v) {
	  return typeof v === 'number'
	}

	/*  */

	var supportsPushState = inBrowser && (function () {
	  var ua = window.navigator.userAgent;

	  if (
	    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	    ua.indexOf('Mobile Safari') !== -1 &&
	    ua.indexOf('Chrome') === -1 &&
	    ua.indexOf('Windows Phone') === -1
	  ) {
	    return false
	  }

	  return window.history && 'pushState' in window.history
	})();

	// use User Timing api (if present) for more accurate key precision
	var Time = inBrowser && window.performance && window.performance.now
	  ? window.performance
	  : Date;

	var _key = genKey();

	function genKey () {
	  return Time.now().toFixed(3)
	}

	function getStateKey () {
	  return _key
	}

	function setStateKey (key) {
	  _key = key;
	}

	function pushState (url, replace) {
	  saveScrollPosition();
	  // try...catch the pushState call to get around Safari
	  // DOM Exception 18 where it limits to 100 pushState calls
	  var history = window.history;
	  try {
	    if (replace) {
	      history.replaceState({ key: _key }, '', url);
	    } else {
	      _key = genKey();
	      history.pushState({ key: _key }, '', url);
	    }
	  } catch (e) {
	    window.location[replace ? 'replace' : 'assign'](url);
	  }
	}

	function replaceState (url) {
	  pushState(url, true);
	}

	/*  */

	function runQueue (queue, fn, cb) {
	  var step = function (index) {
	    if (index >= queue.length) {
	      cb();
	    } else {
	      if (queue[index]) {
	        fn(queue[index], function () {
	          step(index + 1);
	        });
	      } else {
	        step(index + 1);
	      }
	    }
	  };
	  step(0);
	}

	/*  */

	var History = function History (router, base) {
	  this.router = router;
	  this.base = normalizeBase(base);
	  // start with a route object that stands for "nowhere"
	  this.current = START;
	  this.pending = null;
	  this.ready = false;
	  this.readyCbs = [];
	  this.readyErrorCbs = [];
	  this.errorCbs = [];
	};

	History.prototype.listen = function listen (cb) {
	  this.cb = cb;
	};

	History.prototype.onReady = function onReady (cb, errorCb) {
	  if (this.ready) {
	    cb();
	  } else {
	    this.readyCbs.push(cb);
	    if (errorCb) {
	      this.readyErrorCbs.push(errorCb);
	    }
	  }
	};

	History.prototype.onError = function onError (errorCb) {
	  this.errorCbs.push(errorCb);
	};

	History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
	    var this$1 = this;

	  var route = this.router.match(location, this.current);
	  this.confirmTransition(route, function () {
	    this$1.updateRoute(route);
	    onComplete && onComplete(route);
	    this$1.ensureURL();

	    // fire ready cbs once
	    if (!this$1.ready) {
	      this$1.ready = true;
	      this$1.readyCbs.forEach(function (cb) { cb(route); });
	    }
	  }, function (err) {
	    if (onAbort) {
	      onAbort(err);
	    }
	    if (err && !this$1.ready) {
	      this$1.ready = true;
	      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
	    }
	  });
	};

	History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
	    var this$1 = this;

	  var current = this.current;
	  var abort = function (err) {
	    if (err instanceof Error) {
	      if (this$1.errorCbs.length) {
	        this$1.errorCbs.forEach(function (cb) { cb(err); });
	      } else {
	        warn(false, 'uncaught error during route navigation:');
	        console.error(err);
	      }
	    }
	    onAbort && onAbort(err);
	  };
	  if (
	    isSameRoute(route, current) &&
	    // in the case the route map has been dynamically appended to
	    route.matched.length === current.matched.length
	  ) {
	    this.ensureURL();
	    return abort()
	  }

	  var ref = resolveQueue(this.current.matched, route.matched);
	    var updated = ref.updated;
	    var deactivated = ref.deactivated;
	    var activated = ref.activated;

	  var queue = [].concat(
	    // in-component leave guards
	    extractLeaveGuards(deactivated),
	    // global before hooks
	    this.router.beforeHooks,
	    // in-component update hooks
	    extractUpdateHooks(updated),
	    // in-config enter guards
	    activated.map(function (m) { return m.beforeEnter; }),
	    // async components
	    resolveAsyncComponents(activated)
	  );

	  this.pending = route;
	  var iterator = function (hook, next) {
	    if (this$1.pending !== route) {
	      return abort()
	    }
	    try {
	      hook(route, current, function (to) {
	        if (to === false || to instanceof Error) {
	          // next(false) -> abort navigation, ensure current URL
	          this$1.ensureURL(true);
	          abort(to);
	        } else if (
	          typeof to === 'string' ||
	          (typeof to === 'object' && (
	            typeof to.path === 'string' ||
	            typeof to.name === 'string'
	          ))
	        ) {
	          // next('/') or next({ path: '/' }) -> redirect
	          abort();
	          if (typeof to === 'object' && to.replace) {
	            this$1.replace(to);
	          } else {
	            this$1.push(to);
	          }
	        } else {
	          // confirm transition and pass on the value
	          next(to);
	        }
	      });
	    } catch (e) {
	      abort(e);
	    }
	  };

	  runQueue(queue, iterator, function () {
	    var postEnterCbs = [];
	    var isValid = function () { return this$1.current === route; };
	    // wait until async components are resolved before
	    // extracting in-component enter guards
	    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
	    var queue = enterGuards.concat(this$1.router.resolveHooks);
	    runQueue(queue, iterator, function () {
	      if (this$1.pending !== route) {
	        return abort()
	      }
	      this$1.pending = null;
	      onComplete(route);
	      if (this$1.router.app) {
	        this$1.router.app.$nextTick(function () {
	          postEnterCbs.forEach(function (cb) { cb(); });
	        });
	      }
	    });
	  });
	};

	History.prototype.updateRoute = function updateRoute (route) {
	  var prev = this.current;
	  this.current = route;
	  this.cb && this.cb(route);
	  this.router.afterHooks.forEach(function (hook) {
	    hook && hook(route, prev);
	  });
	};

	function normalizeBase (base) {
	  if (!base) {
	    if (inBrowser) {
	      // respect <base> tag
	      var baseEl = document.querySelector('base');
	      base = (baseEl && baseEl.getAttribute('href')) || '/';
	    } else {
	      base = '/';
	    }
	  }
	  // make sure there's the starting slash
	  if (base.charAt(0) !== '/') {
	    base = '/' + base;
	  }
	  // remove trailing slash
	  return base.replace(/\/$/, '')
	}

	function resolveQueue (
	  current,
	  next
	) {
	  var i;
	  var max = Math.max(current.length, next.length);
	  for (i = 0; i < max; i++) {
	    if (current[i] !== next[i]) {
	      break
	    }
	  }
	  return {
	    updated: next.slice(0, i),
	    activated: next.slice(i),
	    deactivated: current.slice(i)
	  }
	}

	function extractGuards (
	  records,
	  name,
	  bind,
	  reverse
	) {
	  var guards = flatMapComponents(records, function (def, instance, match, key) {
	    var guard = extractGuard(def, name);
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
	        : bind(guard, instance, match, key)
	    }
	  });
	  return flatten(reverse ? guards.reverse() : guards)
	}

	function extractGuard (
	  def,
	  key
	) {
	  if (typeof def !== 'function') {
	    // extend now so that global mixins are applied.
	    def = _Vue.extend(def);
	  }
	  return def.options[key]
	}

	function extractLeaveGuards (deactivated) {
	  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
	}

	function extractUpdateHooks (updated) {
	  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
	}

	function bindGuard (guard, instance) {
	  if (instance) {
	    return function boundRouteGuard () {
	      return guard.apply(instance, arguments)
	    }
	  }
	}

	function extractEnterGuards (
	  activated,
	  cbs,
	  isValid
	) {
	  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
	    return bindEnterGuard(guard, match, key, cbs, isValid)
	  })
	}

	function bindEnterGuard (
	  guard,
	  match,
	  key,
	  cbs,
	  isValid
	) {
	  return function routeEnterGuard (to, from, next) {
	    return guard(to, from, function (cb) {
	      next(cb);
	      if (typeof cb === 'function') {
	        cbs.push(function () {
	          // #750
	          // if a router-view is wrapped with an out-in transition,
	          // the instance may not have been registered at this time.
	          // we will need to poll for registration until current route
	          // is no longer valid.
	          poll(cb, match.instances, key, isValid);
	        });
	      }
	    })
	  }
	}

	function poll (
	  cb, // somehow flow cannot infer this is a function
	  instances,
	  key,
	  isValid
	) {
	  if (instances[key]) {
	    cb(instances[key]);
	  } else if (isValid()) {
	    setTimeout(function () {
	      poll(cb, instances, key, isValid);
	    }, 16);
	  }
	}

	function resolveAsyncComponents (matched) {
	  return function (to, from, next) {
	    var hasAsync = false;
	    var pending = 0;
	    var error = null;

	    flatMapComponents(matched, function (def, _, match, key) {
	      // if it's a function and doesn't have cid attached,
	      // assume it's an async component resolve function.
	      // we are not using Vue's default async resolving mechanism because
	      // we want to halt the navigation until the incoming component has been
	      // resolved.
	      if (typeof def === 'function' && def.cid === undefined) {
	        hasAsync = true;
	        pending++;

	        var resolve = once(function (resolvedDef) {
	          // save resolved on async factory in case it's used elsewhere
	          def.resolved = typeof resolvedDef === 'function'
	            ? resolvedDef
	            : _Vue.extend(resolvedDef);
	          match.components[key] = resolvedDef;
	          pending--;
	          if (pending <= 0) {
	            next();
	          }
	        });

	        var reject = once(function (reason) {
	          var msg = "Failed to resolve async component " + key + ": " + reason;
	          process.env.NODE_ENV !== 'production' && warn(false, msg);
	          if (!error) {
	            error = reason instanceof Error
	              ? reason
	              : new Error(msg);
	            next(error);
	          }
	        });

	        var res;
	        try {
	          res = def(resolve, reject);
	        } catch (e) {
	          reject(e);
	        }
	        if (res) {
	          if (typeof res.then === 'function') {
	            res.then(resolve, reject);
	          } else {
	            // new syntax in Vue 2.3
	            var comp = res.component;
	            if (comp && typeof comp.then === 'function') {
	              comp.then(resolve, reject);
	            }
	          }
	        }
	      }
	    });

	    if (!hasAsync) { next(); }
	  }
	}

	function flatMapComponents (
	  matched,
	  fn
	) {
	  return flatten(matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) { return fn(
	      m.components[key],
	      m.instances[key],
	      m, key
	    ); })
	  }))
	}

	function flatten (arr) {
	  return Array.prototype.concat.apply([], arr)
	}

	// in Webpack 2, require.ensure now also returns a Promise
	// so the resolve/reject functions may get called an extra time
	// if the user uses an arrow function shorthand that happens to
	// return that Promise.
	function once (fn) {
	  var called = false;
	  return function () {
	    if (called) { return }
	    called = true;
	    return fn.apply(this, arguments)
	  }
	}

	/*  */


	var HTML5History = (function (History$$1) {
	  function HTML5History (router, base) {
	    var this$1 = this;

	    History$$1.call(this, router, base);

	    var expectScroll = router.options.scrollBehavior;

	    if (expectScroll) {
	      setupScroll();
	    }

	    window.addEventListener('popstate', function (e) {
	      this$1.transitionTo(getLocation(this$1.base), function (route) {
	        if (expectScroll) {
	          handleScroll(router, route, this$1.current, true);
	        }
	      });
	    });
	  }

	  if ( History$$1 ) HTML5History.__proto__ = History$$1;
	  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
	  HTML5History.prototype.constructor = HTML5History;

	  HTML5History.prototype.go = function go (n) {
	    window.history.go(n);
	  };

	  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
	    var this$1 = this;

	    var ref = this;
	    var fromRoute = ref.current;
	    this.transitionTo(location, function (route) {
	      pushState(cleanPath(this$1.base + route.fullPath));
	      handleScroll(this$1.router, route, fromRoute, false);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
	    var this$1 = this;

	    var ref = this;
	    var fromRoute = ref.current;
	    this.transitionTo(location, function (route) {
	      replaceState(cleanPath(this$1.base + route.fullPath));
	      handleScroll(this$1.router, route, fromRoute, false);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  HTML5History.prototype.ensureURL = function ensureURL (push) {
	    if (getLocation(this.base) !== this.current.fullPath) {
	      var current = cleanPath(this.base + this.current.fullPath);
	      push ? pushState(current) : replaceState(current);
	    }
	  };

	  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
	    return getLocation(this.base)
	  };

	  return HTML5History;
	}(History));

	function getLocation (base) {
	  var path = window.location.pathname;
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length);
	  }
	  return (path || '/') + window.location.search + window.location.hash
	}

	/*  */


	var HashHistory = (function (History$$1) {
	  function HashHistory (router, base, fallback) {
	    History$$1.call(this, router, base);
	    // check history fallback deeplinking
	    if (fallback && checkFallback(this.base)) {
	      return
	    }
	    ensureSlash();
	  }

	  if ( History$$1 ) HashHistory.__proto__ = History$$1;
	  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
	  HashHistory.prototype.constructor = HashHistory;

	  // this is delayed until the app mounts
	  // to avoid the hashchange listener being fired too early
	  HashHistory.prototype.setupListeners = function setupListeners () {
	    var this$1 = this;

	    window.addEventListener('hashchange', function () {
	      if (!ensureSlash()) {
	        return
	      }
	      this$1.transitionTo(getHash(), function (route) {
	        replaceHash(route.fullPath);
	      });
	    });
	  };

	  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
	    this.transitionTo(location, function (route) {
	      pushHash(route.fullPath);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
	    this.transitionTo(location, function (route) {
	      replaceHash(route.fullPath);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  HashHistory.prototype.go = function go (n) {
	    window.history.go(n);
	  };

	  HashHistory.prototype.ensureURL = function ensureURL (push) {
	    var current = this.current.fullPath;
	    if (getHash() !== current) {
	      push ? pushHash(current) : replaceHash(current);
	    }
	  };

	  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
	    return getHash()
	  };

	  return HashHistory;
	}(History));

	function checkFallback (base) {
	  var location = getLocation(base);
	  if (!/^\/#/.test(location)) {
	    window.location.replace(
	      cleanPath(base + '/#' + location)
	    );
	    return true
	  }
	}

	function ensureSlash () {
	  var path = getHash();
	  if (path.charAt(0) === '/') {
	    return true
	  }
	  replaceHash('/' + path);
	  return false
	}

	function getHash () {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href;
	  var index = href.indexOf('#');
	  return index === -1 ? '' : href.slice(index + 1)
	}

	function pushHash (path) {
	  window.location.hash = path;
	}

	function replaceHash (path) {
	  var i = window.location.href.indexOf('#');
	  window.location.replace(
	    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
	  );
	}

	/*  */


	var AbstractHistory = (function (History$$1) {
	  function AbstractHistory (router, base) {
	    History$$1.call(this, router, base);
	    this.stack = [];
	    this.index = -1;
	  }

	  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
	  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
	  AbstractHistory.prototype.constructor = AbstractHistory;

	  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
	      this$1.index++;
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  AbstractHistory.prototype.go = function go (n) {
	    var this$1 = this;

	    var targetIndex = this.index + n;
	    if (targetIndex < 0 || targetIndex >= this.stack.length) {
	      return
	    }
	    var route = this.stack[targetIndex];
	    this.confirmTransition(route, function () {
	      this$1.index = targetIndex;
	      this$1.updateRoute(route);
	    });
	  };

	  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
	    var current = this.stack[this.stack.length - 1];
	    return current ? current.fullPath : '/'
	  };

	  AbstractHistory.prototype.ensureURL = function ensureURL () {
	    // noop
	  };

	  return AbstractHistory;
	}(History));

	/*  */

	var VueRouter = function VueRouter (options) {
	  if ( options === void 0 ) options = {};

	  this.app = null;
	  this.apps = [];
	  this.options = options;
	  this.beforeHooks = [];
	  this.resolveHooks = [];
	  this.afterHooks = [];
	  this.matcher = createMatcher(options.routes || [], this);

	  var mode = options.mode || 'hash';
	  this.fallback = mode === 'history' && !supportsPushState;
	  if (this.fallback) {
	    mode = 'hash';
	  }
	  if (!inBrowser) {
	    mode = 'abstract';
	  }
	  this.mode = mode;

	  switch (mode) {
	    case 'history':
	      this.history = new HTML5History(this, options.base);
	      break
	    case 'hash':
	      this.history = new HashHistory(this, options.base, this.fallback);
	      break
	    case 'abstract':
	      this.history = new AbstractHistory(this, options.base);
	      break
	    default:
	      if (process.env.NODE_ENV !== 'production') {
	        assert(false, ("invalid mode: " + mode));
	      }
	  }
	};

	var prototypeAccessors = { currentRoute: {} };

	VueRouter.prototype.match = function match (
	  raw,
	  current,
	  redirectedFrom
	) {
	  return this.matcher.match(raw, current, redirectedFrom)
	};

	prototypeAccessors.currentRoute.get = function () {
	  return this.history && this.history.current
	};

	VueRouter.prototype.init = function init (app /* Vue component instance */) {
	    var this$1 = this;

	  process.env.NODE_ENV !== 'production' && assert(
	    install.installed,
	    "not installed. Make sure to call `Vue.use(VueRouter)` " +
	    "before creating root instance."
	  );

	  this.apps.push(app);

	  // main app already initialized.
	  if (this.app) {
	    return
	  }

	  this.app = app;

	  var history = this.history;

	  if (history instanceof HTML5History) {
	    history.transitionTo(history.getCurrentLocation());
	  } else if (history instanceof HashHistory) {
	    var setupHashListener = function () {
	      history.setupListeners();
	    };
	    history.transitionTo(
	      history.getCurrentLocation(),
	      setupHashListener,
	      setupHashListener
	    );
	  }

	  history.listen(function (route) {
	    this$1.apps.forEach(function (app) {
	      app._route = route;
	    });
	  });
	};

	VueRouter.prototype.beforeEach = function beforeEach (fn) {
	  return registerHook(this.beforeHooks, fn)
	};

	VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
	  return registerHook(this.resolveHooks, fn)
	};

	VueRouter.prototype.afterEach = function afterEach (fn) {
	  return registerHook(this.afterHooks, fn)
	};

	VueRouter.prototype.onReady = function onReady (cb, errorCb) {
	  this.history.onReady(cb, errorCb);
	};

	VueRouter.prototype.onError = function onError (errorCb) {
	  this.history.onError(errorCb);
	};

	VueRouter.prototype.push = function push (location, onComplete, onAbort) {
	  this.history.push(location, onComplete, onAbort);
	};

	VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
	  this.history.replace(location, onComplete, onAbort);
	};

	VueRouter.prototype.go = function go (n) {
	  this.history.go(n);
	};

	VueRouter.prototype.back = function back () {
	  this.go(-1);
	};

	VueRouter.prototype.forward = function forward () {
	  this.go(1);
	};

	VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
	  var route = to
	    ? this.resolve(to).route
	    : this.currentRoute;
	  if (!route) {
	    return []
	  }
	  return [].concat.apply([], route.matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) {
	      return m.components[key]
	    })
	  }))
	};

	VueRouter.prototype.resolve = function resolve (
	  to,
	  current,
	  append
	) {
	  var location = normalizeLocation(
	    to,
	    current || this.history.current,
	    append,
	    this
	  );
	  var route = this.match(location, current);
	  var fullPath = route.redirectedFrom || route.fullPath;
	  var base = this.history.base;
	  var href = createHref(base, fullPath, this.mode);
	  return {
	    location: location,
	    route: route,
	    href: href,
	    // for backwards compat
	    normalizedTo: location,
	    resolved: route
	  }
	};

	VueRouter.prototype.addRoutes = function addRoutes (routes) {
	  this.matcher.addRoutes(routes);
	  if (this.history.current !== START) {
	    this.history.transitionTo(this.history.getCurrentLocation());
	  }
	};

	Object.defineProperties( VueRouter.prototype, prototypeAccessors );

	function registerHook (list, fn) {
	  list.push(fn);
	  return function () {
	    var i = list.indexOf(fn);
	    if (i > -1) { list.splice(i, 1); }
	  }
	}

	function createHref (base, fullPath, mode) {
	  var path = mode === 'hash' ? '#' + fullPath : fullPath;
	  return base ? cleanPath(base + '/' + path) : path
	}

	VueRouter.install = install;
	VueRouter.version = '2.5.1';

	if (inBrowser && window.Vue) {
	  window.Vue.use(VueRouter);
	}

	module.exports = VueRouter;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ },
/* 20 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(22)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(28),
	  /* template */
	  __webpack_require__(30),
	  /* scopeId */
	  "data-v-41453f17",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/dashboard.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] dashboard.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-41453f17", Component.options)
	  } else {
	    hotAPI.reload("data-v-41453f17", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(23);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("0b0835c8", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-41453f17\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./dashboard.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-41453f17\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./dashboard.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.loading-style[data-v-41453f17]{\n\n    padding: 0 20px\n}\n.box[data-v-41453f17]{\n    width:150px;\n}\ninput[type='checkbox'][data-v-41453f17]{\n    box-shadow: none;\n}\n\n\n", ""]);

	// exports


/***/ },
/* 24 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/

	var hasDocument = typeof document !== 'undefined'

	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}

	var listToStyles = __webpack_require__(26)

	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}

	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/

	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}

	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

	module.exports = function (parentId, list, _isProduction) {
	  isProduction = _isProduction

	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)

	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}

	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}

	function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = { css: css, media: media, sourceMap: sourceMap }
	    if (!newStyles[id]) {
	      part.id = parentId + ':0'
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      part.id = parentId + ':' + newStyles[id].parts.length
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}

	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}

	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
	  var hasSSR = styleElement != null

	  // if in production mode and style is already provided by SSR,
	  // simply do nothing.
	  if (hasSSR && isProduction) {
	    return noop
	  }

	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = styleElement || createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  if (!hasSSR) {
	    update(obj)
	  }

	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}

	var replaceText = (function () {
	  var textStore = []

	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()

	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}

	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap

	  if (media) {
	    styleElement.setAttribute('media', media)
	  }

	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    }
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  // inject cssModules
	  if (cssModules) {
	    var computed = Object.create(options.computed || null)
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	    options.computed = computed
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _send_form = __webpack_require__(29);

	var _send_form2 = _interopRequireDefault(_send_form);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    mixins: [_send_form2.default],

	    data: function data() {
	        return {

	            loading: true,

	            work: {}

	        };
	    },


	    methods: {},

	    created: function created() {
	        var _this = this;

	        setTimeout(function () {
	            _this.$http.get("api/get_work_status").then(function (res) {

	                _this.loading = false;
	                _this.work = res.body;
	                console.log(res.body);
	            });
	        }, 1000);
	    },


	    computed: {}
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _stringify = __webpack_require__(13);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
		data: function data() {
			return {

				uploadRes: "",
				formData: new FormData()
			};
		},


		methods: {
			onFileChange: function onFileChange(ele) {
				this.errors = {};

				var files = ele.target.files || ele.dataTransfer.files;

				//let prop = this.makeTempPropName(ele.target.name);

				if (!files.length) {
					return;
				}

				var name = void 0;
				//let formData = new FormData();


				if (ele.target.name) name = ele.target.name;else if (ele.target.id) name = ele.target.id;else console.log("FILE INPUT NAME IS NOT SET!");

				if (files.length > 1) name += '[]';

				var filesArray = [];
				for (var i = 0; i < files.length; i++) {
					filesArray.push(files[i]);
					this.formData.append(name, files[i]);
				}
			},
			sendForm: function sendForm(data, url, callback) {

				this.formData.append("encrypted", true);

				if (!callback) {
					if (typeof url == 'function') {
						callback = url;
						url = data;
					} else {
						this.formData.append("data", (0, _stringify2.default)(data));
					}
				} else {
					this.formData.append("data", (0, _stringify2.default)(data));
				}
				if (!url) url = data;

				this.$http.post(url, this.formData, {
					progress: function progress(e) {
						if (callback) callback(e);
						if (e.lengthComputable) {
							console.log(e.loaded / e.total * 100);
						}
					}
				}).then(function (res) {

					console.log("send_form :");
					console.log(res);
					if (callback) callback({ finish: true });
				});
			}
		}

	};

	function myRand(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.loading) ? _c('div', {
	    staticClass: "row"
	  }, [_vm._m(0)]) : _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v(" وضعیت فروش ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "col-md-6"
	  }, [_c('strong', [_vm._v("فروش امروز  ")]), _vm._v(" "), _c('div', [_vm._v("تعداد بلیط های فروخته شده : "), _c('strong', [_vm._v(_vm._s(_vm.work.tomorrow.number))])]), _vm._v(" "), _c('div', [_vm._v("تعداد صندلی های رزرو شده : "), _c('strong', [_vm._v(_vm._s(_vm.work.tomorrow.sold_chairs_count))])]), _vm._v(" "), _c('div', [_vm._v("درآمد کل :  : "), _c('strong', [_vm._v(_vm._s(_vm.work.tomorrow.revenue) + " تومان")])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-6"
	  }, [_c('strong', [_vm._v("فروش دیروز  ")]), _vm._v(" "), _c('div', [_vm._v("تعداد بلیط های فروخته شده : "), _c('strong', [_vm._v(_vm._s(_vm.work.yesterday.number))])]), _vm._v(" "), _c('div', [_vm._v("تعداد صندلی های رزرو شده : "), _c('strong', [_vm._v(_vm._s(_vm.work.yesterday.sold_chairs_count))])]), _vm._v(" "), _c('div', [_vm._v("درآمد کل :  : "), _c('strong', [_vm._v(_vm._s(_vm.work.yesterday.revenue) + " تومان")])])])])])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('div', {
	    staticClass: "panel-body"
	  }, [_vm._v("\n                درحال بارگزاری...\n            ")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-41453f17", module.exports)
	  }
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(32)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(34),
	  /* template */
	  __webpack_require__(35),
	  /* scopeId */
	  "data-v-564a93ea",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/users.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] users.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-564a93ea", Component.options)
	  } else {
	    hotAPI.reload("data-v-564a93ea", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(33);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("261c36fb", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-564a93ea\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./users.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-564a93ea\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./users.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\ntable[data-v-564a93ea] {\n\tfont-size: 13px !important;\n}\n", ""]);

	// exports


/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {
		data: function data() {
			return {

				users: [],
				loading: true
			};
		},
		created: function created() {
			this.load_users_info();
		},

		methods: {
			load_users_info: function load_users_info() {
				var _this = this;

				this.loading = true;

				setTimeout(function () {

					_this.$http.get("api/get_users_info").then(function (res) {

						_this.users = res.body;
						console.log(res.body);
						_this.loading = false;
					});
				}, 1000);
			}
		}
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("لیست کاربرها ")]), _vm._v(" "), _c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.users), function(u) {
	    return _c('tr', [_c('td', [_c('a', {
	      attrs: {
	        "href": "#"
	      }
	    }, [_vm._v(_vm._s(u.fullName))])]), _vm._v(" "), _c('td', [_vm._v(_vm._s(u.phone))]), _vm._v(" "), _c('td', [_c('span', {
	      staticClass: "label label-info label-mini"
	    }, [_vm._v(_vm._s(u.countBuy))])])])
	  }))])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("نام")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-bookmark"
	  }), _vm._v("شماره تماس")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: " icon-edit"
	  }), _vm._v("تعداد خرید")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-564a93ea", module.exports)
	  }
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(37)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(39),
	  /* template */
	  __webpack_require__(40),
	  /* scopeId */
	  "data-v-fd3d98c8",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/sms.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] sms.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-fd3d98c8", Component.options)
	  } else {
	    hotAPI.reload("data-v-fd3d98c8", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("6051e76a", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-fd3d98c8\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./sms.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-fd3d98c8\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./sms.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n@media print{\n@page {\n        size: 21cm 29.7cm !important;\n        margin: 30mm 45mm 30mm 45mm !important; /* change the margins as you want them to be. */\n}\n#list[data-v-fd3d98c8]{\n\n        width:21cm; height:29.7cm;\n        margin:0 auto;\n        font-size: 1.3em;\n}\n}\ntable[data-v-fd3d98c8] {\n\tfont-size: 13px !important;\n}\n", ""]);

	// exports


/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {
	    data: function data() {
	        return {

	            numbers: []

	        };
	    },
	    created: function created() {
	        var _this = this;

	        this.$http.get("api/get_mobiles").then(function (res) {
	            _this.numbers = res.body;
	        });
	    },

	    methods: {
	        deleteNumber: function deleteNumber(i) {
	            var id = this.numbers[i].id;
	            this.$http.get("api/delete_mobile", { params: { id: id } }).then(function (res) {
	                console.log(res);
	            });
	            this.numbers.splice(i, 1);
	        },
	        printNumbers: function printNumbers() {

	            setTimeout(function () {
	                var el = $("#list").clone();
	                $("#print").html($(el).find("button").remove().end());
	                window.print();
	            }, 500);
	        }
	    }
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel",
	    attrs: {
	      "id": "list"
	    }
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("خبرنامه پیامکی ")]), _vm._v(" "), _c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.numbers), function(n, i) {
	    return _c('tr', [_c('td', [_c('a', {
	      attrs: {
	        "href": "#"
	      }
	    }, [_vm._v(_vm._s(n.phone))])]), _vm._v(" "), _c('td', [_c('button', {
	      staticClass: "btn btn-danger",
	      on: {
	        "click": function($event) {
	          _vm.deleteNumber(i)
	        }
	      }
	    }, [_vm._v("حذف")])])])
	  }))])])])]), _vm._v(" "), _c('a', {
	    staticClass: "btn btn-default",
	    attrs: {
	      "href": _vm.$root.rootUrl + 'api/download_sms_file',
	      "target": "_blank"
	    },
	    on: {
	      "click": function($event) {}
	    }
	  }, [_vm._v("خروجی txt")])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("شماره تماس")]), _vm._v(" "), _c('th')])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-fd3d98c8", module.exports)
	  }
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(42)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(44),
	  /* template */
	  __webpack_require__(55),
	  /* scopeId */
	  "data-v-76b146ee",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/slider.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] slider.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-76b146ee", Component.options)
	  } else {
	    hotAPI.reload("data-v-76b146ee", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(43);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("e29a8108", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-76b146ee\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./slider.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-76b146ee\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./slider.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\npre[data-v-76b146ee]{direction: ltr\n}\n", ""]);

	// exports


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(13);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _send_form = __webpack_require__(29);

	var _send_form2 = _interopRequireDefault(_send_form);

	var _imageInput = __webpack_require__(45);

	var _imageInput2 = _interopRequireDefault(_imageInput);

	var _linkpicker = __webpack_require__(50);

	var _linkpicker2 = _interopRequireDefault(_linkpicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    mixins: [_send_form2.default],
	    components: { imageInput: _imageInput2.default, linkpicker: _linkpicker2.default },

	    data: function data() {
	        return {

	            slider: {
	                slides: []
	            },

	            loading: true,

	            url: 'api/new_data',

	            form: {
	                name: "slider",
	                uploadKey: getRandomInt(1, 100000),
	                data: ''
	            }
	        };
	    },

	    watch: {
	        slider: {
	            deep: true,
	            handler: function handler(val) {
	                this.form.data = (0, _stringify2.default)(this.slider);
	            }
	        }
	    },
	    created: function created() {
	        var _this = this;

	        setTimeout(function () {

	            _this.$http.get("api/get_data", { params: { name: "slider" } }).then(function (res) {
	                console.log(res);
	                _this.loading = false;
	                if (res.body.data != "" && res.body.data != undefined && res.body.data != "null") {

	                    _this.slider = JSON.parse(res.body.data);
	                } else {

	                    _this.slider.slides = [{ image: '', link: '', alt: '' }];
	                }
	            });
	        }, 1000);
	    },

	    methods: {
	        progress: function progress(p) {

	            if (p.finish) {
	                alert("Save!");
	            }
	        },
	        newSlide: function newSlide() {
	            this.slider.slides.push({ image: '', link: '', alt: '' });
	        },
	        deleteSlide: function deleteSlide(i) {

	            this.slider.slides.splice(i, 1);
	        }
	    }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var getRandomInt = function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(46)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(48),
	  /* template */
	  __webpack_require__(49),
	  /* scopeId */
	  "data-v-1fd23f8a",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/com/imageInput.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] imageInput.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1fd23f8a", Component.options)
	  } else {
	    hotAPI.reload("data-v-1fd23f8a", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(47);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("6c29f36c", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-1fd23f8a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./imageInput.vue", function() {
	     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-1fd23f8a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./imageInput.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.box[data-v-1fd23f8a]{\n\twidth:150px;\n}\n.fileInput[data-v-1fd23f8a]{\n\tdisplay: none;\n}\n\n", ""]);

	// exports


/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

		props: ["value", "name", "multiple", "prefix"],
		data: function data() {
			return {

				images: "",
				base: SERVER['root'] + "app/",

				pre: '',

				uploadedImages: []

			};
		},

		watch: {
			value: function value(val) {
				this.images = val;
				console.log(val);
			},
			images: function images(val) {
				this.$emit("input", val);
			}
		},
		created: function created() {

			if (this.prefix != undefined) this.pre = this.prefix;

			if (this.value != undefined) this.images = this.value;
		},

		methods: {
			FileChange: function FileChange(e) {
				//console.log(e)

				var files = e.target.files;
				var self = this;

				if (files && files[0]) {

					self.uploadedImages = [];

					var anyWindow = window.URL || window.webkitURL;

					this.clear_images();

					for (var i = 0; i < files.length; i++) {

						this.set_image(files[i].name);

						//get a blob to play with
						var objectUrl = anyWindow.createObjectURL(files[i]);
						// for the next line to work, you need something class="preview-area" in your html
						self.uploadedImages.push(objectUrl);

						// get rid of the blob
						window.URL.revokeObjectURL(files[i]);
					}
				}

				this.$emit("change", e);
			},
			clear_images: function clear_images() {
				if (Array.isArray(this.images)) this.images = [];else this.images = "";
			},
			set_image: function set_image(img) {
				if (Array.isArray(this.images)) {
					this.images.push(img);
				} else {
					if (this.images == "") this.images = this.pre + img;else this.images += ", " + this.pre + img;
				}
			}
		},
		computed: {
			get_images: function get_images() {
				return this.images != "" ? this.images.split(",") : [];
			},
			get_input_title: function get_input_title() {

				return this.multiple != undefined ? 'انتخاب تصاویر' : 'انتخاب تصویر';
			}
		},

		directives: {

			img: {
				bind: function bind(el, b, v) {

					var img = new Image();
					img.src = b.value;

					img.onload = function () {
						el.src = b.value;
						$(el).css('opacity', 0).animate({ opacity: 1 }, 1000);
					}.bind(el);

					img.onerror = function (e) {

						el.src = v.context.base + "assets/default-placeholder.png";
					};
				},
				update: function update(el, b, v) {

					el.src = b.value;
					el.onerror = function (e) {

						el.src = v.context.base + "assets/default-placeholder.png";
					};
				}
			}
		}

	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "w3-row w3-padding"
	  }, [_c('div', {
	    staticClass: "col-md-6"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "for": _vm.name
	    }
	  }, [_vm._v(_vm._s(_vm.get_input_title))]), _vm._v(" "), _c('input', {
	    staticClass: "fileInput",
	    attrs: {
	      "type": "file",
	      "id": _vm.name,
	      "multiple": _vm.multiple,
	      "name": _vm.name
	    },
	    on: {
	      "change": _vm.FileChange
	    }
	  }), _vm._v(" "), _c('p', {
	    staticClass: "help-block"
	  }, [_vm._t("default")], 2)])]), _vm._v(" "), (_vm.uploadedImages.length == 0) ? _c('div', {
	    staticClass: "col-md-6"
	  }, _vm._l((_vm.get_images), function(img) {
	    return _c('img', {
	      directives: [{
	        name: "img",
	        rawName: "v-img",
	        value: (_vm.base + 'upload/' + img),
	        expression: "base +'upload/'+ img"
	      }],
	      staticClass: "box",
	      attrs: {
	        "src": _vm.base + 'assets/ajax-loader.gif'
	      }
	    })
	  })) : _c('div', {
	    staticClass: "col-md-6"
	  }, _vm._l((_vm.uploadedImages), function(img) {
	    return _c('img', {
	      staticClass: "box",
	      attrs: {
	        "src": img
	      }
	    })
	  }))])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1fd23f8a", module.exports)
	  }
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(51)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(53),
	  /* template */
	  __webpack_require__(54),
	  /* scopeId */
	  "data-v-3017a0e3",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/com/linkpicker.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] linkpicker.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3017a0e3", Component.options)
	  } else {
	    hotAPI.reload("data-v-3017a0e3", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(52);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("ee5882dc", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3017a0e3\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./linkpicker.vue", function() {
	     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3017a0e3\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./linkpicker.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n#mylinkpicker[data-v-3017a0e3]{\n\n\tz-index: 1\n}\n.box[data-v-3017a0e3]{\n\tpadding: 0 5px;\n}\n.ltr[data-v-3017a0e3]{direction: ltr\n}\n#linksDialog[data-v-3017a0e3] {\n\tposition: absolute;\n\tdisplay: none;\n\n\twidth:450px;\n\tmin-height: 100px;\n\tpadding: 10px;\n\tbackground: white;\n\t\n\n\tleft: 0;\n\twidth: 100%;\n}\n.shadow-down[data-v-3017a0e3]{\n\tbox-shadow: 0 20px 30px rgba(0, 0, 0, 0.36);\n}\n.shadow-up[data-v-3017a0e3]{\n\tbox-shadow: 0 -20px 30px rgba(0, 0, 0, 0.36);\n}\ntd[data-v-3017a0e3]{\n\tcursor: default;\n}\n\n\n", ""]);

	// exports


/***/ },
/* 53 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

		props: ["value"],
		data: function data() {
			return {
				showLinksDialog: false,
				links: [],
				link: ''
			};
		},

		watch: {
			link: function link(val) {
				this.$emit("input", val);
			},
			value: function value(val) {
				this.link = val;
			}
		},
		created: function created() {

			if (this.value != undefined) this.link = this.value;

			this.load_pages_and_news();

			var self = this;

			this.$nextTick(function () {

				$(document).click(function (event) {
					if (!$(event.target).closest('#mylinkpicker').length) {
						self.unbind_linkpicker();
					}
				});
			});
		},

		methods: {
			load_pages_and_news: function load_pages_and_news() {
				var _this = this;

				this.$http.get("api/get_pages").then(function (res) {
					_this.links = res.body;
					console.log("load Links :");
					console.log(res);
				});
			},
			check: function check(link) {
				return this.links.indexOf(link) == -1 ? 0 : 1;
			},
			linkSelect: function linkSelect(link) {
				this.link = 'cinemasetareh.ir/page?id=' + link.id;
				this.unbind_linkpicker();
			},
			bind_linkpicker: function bind_linkpicker(el) {

				this.showLinksDialog = !this.showLinksDialog;
				$("#linksDialog").css({ display: "none" });

				var elem = $(el.target);

				this.$nextTick(function () {

					var elH = elem.innerHeight();
					var elT = elem.position().top;

					var top = elT + elH + 10;
					var left = elem.position().left + elem.innerWidth() / 2;

					var offsetTop = elem.offset().top + elem.innerHeight() + $("#linksDialog").innerHeight() + 10;
					var winHeight = $(window).height() + $(window).scrollTop();

					var shadow = "shadow-down";
					if (offsetTop > winHeight) {

						shadow = "shadow-up";
						top = elT - $("#linksDialog").innerHeight() - 10;
					}

					$("#linksDialog").removeClass("shadow-up shadow-down").addClass(shadow);

					$("#linksDialog").offset({

						top: top
					});
					$("#linksDialog").css({

						display: "inline-block"
					});
				});
			},
			unbind_linkpicker: function unbind_linkpicker() {

				this.showLinksDialog = false;
			}
		}

	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "input-group",
	    attrs: {
	      "id": "mylinkpicker"
	    }
	  }, [_c('span', {
	    staticClass: "input-group-addon btn btn-default",
	    attrs: {
	      "id": "showLinkpickerDialog"
	    },
	    on: {
	      "click": _vm.bind_linkpicker
	    }
	  }, [_vm._v("لینک ها")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.link),
	      expression: "link"
	    }],
	    staticClass: "form-control text-left",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.link)
	    },
	    on: {
	      "click": _vm.unbind_linkpicker,
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.link = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "input-group-addon ltr",
	    on: {
	      "click": _vm.unbind_linkpicker
	    }
	  }, [_vm._v("http://")]), _vm._v(" "), (_vm.showLinksDialog) ? _c('div', {
	    attrs: {
	      "id": "linksDialog"
	    }
	  }, [_c('div', {
	    staticClass: "links"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.links), function(l, i) {
	    return _c('tr', {
	      on: {
	        "click": function($event) {
	          _vm.linkSelect(l)
	        }
	      }
	    }, [_c('td', [_vm._v(_vm._s(l.title))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(l.date))])])
	  }))])])])]) : _vm._e()])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("تیتر")]), _vm._v(" "), _c('th', {
	    staticClass: "hidden-phone"
	  }, [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("تاریخ")]), _vm._v(" "), _c('th')])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3017a0e3", module.exports)
	  }
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [(_vm.loading) ? _c('div', {
	    staticClass: "col-lg-12"
	  }, [_vm._m(0)]) : _c('div', {
	    staticClass: "col-lg-12"
	  }, [_vm._l((_vm.slider.slides), function(s, i) {
	    return _c('div', {
	      staticClass: "row"
	    }, [_c('div', {
	      staticClass: "col-lg-12"
	    }, [_c('section', {
	      staticClass: "panel"
	    }, [_c('header', {
	      staticClass: "panel-heading"
	    }, [_vm._v("اسلاید " + _vm._s((i + 1).toFaDigit()) + "\n                    "), _c('button', {
	      staticClass: "btn btn-danger",
	      staticStyle: {
	        "float": "left"
	      },
	      on: {
	        "click": function($event) {
	          _vm.deleteSlide(i)
	        }
	      }
	    }, [_vm._v("حذف")])]), _vm._v(" "), _c('div', {
	      staticClass: "panel-body form-horizontal tasi-form"
	    }, [_c('div', {
	      staticClass: "form-group"
	    }, [_c('imageInput', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (s.image),
	        expression: "s.image"
	      }],
	      attrs: {
	        "prefix": _vm.form.uploadKey,
	        "name": 'slide_image' + i
	      },
	      domProps: {
	        "value": (s.image)
	      },
	      on: {
	        "change": _vm.onFileChange,
	        "input": function($event) {
	          s.image = $event
	        }
	      }
	    }, [_vm._v("\n                                سایز عکس 50px * 100px\n                            ")])], 1), _vm._v(" "), _c('div', {
	      staticClass: "form-group"
	    }, [_c('label', {
	      staticClass: "col-sm-2 control-label"
	    }, [_vm._v("لینک : ")]), _vm._v(" "), _c('div', {
	      staticClass: "col-sm-10"
	    }, [_c('linkpicker', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (s.link),
	        expression: "s.link"
	      }],
	      domProps: {
	        "value": (s.link)
	      },
	      on: {
	        "input": function($event) {
	          s.link = $event
	        }
	      }
	    })], 1)]), _vm._v(" "), _c('div', {
	      staticClass: "form-group"
	    }, [_c('label', {
	      staticClass: "col-sm-2 control-label"
	    }, [_vm._v("توضیح کوتاه : ")]), _vm._v(" "), _c('div', {
	      staticClass: "col-sm-10"
	    }, [_c('input', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (s.alt),
	        expression: "s.alt"
	      }],
	      staticClass: "form-control",
	      attrs: {
	        "type": "text"
	      },
	      domProps: {
	        "value": _vm._s(s.alt)
	      },
	      on: {
	        "input": function($event) {
	          if ($event.target.composing) { return; }
	          s.alt = $event.target.value
	        }
	      }
	    })])])])])])])
	  }), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-success",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.sendForm(_vm.form, _vm.url, _vm.progress)
	      }
	    }
	  }, [_vm._v("ذخیره")]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": _vm.newSlide
	    }
	  }, [_vm._v("+ جدید")])], 2)])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "panel"
	  }, [_c('div', {
	    staticClass: "panel-body"
	  }, [_vm._v("\n                درحال بارگزاری...\n            ")])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-76b146ee", module.exports)
	  }
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(57)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(59),
	  /* template */
	  __webpack_require__(60),
	  /* scopeId */
	  "data-v-3121adfa",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/payments.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] payments.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3121adfa", Component.options)
	  } else {
	    hotAPI.reload("data-v-3121adfa", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(58);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("2147e11b", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3121adfa\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./payments.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3121adfa\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./payments.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

	    mixins: [],

	    components: {},

	    data: function data() {
	        return {

	            loading: true,

	            pays: [],

	            searchText: ''

	        };
	    },
	    created: function created() {

	        this.get_payments();
	    },

	    computed: {
	        searchResult: function searchResult() {
	            var a = [];
	            var val = this.searchText;
	            this.pays.some(function (el) {
	                if (el.name.indexOf(val) > -1 || el.mobile.indexOf(val) > -1 || el.refid.indexOf(val) > -1 || el.date.indexOf(val) > -1) {
	                    a.push(el);
	                }
	            });

	            return a;
	        }
	    },
	    methods: {
	        get_payments: function get_payments() {
	            var _this = this;

	            this.loading = true;

	            setTimeout(function () {
	                _this.$http.get("api/get_payments").then(function (res) {

	                    _this.pays = res.body;
	                    _this.loading = false;
	                    console.log(_this.pays);
	                });
	            }, 1000);
	        },
	        payStatus: function payStatus(n) {
	            return n.refid == "0" ? "نا موفق" : "موفق";
	        }
	    }

	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [(_vm.loading) ? _c('div', {
	    staticClass: "row"
	  }, [_vm._m(0)]) : _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("لیست پرداخت ها ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: " input-group",
	    staticStyle: {
	      "margin-bottom": "15px"
	    }
	  }, [_c('span', {
	    staticClass: "input-group-addon btn-primary"
	  }, [_c('i', {
	    staticClass: "icon-search"
	  })]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.searchText),
	      expression: "searchText"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": "جستجو"
	    },
	    domProps: {
	      "value": _vm._s(_vm.searchText)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.searchText = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_c('thead', [_c('tr', [_c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("کد مرجع")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("نام")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("شماره مبایل")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("تاریخ")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("مبلغ پرداختی")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("وضعیت")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("اتوریتی")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("سانس")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("نوع بلیط")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("ای دی فیلم/کنسرت")])])]), _vm._v(" "), _c('tbody', [(_vm.pays.length == 0) ? _c('h3', [_vm._v("درحال بارگزاری...")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.searchResult), function(n) {
	    return _c('tr', [_c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(n.refid))]), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(n.name))]), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(n.mobile))]), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(n.date))]), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(n.amount) + " تومان")]), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(_vm.payStatus(n)))]), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(n.authority))]), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(n.sans))]), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(n.movie_type))]), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(n.movie_id))])])
	  })], 2)])])])])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('div', {
	    staticClass: "panel-body"
	  }, [_vm._v("\n                    درحال بارگزاری...\n                ")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3121adfa", module.exports)
	  }
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(62)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(64),
	  /* template */
	  __webpack_require__(65),
	  /* scopeId */
	  "data-v-5e412393",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/setting.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] setting.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5e412393", Component.options)
	  } else {
	    hotAPI.reload("data-v-5e412393", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(63);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("1658394f", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5e412393\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./setting.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5e412393\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./setting.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(13);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _send_form = __webpack_require__(29);

	var _send_form2 = _interopRequireDefault(_send_form);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	  mixins: [_send_form2.default],

	  data: function data() {
	    return {

	      sans: "",
	      sansha: [],

	      form: {
	        name: "setting",
	        data: {}
	      },

	      loading: false,

	      setting: {

	        contact: {

	          adminEmail: '',
	          siteEmail: '',
	          address: '',
	          phone: '',
	          telegram: '',
	          instagram: '',
	          bazar: ''
	        },

	        about: ''
	      }

	    };
	  },
	  created: function created() {
	    var _this = this;

	    this.$http.get("api/get_data", { params: { name: "setting" } }).then(function (res) {
	      console.log(res);
	      if (res.body != "") _this.setting = JSON.parse(br2nl(res.body.data));
	    });

	    this.$http.get("api/get_all_showtimes").then(function (res) {
	      console.log(res);
	      if (res.body.showTimes) {
	        res.body.showTimes.some(function (el) {
	          _this.sansha.push(el.time);
	        });
	      }
	    });
	  },

	  methods: {
	    save: function save() {

	      this.form.data = (0, _stringify2.default)(this.setting);
	      this.$http.post("api/new_data", this.form).then(function (res) {
	        console.log(res);
	        alert("save!");
	      });

	      this.$http.post("api/save_showtimes", { sansha: this.sansha }).then(function (res) {
	        console.log(res);
	      });
	    },
	    deleteSans: function deleteSans(i) {
	      this.sansha.splice(i, 1);
	    },
	    addSans: function addSans() {
	      this.sansha.push(this.sans);
	      this.sans = "";
	    }
	  }

	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	function br2nl(str) {
	  return str.replace(/<br>/g, "\\n");
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [(_vm.loading) ? _c('div', {
	    staticClass: "row"
	  }, [_vm._m(0)]) : _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("اطلاعات تماس")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('form', {
	    staticClass: "form-horizontal tasi-form",
	    attrs: {
	      "method": "get"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("آدرس")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.setting.contact.address),
	      expression: "setting.contact.address"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.setting.contact.address)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.setting.contact.address = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("تلفن")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.setting.contact.phone),
	      expression: "setting.contact.phone"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.setting.contact.phone)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.setting.contact.phone = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("تلگرام")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.setting.contact.telegram),
	      expression: "setting.contact.telegram"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.setting.contact.telegram)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.setting.contact.telegram = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("اینستاگرام")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.setting.contact.instagram),
	      expression: "setting.contact.instagram"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.setting.contact.instagram)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.setting.contact.instagram = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("لینک بازار")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.setting.contact.bazar),
	      expression: "setting.contact.bazar"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.setting.contact.bazar)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.setting.contact.bazar = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("ایمیل سایت")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.setting.contact.siteEmail),
	      expression: "setting.contact.siteEmail"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.setting.contact.siteEmail)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.setting.contact.siteEmail = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("ایمیل مدیر")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.setting.contact.adminEmail),
	      expression: "setting.contact.adminEmail"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.setting.contact.adminEmail)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.setting.contact.adminEmail = $event.target.value
	      }
	    }
	  })])])])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("درباره ما")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('form', {
	    staticClass: "form-horizontal tasi-form",
	    attrs: {
	      "method": "get"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("درباره ما")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.setting.about),
	      expression: "setting.about"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.setting.about)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.setting.about = $event.target.value
	      }
	    }
	  })])])])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("سانس ها")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "col-sm-6"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-sm-3"
	  }, [_c('button', {
	    staticClass: "btn btn-primary",
	    on: {
	      "click": _vm.addSans
	    }
	  }, [_vm._v("ثبت")])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-9"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.sans),
	      expression: "sans"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.sans)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.sans = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "row",
	    staticStyle: {
	      "margin-top": "35px"
	    }
	  }, _vm._l((_vm.sansha), function(s, i) {
	    return _c('div', {
	      staticClass: "col-sm-3"
	    }, [_c('div', {
	      staticClass: " input-group"
	    }, [_c('span', {
	      staticClass: "input-group-addon btn btn-danger",
	      on: {
	        "click": function($event) {
	          _vm.deleteSans(i)
	        }
	      }
	    }, [_vm._v("X")]), _vm._v(" "), _c('input', {
	      staticClass: "form-control",
	      attrs: {
	        "type": "text"
	      },
	      domProps: {
	        "value": s
	      }
	    })])])
	  }))])])])])])]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": _vm.save
	    }
	  }, [_vm._v("ذخیره")])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('div', {
	    staticClass: "panel-body"
	  }, [_vm._v("\n\t                درحال بارگزاری...\n\t            ")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5e412393", module.exports)
	  }
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(67)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(69),
	  /* template */
	  __webpack_require__(70),
	  /* scopeId */
	  "data-v-d4dc9cb4",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/promotion.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] promotion.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-d4dc9cb4", Component.options)
	  } else {
	    hotAPI.reload("data-v-d4dc9cb4", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(68);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("d11c8f0e", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-d4dc9cb4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./promotion.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-d4dc9cb4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./promotion.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\npre[data-v-d4dc9cb4]{direction: ltr\n}\n", ""]);

	// exports


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(13);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _send_form = __webpack_require__(29);

	var _send_form2 = _interopRequireDefault(_send_form);

	var _imageInput = __webpack_require__(45);

	var _imageInput2 = _interopRequireDefault(_imageInput);

	var _linkpicker = __webpack_require__(50);

	var _linkpicker2 = _interopRequireDefault(_linkpicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    mixins: [_send_form2.default],
	    components: { imageInput: _imageInput2.default, linkpicker: _linkpicker2.default },

	    data: function data() {
	        return {

	            promotions: [],

	            loading: true,

	            url: 'api/new_data',

	            form: {
	                name: "promotions",
	                uploadKey: getRandomInt(1, 100000),
	                data: ''
	            }
	        };
	    },

	    watch: {
	        promotions: {
	            deep: true,
	            handler: function handler(val) {
	                this.form.data = (0, _stringify2.default)(this.promotions);
	            }
	        }
	    },
	    created: function created() {
	        var _this = this;

	        setTimeout(function () {

	            _this.$http.get("api/get_data", { params: { name: "promotions" } }).then(function (res) {
	                console.log(res);
	                _this.loading = false;
	                if (res.body.data != "" && res.body.data != undefined && res.body.data != "null") {

	                    _this.promotions = JSON.parse(res.body.data);
	                } else {

	                    _this.promotions = [{ image: '', link: '', alt: '' }];
	                }
	            });
	        }, 1000);
	    },

	    methods: {
	        progress: function progress(p) {

	            if (p.finish) {
	                alert("Save!");
	            }
	        },
	        newPromotion: function newPromotion() {
	            this.promotions.push({ image: '', link: '', alt: '' });
	        },
	        deletePromotion: function deletePromotion(i) {

	            this.promotions.splice(i, 1);
	        }
	    }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var getRandomInt = function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [(_vm.loading) ? _c('div', {
	    staticClass: "col-lg-12"
	  }, [_vm._m(0)]) : _c('div', {
	    staticClass: "col-lg-12"
	  }, [_vm._l((_vm.promotions), function(p, i) {
	    return _c('div', {
	      staticClass: "row"
	    }, [_c('div', {
	      staticClass: "col-lg-12"
	    }, [_c('section', {
	      staticClass: "panel"
	    }, [_c('header', {
	      staticClass: "panel-heading"
	    }, [_vm._v("پیشنهاد ویژه " + _vm._s((i + 1).toFaDigit()) + "\n                    "), _c('button', {
	      staticClass: "btn btn-danger",
	      staticStyle: {
	        "float": "left"
	      },
	      on: {
	        "click": function($event) {
	          _vm.deletePromotion(i)
	        }
	      }
	    }, [_vm._v("حذف")])]), _vm._v(" "), _c('div', {
	      staticClass: "panel-body form-horizontal tasi-form"
	    }, [_c('div', {
	      staticClass: "form-group"
	    }, [_c('imageInput', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (p.image),
	        expression: "p.image"
	      }],
	      attrs: {
	        "prefix": _vm.form.uploadKey,
	        "name": 'promotion_image' + i
	      },
	      domProps: {
	        "value": (p.image)
	      },
	      on: {
	        "change": _vm.onFileChange,
	        "input": function($event) {
	          p.image = $event
	        }
	      }
	    }, [_vm._v("\n                                سایز عکس 50px * 100px\n                            ")])], 1), _vm._v(" "), _c('div', {
	      staticClass: "form-group"
	    }, [_c('label', {
	      staticClass: "col-sm-2 control-label"
	    }, [_vm._v("لینک : ")]), _vm._v(" "), _c('div', {
	      staticClass: "col-sm-10"
	    }, [_c('linkpicker', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (p.link),
	        expression: "p.link"
	      }],
	      domProps: {
	        "value": (p.link)
	      },
	      on: {
	        "input": function($event) {
	          p.link = $event
	        }
	      }
	    })], 1)]), _vm._v(" "), _c('div', {
	      staticClass: "form-group"
	    }, [_c('label', {
	      staticClass: "col-sm-2 control-label"
	    }, [_vm._v("توضیح کوتاه : ")]), _vm._v(" "), _c('div', {
	      staticClass: "col-sm-10"
	    }, [_c('input', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (p.alt),
	        expression: "p.alt"
	      }],
	      staticClass: "form-control",
	      attrs: {
	        "type": "text"
	      },
	      domProps: {
	        "value": _vm._s(p.alt)
	      },
	      on: {
	        "input": function($event) {
	          if ($event.target.composing) { return; }
	          p.alt = $event.target.value
	        }
	      }
	    })])])])])])])
	  }), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-success",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.sendForm(_vm.form, _vm.url, _vm.progress)
	      }
	    }
	  }, [_vm._v("ذخیره")]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": _vm.newPromotion
	    }
	  }, [_vm._v("+ جدید")])], 2)])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "panel"
	  }, [_c('div', {
	    staticClass: "panel-body"
	  }, [_vm._v("\n                درحال بارگزاری...\n            ")])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-d4dc9cb4", module.exports)
	  }
	}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(72)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(74),
	  /* template */
	  __webpack_require__(75),
	  /* scopeId */
	  "data-v-fa952da0",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/movieTrailer.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] movieTrailer.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-fa952da0", Component.options)
	  } else {
	    hotAPI.reload("data-v-fa952da0", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(73);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("fbd53bbc", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-fa952da0\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./movieTrailer.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-fa952da0\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./movieTrailer.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(13);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _send_form = __webpack_require__(29);

	var _send_form2 = _interopRequireDefault(_send_form);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    mixins: [_send_form2.default],

	    data: function data() {
	        return {
	            embedCode: '',
	            movieTrailer: {
	                name: '',
	                id: '',
	                src: ''
	            },

	            url: 'api/new_data',

	            form: {
	                name: "movie_trailer",
	                data: ''
	            }
	        };
	    },

	    watch: {
	        embedCode: function embedCode(v) {
	            this.movieTrailer.id = $(v).prop("id");
	            this.movieTrailer.src = $(v).children("script").prop("src");
	        }
	    },
	    created: function created() {
	        var _this = this;

	        this.$http.get("api/get_data", { params: { name: "movie_trailer" } }).then(function (res) {
	            console.log(res);
	            if (res.body) {
	                _this.movieTrailer = JSON.parse(res.body.data);
	                var id = _this.movieTrailer.id;
	                var src = _this.movieTrailer.src;
	                _this.embedCode = '<div id="' + id + '"><script type="text/JavaScript" src="' + src + '"></script></div>';
	            }
	        });
	    },

	    methods: {
	        progress: function progress(p) {

	            if (p.finish) {
	                alert("Save!");
	            }
	        },
	        save: function save() {

	            //  this.movieTrailer.src = this.movieTrailer.src.replace(/\//g, "&#47");
	            console.log(this.movieTrailer.src);
	            this.form.data = (0, _stringify2.default)(this.movieTrailer);

	            this.sendForm(this.form, this.url, this.progress);
	        }
	    }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var getRandomInt = function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("پیشنمایش فیلم سینمایی")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('form', {
	    staticClass: "form-horizontal tasi-form",
	    attrs: {
	      "method": "get"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("نام فیلم")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movieTrailer.name),
	      expression: "movieTrailer.name"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movieTrailer.name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movieTrailer.name = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("لینک آپارات")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.embedCode),
	      expression: "embedCode"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.embedCode)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.embedCode = $event.target.value
	      }
	    }
	  })])])])])])])]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.save()
	      }
	    }
	  }, [_vm._v("ذخیره")])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-fa952da0", module.exports)
	  }
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(77)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(79),
	  /* template */
	  __webpack_require__(128),
	  /* scopeId */
	  "data-v-1d154115",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/purchases.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] purchases.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1d154115", Component.options)
	  } else {
	    hotAPI.reload("data-v-1d154115", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(78);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("172fd05d", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-1d154115\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./purchases.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-1d154115\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./purchases.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\ninput[type=\"radio\"]:checked+label[data-v-1d154115]{\n \n    background: #03a9f4 !important;\n    color: white;\n}\n.lbltab[data-v-1d154115]{\n    border: 1px solid #03a9f4;\n    padding: 5px 15px;\n    background: white;\n    margin: 0 2px;\n    border-radius: 5px;\n    color: #03a9f4;\n}\n.opttab[data-v-1d154115]{\n    display: none\n}\ntable[data-v-1d154115] {\n\tfont-size: 13px;\n}\nselect.form-control[data-v-1d154115]{\n    padding: 0 !important;\n}\n", ""]);

	// exports


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ticketView = __webpack_require__(80);

	var _ticketView2 = _interopRequireDefault(_ticketView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    components: { ticketView: _ticketView2.default },

	    data: function data() {
	        return {

	            type: 'film',

	            sansInfo: [],

	            searchText: "",

	            mid: "",
	            date: "",
	            urid: "",

	            loadingMovie: true,
	            loadingDates: false,
	            loadingList: false,

	            ticketData: [],

	            purchases: []

	        };
	    },
	    created: function created() {
	        this.load_movies();
	    },

	    watch: {
	        mid: function mid() {
	            this.date = this.urid = "";
	            //this.loadingDates = true
	        },
	        type: function type() {
	            this.mid = "";
	            this.date = "";
	            this.urid = "";
	            this.load_movies();
	        }
	    },
	    computed: {
	        count_of_all_chairs: function count_of_all_chairs() {
	            var t = 0;
	            this.purchases.some(function (el) {
	                t += el.chairs.split(" ").length;
	            });
	            return t;
	        },
	        count_of_offline_chairs: function count_of_offline_chairs() {
	            var t = 0;
	            this.purchases.some(function (el) {
	                if (el.user_id == 0) t += el.chairs.split(" ").length;
	            });
	            return t;
	        },
	        count_of_online_chairs: function count_of_online_chairs() {
	            return this.count_of_all_chairs - this.count_of_offline_chairs || 0;
	        },
	        searchResult: function searchResult() {
	            var a = [];
	            var val = this.searchText;
	            this.purchases.some(function (el, i) {
	                if (el.code.indexOf(val) > -1 || el.user.fullName.indexOf(val) > -1 || el.user.phone.indexOf(val) > -1 || el.chairs.indexOf(val) > -1) {

	                    el.realIndex = i;
	                    a.push(el);
	                }
	            });

	            return a;
	        },
	        movies_loading_msg: function movies_loading_msg() {
	            return this.loadingMovie ? "درحال بارگزاری..." : this.type == "film" ? "فیلم ها" : "برنامه های فرهنگی";
	        },
	        dates_loading_msg: function dates_loading_msg() {
	            return this.loadingDates ? "درحال بارگزاری..." : this.type == "film" ? "تاریخ اکران " : "تاریخ اجرا";
	        },
	        list_loading_msg: function list_loading_msg() {
	            var text = this.purchases.length > 0 ? "" : "درحال حاضر هیچ اطلاعاتی وجود ندارد";
	            return this.loadingList ? "درحال بارگزاری..." : text;
	        },
	        get_dates: function get_dates() {

	            var a = [];
	            this.sansInfo.some(function (el) {
	                if (a.indexOf(el.date) == -1) a.push(el.date);
	            });
	            return a;
	        },
	        get_times: function get_times() {
	            var _this = this;

	            var a = [];
	            this.sansInfo.some(function (el) {
	                if (el.date == _this.date) a.push({ time: el.time, uniqe_id: el.uniqe_id });
	            });
	            return a;
	        },
	        allowSearch: function allowSearch() {
	            return !(this.mid != "" && this.urid != "");
	        },
	        getReseveTable: function getReseveTable() {
	            return this.type == "film" ? "Reserve" : "concertReserve";
	        }
	    },
	    methods: {
	        get_chairs_alpha: function get_chairs_alpha(chairs) {
	            var rows = [];
	            var text = [];
	            chairs = chairs.split(' ');

	            chairs.some(function (chair) {

	                var x = chair.split('-');
	                var r = x[0];
	                var c = x[1];
	                var i = rows.indexOf(parseInt(r));

	                if (i == -1) {

	                    rows.push(parseInt(r));
	                    text.push('\u0631\u062F\u06CC\u0641 ' + r + ' \u0635\u0646\u062F\u0644\u06CC ' + c + ' ');
	                } else {

	                    text[i] += ' , ' + c + ' ';
	                }
	            });

	            return text.join(" "); //c.replace(/\/+$/, '');
	        },
	        printTicket: function printTicket(i, e) {
	            var _this2 = this;

	            var el = e.target;
	            $(el).prop("disabled", "1");

	            var movie, showtime;

	            var params = {
	                id: this.searchResult[i].movie_id
	            };
	            var table = this.type == "film" ? 'get_movies' : 'get_concerts';
	            this.$http.get("api/" + table, { params: params }).then(function (res) {

	                var params = {
	                    urid: _this2.searchResult[i].reserve_id,
	                    table: _this2.getReseveTable
	                };

	                movie = res.body;

	                _this2.$http.get("api/get_showtime_by_uniqe_id", { params: params }).then(function (res) {

	                    showtime = res.body;
	                    $(el).removeProp("disabled");

	                    _this2.ticketData = {
	                        isConcert: _this2.type == "film" ? false : true,
	                        code: _this2.searchResult[i].code,
	                        date: showtime.date,
	                        time: showtime.time,
	                        movieName: movie.title,
	                        chairsAlpha: _this2.get_chairs_alpha(_this2.searchResult[i].chairs),
	                        chairsCount: _this2.searchResult[i].chairs.split(' ').length,
	                        chairsNumber: _this2.searchResult[i].chairs,
	                        totalPrice: _this2.searchResult[i].total_price
	                    };

	                    setTimeout(function () {
	                        $("#print").html($("#ticketView").clone());
	                        window.print();
	                    }, 500);
	                });
	            });
	        },
	        cancelTicket: function cancelTicket(i, e) {
	            var _this3 = this;

	            var el = e.target;
	            $(el).prop("disabled", "1");

	            var params = {
	                fid: this.searchResult[i].id,
	                urid: this.searchResult[i].reserve_id,
	                table: this.getReseveTable
	            };

	            this.$http.get("api/cancel_ticket", { params: params }).then(function (res) {
	                console.log(res);
	                $(el).removeProp("disabled");
	                var realIndex = _this3.searchResult[i].realIndex;
	                _this3.purchases.splice(realIndex, 1);
	            }, function (err) {
	                alert("مشکلی در لغو بوجود آمپده");
	                $(el).removeProp("disabled");
	                console.log(err);
	            });
	        },
	        searchFactors: function searchFactors() {
	            var _this4 = this;

	            var mid = this.mid,
	                urid = this.urid,
	                type = this.type;

	            this.loadingList = true;

	            var params = { mid: mid, urid: urid, type: type };
	            setTimeout(function () {
	                _this4.$http.get('api/search_factor', { params: params }).then(function (res) {
	                    console.log(res.body);
	                    _this4.loadingList = false;
	                    _this4.purchases = res.body.purchases;
	                });
	            }, 1000);
	        },
	        load_dates_by_movie_id: function load_dates_by_movie_id() {
	            var _this5 = this;

	            this.loadingDates = true;
	            setTimeout(function () {
	                var params = {
	                    id: _this5.mid,
	                    table: _this5.getReseveTable
	                };
	                _this5.$http.get('api/get_showtimes?noValidate=1', { params: params }).then(function (res) {
	                    _this5.loadingDates = false;
	                    _this5.sansInfo = res.body;
	                });
	            }, 1000);
	        },
	        load_movies: function load_movies() {
	            var _this6 = this;

	            this.loadingMovie = true;
	            setTimeout(function () {
	                var table = _this6.type == "film" ? 'get_movies' : 'get_concerts';
	                _this6.$http.get('api/' + table).then(function (res) {
	                    _this6.loadingMovie = false;
	                    _this6.$root.movies = res.body;
	                });
	            }, 1000);
	        },
	        printList: function printList() {
	            setTimeout(function () {
	                $("#print").html($("#list").clone());
	                window.print();
	            }, 500);
	        }
	    }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(81)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(83),
	  /* template */
	  __webpack_require__(127),
	  /* scopeId */
	  "data-v-b1354744",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/ticketView.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] ticketView.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-b1354744", Component.options)
	  } else {
	    hotAPI.reload("data-v-b1354744", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(82);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("603afff5", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-b1354744\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ticketView.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-b1354744\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ticketView.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\nul[data-v-b1354744]{\n\tmargin: 0;\n\tpadding:0;\n}\nli[data-v-b1354744]{\n\tlist-style: none;\n\tmargin: 0;padding: 0;\n}\n#container[data-v-b1354744] {\n\tdisplay: none;\n}\n@media print{\n#container[data-v-b1354744] {\n        display: block;\n        position: absolute;\n        top: 0;left: 0;\n}\n}\n.left[data-v-b1354744]{\n\tdirection: ltr !important\n}\n\n\n\n", ""]);

	// exports


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _jsbarcode = __webpack_require__(84);

	var _jsbarcode2 = _interopRequireDefault(_jsbarcode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

		props: ["value"],
		data: function data() {
			return {
				imgPath: SERVER['base'] + '/assets/img/'
			};
		},
		created: function created() {

			console.log("ticket View");
		},

		computed: {
			title_msg: function title_msg() {
				return this.value.isConcert ? 'عنوان برنامه' : 'نام فیلم';
			},
			datetime_msg: function datetime_msg() {
				return this.value.isConcert ? 'اجرا' : 'اکران';
			}
		},
		watch: {

			value: {
				handler: function handler(val) {
					if (val.code) {
						console.log("barcdoe change");
						(0, _jsbarcode2.default)("#barcodeImage", val.code, {
							displayValue: false,
							height: 360,
							width: 14
						});
					}
				},

				deep: true
			}
		}

	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _barcodes = __webpack_require__(85);

	var _barcodes2 = _interopRequireDefault(_barcodes);

	var _merge = __webpack_require__(113);

	var _merge2 = _interopRequireDefault(_merge);

	var _linearizeEncodings = __webpack_require__(114);

	var _linearizeEncodings2 = _interopRequireDefault(_linearizeEncodings);

	var _fixOptions = __webpack_require__(115);

	var _fixOptions2 = _interopRequireDefault(_fixOptions);

	var _getRenderProperties = __webpack_require__(116);

	var _getRenderProperties2 = _interopRequireDefault(_getRenderProperties);

	var _optionsFromStrings = __webpack_require__(118);

	var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);

	var _ErrorHandler = __webpack_require__(126);

	var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

	var _exceptions = __webpack_require__(125);

	var _defaults = __webpack_require__(119);

	var _defaults2 = _interopRequireDefault(_defaults);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// The protype of the object returned from the JsBarcode() call


	// Help functions
	var API = function API() {};

	// The first call of the library API
	// Will return an object with all barcodes calls and the data that is used
	// by the renderers


	// Default values


	// Exceptions
	// Import all the barcodes
	var JsBarcode = function JsBarcode(element, text, options) {
		var api = new API();

		if (typeof element === "undefined") {
			throw Error("No element to render on was provided.");
		}

		// Variables that will be pased through the API calls
		api._renderProperties = (0, _getRenderProperties2.default)(element);
		api._encodings = [];
		api._options = _defaults2.default;
		api._errorHandler = new _ErrorHandler2.default(api);

		// If text is set, use the simple syntax (render the barcode directly)
		if (typeof text !== "undefined") {
			options = options || {};

			if (!options.format) {
				options.format = autoSelectBarcode();
			}

			api.options(options)[options.format](text, options).render();
		}

		return api;
	};

	// To make tests work TODO: remove
	JsBarcode.getModule = function (name) {
		return _barcodes2.default[name];
	};

	// Register all barcodes
	for (var name in _barcodes2.default) {
		if (_barcodes2.default.hasOwnProperty(name)) {
			// Security check if the propery is a prototype property
			registerBarcode(_barcodes2.default, name);
		}
	}
	function registerBarcode(barcodes, name) {
		API.prototype[name] = API.prototype[name.toUpperCase()] = API.prototype[name.toLowerCase()] = function (text, options) {
			var api = this;
			return api._errorHandler.wrapBarcodeCall(function () {
				// Ensure text is options.text
				options.text = typeof options.text === 'undefined' ? undefined : '' + options.text;

				var newOptions = (0, _merge2.default)(api._options, options);
				newOptions = (0, _optionsFromStrings2.default)(newOptions);
				var Encoder = barcodes[name];
				var encoded = encode(text, Encoder, newOptions);
				api._encodings.push(encoded);

				return api;
			});
		};
	}

	// encode() handles the Encoder call and builds the binary string to be rendered
	function encode(text, Encoder, options) {
		// Ensure that text is a string
		text = "" + text;

		var encoder = new Encoder(text, options);

		// If the input is not valid for the encoder, throw error.
		// If the valid callback option is set, call it instead of throwing error
		if (!encoder.valid()) {
			throw new _exceptions.InvalidInputException(encoder.constructor.name, text);
		}

		// Make a request for the binary data (and other infromation) that should be rendered
		var encoded = encoder.encode();

		// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
		// Convert to [1-1, 1-2, 2, 3-1, 3-2]
		encoded = (0, _linearizeEncodings2.default)(encoded);

		// Merge
		for (var i = 0; i < encoded.length; i++) {
			encoded[i].options = (0, _merge2.default)(options, encoded[i].options);
		}

		return encoded;
	}

	function autoSelectBarcode() {
		// If CODE128 exists. Use it
		if (_barcodes2.default["CODE128"]) {
			return "CODE128";
		}

		// Else, take the first (probably only) barcode
		return Object.keys(_barcodes2.default)[0];
	}

	// Sets global encoder options
	// Added to the api by the JsBarcode function
	API.prototype.options = function (options) {
		this._options = (0, _merge2.default)(this._options, options);
		return this;
	};

	// Will create a blank space (usually in between barcodes)
	API.prototype.blank = function (size) {
		var zeroes = "0".repeat(size);
		this._encodings.push({ data: zeroes });
		return this;
	};

	// Initialize JsBarcode on all HTML elements defined.
	API.prototype.init = function () {
		// Should do nothing if no elements where found
		if (!this._renderProperties) {
			return;
		}

		// Make sure renderProperies is an array
		if (!Array.isArray(this._renderProperties)) {
			this._renderProperties = [this._renderProperties];
		}

		var renderProperty;
		for (var i in this._renderProperties) {
			renderProperty = this._renderProperties[i];
			var options = (0, _merge2.default)(this._options, renderProperty.options);

			if (options.format == "auto") {
				options.format = autoSelectBarcode();
			}

			this._errorHandler.wrapBarcodeCall(function () {
				var text = options.value;
				var Encoder = _barcodes2.default[options.format.toUpperCase()];
				var encoded = encode(text, Encoder, options);

				render(renderProperty, encoded, options);
			});
		}
	};

	// The render API call. Calls the real render function.
	API.prototype.render = function () {
		if (!this._renderProperties) {
			throw new _exceptions.NoElementException();
		}

		if (Array.isArray(this._renderProperties)) {
			for (var i = 0; i < this._renderProperties.length; i++) {
				render(this._renderProperties[i], this._encodings, this._options);
			}
		} else {
			render(this._renderProperties, this._encodings, this._options);
		}

		return this;
	};

	API.prototype._defaults = _defaults2.default;

	// Prepares the encodings and calls the renderer
	function render(renderProperties, encodings, options) {
		encodings = (0, _linearizeEncodings2.default)(encodings);

		for (var i = 0; i < encodings.length; i++) {
			encodings[i].options = (0, _merge2.default)(options, encodings[i].options);
			(0, _fixOptions2.default)(encodings[i].options);
		}

		(0, _fixOptions2.default)(options);

		var Renderer = renderProperties.renderer;
		var renderer = new Renderer(renderProperties.element, encodings, options);
		renderer.render();

		if (renderProperties.afterRender) {
			renderProperties.afterRender();
		}
	}

	// Export to browser
	if (typeof window !== "undefined") {
		window.JsBarcode = JsBarcode;
	}

	// Export to jQuery
	/*global jQuery */
	if (typeof jQuery !== 'undefined') {
		jQuery.fn.JsBarcode = function (content, options) {
			var elementArray = [];
			jQuery(this).each(function () {
				elementArray.push(this);
			});
			return JsBarcode(elementArray, content, options);
		};
	}

	// Export to commonJS
	module.exports = JsBarcode;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE = __webpack_require__(86);

	var _CODE2 = __webpack_require__(88);

	var _EAN_UPC = __webpack_require__(94);

	var _ITF = __webpack_require__(101);

	var _ITF2 = __webpack_require__(102);

	var _MSI = __webpack_require__(103);

	var _pharmacode = __webpack_require__(110);

	var _codabar = __webpack_require__(111);

	var _GenericBarcode = __webpack_require__(112);

	exports.default = {
		CODE39: _CODE.CODE39,
		CODE128: _CODE2.CODE128, CODE128A: _CODE2.CODE128A, CODE128B: _CODE2.CODE128B, CODE128C: _CODE2.CODE128C,
		EAN13: _EAN_UPC.EAN13, EAN8: _EAN_UPC.EAN8, EAN5: _EAN_UPC.EAN5, EAN2: _EAN_UPC.EAN2, UPC: _EAN_UPC.UPC,
		ITF14: _ITF.ITF14,
		ITF: _ITF2.ITF,
		MSI: _MSI.MSI, MSI10: _MSI.MSI10, MSI11: _MSI.MSI11, MSI1010: _MSI.MSI1010, MSI1110: _MSI.MSI1110,
		pharmacode: _pharmacode.pharmacode,
		codabar: _codabar.codabar,
		GenericBarcode: _GenericBarcode.GenericBarcode
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.CODE39 = undefined;

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// https://en.wikipedia.org/wiki/Code_39#Encoding

	var CODE39 = function (_Barcode) {
		_inherits(CODE39, _Barcode);

		function CODE39(data, options) {
			_classCallCheck(this, CODE39);

			data = data.toUpperCase();

			// Calculate mod43 checksum if enabled
			if (options.mod43) {
				data += getCharacter(mod43checksum(data));
			}

			return _possibleConstructorReturn(this, _Barcode.call(this, data, options));
		}

		CODE39.prototype.encode = function encode() {
			// First character is always a *
			var result = getEncoding("*");

			// Take every character and add the binary representation to the result
			for (var i = 0; i < this.data.length; i++) {
				result += getEncoding(this.data[i]) + "0";
			}

			// Last character is always a *
			result += getEncoding("*");

			return {
				data: result,
				text: this.text
			};
		};

		CODE39.prototype.valid = function valid() {
			return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
		};

		return CODE39;
	}(_Barcode3.default);

	// All characters. The position in the array is the (checksum) value


	var characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"];

	// The decimal representation of the characters, is converted to the
	// corresponding binary with the getEncoding function
	var encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];

	// Get the binary representation of a character by converting the encodings
	// from decimal to binary
	function getEncoding(character) {
		return getBinary(characterValue(character));
	}

	function getBinary(characterValue) {
		return encodings[characterValue].toString(2);
	}

	function getCharacter(characterValue) {
		return characters[characterValue];
	}

	function characterValue(character) {
		return characters.indexOf(character);
	}

	function mod43checksum(data) {
		var checksum = 0;
		for (var i = 0; i < data.length; i++) {
			checksum += characterValue(data[i]);
		}

		checksum = checksum % 43;
		return checksum;
	}

	exports.CODE39 = CODE39;

/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Barcode = function Barcode(data, options) {
		_classCallCheck(this, Barcode);

		this.data = data;
		this.text = options.text || data;
		this.options = options;
	};

	exports.default = Barcode;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CODE128C = exports.CODE128B = exports.CODE128A = exports.CODE128 = undefined;

	var _CODE128_AUTO = __webpack_require__(89);

	var _CODE128_AUTO2 = _interopRequireDefault(_CODE128_AUTO);

	var _CODE128A = __webpack_require__(91);

	var _CODE128A2 = _interopRequireDefault(_CODE128A);

	var _CODE128B = __webpack_require__(92);

	var _CODE128B2 = _interopRequireDefault(_CODE128B);

	var _CODE128C = __webpack_require__(93);

	var _CODE128C2 = _interopRequireDefault(_CODE128C);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.CODE128 = _CODE128_AUTO2.default;
	exports.CODE128A = _CODE128A2.default;
	exports.CODE128B = _CODE128B2.default;
	exports.CODE128C = _CODE128C2.default;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(90);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128AUTO = function (_CODE) {
		_inherits(CODE128AUTO, _CODE);

		function CODE128AUTO(data, options) {
			_classCallCheck(this, CODE128AUTO);

			// ASCII value ranges 0-127, 200-211
			if (data.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1) {
				var _this = _possibleConstructorReturn(this, _CODE.call(this, autoSelectModes(data), options));
			} else {
				var _this = _possibleConstructorReturn(this, _CODE.call(this, data, options));
			}
			return _possibleConstructorReturn(_this);
		}

		return CODE128AUTO;
	}(_CODE3.default);

	function autoSelectModes(string) {
		// ASCII ranges 0-98 and 200-207 (FUNCs and SHIFTs)
		var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
		// ASCII ranges 32-127 and 200-207 (FUNCs and SHIFTs)
		var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
		// Number pairs or [FNC1]
		var cLength = string.match(/^(\xCF*[0-9]{2}\xCF*)*/)[0].length;

		var newString;
		// Select CODE128C if the string start with enough digits
		if (cLength >= 2) {
			newString = String.fromCharCode(210) + autoSelectFromC(string);
		}
		// Select A/C depending on the longest match
		else if (aLength > bLength) {
				newString = String.fromCharCode(208) + autoSelectFromA(string);
			} else {
				newString = String.fromCharCode(209) + autoSelectFromB(string);
			}

		newString = newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function (match, char) {
			return String.fromCharCode(203) + char;
		});

		return newString;
	}

	function autoSelectFromA(string) {
		var untilC = string.match(/^([\x00-\x5F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

		if (untilC) {
			return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
		}

		var aChars = string.match(/^[\x00-\x5F\xC8-\xCF]+/);
		if (aChars[0].length === string.length) {
			return string;
		}

		return aChars[0] + String.fromCharCode(205) + autoSelectFromB(string.substring(aChars[0].length));
	}

	function autoSelectFromB(string) {
		var untilC = string.match(/^([\x20-\x7F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

		if (untilC) {
			return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
		}

		var bChars = string.match(/^[\x20-\x7F\xC8-\xCF]+/);
		if (bChars[0].length === string.length) {
			return string;
		}

		return bChars[0] + String.fromCharCode(206) + autoSelectFromA(string.substring(bChars[0].length));
	}

	function autoSelectFromC(string) {
		var cMatch = string.match(/^(\xCF*[0-9]{2}\xCF*)+/)[0];
		var length = cMatch.length;

		if (length === string.length) {
			return string;
		}

		string = string.substring(length);

		// Select A/B depending on the longest match
		var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
		var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
		if (aLength >= bLength) {
			return cMatch + String.fromCharCode(206) + autoSelectFromA(string);
		} else {
			return cMatch + String.fromCharCode(205) + autoSelectFromB(string);
		}
	}

	exports.default = CODE128AUTO;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // This is the master class, it does require the start code to be
	// included in the string

	var CODE128 = function (_Barcode) {
		_inherits(CODE128, _Barcode);

		function CODE128(data, options) {
			_classCallCheck(this, CODE128);

			// Fill the bytes variable with the ascii codes of string
			var _this = _possibleConstructorReturn(this, _Barcode.call(this, data.substring(1), options));

			_this.bytes = [];
			for (var i = 0; i < data.length; ++i) {
				_this.bytes.push(data.charCodeAt(i));
			}

			// Data for each character, the last characters will not be encoded but are used for error correction
			// Numbers encode to (n + 1000) -> binary; 740 -> (740 + 1000).toString(2) -> "11011001100"
			_this.encodings = [// + 1000
			740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604, 572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764, 652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590, 304, 112, 94, 416, 128, 122, 672, 576, 570, 464, 422, 134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880, 862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200, 158, 68, 62, 424, 412, 232, 218, 76, 74, 554, 616, 978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940, 938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954, 502, 518, 886, 966, /* Start codes */668, 680, 692, 5379];
			return _this;
		}

		// The public encoding function


		CODE128.prototype.encode = function encode() {
			var encodingResult;
			var bytes = this.bytes;
			// Remove the startcode from the bytes and set its index
			var startIndex = bytes.shift() - 105;

			// Start encode with the right type
			if (startIndex === 103) {
				encodingResult = this.nextA(bytes, 1);
			} else if (startIndex === 104) {
				encodingResult = this.nextB(bytes, 1);
			} else if (startIndex === 105) {
				encodingResult = this.nextC(bytes, 1);
			} else {
				throw new InvalidStartCharacterException();
			}

			return {
				text: this.text == this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
				data:
				// Add the start bits
				this.getEncoding(startIndex) +
				// Add the encoded bits
				encodingResult.result +
				// Add the checksum
				this.getEncoding((encodingResult.checksum + startIndex) % 103) +
				// Add the end bits
				this.getEncoding(106)
			};
		};

		CODE128.prototype.getEncoding = function getEncoding(n) {
			return this.encodings[n] ? (this.encodings[n] + 1000).toString(2) : '';
		};

		// Use the regexp variable for validation


		CODE128.prototype.valid = function valid() {
			// ASCII value ranges 0-127, 200-211
			return this.data.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1;
		};

		CODE128.prototype.nextA = function nextA(bytes, depth) {
			if (bytes.length <= 0) {
				return { "result": "", "checksum": 0 };
			}

			var next, index;

			// Special characters
			if (bytes[0] >= 200) {
				index = bytes[0] - 105;

				// Remove first element
				bytes.shift();

				// Swap to CODE128C
				if (index === 99) {
					next = this.nextC(bytes, depth + 1);
				}
				// Swap to CODE128B
				else if (index === 100) {
						next = this.nextB(bytes, depth + 1);
					}
					// Shift
					else if (index === 98) {
							// Convert the next character so that is encoded correctly
							bytes[0] = bytes[0] > 95 ? bytes[0] - 96 : bytes[0];
							next = this.nextA(bytes, depth + 1);
						}
						// Continue on CODE128A but encode a special character
						else {
								next = this.nextA(bytes, depth + 1);
							}
			}
			// Continue encoding of CODE128A
			else {
					var charCode = bytes[0];
					index = charCode < 32 ? charCode + 64 : charCode - 32;

					// Remove first element
					bytes.shift();

					next = this.nextA(bytes, depth + 1);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = this.getEncoding(index);
			var weight = index * depth;

			return {
				"result": enc + next.result,
				"checksum": weight + next.checksum
			};
		};

		CODE128.prototype.nextB = function nextB(bytes, depth) {
			if (bytes.length <= 0) {
				return { "result": "", "checksum": 0 };
			}

			var next, index;

			// Special characters
			if (bytes[0] >= 200) {
				index = bytes[0] - 105;

				// Remove first element
				bytes.shift();

				// Swap to CODE128C
				if (index === 99) {
					next = this.nextC(bytes, depth + 1);
				}
				// Swap to CODE128A
				else if (index === 101) {
						next = this.nextA(bytes, depth + 1);
					}
					// Shift
					else if (index === 98) {
							// Convert the next character so that is encoded correctly
							bytes[0] = bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
							next = this.nextB(bytes, depth + 1);
						}
						// Continue on CODE128B but encode a special character
						else {
								next = this.nextB(bytes, depth + 1);
							}
			}
			// Continue encoding of CODE128B
			else {
					index = bytes[0] - 32;
					bytes.shift();
					next = this.nextB(bytes, depth + 1);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = this.getEncoding(index);
			var weight = index * depth;

			return { "result": enc + next.result, "checksum": weight + next.checksum };
		};

		CODE128.prototype.nextC = function nextC(bytes, depth) {
			if (bytes.length <= 0) {
				return { "result": "", "checksum": 0 };
			}

			var next, index;

			// Special characters
			if (bytes[0] >= 200) {
				index = bytes[0] - 105;

				// Remove first element
				bytes.shift();

				// Swap to CODE128B
				if (index === 100) {
					next = this.nextB(bytes, depth + 1);
				}
				// Swap to CODE128A
				else if (index === 101) {
						next = this.nextA(bytes, depth + 1);
					}
					// Continue on CODE128C but encode a special character
					else {
							next = this.nextC(bytes, depth + 1);
						}
			}
			// Continue encoding of CODE128C
			else {
					index = (bytes[0] - 48) * 10 + bytes[1] - 48;
					bytes.shift();
					bytes.shift();
					next = this.nextC(bytes, depth + 1);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = this.getEncoding(index);
			var weight = index * depth;

			return { "result": enc + next.result, "checksum": weight + next.checksum };
		};

		return CODE128;
	}(_Barcode3.default);

	var InvalidStartCharacterException = function (_Error) {
		_inherits(InvalidStartCharacterException, _Error);

		function InvalidStartCharacterException() {
			_classCallCheck(this, InvalidStartCharacterException);

			var _this2 = _possibleConstructorReturn(this, _Error.call(this));

			_this2.name = "InvalidStartCharacterException";
			_this2.message = "The encoding does not start with a start character.";
			return _this2;
		}

		return InvalidStartCharacterException;
	}(Error);

	exports.default = CODE128;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(90);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128A = function (_CODE) {
		_inherits(CODE128A, _CODE);

		function CODE128A(string, options) {
			_classCallCheck(this, CODE128A);

			return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(208) + string, options));
		}

		CODE128A.prototype.valid = function valid() {
			return this.data.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
		};

		return CODE128A;
	}(_CODE3.default);

	exports.default = CODE128A;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(90);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128B = function (_CODE) {
		_inherits(CODE128B, _CODE);

		function CODE128B(string, options) {
			_classCallCheck(this, CODE128B);

			return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(209) + string, options));
		}

		CODE128B.prototype.valid = function valid() {
			return this.data.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1;
		};

		return CODE128B;
	}(_CODE3.default);

	exports.default = CODE128B;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(90);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128C = function (_CODE) {
		_inherits(CODE128C, _CODE);

		function CODE128C(string, options) {
			_classCallCheck(this, CODE128C);

			return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(210) + string, options));
		}

		CODE128C.prototype.valid = function valid() {
			return this.data.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1;
		};

		return CODE128C;
	}(_CODE3.default);

	exports.default = CODE128C;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;

	var _EAN = __webpack_require__(95);

	var _EAN2 = _interopRequireDefault(_EAN);

	var _EAN3 = __webpack_require__(97);

	var _EAN4 = _interopRequireDefault(_EAN3);

	var _EAN5 = __webpack_require__(98);

	var _EAN6 = _interopRequireDefault(_EAN5);

	var _EAN7 = __webpack_require__(99);

	var _EAN8 = _interopRequireDefault(_EAN7);

	var _UPC = __webpack_require__(100);

	var _UPC2 = _interopRequireDefault(_UPC);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.EAN13 = _EAN2.default;
	exports.EAN8 = _EAN4.default;
	exports.EAN5 = _EAN6.default;
	exports.EAN2 = _EAN8.default;
	exports.UPC = _UPC2.default;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(96);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

	var EAN13 = function (_Barcode) {
		_inherits(EAN13, _Barcode);

		function EAN13(data, options) {
			_classCallCheck(this, EAN13);

			// Add checksum if it does not exist
			if (data.search(/^[0-9]{12}$/) !== -1) {
				data += checksum(data);
			}

			// Make sure the font is not bigger than the space between the guard bars
			var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

			if (!options.flat && options.fontSize > options.width * 10) {
				_this.fontSize = options.width * 10;
			} else {
				_this.fontSize = options.fontSize;
			}

			// Make the guard bars go down half the way of the text
			_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;

			// Adds a last character to the end of the barcode
			_this.lastChar = options.lastChar;
			return _this;
		}

		EAN13.prototype.valid = function valid() {
			return this.data.search(/^[0-9]{13}$/) !== -1 && this.data[12] == checksum(this.data);
		};

		EAN13.prototype.encode = function encode() {
			if (this.options.flat) {
				return this.flatEncoding();
			} else {
				return this.guardedEncoding();
			}
		};

		// Define the EAN-13 structure


		EAN13.prototype.getStructure = function getStructure() {
			return ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
		};

		// The "standard" way of printing EAN13 barcodes with guard bars


		EAN13.prototype.guardedEncoding = function guardedEncoding() {
			var encoder = new _ean_encoder2.default();
			var result = [];

			var structure = this.getStructure()[this.data[0]];

			// Get the string to be encoded on the left side of the EAN code
			var leftSide = this.data.substr(1, 6);

			// Get the string to be encoded on the right side of the EAN code
			var rightSide = this.data.substr(7, 6);

			// Add the first digigt
			if (this.options.displayValue) {
				result.push({
					data: "000000000000",
					text: this.text.substr(0, 1),
					options: { textAlign: "left", fontSize: this.fontSize }
				});
			}

			// Add the guard bars
			result.push({
				data: "101",
				options: { height: this.guardHeight }
			});

			// Add the left side
			result.push({
				data: encoder.encode(leftSide, structure),
				text: this.text.substr(1, 6),
				options: { fontSize: this.fontSize }
			});

			// Add the middle bits
			result.push({
				data: "01010",
				options: { height: this.guardHeight }
			});

			// Add the right side
			result.push({
				data: encoder.encode(rightSide, "RRRRRR"),
				text: this.text.substr(7, 6),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: "101",
				options: { height: this.guardHeight }
			});

			if (this.options.lastChar && this.options.displayValue) {
				result.push({ data: "00" });

				result.push({
					data: "00000",
					text: this.options.lastChar,
					options: { fontSize: this.fontSize }
				});
			}
			return result;
		};

		EAN13.prototype.flatEncoding = function flatEncoding() {
			var encoder = new _ean_encoder2.default();
			var result = "";

			var structure = this.getStructure()[this.data[0]];

			result += "101";
			result += encoder.encode(this.data.substr(1, 6), structure);
			result += "01010";
			result += encoder.encode(this.data.substr(7, 6), "RRRRRR");
			result += "101";

			return {
				data: result,
				text: this.text
			};
		};

		return EAN13;
	}(_Barcode3.default);

	// Calulate the checksum digit
	// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


	function checksum(number) {
		var result = 0;

		var i;
		for (i = 0; i < 12; i += 2) {
			result += parseInt(number[i]);
		}
		for (i = 1; i < 12; i += 2) {
			result += parseInt(number[i]) * 3;
		}

		return (10 - result % 10) % 10;
	}

	exports.default = EAN13;

/***/ },
/* 96 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EANencoder = function () {
		function EANencoder() {
			_classCallCheck(this, EANencoder);

			// Standard start end and middle bits
			this.startBin = "101";
			this.endBin = "101";
			this.middleBin = "01010";

			// The L (left) type of encoding
			this.Lbinary = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];

			// The G type of encoding
			this.Gbinary = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];

			// The R (right) type of encoding
			this.Rbinary = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
		}

		// Convert a numberarray to the representing


		EANencoder.prototype.encode = function encode(number, structure, separator) {
			// Create the variable that should be returned at the end of the function
			var result = "";

			// Make sure that the separator is set
			separator = separator || "";

			// Loop all the numbers
			for (var i = 0; i < number.length; i++) {
				// Using the L, G or R encoding and add it to the returning variable
				if (structure[i] == "L") {
					result += this.Lbinary[number[i]];
				} else if (structure[i] == "G") {
					result += this.Gbinary[number[i]];
				} else if (structure[i] == "R") {
					result += this.Rbinary[number[i]];
				}

				// Add separator in between encodings
				if (i < number.length - 1) {
					result += separator;
				}
			}
			return result;
		};

		return EANencoder;
	}();

	exports.default = EANencoder;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(96);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// http://www.barcodeisland.com/ean8.phtml

	var EAN8 = function (_Barcode) {
		_inherits(EAN8, _Barcode);

		function EAN8(data, options) {
			_classCallCheck(this, EAN8);

			// Add checksum if it does not exist
			if (data.search(/^[0-9]{7}$/) !== -1) {
				data += checksum(data);
			}

			return _possibleConstructorReturn(this, _Barcode.call(this, data, options));
		}

		EAN8.prototype.valid = function valid() {
			return this.data.search(/^[0-9]{8}$/) !== -1 && this.data[7] == checksum(this.data);
		};

		EAN8.prototype.encode = function encode() {
			var encoder = new _ean_encoder2.default();

			// Create the return variable
			var result = "";

			// Get the number to be encoded on the left side of the EAN code
			var leftSide = this.data.substr(0, 4);

			// Get the number to be encoded on the right side of the EAN code
			var rightSide = this.data.substr(4, 4);

			// Add the start bits
			result += encoder.startBin;

			// Add the left side
			result += encoder.encode(leftSide, "LLLL");

			// Add the middle bits
			result += encoder.middleBin;

			// Add the right side
			result += encoder.encode(rightSide, "RRRR");

			// Add the end bits
			result += encoder.endBin;

			return {
				data: result,
				text: this.text
			};
		};

		return EAN8;
	}(_Barcode3.default);

	// Calulate the checksum digit


	function checksum(number) {
		var result = 0;

		var i;
		for (i = 0; i < 7; i += 2) {
			result += parseInt(number[i]) * 3;
		}

		for (i = 1; i < 7; i += 2) {
			result += parseInt(number[i]);
		}

		return (10 - result % 10) % 10;
	}

	exports.default = EAN8;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(96);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// https://en.wikipedia.org/wiki/EAN_5#Encoding

	var EAN5 = function (_Barcode) {
		_inherits(EAN5, _Barcode);

		function EAN5(data, options) {
			_classCallCheck(this, EAN5);

			// Define the EAN-13 structure
			var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

			_this.structure = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
			return _this;
		}

		EAN5.prototype.valid = function valid() {
			return this.data.search(/^[0-9]{5}$/) !== -1;
		};

		EAN5.prototype.encode = function encode() {
			var encoder = new _ean_encoder2.default();
			var checksum = this.checksum();

			// Start bits
			var result = "1011";

			// Use normal ean encoding with 01 in between all digits
			result += encoder.encode(this.data, this.structure[checksum], "01");

			return {
				data: result,
				text: this.text
			};
		};

		EAN5.prototype.checksum = function checksum() {
			var result = 0;

			result += parseInt(this.data[0]) * 3;
			result += parseInt(this.data[1]) * 9;
			result += parseInt(this.data[2]) * 3;
			result += parseInt(this.data[3]) * 9;
			result += parseInt(this.data[4]) * 3;

			return result % 10;
		};

		return EAN5;
	}(_Barcode3.default);

	exports.default = EAN5;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(96);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// https://en.wikipedia.org/wiki/EAN_2#Encoding

	var EAN2 = function (_Barcode) {
		_inherits(EAN2, _Barcode);

		function EAN2(data, options) {
			_classCallCheck(this, EAN2);

			var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

			_this.structure = ["LL", "LG", "GL", "GG"];
			return _this;
		}

		EAN2.prototype.valid = function valid() {
			return this.data.search(/^[0-9]{2}$/) !== -1;
		};

		EAN2.prototype.encode = function encode() {
			var encoder = new _ean_encoder2.default();

			// Choose the structure based on the number mod 4
			var structure = this.structure[parseInt(this.data) % 4];

			// Start bits
			var result = "1011";

			// Encode the two digits with 01 in between
			result += encoder.encode(this.data, structure, "01");

			return {
				data: result,
				text: this.text
			};
		};

		return EAN2;
	}(_Barcode3.default);

	exports.default = EAN2;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(96);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

	var UPC = function (_Barcode) {
		_inherits(UPC, _Barcode);

		function UPC(data, options) {
			_classCallCheck(this, UPC);

			// Add checksum if it does not exist
			if (data.search(/^[0-9]{11}$/) !== -1) {
				data += checksum(data);
			}

			var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

			_this.displayValue = options.displayValue;

			// Make sure the font is not bigger than the space between the guard bars
			if (options.fontSize > options.width * 10) {
				_this.fontSize = options.width * 10;
			} else {
				_this.fontSize = options.fontSize;
			}

			// Make the guard bars go down half the way of the text
			_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
			return _this;
		}

		UPC.prototype.valid = function valid() {
			return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum(this.data);
		};

		UPC.prototype.encode = function encode() {
			if (this.options.flat) {
				return this.flatEncoding();
			} else {
				return this.guardedEncoding();
			}
		};

		UPC.prototype.flatEncoding = function flatEncoding() {
			var encoder = new _ean_encoder2.default();
			var result = "";

			result += "101";
			result += encoder.encode(this.data.substr(0, 6), "LLLLLL");
			result += "01010";
			result += encoder.encode(this.data.substr(6, 6), "RRRRRR");
			result += "101";

			return {
				data: result,
				text: this.text
			};
		};

		UPC.prototype.guardedEncoding = function guardedEncoding() {
			var encoder = new _ean_encoder2.default();
			var result = [];

			// Add the first digigt
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text.substr(0, 1),
					options: { textAlign: "left", fontSize: this.fontSize }
				});
			}

			// Add the guard bars
			result.push({
				data: "101" + encoder.encode(this.data[0], "L"),
				options: { height: this.guardHeight }
			});

			// Add the left side
			result.push({
				data: encoder.encode(this.data.substr(1, 5), "LLLLL"),
				text: this.text.substr(1, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the middle bits
			result.push({
				data: "01010",
				options: { height: this.guardHeight }
			});

			// Add the right side
			result.push({
				data: encoder.encode(this.data.substr(6, 5), "RRRRR"),
				text: this.text.substr(6, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: encoder.encode(this.data[11], "R") + "101",
				options: { height: this.guardHeight }
			});

			// Add the last digit
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text.substr(11, 1),
					options: { textAlign: "right", fontSize: this.fontSize }
				});
			}

			return result;
		};

		return UPC;
	}(_Barcode3.default);

	// Calulate the checksum digit
	// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


	function checksum(number) {
		var result = 0;

		var i;
		for (i = 1; i < 11; i += 2) {
			result += parseInt(number[i]);
		}
		for (i = 0; i < 11; i += 2) {
			result += parseInt(number[i]) * 3;
		}

		return (10 - result % 10) % 10;
	}

	exports.default = UPC;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ITF14 = undefined;

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ITF14 = function (_Barcode) {
		_inherits(ITF14, _Barcode);

		function ITF14(data, options) {
			_classCallCheck(this, ITF14);

			// Add checksum if it does not exist
			if (data.search(/^[0-9]{13}$/) !== -1) {
				data += checksum(data);
			}

			var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

			_this.binaryRepresentation = {
				"0": "00110",
				"1": "10001",
				"2": "01001",
				"3": "11000",
				"4": "00101",
				"5": "10100",
				"6": "01100",
				"7": "00011",
				"8": "10010",
				"9": "01010"
			};
			return _this;
		}

		ITF14.prototype.valid = function valid() {
			return this.data.search(/^[0-9]{14}$/) !== -1 && this.data[13] == checksum(this.data);
		};

		ITF14.prototype.encode = function encode() {
			var result = "1010";

			// Calculate all the digit pairs
			for (var i = 0; i < 14; i += 2) {
				result += this.calculatePair(this.data.substr(i, 2));
			}

			// Always add the same end bits
			result += "11101";

			return {
				data: result,
				text: this.text
			};
		};

		// Calculate the data of a number pair


		ITF14.prototype.calculatePair = function calculatePair(numberPair) {
			var result = "";

			var number1Struct = this.binaryRepresentation[numberPair[0]];
			var number2Struct = this.binaryRepresentation[numberPair[1]];

			// Take every second bit and add to the result
			for (var i = 0; i < 5; i++) {
				result += number1Struct[i] == "1" ? "111" : "1";
				result += number2Struct[i] == "1" ? "000" : "0";
			}

			return result;
		};

		return ITF14;
	}(_Barcode3.default);

	// Calulate the checksum digit


	function checksum(data) {
		var result = 0;

		for (var i = 0; i < 13; i++) {
			result += parseInt(data[i]) * (3 - i % 2 * 2);
		}

		return Math.ceil(result / 10) * 10 - result;
	}

	exports.ITF14 = ITF14;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ITF = undefined;

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ITF = function (_Barcode) {
		_inherits(ITF, _Barcode);

		function ITF(data, options) {
			_classCallCheck(this, ITF);

			var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

			_this.binaryRepresentation = {
				"0": "00110",
				"1": "10001",
				"2": "01001",
				"3": "11000",
				"4": "00101",
				"5": "10100",
				"6": "01100",
				"7": "00011",
				"8": "10010",
				"9": "01010"
			};
			return _this;
		}

		ITF.prototype.valid = function valid() {
			return this.data.search(/^([0-9]{2})+$/) !== -1;
		};

		ITF.prototype.encode = function encode() {
			// Always add the same start bits
			var result = "1010";

			// Calculate all the digit pairs
			for (var i = 0; i < this.data.length; i += 2) {
				result += this.calculatePair(this.data.substr(i, 2));
			}

			// Always add the same end bits
			result += "11101";

			return {
				data: result,
				text: this.text
			};
		};

		// Calculate the data of a number pair


		ITF.prototype.calculatePair = function calculatePair(numberPair) {
			var result = "";

			var number1Struct = this.binaryRepresentation[numberPair[0]];
			var number2Struct = this.binaryRepresentation[numberPair[1]];

			// Take every second bit and add to the result
			for (var i = 0; i < 5; i++) {
				result += number1Struct[i] == "1" ? "111" : "1";
				result += number2Struct[i] == "1" ? "000" : "0";
			}

			return result;
		};

		return ITF;
	}(_Barcode3.default);

	exports.ITF = ITF;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI10 = exports.MSI = undefined;

	var _MSI = __webpack_require__(104);

	var _MSI2 = _interopRequireDefault(_MSI);

	var _MSI3 = __webpack_require__(105);

	var _MSI4 = _interopRequireDefault(_MSI3);

	var _MSI5 = __webpack_require__(107);

	var _MSI6 = _interopRequireDefault(_MSI5);

	var _MSI7 = __webpack_require__(108);

	var _MSI8 = _interopRequireDefault(_MSI7);

	var _MSI9 = __webpack_require__(109);

	var _MSI10 = _interopRequireDefault(_MSI9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.MSI = _MSI2.default;
	exports.MSI10 = _MSI4.default;
	exports.MSI11 = _MSI6.default;
	exports.MSI1010 = _MSI8.default;
	exports.MSI1110 = _MSI10.default;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
	// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

	var MSI = function (_Barcode) {
		_inherits(MSI, _Barcode);

		function MSI(data, options) {
			_classCallCheck(this, MSI);

			return _possibleConstructorReturn(this, _Barcode.call(this, data, options));
		}

		MSI.prototype.encode = function encode() {
			// Start bits
			var ret = "110";

			for (var i = 0; i < this.data.length; i++) {
				// Convert the character to binary (always 4 binary digits)
				var digit = parseInt(this.data[i]);
				var bin = digit.toString(2);
				bin = addZeroes(bin, 4 - bin.length);

				// Add 100 for every zero and 110 for every 1
				for (var b = 0; b < bin.length; b++) {
					ret += bin[b] == "0" ? "100" : "110";
				}
			}

			// End bits
			ret += "1001";

			return {
				data: ret,
				text: this.text
			};
		};

		MSI.prototype.valid = function valid() {
			return this.data.search(/^[0-9]+$/) !== -1;
		};

		return MSI;
	}(_Barcode3.default);

	function addZeroes(number, n) {
		for (var i = 0; i < n; i++) {
			number = "0" + number;
		}
		return number;
	}

	exports.default = MSI;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(104);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(106);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI10 = function (_MSI) {
		_inherits(MSI10, _MSI);

		function MSI10(data, options) {
			_classCallCheck(this, MSI10);

			return _possibleConstructorReturn(this, _MSI.call(this, data + (0, _checksums.mod10)(data), options));
		}

		return MSI10;
	}(_MSI3.default);

	exports.default = MSI10;

/***/ },
/* 106 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.mod10 = mod10;
	exports.mod11 = mod11;
	function mod10(number) {
		var sum = 0;
		for (var i = 0; i < number.length; i++) {
			var n = parseInt(number[i]);
			if ((i + number.length) % 2 === 0) {
				sum += n;
			} else {
				sum += n * 2 % 10 + Math.floor(n * 2 / 10);
			}
		}
		return (10 - sum % 10) % 10;
	}

	function mod11(number) {
		var sum = 0;
		var weights = [2, 3, 4, 5, 6, 7];
		for (var i = 0; i < number.length; i++) {
			var n = parseInt(number[number.length - 1 - i]);
			sum += weights[i % weights.length] * n;
		}
		return (11 - sum % 11) % 11;
	}

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(104);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(106);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI11 = function (_MSI) {
		_inherits(MSI11, _MSI);

		function MSI11(data, options) {
			_classCallCheck(this, MSI11);

			return _possibleConstructorReturn(this, _MSI.call(this, data + (0, _checksums.mod11)(data), options));
		}

		return MSI11;
	}(_MSI3.default);

	exports.default = MSI11;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(104);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(106);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI1010 = function (_MSI) {
		_inherits(MSI1010, _MSI);

		function MSI1010(data, options) {
			_classCallCheck(this, MSI1010);

			data += (0, _checksums.mod10)(data);
			data += (0, _checksums.mod10)(data);
			return _possibleConstructorReturn(this, _MSI.call(this, data, options));
		}

		return MSI1010;
	}(_MSI3.default);

	exports.default = MSI1010;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(104);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(106);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI1110 = function (_MSI) {
		_inherits(MSI1110, _MSI);

		function MSI1110(data, options) {
			_classCallCheck(this, MSI1110);

			data += (0, _checksums.mod11)(data);
			data += (0, _checksums.mod10)(data);
			return _possibleConstructorReturn(this, _MSI.call(this, data, options));
		}

		return MSI1110;
	}(_MSI3.default);

	exports.default = MSI1110;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.pharmacode = undefined;

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
	// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

	var pharmacode = function (_Barcode) {
		_inherits(pharmacode, _Barcode);

		function pharmacode(data, options) {
			_classCallCheck(this, pharmacode);

			var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

			_this.number = parseInt(data, 10);
			return _this;
		}

		pharmacode.prototype.encode = function encode() {
			var z = this.number;
			var result = "";

			// http://i.imgur.com/RMm4UDJ.png
			// (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
			while (!isNaN(z) && z != 0) {
				if (z % 2 === 0) {
					// Even
					result = "11100" + result;
					z = (z - 2) / 2;
				} else {
					// Odd
					result = "100" + result;
					z = (z - 1) / 2;
				}
			}

			// Remove the two last zeroes
			result = result.slice(0, -2);

			return {
				data: result,
				text: this.text
			};
		};

		pharmacode.prototype.valid = function valid() {
			return this.number >= 3 && this.number <= 131070;
		};

		return pharmacode;
	}(_Barcode3.default);

	exports.pharmacode = pharmacode;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.codabar = undefined;

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding specification:
	// http://www.barcodeisland.com/codabar.phtml

	var codabar = function (_Barcode) {
		_inherits(codabar, _Barcode);

		function codabar(data, options) {
			_classCallCheck(this, codabar);

			if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
				data = "A" + data + "A";
			}

			var _this = _possibleConstructorReturn(this, _Barcode.call(this, data.toUpperCase(), options));

			_this.text = _this.options.text || _this.text.replace(/[A-D]/g, '');
			return _this;
		}

		codabar.prototype.valid = function valid() {
			return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
		};

		codabar.prototype.encode = function encode() {
			var result = [];
			var encodings = this.getEncodings();
			for (var i = 0; i < this.data.length; i++) {
				result.push(encodings[this.data.charAt(i)]);
				// for all characters except the last, append a narrow-space ("0")
				if (i !== this.data.length - 1) {
					result.push("0");
				}
			}
			return {
				text: this.text,
				data: result.join('')
			};
		};

		codabar.prototype.getEncodings = function getEncodings() {
			return {
				"0": "101010011",
				"1": "101011001",
				"2": "101001011",
				"3": "110010101",
				"4": "101101001",
				"5": "110101001",
				"6": "100101011",
				"7": "100101101",
				"8": "100110101",
				"9": "110100101",
				"-": "101001101",
				"$": "101100101",
				":": "1101011011",
				"/": "1101101011",
				".": "1101101101",
				"+": "101100110011",
				"A": "1011001001",
				"B": "1010010011",
				"C": "1001001011",
				"D": "1010011001"
			};
		};

		return codabar;
	}(_Barcode3.default);

	exports.codabar = codabar;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.GenericBarcode = undefined;

	var _Barcode2 = __webpack_require__(87);

	var _Barcode3 = _interopRequireDefault(_Barcode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GenericBarcode = function (_Barcode) {
		_inherits(GenericBarcode, _Barcode);

		function GenericBarcode(data, options) {
			_classCallCheck(this, GenericBarcode);

			return _possibleConstructorReturn(this, _Barcode.call(this, data, options)); // Sets this.data and this.text
		}

		// Return the corresponding binary numbers for the data provided


		GenericBarcode.prototype.encode = function encode() {
			return {
				data: "10101010101010101010101010101010101010101",
				text: this.text
			};
		};

		// Resturn true/false if the string provided is valid for this encoder


		GenericBarcode.prototype.valid = function valid() {
			return true;
		};

		return GenericBarcode;
	}(_Barcode3.default);

	exports.GenericBarcode = GenericBarcode;

/***/ },
/* 113 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = merge;


	function merge(old, replaceObj) {
		var newMerge = {};
		var k;
		for (k in old) {
			if (old.hasOwnProperty(k)) {
				newMerge[k] = old[k];
			}
		}
		for (k in replaceObj) {
			if (replaceObj.hasOwnProperty(k) && typeof replaceObj[k] !== "undefined") {
				newMerge[k] = replaceObj[k];
			}
		}
		return newMerge;
	}

/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = linearizeEncodings;

	// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
	// Convert to [1-1, 1-2, 2, 3-1, 3-2]

	function linearizeEncodings(encodings) {
		var linearEncodings = [];
		function nextLevel(encoded) {
			if (Array.isArray(encoded)) {
				for (var i = 0; i < encoded.length; i++) {
					nextLevel(encoded[i]);
				}
			} else {
				encoded.text = encoded.text || "";
				encoded.data = encoded.data || "";
				linearEncodings.push(encoded);
			}
		}
		nextLevel(encodings);

		return linearEncodings;
	}

/***/ },
/* 115 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = fixOptions;


	function fixOptions(options) {
		// Fix the margins
		options.marginTop = options.marginTop || options.margin;
		options.marginBottom = options.marginBottom || options.margin;
		options.marginRight = options.marginRight || options.margin;
		options.marginLeft = options.marginLeft || options.margin;

		return options;
	}

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* global HTMLImageElement */
	/* global HTMLCanvasElement */
	/* global SVGElement */

	var _getOptionsFromElement = __webpack_require__(117);

	var _getOptionsFromElement2 = _interopRequireDefault(_getOptionsFromElement);

	var _renderers = __webpack_require__(120);

	var _renderers2 = _interopRequireDefault(_renderers);

	var _exceptions = __webpack_require__(125);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Takes an element and returns an object with information about how
	// it should be rendered
	// This could also return an array with these objects
	// {
	//   element: The element that the renderer should draw on
	//   renderer: The name of the renderer
	//   afterRender (optional): If something has to done after the renderer
	//     completed, calls afterRender (function)
	//   options (optional): Options that can be defined in the element
	// }

	function getRenderProperties(element) {
		// If the element is a string, query select call again
		if (typeof element === "string") {
			return querySelectedRenderProperties(element);
		}
		// If element is array. Recursivly call with every object in the array
		else if (Array.isArray(element)) {
				var returnArray = [];
				for (var i = 0; i < element.length; i++) {
					returnArray.push(getRenderProperties(element[i]));
				}
				return returnArray;
			}
			// If element, render on canvas and set the uri as src
			else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
					return newCanvasRenderProperties(element);
				}
				// If SVG
				else if (typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
						return {
							element: element,
							options: (0, _getOptionsFromElement2.default)(element),
							renderer: _renderers2.default.SVGRenderer
						};
					}
					// If canvas (in browser)
					else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLCanvasElement) {
							return {
								element: element,
								options: (0, _getOptionsFromElement2.default)(element),
								renderer: _renderers2.default.CanvasRenderer
							};
						}
						// If canvas (in node)
						else if (element && element.getContext) {
								return {
									element: element,
									renderer: _renderers2.default.CanvasRenderer
								};
							} else if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === 'object' && !element.nodeName) {
								return {
									element: element,
									renderer: _renderers2.default.ObjectRenderer
								};
							} else {
								throw new _exceptions.InvalidElementException();
							}
	}

	function querySelectedRenderProperties(string) {
		var selector = document.querySelectorAll(string);
		if (selector.length === 0) {
			return undefined;
		} else {
			var returnArray = [];
			for (var i = 0; i < selector.length; i++) {
				returnArray.push(getRenderProperties(selector[i]));
			}
			return returnArray;
		}
	}

	function newCanvasRenderProperties(imgElement) {
		var canvas = document.createElement('canvas');
		return {
			element: canvas,
			options: (0, _getOptionsFromElement2.default)(imgElement),
			renderer: _renderers2.default.CanvasRenderer,
			afterRender: function afterRender() {
				imgElement.setAttribute("src", canvas.toDataURL());
			}
		};
	}

	exports.default = getRenderProperties;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _optionsFromStrings = __webpack_require__(118);

	var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);

	var _defaults = __webpack_require__(119);

	var _defaults2 = _interopRequireDefault(_defaults);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getOptionsFromElement(element) {
		var options = {};
		for (var property in _defaults2.default) {
			if (_defaults2.default.hasOwnProperty(property)) {
				// jsbarcode-*
				if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) {
					options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
				}

				// data-*
				if (element.hasAttribute("data-" + property.toLowerCase())) {
					options[property] = element.getAttribute("data-" + property.toLowerCase());
				}
			}
		}

		options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");

		// Since all atributes are string they need to be converted to integers
		options = (0, _optionsFromStrings2.default)(options);

		return options;
	}

	exports.default = getOptionsFromElement;

/***/ },
/* 118 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = optionsFromStrings;

	// Convert string to integers/booleans where it should be

	function optionsFromStrings(options) {
		var intOptions = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];

		for (var intOption in intOptions) {
			if (intOptions.hasOwnProperty(intOption)) {
				intOption = intOptions[intOption];
				if (typeof options[intOption] === "string") {
					options[intOption] = parseInt(options[intOption], 10);
				}
			}
		}

		if (typeof options["displayValue"] === "string") {
			options["displayValue"] = options["displayValue"] != "false";
		}

		return options;
	}

/***/ },
/* 119 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var defaults = {
		width: 2,
		height: 100,
		format: "auto",
		displayValue: true,
		fontOptions: "",
		font: "monospace",
		text: undefined,
		textAlign: "center",
		textPosition: "bottom",
		textMargin: 2,
		fontSize: 20,
		background: "#ffffff",
		lineColor: "#000000",
		margin: 10,
		marginTop: undefined,
		marginBottom: undefined,
		marginLeft: undefined,
		marginRight: undefined,
		valid: function valid() {}
	};

	exports.default = defaults;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _canvas = __webpack_require__(121);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _svg = __webpack_require__(123);

	var _svg2 = _interopRequireDefault(_svg);

	var _object = __webpack_require__(124);

	var _object2 = _interopRequireDefault(_object);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = { CanvasRenderer: _canvas2.default, SVGRenderer: _svg2.default, ObjectRenderer: _object2.default };

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _merge = __webpack_require__(113);

	var _merge2 = _interopRequireDefault(_merge);

	var _shared = __webpack_require__(122);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CanvasRenderer = function () {
		function CanvasRenderer(canvas, encodings, options) {
			_classCallCheck(this, CanvasRenderer);

			this.canvas = canvas;
			this.encodings = encodings;
			this.options = options;
		}

		CanvasRenderer.prototype.render = function render() {
			// Abort if the browser does not support HTML5 canvas
			if (!this.canvas.getContext) {
				throw new Error('The browser does not support canvas.');
			}

			this.prepareCanvas();
			for (var i = 0; i < this.encodings.length; i++) {
				var encodingOptions = (0, _merge2.default)(this.options, this.encodings[i].options);

				this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
				this.drawCanvasText(encodingOptions, this.encodings[i]);

				this.moveCanvasDrawing(this.encodings[i]);
			}

			this.restoreCanvas();
		};

		CanvasRenderer.prototype.prepareCanvas = function prepareCanvas() {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			ctx.save();

			(0, _shared.calculateEncodingAttributes)(this.encodings, this.options, ctx);
			var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
			var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);

			this.canvas.width = totalWidth + this.options.marginLeft + this.options.marginRight;

			this.canvas.height = maxHeight;

			// Paint the canvas
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			if (this.options.background) {
				ctx.fillStyle = this.options.background;
				ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			}

			ctx.translate(this.options.marginLeft, 0);
		};

		CanvasRenderer.prototype.drawCanvasBarcode = function drawCanvasBarcode(options, encoding) {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			var binary = encoding.data;

			// Creates the barcode out of the encoded binary
			var yFrom;
			if (options.textPosition == "top") {
				yFrom = options.marginTop + options.fontSize + options.textMargin;
			} else {
				yFrom = options.marginTop;
			}

			ctx.fillStyle = options.lineColor;

			for (var b = 0; b < binary.length; b++) {
				var x = b * options.width + encoding.barcodePadding;

				if (binary[b] === "1") {
					ctx.fillRect(x, yFrom, options.width, options.height);
				} else if (binary[b]) {
					ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
				}
			}
		};

		CanvasRenderer.prototype.drawCanvasText = function drawCanvasText(options, encoding) {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

			// Draw the text if displayValue is set
			if (options.displayValue) {
				var x, y;

				if (options.textPosition == "top") {
					y = options.marginTop + options.fontSize - options.textMargin;
				} else {
					y = options.height + options.textMargin + options.marginTop + options.fontSize;
				}

				ctx.font = font;

				// Draw the text in the correct X depending on the textAlign option
				if (options.textAlign == "left" || encoding.barcodePadding > 0) {
					x = 0;
					ctx.textAlign = 'left';
				} else if (options.textAlign == "right") {
					x = encoding.width - 1;
					ctx.textAlign = 'right';
				}
				// In all other cases, center the text
				else {
						x = encoding.width / 2;
						ctx.textAlign = 'center';
					}

				ctx.fillText(encoding.text, x, y);
			}
		};

		CanvasRenderer.prototype.moveCanvasDrawing = function moveCanvasDrawing(encoding) {
			var ctx = this.canvas.getContext("2d");

			ctx.translate(encoding.width, 0);
		};

		CanvasRenderer.prototype.restoreCanvas = function restoreCanvas() {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			ctx.restore();
		};

		return CanvasRenderer;
	}();

	exports.default = CanvasRenderer;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getTotalWidthOfEncodings = exports.calculateEncodingAttributes = exports.getBarcodePadding = exports.getEncodingHeight = exports.getMaximumHeightOfEncodings = undefined;

	var _merge = __webpack_require__(113);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getEncodingHeight(encoding, options) {
		return options.height + (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
	}

	function getBarcodePadding(textWidth, barcodeWidth, options) {
		if (options.displayValue && barcodeWidth < textWidth) {
			if (options.textAlign == "center") {
				return Math.floor((textWidth - barcodeWidth) / 2);
			} else if (options.textAlign == "left") {
				return 0;
			} else if (options.textAlign == "right") {
				return Math.floor(textWidth - barcodeWidth);
			}
		}
		return 0;
	}

	function calculateEncodingAttributes(encodings, barcodeOptions, context) {
		for (var i = 0; i < encodings.length; i++) {
			var encoding = encodings[i];
			var options = (0, _merge2.default)(barcodeOptions, encoding.options);

			// Calculate the width of the encoding
			var textWidth;
			if (options.displayValue) {
				textWidth = messureText(encoding.text, options, context);
			} else {
				textWidth = 0;
			}

			var barcodeWidth = encoding.data.length * options.width;
			encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

			encoding.height = getEncodingHeight(encoding, options);

			encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
		}
	}

	function getTotalWidthOfEncodings(encodings) {
		var totalWidth = 0;
		for (var i = 0; i < encodings.length; i++) {
			totalWidth += encodings[i].width;
		}
		return totalWidth;
	}

	function getMaximumHeightOfEncodings(encodings) {
		var maxHeight = 0;
		for (var i = 0; i < encodings.length; i++) {
			if (encodings[i].height > maxHeight) {
				maxHeight = encodings[i].height;
			}
		}
		return maxHeight;
	}

	function messureText(string, options, context) {
		var ctx;
		if (typeof context === "undefined") {
			ctx = document.createElement("canvas").getContext("2d");
		} else {
			ctx = context;
		}

		ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

		// Calculate the width of the encoding
		var size = ctx.measureText(string).width;

		return size;
	}

	exports.getMaximumHeightOfEncodings = getMaximumHeightOfEncodings;
	exports.getEncodingHeight = getEncodingHeight;
	exports.getBarcodePadding = getBarcodePadding;
	exports.calculateEncodingAttributes = calculateEncodingAttributes;
	exports.getTotalWidthOfEncodings = getTotalWidthOfEncodings;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _merge = __webpack_require__(113);

	var _merge2 = _interopRequireDefault(_merge);

	var _shared = __webpack_require__(122);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var svgns = "http://www.w3.org/2000/svg";

	var SVGRenderer = function () {
		function SVGRenderer(svg, encodings, options) {
			_classCallCheck(this, SVGRenderer);

			this.svg = svg;
			this.encodings = encodings;
			this.options = options;
		}

		SVGRenderer.prototype.render = function render() {
			var currentX = this.options.marginLeft;

			this.prepareSVG();
			for (var i = 0; i < this.encodings.length; i++) {
				var encoding = this.encodings[i];
				var encodingOptions = (0, _merge2.default)(this.options, encoding.options);

				var group = createGroup(currentX, encodingOptions.marginTop, this.svg);

				setGroupOptions(group, encodingOptions);

				this.drawSvgBarcode(group, encodingOptions, encoding);
				this.drawSVGText(group, encodingOptions, encoding);

				currentX += encoding.width;
			}
		};

		SVGRenderer.prototype.prepareSVG = function prepareSVG() {
			// Clear the SVG
			while (this.svg.firstChild) {
				this.svg.removeChild(this.svg.firstChild);
			}

			(0, _shared.calculateEncodingAttributes)(this.encodings, this.options);
			var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
			var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);

			var width = totalWidth + this.options.marginLeft + this.options.marginRight;
			this.setSvgAttributes(width, maxHeight);

			if (this.options.background) {
				drawRect(0, 0, width, maxHeight, this.svg).setAttribute("style", "fill:" + this.options.background + ";");
			}
		};

		SVGRenderer.prototype.drawSvgBarcode = function drawSvgBarcode(parent, options, encoding) {
			var binary = encoding.data;

			// Creates the barcode out of the encoded binary
			var yFrom;
			if (options.textPosition == "top") {
				yFrom = options.fontSize + options.textMargin;
			} else {
				yFrom = 0;
			}

			var barWidth = 0;
			var x = 0;
			for (var b = 0; b < binary.length; b++) {
				x = b * options.width + encoding.barcodePadding;

				if (binary[b] === "1") {
					barWidth++;
				} else if (barWidth > 0) {
					drawRect(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
					barWidth = 0;
				}
			}

			// Last draw is needed since the barcode ends with 1
			if (barWidth > 0) {
				drawRect(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
			}
		};

		SVGRenderer.prototype.drawSVGText = function drawSVGText(parent, options, encoding) {
			var textElem = document.createElementNS(svgns, 'text');

			// Draw the text if displayValue is set
			if (options.displayValue) {
				var x, y;

				textElem.setAttribute("style", "font:" + options.fontOptions + " " + options.fontSize + "px " + options.font);

				if (options.textPosition == "top") {
					y = options.fontSize - options.textMargin;
				} else {
					y = options.height + options.textMargin + options.fontSize;
				}

				// Draw the text in the correct X depending on the textAlign option
				if (options.textAlign == "left" || encoding.barcodePadding > 0) {
					x = 0;
					textElem.setAttribute("text-anchor", "start");
				} else if (options.textAlign == "right") {
					x = encoding.width - 1;
					textElem.setAttribute("text-anchor", "end");
				}
				// In all other cases, center the text
				else {
						x = encoding.width / 2;
						textElem.setAttribute("text-anchor", "middle");
					}

				textElem.setAttribute("x", x);
				textElem.setAttribute("y", y);

				textElem.appendChild(document.createTextNode(encoding.text));

				parent.appendChild(textElem);
			}
		};

		SVGRenderer.prototype.setSvgAttributes = function setSvgAttributes(width, height) {
			var svg = this.svg;
			svg.setAttribute("width", width + "px");
			svg.setAttribute("height", height + "px");
			svg.setAttribute("x", "0px");
			svg.setAttribute("y", "0px");
			svg.setAttribute("viewBox", "0 0 " + width + " " + height);

			svg.setAttribute("xmlns", svgns);
			svg.setAttribute("version", "1.1");

			svg.style.transform = "translate(0,0)";
		};

		return SVGRenderer;
	}();

	function createGroup(x, y, parent) {
		var group = document.createElementNS(svgns, 'g');

		group.setAttribute("transform", "translate(" + x + ", " + y + ")");

		parent.appendChild(group);

		return group;
	}

	function setGroupOptions(group, options) {
		group.setAttribute("style", "fill:" + options.lineColor + ";");
	}

	function drawRect(x, y, width, height, parent) {
		var rect = document.createElementNS(svgns, 'rect');

		rect.setAttribute("x", x);
		rect.setAttribute("y", y);
		rect.setAttribute("width", width);
		rect.setAttribute("height", height);

		parent.appendChild(rect);

		return rect;
	}

	exports.default = SVGRenderer;

/***/ },
/* 124 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ObjectRenderer = function () {
		function ObjectRenderer(object, encodings, options) {
			_classCallCheck(this, ObjectRenderer);

			this.object = object;
			this.encodings = encodings;
			this.options = options;
		}

		ObjectRenderer.prototype.render = function render() {
			this.object.encodings = this.encodings;
		};

		return ObjectRenderer;
	}();

	exports.default = ObjectRenderer;

/***/ },
/* 125 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InvalidInputException = function (_Error) {
		_inherits(InvalidInputException, _Error);

		function InvalidInputException(symbology, input) {
			_classCallCheck(this, InvalidInputException);

			var _this = _possibleConstructorReturn(this, _Error.call(this));

			_this.name = "InvalidInputException";

			_this.symbology = symbology;
			_this.input = input;

			_this.message = '"' + _this.input + '" is not a valid input for ' + _this.symbology;
			return _this;
		}

		return InvalidInputException;
	}(Error);

	var InvalidElementException = function (_Error2) {
		_inherits(InvalidElementException, _Error2);

		function InvalidElementException() {
			_classCallCheck(this, InvalidElementException);

			var _this2 = _possibleConstructorReturn(this, _Error2.call(this));

			_this2.name = "InvalidElementException";
			_this2.message = "Not supported type to render on";
			return _this2;
		}

		return InvalidElementException;
	}(Error);

	var NoElementException = function (_Error3) {
		_inherits(NoElementException, _Error3);

		function NoElementException() {
			_classCallCheck(this, NoElementException);

			var _this3 = _possibleConstructorReturn(this, _Error3.call(this));

			_this3.name = "NoElementException";
			_this3.message = "No element to render on.";
			return _this3;
		}

		return NoElementException;
	}(Error);

	exports.InvalidInputException = InvalidInputException;
	exports.InvalidElementException = InvalidElementException;
	exports.NoElementException = NoElementException;

/***/ },
/* 126 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*eslint no-console: 0 */

	var ErrorHandler = function () {
		function ErrorHandler(api) {
			_classCallCheck(this, ErrorHandler);

			this.api = api;
		}

		ErrorHandler.prototype.handleCatch = function handleCatch(e) {
			// If babel supported extending of Error in a correct way instanceof would be used here
			if (e.name === "InvalidInputException") {
				if (this.api._options.valid !== this.api._defaults.valid) {
					this.api._options.valid(false);
				} else {
					throw e.message;
				}
			} else {
				throw e;
			}

			this.api.render = function () {};
		};

		ErrorHandler.prototype.wrapBarcodeCall = function wrapBarcodeCall(func) {
			try {
				var result = func.apply(undefined, arguments);
				this.api._options.valid(true);
				return result;
			} catch (e) {
				this.handleCatch(e);

				return this.api;
			}
		};

		return ErrorHandler;
	}();

	exports.default = ErrorHandler;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "ticketView"
	    }
	  }, [_c('ul', [_c('li', [_c('div', {
	    staticClass: "clearfix"
	  }), _vm._v(" "), _c('div', {
	    attrs: {
	      "id": "container"
	    }
	  }, [_c('div', {
	    staticClass: "left"
	  }, [_c('div', {
	    staticClass: "top"
	  }, [_c('div', {
	    staticClass: "logo"
	  }, [_c('img', {
	    attrs: {
	      "src": _vm.imgPath + 'logo-grey.jpg'
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "title"
	  }, [_vm._v("سينما ستاره شهر")]), _vm._v(" "), _c('div', {
	    staticClass: "clearfix"
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "medium"
	  }, [_c('div', {
	    staticClass: "line"
	  }, [_c('div', {
	    staticClass: "filmname"
	  }, [_vm._v(_vm._s(_vm.title_msg) + " : " + _vm._s(_vm.value.movieName))]), _vm._v(" "), _c('div', {
	    staticClass: "filmname"
	  }, [_vm._v("شماره بلیط : " + _vm._s(_vm.value.code))]), _vm._v(" "), _c('div', {
	    staticClass: "clearfix"
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "line"
	  }, [_c('div', {
	    staticClass: "ekran"
	  }, [_vm._v(_vm._s(_vm.datetime_msg) + " : "), _c('span', [_vm._v(" " + _vm._s(_vm.value.time) + " ")])]), _vm._v(" "), _c('div', {
	    staticClass: "date"
	  }, [_vm._v("تاریخ : "), _c('span', [_vm._v(" " + _vm._s(_vm.value.date) + " ")])]), _vm._v(" "), _c('div', {
	    staticClass: "tedad"
	  }, [_vm._v("تعداد : "), _c('span', [_vm._v(" " + _vm._s(_vm.value.chairsCount) + " ")])]), _vm._v(" "), _c('div', {
	    staticClass: "price"
	  }, [_vm._v("قیمت : "), _c('span', [_vm._v(" " + _vm._s(_vm.value.totalPrice) + " ")])]), _vm._v(" "), _c('div', {
	    staticClass: "clearfix"
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "line"
	  }, [_c('div', {
	    staticClass: "chair"
	  }, [_vm._v("صندلی : ")]), _vm._v(" "), _c('div', {
	    staticClass: "number"
	  }, [_vm._v(_vm._s(_vm.value.chairsAlpha))]), _vm._v(" "), _c('div', {
	    staticClass: "clearfix"
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "social"
	  }, [_c('div', {
	    staticClass: "web"
	  }, [_vm._v("www.Sbelit.ir : خرید بلیط")]), _vm._v(" "), _c('div', {
	    staticClass: "instagram"
	  }, [_c('img', {
	    attrs: {
	      "src": _vm.imgPath + 'telegram-grey.png'
	    }
	  }), _vm._v("/cinemasetareh")]), _vm._v(" "), _c('div', {
	    staticClass: "telegram"
	  }, [_c('img', {
	    attrs: {
	      "src": _vm.imgPath + 'instagram-grey.png'
	    }
	  }), _vm._v("/cinemasetareh")]), _vm._v(" "), _c('div', {
	    staticClass: "clearfix"
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "right"
	  }, [_c('div', {
	    staticClass: "info"
	  }, [_c('img', {
	    attrs: {
	      "id": "barcodeImage"
	    }
	  }), _vm._v(" "), _c('br'), _vm._v(_vm._s(_vm.datetime_msg) + " : " + _vm._s(_vm.value.time) + "\n\t\t            "), _c('br'), _vm._v("تاریخ : " + _vm._s(_vm.value.date) + "\n\t\t            "), _c('br'), _vm._v("صندلی ها "), _c('br'), _vm._v(" "), _c('small', [_vm._v("(ردیف-صندلی)")]), _vm._v(": "), _c('br'), _vm._v(_vm._s(_vm.value.chairsNumber) + "\n\t\t        ")])])])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-b1354744", module.exports)
	  }
	}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("فیلتر\n\n                "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.type),
	      expression: "type"
	    }],
	    staticClass: "opttab",
	    attrs: {
	      "id": "opt-film",
	      "type": "radio",
	      "value": "film"
	    },
	    domProps: {
	      "checked": _vm._q(_vm.type, "film")
	    },
	    on: {
	      "click": function($event) {
	        _vm.type = "film"
	      }
	    }
	  }), _vm._v(" "), _c('label', {
	    staticClass: "lbltab",
	    attrs: {
	      "for": "opt-film"
	    }
	  }, [_vm._v("فیلم")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.type),
	      expression: "type"
	    }],
	    staticClass: "opttab",
	    attrs: {
	      "id": "opt-concert",
	      "type": "radio",
	      "value": "concert"
	    },
	    domProps: {
	      "checked": _vm._q(_vm.type, "concert")
	    },
	    on: {
	      "click": function($event) {
	        _vm.type = "concert"
	      }
	    }
	  }), _vm._v(" "), _c('label', {
	    staticClass: "lbltab",
	    attrs: {
	      "for": "opt-concert"
	    }
	  }, [_vm._v("فرهنگی")])]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "col-md-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.mid),
	      expression: "mid"
	    }],
	    staticClass: "form-control",
	    on: {
	      "change": [function($event) {
	        _vm.mid = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        })[0]
	      }, _vm.load_dates_by_movie_id]
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": "",
	      "hidden": ""
	    }
	  }, [_vm._v(_vm._s(_vm.movies_loading_msg))]), _vm._v(" "), _vm._l((_vm.$root.movies), function(m) {
	    return _c('option', {
	      domProps: {
	        "value": m.id
	      }
	    }, [_vm._v(_vm._s(m.title))])
	  })], 2)]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.date),
	      expression: "date"
	    }],
	    staticClass: "form-control",
	    on: {
	      "change": function($event) {
	        _vm.date = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        })[0]
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": "",
	      "hidden": ""
	    }
	  }, [_vm._v(_vm._s(_vm.dates_loading_msg))]), _vm._v(" "), _vm._l((_vm.get_dates), function(d) {
	    return _c('option', {
	      domProps: {
	        "value": d
	      }
	    }, [_vm._v(_vm._s(d))])
	  })], 2)]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.urid),
	      expression: "urid"
	    }],
	    staticClass: "form-control",
	    on: {
	      "change": function($event) {
	        _vm.urid = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        })[0]
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": "",
	      "hidden": ""
	    }
	  }, [_vm._v("سانس")]), _vm._v(" "), _vm._l((_vm.get_times), function(t) {
	    return _c('option', {
	      domProps: {
	        "value": t.uniqe_id
	      }
	    }, [_vm._v(_vm._s(t.time))])
	  })], 2)]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-3"
	  }, [_c('button', {
	    staticClass: "btn btn-primary form-control",
	    attrs: {
	      "disabled": _vm.allowSearch
	    },
	    on: {
	      "click": _vm.searchFactors
	    }
	  }, [_vm._v("دریافت اطلاعات")])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel",
	    attrs: {
	      "id": "list"
	    }
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("لیست خریدها")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: " input-group",
	    staticStyle: {
	      "margin-bottom": "15px"
	    }
	  }, [_vm._m(0), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.searchText),
	      expression: "searchText"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": "جستجو"
	    },
	    domProps: {
	      "value": _vm._s(_vm.searchText)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.searchText = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_vm._m(1), _vm._v(" "), _c('tbody', _vm._l((_vm.searchResult), function(p, i) {
	    return _c('tr', [_c('td', [_c('a', {
	      attrs: {
	        "href": "#"
	      }
	    }, [_vm._v(_vm._s(p.code))])]), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(p.user.fullName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(p.user.phone))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(p.chairs))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(p.date) + " - " + _vm._s(p.time))]), _vm._v(" "), _c('td', [_c('button', {
	      staticClass: "btn btn-default",
	      on: {
	        "click": function($event) {
	          _vm.printTicket(i, $event)
	        }
	      }
	    }, [_vm._v("چاپ")]), _vm._v(" "), _c('button', {
	      staticClass: "btn btn-danger",
	      on: {
	        "click": function($event) {
	          _vm.cancelTicket(i, $event)
	        }
	      }
	    }, [_vm._v("لغو")])])])
	  }))]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-12"
	  }, [_vm._v("\n                    " + _vm._s(_vm.list_loading_msg) + "\n                ")]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-12 ",
	    staticStyle: {
	      "border-top": "1px solid #f3f3f3",
	      "margin-top": "6px",
	      "padding": "5px 0"
	    }
	  }, [_c('div', {
	    staticClass: "col-md-4"
	  }, [_vm._v("\n                        تعداد کل صندلی ها: " + _vm._s(_vm.count_of_all_chairs) + "\n                    ")]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-4"
	  }, [_vm._v("\n                        حضوری : " + _vm._s(_vm.count_of_offline_chairs) + "\n                    ")]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-4"
	  }, [_vm._v("\n                        آنلاین : " + _vm._s(_vm.count_of_online_chairs) + "\n                    ")])])])]), _vm._v(" "), _c('router-link', {
	    staticClass: "btn btn-success",
	    attrs: {
	      "to": "/tickets/buy-ticket"
	    }
	  }, [_vm._v("خرید جدید")]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-default",
	    attrs: {
	      "disabled": !_vm.searchResult.length > 0
	    },
	    on: {
	      "click": _vm.printList
	    }
	  }, [_vm._v("چاپ لیست")])], 1), _vm._v(" "), _c('ticket-view', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.ticketData),
	      expression: "ticketData"
	    }],
	    domProps: {
	      "value": (_vm.ticketData)
	    },
	    on: {
	      "input": function($event) {
	        _vm.ticketData = $event
	      }
	    }
	  })], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    staticClass: "input-group-addon btn-primary"
	  }, [_c('i', {
	    staticClass: "icon-search"
	  })])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("کد بلیط")]), _vm._v(" "), _c('th', {
	    staticClass: "hidden-phone"
	  }, [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("نام")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-bookmark"
	  }), _vm._v("شماره تماس")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: " icon-edit"
	  }), _vm._v("صندلی های خرید شده")]), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: " icon-edit"
	  }), _vm._v("زمان خرید")]), _vm._v(" "), _c('th')])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1d154115", module.exports)
	  }
	}

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(130)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(132),
	  /* template */
	  __webpack_require__(133),
	  /* scopeId */
	  "data-v-7aab8bf7",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/checkTicket.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] checkTicket.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7aab8bf7", Component.options)
	  } else {
	    hotAPI.reload("data-v-7aab8bf7", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(131);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("93d088a6", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7aab8bf7\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checkTicket.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7aab8bf7\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checkTicket.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.msg[data-v-7aab8bf7]{\n    padding:10px;\n    margin-bottom: 15px;\n}\n.success[data-v-7aab8bf7]{\n    background: rgba(139, 195, 75, 0.3);\n}\n.faild[data-v-7aab8bf7]{\n    background: #ffdce8;\n}\ntable[data-v-7aab8bf7] {\n\tfont-size: 13px;\n}\n.form-control[data-v-7aab8bf7]{\n}\n", ""]);

	// exports


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ticketView = __webpack_require__(80);

	var _ticketView2 = _interopRequireDefault(_ticketView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    props: ["inSelfService"],

	    components: { ticketView: _ticketView2.default },
	    data: function data() {
	        return {

	            disabledPrintButton: false,
	            faildInput: false,

	            code: "",

	            ticket: {},

	            showtime: {},

	            ticketData: {},

	            movie: {},

	            loadingList: false,

	            statusText: "درحال حاضر اطلاعاتی دردست نیست",

	            statusClass: ""

	        };
	    },

	    watch: {
	        code: function code() {
	            this.faildInput = false;
	        }
	    },
	    created: function created() {
	        if (this.inSelfService) {}
	    },

	    computed: {
	        has_ticket: function has_ticket() {
	            return this.ticket.id && this.movie.id && this.showtime.id ? true : false;
	        },
	        total_price: function total_price() {
	            return this.get_movie_price * this.ticket.chairs.split(' ').length;
	        },
	        get_movie_price: function get_movie_price() {
	            return this.showtime.is_half_price == '1' ? this.movie.half_price : this.movie.price;
	        },
	        get_chairs_alpha: function get_chairs_alpha() {
	            var rows = [];
	            var text = [];
	            var chairs = this.ticket.chairs.split(' ');
	            chairs.some(function (el) {

	                var x = el.split('-');
	                var r = x[0];
	                var c = x[1];
	                var i = rows.indexOf(parseInt(r));

	                if (i == -1) {

	                    rows.push(parseInt(r));
	                    text.push("\u0631\u062F\u06CC\u0641 " + r + " \u0635\u0646\u062F\u0644\u06CC " + c + " ");
	                } else {

	                    text[i] += " , " + c + " ";
	                }
	            });

	            return text.join(" ");
	        }
	    },
	    methods: {
	        serachAndPrint: function serachAndPrint() {
	            var _this = this;

	            this.disabledPrintButton = true;
	            this.faildInput = false;

	            this.searchFactors();
	            this.waitForRaquest = setInterval(function () {

	                if (_this.has_ticket) {

	                    clearInterval(_this.waitForRaquest);
	                    _this.$root.ticketData = {
	                        code: _this.code,
	                        date: _this.showtime.date,
	                        time: _this.showtime.time,
	                        movieName: _this.movie.title,
	                        chairsAlpha: _this.get_chairs_alpha,
	                        chairsCount: _this.ticket.chairs.split(' ').length,
	                        chairsNumber: _this.ticket.chairs,
	                        totalPrice: _this.total_price
	                    };

	                    setTimeout(function () {

	                        window.print();

	                        _this.ticket = {};
	                        _this.showtime = {};
	                        _this.movie = {};

	                        _this.code = '';
	                        _this.disabledPrintButton = false;
	                    }, 1);
	                } else if (!_this.loadingList) {

	                    clearInterval(_this.waitForRaquest);
	                    _this.faildInput = true;
	                    //alert("این بلیط وجد ندارد! لطفا شماره بلیط را صحیح وارد کنید یا در صورت اشکال به اپراتور بلیط گزارش دهید.")
	                    //this.code = ''
	                    _this.disabledPrintButton = false;
	                }
	            }, 100);
	        },
	        searchFactors: function searchFactors() {
	            var _this2 = this;

	            this.loadingList = true;

	            var params = { code: this.code };
	            setTimeout(function () {
	                _this2.$http.get('api/search_factor_by_code', { params: params }).then(function (res) {
	                    console.log(res.body);

	                    if (res.body.status == "1") {

	                        _this2.ticket = res.body.ticket;
	                        _this2.statusText = "این بلیط در سیستم ثبت شده است";
	                        _this2.statusClass = "success";

	                        var _params = { id: res.body.ticket.movie_id };
	                        _this2.$http.get("api/get_movies", { params: _params }).then(function (res) {
	                            _this2.movie = res.body;
	                            console.log(res.body);

	                            var params = { urid: _this2.ticket.reserve_id };
	                            _this2.$http.get("api/get_showtime_by_uniqe_id", { params: params }).then(function (res) {
	                                _this2.loadingList = false;
	                                _this2.showtime = res.body;
	                                console.log(res.body);
	                            });
	                        });
	                    } else {
	                        _this2.loadingList = false;
	                        _this2.statusText = "این بلیط در سیستم وجود ندارد";
	                        _this2.statusClass = "faild";
	                    }
	                });
	            }, 1000);
	        },
	        printList: function printList() {

	            this.ticketData = {
	                code: this.code,
	                date: this.showtime.date,
	                time: this.showtime.time,
	                movieName: this.movie.title,
	                chairsAlpha: this.get_chairs_alpha,
	                chairsCount: this.ticket.chairs.split(' ').length,
	                chairsNumber: this.ticket.chairs,
	                totalPrice: this.total_price
	            };

	            setTimeout(function () {
	                $("#print").html($("#ticketView").clone());
	                window.print();
	            }, 500);
	        }
	    }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (!_vm.inSelfService) ? _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("جستجوی بلیط")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "col-md-3"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.code),
	      expression: "code"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "placeholder": "کد بلیط"
	    },
	    domProps: {
	      "value": _vm._s(_vm.code)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.code = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-3"
	  }, [_c('button', {
	    staticClass: "btn btn-primary form-control",
	    attrs: {
	      "disabled": !_vm.code
	    },
	    on: {
	      "click": _vm.searchFactors
	    }
	  }, [_vm._v("جستجو")])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel",
	    attrs: {
	      "id": "list"
	    }
	  }, [_vm._v(_vm._s(_vm.inSelfService) + "\n            "), _c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("مشخصات بلیط")]), _vm._v(" "), _c('section', {
	    staticClass: "panel-body"
	  }, [(_vm.loadingList) ? _c('div', {
	    staticClass: "msg"
	  }, [_vm._v("درحال بارگزاری...")]) : _c('div', {
	    class: 'msg ' + _vm.statusClass
	  }, [_vm._v(_vm._s(_vm.statusText))]), _vm._v(" "), (_vm.has_ticket) ? _c('div', [_c('div', {
	    staticClass: "col-md-3"
	  }, [_vm._v("\n                        کد بلیط : " + _vm._s(_vm.ticket.code) + "\n                    ")]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-3"
	  }, [_vm._v("\n                        نام فیلم : " + _vm._s(_vm.movie.title) + "\n                    ")]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-3"
	  }, [_vm._v("\n                        صندلی ها : " + _vm._s(_vm.ticket.chairs) + "\n                    ")]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-3"
	  }, [_vm._v("\n                        هزینه کل : " + _vm._s(_vm.ticket.total_price) + " تومان\n                    ")])]) : _vm._e()])]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-default",
	    on: {
	      "click": _vm.printList
	    }
	  }, [_vm._v("چاپ بلیط")])]), _vm._v(" "), _c('ticket-view', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.ticketData),
	      expression: "ticketData"
	    }],
	    domProps: {
	      "value": (_vm.ticketData)
	    },
	    on: {
	      "input": function($event) {
	        _vm.ticketData = $event
	      }
	    }
	  })], 1) : _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticStyle: {
	      "font-size": "12px",
	      "font-style": "italic"
	    }
	  }, [_vm._v("\n        * لطفا کد بلیط را به انگلیسی وارد کنید : ...1234\n    ")]), _vm._v(" "), _c('div', {
	    staticClass: "input-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.code),
	      expression: "code"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "placeholder": "کد بلیط"
	    },
	    domProps: {
	      "value": _vm._s(_vm.code)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.code = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "input-group-addon btn btn-primary",
	    attrs: {
	      "id": "doPrint",
	      "disabled": _vm.disabledPrintButton || !_vm.code
	    },
	    on: {
	      "click": _vm.serachAndPrint
	    }
	  }, [_vm._v("چاپ کن")])]), _vm._v(" "), (_vm.faildInput) ? _c('div', {
	    class: 'msg ' + _vm.statusClass,
	    staticStyle: {
	      "margin-top": "10px"
	    }
	  }, [_vm._v(_vm._s(_vm.statusText))]) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7aab8bf7", module.exports)
	  }
	}

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(135)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(137),
	  /* template */
	  __webpack_require__(143),
	  /* scopeId */
	  "data-v-0c129649",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/buy.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] buy.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0c129649", Component.options)
	  } else {
	    hotAPI.reload("data-v-0c129649", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(136);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("72da680b", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0c129649\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./buy.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0c129649\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./buy.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n#ticket[data-v-0c129649]{\n   display: none;;\n   text-align: center;\n    width: 298px;\n    height: 420px;\n}\n#ticket p[data-v-0c129649] {\n    font-size: 16px;\n     text-align: justify;\n  -moz-text-align-last: center;\n  text-align-last: center;\n}\n#ticket img[data-v-0c129649]{\n       width: 100%;\n    height: 60px;\n}\n@media print{\n#ticket[data-v-0c129649]{\n        display: block;\n}\n}\ntable[data-v-0c129649] {\n\tfont-size: 13px;\n}\n.sans[data-v-0c129649]{\n\n    padding-top: 15px;\n}\n.form-control[data-v-0c129649]{\n    padding: 0;\n}\n", ""]);

	// exports


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _chairs = __webpack_require__(138);

	var _chairs2 = _interopRequireDefault(_chairs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    components: { chairs: _chairs2.default },

	    data: function data() {
	        return {

	            currentTicketCode: "",

	            barcodeImage: "",

	            sansInfo: [],

	            mid: "",
	            date: "",
	            urid: "",

	            loadingMovie: true,
	            loadingDates: false,
	            loadingChairs: false,

	            showChairs: false

	        };
	    },


	    watch: {
	        mid: function mid(val) {
	            var _this = this;

	            this.date = this.urid = "";
	            this.loadingDates = true;
	            this.showChairs = false;

	            this.$root.movies.some(function (el) {
	                if (el.id == val) {
	                    _this.$root.movie = el;
	                    return;
	                }
	            });
	        }
	    },

	    computed: {
	        movies_loading_msg: function movies_loading_msg() {
	            return this.loadingMovie ? "درحال بارگزاری..." : "فیلم ها";
	        },
	        dates_loading_msg: function dates_loading_msg() {
	            return this.loadingDates ? "درحال بارگزاری..." : "تاریخ اکران ";
	        },
	        chairs_loading_msg: function chairs_loading_msg() {
	            var text = this.showChairs ? "" : "درحال حاضر هیچ اطلاعاتی وجود ندارد";
	            return this.loadingChairs ? "درحال بارگزاری..." : text;
	        },
	        get_dates: function get_dates() {

	            var a = [];
	            this.sansInfo.some(function (el) {
	                if (a.indexOf(el.date) == -1) a.push(el.date);
	            });
	            return a;
	        },
	        get_times: function get_times() {
	            var _this2 = this;

	            var a = [];
	            this.sansInfo.some(function (el) {
	                if (el.date == _this2.date) a.push({ time: el.time, uniqe_id: el.uniqe_id });
	            });
	            return a;
	        },
	        allowSearch: function allowSearch() {
	            return !(this.mid != "" && this.urid != "");
	        },
	        get_chairs: function get_chairs() {
	            var c = '';
	            this.$root.selectedChairs.some(function (el) {
	                c += " " + el.name;
	            });
	            return c;
	        },
	        total_price: function total_price() {
	            return this.$root.movie.price * this.$root.selectedChairs.length;
	        }
	    },
	    created: function created() {

	        this.load_movies();
	    },

	    methods: {
	        get_reserved_chairs: function get_reserved_chairs() {
	            var _this3 = this;

	            var urid = this.urid;

	            this.loadingChairs = true;
	            this.showChairs = false;

	            setTimeout(function () {
	                _this3.$root.get_sold_chairs(urid, function () {

	                    _this3.loadingChairs = false;
	                    _this3.showChairs = true;
	                });
	            }, 1000);
	        },
	        load_dates_by_movie_id: function load_dates_by_movie_id() {
	            var _this4 = this;

	            setTimeout(function () {
	                _this4.$http.get('api/get_showtimes', { params: { id: _this4.mid } }).then(function (res) {
	                    _this4.loadingDates = false;
	                    _this4.sansInfo = res.body;
	                    console.log(res.body);
	                });
	            }, 1000);
	        },
	        load_movies: function load_movies() {
	            var _this5 = this;

	            setTimeout(function () {
	                _this5.$http.get('api/get_movies').then(function (res) {
	                    _this5.loadingMovie = false;
	                    _this5.$root.movies = res.body;
	                });
	            }, 1000);
	        },
	        sendFactor: function sendFactor() {
	            var _this6 = this;

	            var data = {
	                mid: this.mid,
	                urid: this.urid,
	                uid: "0", // 0 means admin user id
	                chairs: this.$root.selectedChairs,
	                total_price: this.total_price,
	                discount: "0"
	            };

	            console.log(data);

	            setTimeout(function () {

	                _this6.$http.post('api/new_factor', data).then(function (res) {
	                    console.log(res);
	                    _this6.$root.get_sold_chairs(_this6.urid);

	                    if (res.body.status == "1") {
	                        console.log("res");
	                        var img = new Image();
	                        var path = SERVER['root'] + "api/barcode?size=40&text=" + res.body.code;
	                        console.log(path);
	                        img.src = path;
	                        var el = $("#barcodeImage");
	                        var self = _this6;
	                        img.onload = function () {
	                            el.prop("src", path);
	                            self.printFactor();
	                        }.bind(el);

	                        _this6.currentTicketCode = "" + res.body.code;
	                    } else {
	                        alert("مشکلی در ثبت بلیط اتفاق افتاده.");
	                    }
	                }, function (response) {
	                    alert("مشکلی در ثبت بلیط اتفاق افتاده.");
	                });
	            }, 1000);
	        },
	        printFactor: function printFactor() {
	            var _this7 = this;

	            setTimeout(function () {
	                $("#print").html($("#ticket"));
	                window.print();

	                _this7.$root.selectedChairs = [];
	            }, 2500);
	        }
	    }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(139)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(141),
	  /* template */
	  __webpack_require__(142),
	  /* scopeId */
	  "data-v-c5376398",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/ticket/chairs.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] chairs.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-c5376398", Component.options)
	  } else {
	    hotAPI.reload("data-v-c5376398", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(140);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("5ec90d11", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-c5376398\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./chairs.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-c5376398\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./chairs.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.box3[data-v-c5376398]{\n\tpadding:5px;\n\tmargin: 10px 0;\n\ttext-align: center;\n\tfont-size: 12px ;\n\tdisplay: block;\n}\n#chairs[data-v-c5376398] {\n\t\t-webkit-user-select: none;  \n  -moz-user-select: none;    \n  -ms-user-select: none;      \n  user-select: none;\n\n  cursor:default;\n}\na[data-v-c5376398]{\n\tmargin: 2px;\n}\n.selected[data-v-c5376398],.purchased[data-v-c5376398]{\n\tcolor: white !important;\n}\n.selected[data-v-c5376398]{\n\tbackground: #4eaed4 !important;\n}\n.purchased[data-v-c5376398]{\n\tbackground: #f56459  !important;\n\tcursor: not-allowed;\n}\n.chair[data-v-c5376398]{\n\tbackground:#a4acb3;\n\tborder:1px solid #bbb;\n\tborder-radius: 7px;\n\theight: 28px;\n    width: 30px;\n    \n    text-align: center;\n    color: white;\n\tdisplay: inline-block;\n\tcursor: default;\n\tfont-size: 1.2em;\n}\n.char[data-v-c5376398]{\n\tcolor: black;\n    display: inline-block;\n    height: 28px;\n    font-size: 1.5em;\n}\n\n\n\n\n", ""]);

	// exports


/***/ },
/* 141 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

		props: ["value"],

		data: function data() {
			return {

				leftChairs: [7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 6, 6, 5, 6],
				rightChairs: [8, 8, 9, 9, 9, 9, 9, 8, 9, 8, 9, 7, 6, 6, 7],
				chars: ["15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
				//chars : ["A","B","C","D","E","F","G","H","I","J","K","L","M","S","T"],

				selectedChairs: []

			};
		},


		watch: {
			selectedChairs: function selectedChairs(val) {
				console.log("selected chais is changed");
				this.$emit("input", val);
			},
			value: function value(val) {

				this.selectedChairs = val;
			}
		},
		created: function created() {
			if (this.value != undefined) this.selectedChairs = this.value;
		},


		methods: {

			updateChairStatus: function updateChairStatus(id) {

				var status = "";

				this.$root.purchasedChairs.some(function (el, i) {

					if (el.id == id) {

						status = "purchased";
					}
				});

				if (status != "") return status;

				this.selectedChairs.some(function (el, i) {

					if (el.id == id) {

						status = "selected";
					}
				});

				return status;
			},

			toggle: function toggle(s, r, c) {

				var name = void 0;
				var col = void 0;

				if (s == 1) {
					col = Math.abs(c);
					name = this.chars[r] + '-' + (parseInt(this.leftChairs[r]) + parseInt(col + 1));
				} else {
					col = Math.abs(c);
					name = this.chars[r] + '-' + (col + 1);
				}

				var id = (s == 0 ? 'l-' : 'r-') + r + "-" + c;
				var price = void 0;
				if (this.$root.movie) {
					price = this.$root.movie.price;
				} else {
					price = parseInt(this.$root.concert.prices_list[r]);
				}

				var obj = new Object({ price: price, id: id, name: name });

				var index = 0;

				var found = this.selectedChairs.some(function (el, i) {

					index = i;
					return el.id === obj.id;
				});

				var pur = this.$root.purchasedChairs.some(function (el, i) {

					return el.id === obj.id;
				});

				if (!pur) {

					if (!found) {

						this.selectedChairs.push(obj);
					} else {

						this.selectedChairs.splice(index, 1);
					}
				}
			}
		}

	};

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "chairs"
	    }
	  }, [_c('div', {
	    staticClass: "row",
	    staticStyle: {
	      "direction": "ltr"
	    }
	  }, [_c('div', {
	    staticClass: "col-md-1",
	    staticStyle: {
	      "float": "left"
	    }
	  }, _vm._l((_vm.chars), function(char) {
	    return _c('div', {
	      staticStyle: {
	        "margin-bottom": "4px",
	        "text-align": "left"
	      }
	    }, [_c('span', {
	      staticClass: "char"
	    }, [_vm._v(_vm._s(char.toFaDigit()))])])
	  })), _vm._v(" "), _c('div', {
	    staticClass: "col-md-5",
	    staticStyle: {
	      "float": "left",
	      "text-align": "right"
	    }
	  }, _vm._l((_vm.leftChairs), function(r, n) {
	    return _c('div', {
	      staticStyle: {
	        "margin-bottom": "4px"
	      }
	    }, _vm._l((r), function(i) {
	      return _c('a', {
	        on: {
	          "click": function($event) {
	            _vm.toggle(0, n, i - 1)
	          }
	        }
	      }, [_c('span', {
	        staticClass: "chair",
	        class: _vm.updateChairStatus('l-' + n + '-' + (i - 1))
	      }, [_vm._v(_vm._s((Math.abs(i)).toString().toFaDigit()))])])
	    }))
	  })), _vm._v(" "), _c('div', {
	    staticClass: "col-md-6",
	    staticStyle: {
	      "text-align": "left",
	      "float": "left"
	    }
	  }, _vm._l((_vm.rightChairs), function(r, n) {
	    return _c('div', {
	      staticStyle: {
	        "margin-bottom": "4px"
	      }
	    }, _vm._l((r), function(i) {
	      return _c('a', {
	        on: {
	          "click": function($event) {
	            _vm.toggle(1, n, i - 1)
	          }
	        }
	      }, [_c('span', {
	        staticClass: "chair",
	        class: _vm.updateChairStatus('r-' + n + '-' + (i - 1))
	      }, [_vm._v(_vm._s((_vm.leftChairs[n] + (Math.abs(i))).toString().toFaDigit()))])])
	    }))
	  }))])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-c5376398", module.exports)
	  }
	}

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("فیلتر")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "col-md-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.mid),
	      expression: "mid"
	    }],
	    staticClass: "form-control",
	    on: {
	      "change": [function($event) {
	        _vm.mid = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        })[0]
	      }, _vm.load_dates_by_movie_id]
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": "",
	      "hidden": ""
	    }
	  }, [_vm._v(_vm._s(_vm.movies_loading_msg))]), _vm._v(" "), _vm._l((_vm.$root.movies), function(m) {
	    return _c('option', {
	      domProps: {
	        "value": m.id
	      }
	    }, [_vm._v(_vm._s(m.title))])
	  })], 2)]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.date),
	      expression: "date"
	    }],
	    staticClass: "form-control",
	    on: {
	      "change": function($event) {
	        _vm.date = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        })[0]
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": "",
	      "hidden": ""
	    }
	  }, [_vm._v(_vm._s(_vm.dates_loading_msg))]), _vm._v(" "), _vm._l((_vm.get_dates), function(d) {
	    return _c('option', {
	      domProps: {
	        "value": d
	      }
	    }, [_vm._v(_vm._s(d))])
	  })], 2)]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.urid),
	      expression: "urid"
	    }],
	    staticClass: "form-control",
	    on: {
	      "change": function($event) {
	        _vm.urid = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        })[0]
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": "",
	      "hidden": ""
	    }
	  }, [_vm._v("سانس")]), _vm._v(" "), _vm._l((_vm.get_times), function(t) {
	    return _c('option', {
	      domProps: {
	        "value": t.uniqe_id
	      }
	    }, [_vm._v(_vm._s(t.time))])
	  })], 2)]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-3"
	  }, [_c('button', {
	    staticClass: "btn btn-primary form-control",
	    attrs: {
	      "disabled": _vm.allowSearch
	    },
	    on: {
	      "click": _vm.get_reserved_chairs
	    }
	  }, [_vm._v("بارگزاری صندلی ها")])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("ثبت بلیط")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('span', [_vm._v(_vm._s(_vm.chairs_loading_msg))]), _vm._v(" "), (!this.loadingChairs && _vm.showChairs) ? _c('div', [_c('p', [_vm._v("صندلی های مورد نظر را انتخاب کنید :")]), _vm._v(" "), _c('chairs', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.$root.selectedChairs),
	      expression: "$root.selectedChairs"
	    }],
	    domProps: {
	      "value": (_vm.$root.selectedChairs)
	    },
	    on: {
	      "input": function($event) {
	        _vm.$root.selectedChairs = $event
	      }
	    }
	  }), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-success",
	    on: {
	      "click": _vm.sendFactor
	    }
	  }, [_vm._v("ثبت بلیط و چاپ")])], 1) : _vm._e()])])]), _vm._v(" "), _c('div', {
	    attrs: {
	      "id": "ticket"
	    }
	  }, [_c('h1', [_vm._v("سینما ستاره")]), _vm._v(" "), _c('p', [_vm._v("نام فیلم : " + _vm._s(_vm.$root.movie.title))]), _vm._v(" "), _c('p', [_vm._v("شماره صندلی(ها) : " + _vm._s(_vm.get_chairs))]), _vm._v(" "), _c('p', [_vm._v("مبلغ پرداختی : " + _vm._s(_vm.total_price))]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.currentTicketCode))])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('p', [_c('img', {
	    attrs: {
	      "id": "barcodeImage",
	      "src": "/sinama/app/assets/ajax-loader.gif"
	    }
	  })])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0c129649", module.exports)
	  }
	}

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(145)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(147),
	  /* template */
	  __webpack_require__(148),
	  /* scopeId */
	  "data-v-37b04638",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/nextFilm.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] nextFilm.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-37b04638", Component.options)
	  } else {
	    hotAPI.reload("data-v-37b04638", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(146);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("7142620f", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-37b04638\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./nextFilm.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-37b04638\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./nextFilm.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(13);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _send_form = __webpack_require__(29);

	var _send_form2 = _interopRequireDefault(_send_form);

	var _imageInput = __webpack_require__(45);

	var _imageInput2 = _interopRequireDefault(_imageInput);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

	    mixins: [_send_form2.default],
	    components: { imageInput: _imageInput2.default },

	    data: function data() {
	        return {

	            nextMovie: {
	                image: '',
	                name: ''
	            },

	            url: 'api/new_data',

	            form: {
	                name: "next_movie",
	                uploadKey: getRandomInt(1, 100000),
	                data: ''
	            }
	        };
	    },
	    created: function created() {
	        var _this = this;

	        this.$http.get("api/get_data", { params: { name: "next_movie" } }).then(function (res) {
	            console.log("nextt film :");
	            console.log(res);
	            _this.nextMovie = JSON.parse(res.body.data);
	        });
	    },

	    methods: {
	        progress: function progress(p) {

	            if (p.finish) {
	                alert("Save!");
	            }
	        },
	        save: function save() {

	            this.form.data = (0, _stringify2.default)(this.nextMovie);

	            this.sendForm(this.form, this.url, this.progress);
	        }
	    }
	};


	var getRandomInt = function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("فیلم آینده ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("نام فیلم")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.nextMovie.name),
	      expression: "nextMovie.name"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.nextMovie.name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.nextMovie.name = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    attrs: {
	      "for": "test"
	    }
	  }, [_vm._v("فایل را انتخاب کنید")]), _vm._v(" "), _c('imageInput', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.nextMovie.image),
	      expression: "nextMovie.image"
	    }],
	    attrs: {
	      "prefix": _vm.form.uploadKey,
	      "name": "next_movie_image"
	    },
	    domProps: {
	      "value": (_vm.nextMovie.image)
	    },
	    on: {
	      "change": _vm.onFileChange,
	      "input": function($event) {
	        _vm.nextMovie.image = $event
	      }
	    }
	  }, [_vm._v("\n                            سایز عکس 50px * 100px\n                        ")])], 1)])])])]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.save()
	      }
	    }
	  }, [_vm._v("ذخیره")])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-37b04638", module.exports)
	  }
	}

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(150)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(152),
	  /* template */
	  __webpack_require__(153),
	  /* scopeId */
	  "data-v-06ac8920",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/news.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] news.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-06ac8920", Component.options)
	  } else {
	    hotAPI.reload("data-v-06ac8920", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(151);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("2e1bfa21", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-06ac8920\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./news.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-06ac8920\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./news.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },
/* 152 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {
		data: function data() {
			return {

				news: []
			};
		},
		created: function created() {

			this.load_news();
		},

		methods: {

			load_news: function load_news() {
				var _this = this;

				this.$http.get("api/get_news").then(function (res) {

					_this.news = res.body;

					// console.log(res)
				});
			}

		}
	};

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("لیست خبر ها ")]), _vm._v(" "), _c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_vm._m(0), _vm._v(" "), _c('tbody', [(_vm.news.length == 0) ? _c('h3', [_vm._v("درحال بارگزاری...")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.news), function(n) {
	    return _c('tr', [_c('td', [_c('router-link', {
	      attrs: {
	        "to": 'edit-news?id=' + n.id
	      }
	    }, [_vm._v(_vm._s(n.title))])], 1), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(n.date))])])
	  })], 2)])]), _vm._v(" "), _c('router-link', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "to": 'release-news'
	    }
	  }, [_vm._v("خبر جدید")])], 1)])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("تیتر")]), _vm._v(" "), _c('th', {
	    staticClass: "hidden-phone"
	  }, [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("تاریخ")]), _vm._v(" "), _c('th')])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-06ac8920", module.exports)
	  }
	}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(155)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(157),
	  /* template */
	  __webpack_require__(158),
	  /* scopeId */
	  "data-v-15664c72",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/pages.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] pages.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-15664c72", Component.options)
	  } else {
	    hotAPI.reload("data-v-15664c72", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(156);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("1eb63d15", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-15664c72\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pages.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-15664c72\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pages.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },
/* 157 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {
	    data: function data() {
	        return {

	            pages: [],

	            loading: true
	        };
	    },
	    created: function created() {

	        this.load_pages();
	    },

	    computed: {
	        loading_msg: function loading_msg() {
	            return this.loading ? "درحال بارگزاری..." : "درحال حاضر هیچ صفحه ای یافت نشد";
	        }
	    },
	    methods: {

	        load_pages: function load_pages() {
	            var _this = this;

	            this.loading = true;
	            setTimeout(function () {
	                _this.$http.get("api/get_pages").then(function (res) {

	                    _this.pages = res.body;
	                    _this.loading = false;
	                    // console.log(res)
	                });
	            }, 1000);
	        },

	        get_uri: function get_uri(p) {
	            return "http://cinemasetareh.ir/" + p.uri;
	        }
	    }
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("لیست صفحات ")]), _vm._v(" "), _c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.pages), function(n) {
	    return _c('tr', [_c('td', [_c('router-link', {
	      attrs: {
	        "to": 'edit-page?id=' + n.id
	      }
	    }, [_vm._v(_vm._s(n.title))])], 1), _vm._v(" "), _c('td', {
	      staticClass: "hidden-phone"
	    }, [_vm._v(_vm._s(_vm.get_uri(n)))])])
	  }))]), _vm._v(" "), (_vm.pages.length == 0) ? _c('p', [_vm._v(_vm._s(_vm.loading_msg))]) : _vm._e()]), _vm._v(" "), _c('router-link', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "to": 'release-page'
	    }
	  }, [_vm._v("صفحه جدید")])], 1)])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("تیتر")]), _vm._v(" "), _c('th', {
	    staticClass: "hidden-phone"
	  }, [_c('i', {
	    staticClass: "icon-question-sign"
	  }), _vm._v("مسیر")]), _vm._v(" "), _c('th')])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-15664c72", module.exports)
	  }
	}

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(160)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(162),
	  /* template */
	  __webpack_require__(163),
	  /* scopeId */
	  "data-v-6e7b1760",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/movies.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] movies.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6e7b1760", Component.options)
	  } else {
	    hotAPI.reload("data-v-6e7b1760", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(161);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("43151024", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6e7b1760\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./movies.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6e7b1760\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./movies.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\ntable[data-v-6e7b1760] {\n\tfont-size: 13px !important;\n}\n.expire td[data-v-6e7b1760]{\n    background: rgba(255,0,0,0.1) !important;\n}\n", ""]);

	// exports


/***/ },
/* 162 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {
	    data: function data() {
	        return {

	            movies: [],

	            loading: true
	        };
	    },


	    computed: {
	        loading_msg: function loading_msg() {
	            return this.loading ? "درحال بارگزاری..." : "درحال حاضر هیچ فیلمی یافت نشد";
	        }
	    },

	    created: function created() {

	        this.load_movies();
	    },


	    methods: {
	        load_movies: function load_movies() {
	            var _this = this;

	            this.$http.get("api/get_movies").then(function (res) {

	                _this.movies = res.body;
	                _this.loading = false;

	                console.log(res);
	            });
	        },
	        delete_movie: function delete_movie(id, index) {

	            this.movies.splice(index, 1);

	            this.$http.get("api/delete_movie", { params: { id: id } }).then(function (res) {

	                console.log(res.body);
	            });
	        },
	        archive_movie: function archive_movie(id, index) {

	            this.movies.splice(index, 1);

	            this.$http.get("api/archive_movie", { params: { id: id } }).then(function (res) {

	                console.log(res.body);
	            });
	        }
	    }
	};

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("لیست اکران ها ")]), _vm._v(" "), _c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_vm._m(0), _vm._v(" "), _c('tbody', [(_vm.movies.length == 0) ? _c('p', [_vm._v(_vm._s(_vm.loading_msg))]) : _vm._e(), _vm._v(" "), _vm._l((_vm.movies), function(m, i) {
	    return _c('tr', {
	      class: {
	        'expire': m.expire
	      }
	    }, [_c('td', [_c('router-link', {
	      attrs: {
	        "to": '/movies/edit-movie?id=' + m.id
	      }
	    }, [_vm._v(_vm._s(m.title))])], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(m.expire ? 'تاریخ گذشته' : 'درحال اکران'))]), _vm._v(" "), _c('td', [_c('button', {
	      staticClass: "btn btn-danger",
	      on: {
	        "click": function($event) {
	          _vm.delete_movie(m.id, i)
	        }
	      }
	    }, [_vm._v("حذف")]), _vm._v(" "), _c('button', {
	      staticClass: "btn btn-default",
	      on: {
	        "click": function($event) {
	          _vm.archive_movie(m.id, i)
	        }
	      }
	    }, [_vm._v("آرشیو")])])])
	  })], 2)])])])]), _vm._v(" "), _c('router-link', {
	    staticClass: "btn btn-success",
	    attrs: {
	      "to": '/movies/release-movie'
	    }
	  }, [_vm._v(" فیلم جدید")])], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("لیست فیلم ها")]), _vm._v(" "), _c('th', [_vm._v("وضعیت")]), _vm._v(" "), _c('th', [_vm._v("عملیات")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6e7b1760", module.exports)
	  }
	}

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(165)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(167),
	  /* template */
	  __webpack_require__(168),
	  /* scopeId */
	  "data-v-7b62c95a",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/concerts.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] concerts.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7b62c95a", Component.options)
	  } else {
	    hotAPI.reload("data-v-7b62c95a", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(166);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("ec6286ee", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7b62c95a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./concerts.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7b62c95a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./concerts.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\ntable[data-v-7b62c95a] {\n\tfont-size: 13px !important;\n}\n.expire td[data-v-7b62c95a]{\n    background: rgba(255,0,0,0.1) !important;\n}\n", ""]);

	// exports


/***/ },
/* 167 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {
	    data: function data() {
	        return {

	            concerts: [],

	            loading: true
	        };
	    },


	    computed: {
	        loading_msg: function loading_msg() {
	            return this.loading ? "درحال بارگزاری..." : "درحال حاضر هیچ فیلمی یافت نشد";
	        }
	    },

	    created: function created() {

	        this.load_concerts();
	    },


	    methods: {
	        load_concerts: function load_concerts() {
	            var _this = this;

	            this.$http.get("api/get_concerts").then(function (res) {

	                _this.concerts = res.body;
	                _this.loading = false;

	                console.log(res);
	            });
	        },
	        delete_concert: function delete_concert(id, index) {

	            this.concerts.splice(index, 1);

	            this.$http.get("api/delete_concert", { params: { id: id } }).then(function (res) {

	                console.log(res.body);
	            });
	        },
	        archive_concert: function archive_concert(id, index) {

	            this.concerts.splice(index, 1);

	            this.$http.get("api/archive_concert", { params: { id: id } }).then(function (res) {

	                console.log(res.body);
	            });
	        }
	    }
	};

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("لیست اکران ها ")]), _vm._v(" "), _c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_vm._m(0), _vm._v(" "), _c('tbody', [(_vm.concerts.length == 0) ? _c('p', [_vm._v(_vm._s(_vm.loading_msg))]) : _vm._e(), _vm._v(" "), _vm._l((_vm.concerts), function(c, i) {
	    return _c('tr', {
	      class: {
	        'expire': c.expire
	      }
	    }, [_c('td', [_c('router-link', {
	      attrs: {
	        "to": '/concerts/edit-concert?id=' + c.id
	      }
	    }, [_vm._v(_vm._s(c.title))])], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(c.expire ? 'تاریخ گذشته' : 'درحال اکران'))]), _vm._v(" "), _c('td', [_c('button', {
	      staticClass: "btn btn-danger",
	      on: {
	        "click": function($event) {
	          _vm.delete_concert(c.id, i)
	        }
	      }
	    }, [_vm._v("حذف")]), _vm._v(" "), _c('button', {
	      staticClass: "btn btn-default",
	      on: {
	        "click": function($event) {
	          _vm.archive_concert(c.id, i)
	        }
	      }
	    }, [_vm._v("آرشیو")])])])
	  })], 2)])])])]), _vm._v(" "), _c('router-link', {
	    staticClass: "btn btn-success",
	    attrs: {
	      "to": '/concerts/release-concert'
	    }
	  }, [_vm._v(" فیلم جدید")])], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("لیست فیلم ها")]), _vm._v(" "), _c('th', [_vm._v("وضعیت")]), _vm._v(" "), _c('th', [_vm._v("عملیات")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7b62c95a", module.exports)
	  }
	}

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(170)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(172),
	  /* template */
	  __webpack_require__(173),
	  /* scopeId */
	  "data-v-f1535db0",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/archiveMovies.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] archiveMovies.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-f1535db0", Component.options)
	  } else {
	    hotAPI.reload("data-v-f1535db0", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(171);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("4b09ed08", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-f1535db0\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./archiveMovies.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-f1535db0\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./archiveMovies.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\ntable[data-v-f1535db0] {\n\tfont-size: 13px !important;\n}\n", ""]);

	// exports


/***/ },
/* 172 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {
	    data: function data() {
	        return {

	            movies: [],

	            loading: true
	        };
	    },


	    computed: {
	        loading_msg: function loading_msg() {
	            return this.loading ? "درحال بارگزاری..." : "درحال حاضر هیچ فیلمی یافت نشد";
	        }
	    },

	    created: function created() {

	        this.load_movies();
	    },


	    methods: {
	        load_movies: function load_movies() {
	            var _this = this;

	            this.$http.get("api/get_movies?archive=1").then(function (res) {

	                _this.movies = res.body;
	                _this.loading = false;

	                console.log(res);
	            });
	        },
	        delete_movie: function delete_movie(id, index) {

	            this.movies.splice(index, 1);

	            this.$http.get("api/delete_movie", { params: { id: id } }).then(function (res) {

	                console.log(res.body);
	            });
	        }
	    }
	};

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("آرشیو اکران ها ")]), _vm._v(" "), _c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_vm._m(0), _vm._v(" "), _c('tbody', [(_vm.movies.length == 0) ? _c('p', [_vm._v(_vm._s(_vm.loading_msg))]) : _vm._e(), _vm._v(" "), _vm._l((_vm.movies), function(m, i) {
	    return _c('tr', [_c('td', [_c('router-link', {
	      attrs: {
	        "to": '/admin/movies/edit-movie?id=' + m.id
	      }
	    }, [_vm._v(_vm._s(m.title))])], 1), _vm._v(" "), _c('td', [_c('button', {
	      staticClass: "btn btn-danger",
	      on: {
	        "click": function($event) {
	          _vm.delete_movie(m.id, i)
	        }
	      }
	    }, [_vm._v("حذف")])])])
	  })], 2)])])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("آرشیو فیلم ها")]), _vm._v(" "), _c('th')])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-f1535db0", module.exports)
	  }
	}

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(175)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(177),
	  /* template */
	  __webpack_require__(188),
	  /* scopeId */
	  "data-v-4d7fd1b6",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/releaseMovie.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] releaseMovie.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4d7fd1b6", Component.options)
	  } else {
	    hotAPI.reload("data-v-4d7fd1b6", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(176);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("eaae9778", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-4d7fd1b6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./releaseMovie.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-4d7fd1b6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./releaseMovie.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.loading-style[data-v-4d7fd1b6]{\n\n    padding: 0 20px\n}\n.box[data-v-4d7fd1b6]{\n    width:150px;\n}\ninput[type='checkbox'][data-v-4d7fd1b6]{\n    box-shadow: none;\n}\n\n\n", ""]);

	// exports


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _send_form = __webpack_require__(29);

	var _send_form2 = _interopRequireDefault(_send_form);

	var _datepicker = __webpack_require__(178);

	var _datepicker2 = _interopRequireDefault(_datepicker);

	var _timepicker = __webpack_require__(183);

	var _timepicker2 = _interopRequireDefault(_timepicker);

	var _imageInput = __webpack_require__(45);

	var _imageInput2 = _interopRequireDefault(_imageInput);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

	    mixins: [_send_form2.default],

	    components: { timePicker: _timepicker2.default, datePicker: _datepicker2.default, imageInput: _imageInput2.default },

	    data: function data() {
	        return {

	            loading: true,

	            loadingProgress: "",

	            movie: {
	                chart: [],
	                title: '',
	                des: '',
	                producer: '',
	                director: '',
	                year: '',
	                price: '50000',
	                time_out: ''
	            },
	            formUrl: 'api/new_movie',
	            showTimes: this.$root.showTimes

	        };
	    },


	    methods: {
	        new_date: function new_date() {

	            this.movie.chart.push({ date: "", times: [] });
	        },
	        remove_date: function remove_date(i) {

	            this.movie.chart.splice(i, 1);
	            // this.$http.get("api/delete_showtime", {params:{ id: }})
	        },
	        progress: function progress(p) {
	            if (p.lengthComputable) {
	                // this.saveLoading = true
	                this.loadingProgress = "%" + Math.round(p.loaded / p.total * 100);
	            }

	            if (p.finish) {

	                this.loadingProgress = "";
	            }
	        }
	    },

	    created: function created() {
	        var _this = this;

	        var id = this.$route.query.id;
	        if (id) {
	            setTimeout(function () {
	                _this.$http.get("api/get_movies?id=" + id).then(function (res) {

	                    _this.loading = false;
	                    _this.movie = res.body;
	                    console.log(res.body);
	                });
	            }, 1000);
	        } else {
	            this.loading = false;
	        }
	    },


	    computed: {
	        header: function header() {
	            return this.$route.query.id ? 'ویرایش ' : 'اضافه کردن ';
	        },

	        is_save: function is_save() {
	            return this.loadingProgress.length > 0;
	        }
	    }
	};

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(179)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(181),
	  /* template */
	  __webpack_require__(182),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/com/datepicker.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] datepicker.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5ddecf97", Component.options)
	  } else {
	    hotAPI.reload("data-v-5ddecf97", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(180);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("0b4ab854", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5ddecf97\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./datepicker.vue", function() {
	     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5ddecf97\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./datepicker.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.inline{display: inline-block;\n}\n.datepickerContainer{\n\tposition: relative;\n}\n.txtdate{\n\tposition: absolute;\n\tright: 0;\n\tz-index: -1\n}\n.datecontrol{\tmargin: 0 5px;\n}\n.box{\n\tborder: 0;\n\tbackground: transparent;\n\tpadding: 0 5px;\n}\n#ui-datepicker-div{border: 0;\nbackground: white;\ncolor: #262626;\nfont-family: yekan;\nbox-shadow:0 0 5px 0px rgba(0, 0, 0, 0.38);\n}\n.ui-datepicker-header{color:white !important;background:#3072ac !important; border:0 !important;\n}\n#ui-datepicker-div .ui-state-default{border: 1px solid RGBA(68, 68, 68, 0);\nbackground: #efefef;\nfont-weight: normal;\ncolor: #616161;\n}\n#ui-datepicker-div .ui-state-active{border: 1px solid white;background: #3072ac;color: white;\n}\n#ui-datepicker-div .ui-state-highlight{border: 1px solid #d0d0d0!important;background: #d0d0d0!important;color: #616161!important;\n}\n#ui-datepicker-div .ui-state-default:hover{border: 1px solid RGBA(0, 0, 0, 1)\n}\n#ui-datepicker-div .ui-datepicker-next:hover,\n#ui-datepicker-div .ui-datepicker-prev:hover{\n\t\n\tborder: 1px solid white;\n\tbackground:transparent\n}\n.date-info{\n\tdisplay: inline-block;\n\tmin-width: 150px;\n}\n.date-select{\n\tdisplay: inline-block;\n\n\ttext-align: center;\n}\n\n", ""]);

	// exports


/***/ },
/* 181 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

		props: ["value"],
		data: function data() {
			return {

				date: "",

				randName: "dp-" + Math.floor(Math.random() * 1000000000 + 1),
				randName2: "info-" + Math.floor(Math.random() * 100000000 + 1),
				randName3: "info-" + Math.floor(Math.random() * 100000000 + 1)
			};
		},

		watch: {
			date: function date(val) {
				this.$emit("input", val);
				console.log("date is change");
			},
			value: function value(val) {
				this.date = val;
			}
		},
		mounted: function mounted() {

			var el = '#' + this.randName;

			var btn = $jQuery1_6("#" + this.randName3);
			var dateInfo = $jQuery1_6("#" + this.randName2);

			if (this.value != undefined) this.date = this.value;

			$(el).innerHeight(btn.innerHeight());

			var Today = new Date();

			var self = this;

			$jQuery1_6("#" + this.randName3).click(function () {
				$jQuery1_6(el).datepicker("show");
			});

			$jQuery1_6(el).datepicker({
				dateFormat: 'yy/mm/dd',
				altField: '#' + this.randName2,
				altFormat: 'DD، d MM yy',
				// minDate: Today,
				//beforeShowDay: DisableSpecificDates,
				onSelect: function onSelect(date) {
					self.date = date;

					dateInfo.val(dateInfo.val().toFaDigit());
				}
			});

			var defaultDate = this.date;
			if (defaultDate == "") {
				defaultDate = Today;
			}

			//setTimeout(()=>{
			$jQuery1_6(el).datepicker("setDate", defaultDate);
			dateInfo.val(dateInfo.val().toFaDigit());

			if (this.date == "") {
				var td = $jQuery1_6(el).datepicker("getDate");
				var day = td.getDate().toString().length == 1 ? "0" + td.getDate() : td.getDate();
				var month = (td.getMonth() + 1).toString().length == 1 ? "0" + (td.getMonth() + 1) : td.getMonth() + 1;

				var TodayString = td.getFullYear() + "/" + month + "/" + day;

				this.date = TodayString;
			}

			//},100)

		}
	};

	/*
	var disableddates = [];
	function DisableSpecificDates(date) {
		var string = $jQuery1_6.datepicker.formatDate('yy/mm/dd', date);
		return [disableddates.indexOf(string) == -1];
	}
	*/

	String.prototype.toFaDigit = function () {
		return this.replace(/\d+/g, function (digit) {
			var ret = '';
			for (var i = 0, len = digit.length; i < len; i++) {
				ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
			}

			return ret;
		});
	};

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "datepickerContainer"
	  }, [_c('button', {
	    staticClass: "btn btn-default date-select",
	    attrs: {
	      "id": _vm.randName3
	    }
	  }, [_c('i', {
	    staticClass: "icon-calendar"
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "inline"
	  }, [_c('input', {
	    staticClass: "txtdate",
	    attrs: {
	      "type": "text",
	      "id": _vm.randName
	    },
	    domProps: {
	      "value": _vm.date
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "datecontrol"
	  }, [_vm._v(_vm._s(_vm.date.toFaDigit()))]), _vm._v(" "), _c('input', {
	    staticClass: "box date-info",
	    attrs: {
	      "type": "text",
	      "id": _vm.randName2,
	      "readonly": ""
	    }
	  })])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5ddecf97", module.exports)
	  }
	}

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(184)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(186),
	  /* template */
	  __webpack_require__(187),
	  /* scopeId */
	  "data-v-8c0fd014",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/com/timepicker.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] timepicker.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-8c0fd014", Component.options)
	  } else {
	    hotAPI.reload("data-v-8c0fd014", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(185);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("ecbf12a2", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-8c0fd014\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./timepicker.vue", function() {
	     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-8c0fd014\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./timepicker.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n#myTimepicker[data-v-8c0fd014]{\n\n\tdisplay: inline-block;\n}\n.box[data-v-8c0fd014]{\n\tpadding: 0 5px;\n}\n.number[data-v-8c0fd014]{\n\tdisplay: inline-block;\n\twidth: 20px;\n\ttext-align: center;\n}\n.showtime[data-v-8c0fd014]{\n\ttext-align: center;\n\tpadding:2px;\n}\n.showtime[data-v-8c0fd014]:hover{\n\tbackground:rgba(158, 158, 158, 0.12);\n}\n.close[data-v-8c0fd014]{\n\tbackground: red\n}\n#timesDialog[data-v-8c0fd014] {\n\tposition: absolute;\n\tdisplay: none;\n\n\twidth:160px;\n\tmin-height: 100px;\n\tpadding: 10px;\n\tbackground: white;\n\tborder: 1px solid grey;\n\tborder-radius: 5px\n}\n\n\n\n", ""]);

	// exports


/***/ },
/* 186 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

		props: ["value"],
		data: function data() {
			return {
				showTimesDialog: false,
				times: []
			};
		},

		watch: {
			value: function value(val) {
				this.times = val;
			}
		},
		created: function created() {

			if (this.value != undefined) this.times = this.value;

			var self = this;

			this.$nextTick(function () {

				$(document).click(function (event) {
					if (!$(event.target).closest('#myTimepicker').length) {
						self.unbind_timepicker();
					}
				});
			});
		},

		methods: {
			check: function check(time) {
				return this.times.indexOf(time) == -1 ? 0 : 1;
			},
			timeSelect: function timeSelect(time) {

				var index = this.times.indexOf(time);

				if (index == -1) this.times.push(time);else this.times.splice(index, 1);
			},
			bind_timepicker: function bind_timepicker(el) {
				console.log(el);

				this.showTimesDialog = !this.showTimesDialog;
				$("#timesDialog").css({ display: "none" });

				var elem = $(el.target);

				this.$nextTick(function () {

					var elH = elem.innerHeight();
					var elT = elem.position().top;

					var top = elT + elH + 10;
					var left = elem.position().left + elem.innerWidth() / 2;

					var offsetTop = elem.offset().top + elem.innerHeight() + $("#timesDialog").innerHeight() + 10;
					var winHeight = $(window).height() + $(window).scrollTop();

					if (offsetTop > winHeight) {

						top = elT - $("#timesDialog").innerHeight() - 10;
					}

					$("#timesDialog").offset({

						top: top,
						left: left - $("#timesDialog").innerWidth() / 2
					});
					$("#timesDialog").css({

						display: "inline-block"
					});
				});
			},
			unbind_timepicker: function unbind_timepicker() {

				this.showTimesDialog = false;
			}
		}

	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "myTimepicker"
	    }
	  }, [_c('button', {
	    staticClass: "btn btn-default",
	    on: {
	      "click": _vm.bind_timepicker
	    }
	  }, [_vm._v("سانس ها")]), _vm._v(" "), _c('span', {
	    staticClass: "box"
	  }, [_c('span', {
	    staticClass: "number"
	  }, [_vm._v(_vm._s(_vm.times.length.toFaDigit()))]), _vm._v("\n\t\t  سانس انتخاب شده\n\t")]), _vm._v(" "), (_vm.showTimesDialog) ? _c('div', {
	    attrs: {
	      "id": "timesDialog"
	    }
	  }, [_c('div', {
	    staticClass: "sans"
	  }, _vm._l((_vm.$root.showTimes), function(s) {
	    return _c('div', {
	      staticClass: "col-md-6 showtime"
	    }, [_c('label', [_c('input', {
	      attrs: {
	        "type": "checkbox"
	      },
	      domProps: {
	        "checked": _vm.check(s.time)
	      },
	      on: {
	        "change": function($event) {
	          _vm.timeSelect(s.time)
	        }
	      }
	    }), _vm._v("\n\t\t\t\t\t\t" + _vm._s(s.time.toFaDigit()) + "\n\t\t\t\t\t")])])
	  }))]) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-8c0fd014", module.exports)
	  }
	}

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.loading) ? _c('div', {
	    staticClass: "row"
	  }, [_vm._m(0)]) : _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v(_vm._s(_vm.header) + "  فیلم ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('form', {
	    staticClass: "form-horizontal tasi-form",
	    attrs: {
	      "method": "get"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("نام فیلم")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.title),
	      expression: "movie.title"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movie.title)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movie.title = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("سبک")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.type),
	      expression: "movie.type"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movie.type)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movie.type = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("کارگردان")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.director),
	      expression: "movie.director"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movie.director)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movie.director = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("تهیه کننده")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.producer),
	      expression: "movie.producer"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movie.producer)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movie.producer = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("سال ساخت")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.year),
	      expression: "movie.year"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movie.year)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movie.year = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("بازیگران")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.actors),
	      expression: "movie.actors"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movie.actors)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movie.actors = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("سایر عوامل فیلم ")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.other_agents),
	      expression: "movie.other_agents"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movie.other_agents)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movie.other_agents = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("داستان فیلم ")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.des),
	      expression: "movie.des"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movie.des)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movie.des = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("مدت فیلم (دقیقه)")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.time_out),
	      expression: "movie.time_out"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movie.time_out)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movie.time_out = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("قیمت صندلی (تومان)")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.price),
	      expression: "movie.price"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movie.price)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movie.price = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("قیمت نیم بها (تومان)")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.half_price),
	      expression: "movie.half_price"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.movie.half_price)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.movie.half_price = $event.target.value
	      }
	    }
	  })])])])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-6"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v(" تصویر کاور فیلم ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('imageInput', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.image),
	      expression: "movie.image"
	    }],
	    attrs: {
	      "name": "image"
	    },
	    domProps: {
	      "value": (_vm.movie.image)
	    },
	    on: {
	      "change": _vm.onFileChange,
	      "input": function($event) {
	        _vm.movie.image = $event
	      }
	    }
	  }, [_vm._v("\n                        سایز عکس 20px * 40px\n                   ")])], 1)])]), _vm._v(" "), _c('div', {
	    staticClass: "col-lg-6"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v(" تصویر پسزمینه فیلم ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('imageInput', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.bg_image),
	      expression: "movie.bg_image"
	    }],
	    attrs: {
	      "name": "bgImage"
	    },
	    domProps: {
	      "value": (_vm.movie.bg_image)
	    },
	    on: {
	      "change": _vm.onFileChange,
	      "input": function($event) {
	        _vm.movie.bg_image = $event
	      }
	    }
	  }, [_vm._v("\n                        سایز عکس 100px * 80px\n                    ")])], 1)])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("گالری ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('imageInput', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.movie.scenes),
	      expression: "movie.scenes"
	    }],
	    attrs: {
	      "name": "scenes",
	      "multiple": ""
	    },
	    domProps: {
	      "value": (_vm.movie.scenes)
	    },
	    on: {
	      "change": _vm.onFileChange,
	      "input": function($event) {
	        _vm.movie.scenes = $event
	      }
	    }
	  }, [_vm._v("\n                        سایز عکس 100px * 80px\n                    ")])], 1)])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("تاریخ و سانس")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "w3-row"
	  }, [_c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_c('thead', [_c('tr', [_c('th'), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("تاریخ ها")]), _vm._v(" "), _c('th', [_vm._v("سانس ها")]), _vm._v(" "), _c('th', [_vm._v("نیم بها")])])]), _vm._v(" "), _c('tbody', [(_vm.movie.chart.length == 0) ? _c('tr', {
	    staticClass: "w3-text-grey"
	  }, [_c('td', [_vm._v("هنوز تاریخی ثبت نشده است")])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.movie.chart), function(r, i) {
	    return _c('tr', [_c('td', [_c('button', {
	      staticClass: "btn btn-danger",
	      on: {
	        "click": function($event) {
	          _vm.remove_date(i)
	        }
	      }
	    }, [_c('i', {
	      staticClass: "icon-trash"
	    })])]), _vm._v(" "), _c('td', [_c('datePicker', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (r.date),
	        expression: "r.date"
	      }],
	      domProps: {
	        "value": (r.date)
	      },
	      on: {
	        "input": function($event) {
	          r.date = $event
	        }
	      }
	    })], 1), _vm._v(" "), _c('td', [_c('timePicker', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (r.times),
	        expression: "r.times"
	      }],
	      domProps: {
	        "value": (r.times)
	      },
	      on: {
	        "input": function($event) {
	          r.times = $event
	        }
	      }
	    })], 1), _vm._v(" "), _c('td', [_c('input', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (r.is_half_price),
	        expression: "r.is_half_price"
	      }],
	      staticClass: "form-control",
	      attrs: {
	        "type": "checkbox"
	      },
	      domProps: {
	        "checked": Array.isArray(r.is_half_price) ? _vm._i(r.is_half_price, null) > -1 : (r.is_half_price)
	      },
	      on: {
	        "click": function($event) {
	          var $$a = r.is_half_price,
	            $$el = $event.target,
	            $$c = $$el.checked ? (true) : (false);
	          if (Array.isArray($$a)) {
	            var $$v = null,
	              $$i = _vm._i($$a, $$v);
	            if ($$c) {
	              $$i < 0 && (r.is_half_price = $$a.concat($$v))
	            } else {
	              $$i > -1 && (r.is_half_price = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	            }
	          } else {
	            r.is_half_price = $$c
	          }
	        }
	      }
	    })])])
	  })], 2)])]), _vm._v(" "), _c('div', {
	    staticClass: "w3-row "
	  }, [_c('button', {
	    staticClass: "w3-right btn btn-primary",
	    on: {
	      "click": function($event) {
	        _vm.new_date()
	      }
	    }
	  }, [_vm._v("+تاریخ جدید")])])])])])])]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-success",
	    attrs: {
	      "type": "button",
	      "disabled": _vm.is_save
	    },
	    on: {
	      "click": function($event) {
	        _vm.sendForm(_vm.movie, _vm.formUrl, _vm.progress)
	      }
	    }
	  }, [_vm._v("ذخیره \n        "), (_vm.is_save) ? _c('i', {
	    staticClass: "loading-style"
	  }, [_vm._v(_vm._s(_vm.loadingProgress))]) : _vm._e()])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('div', {
	    staticClass: "panel-body"
	  }, [_vm._v("\n                درحال بارگزاری...\n            ")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4d7fd1b6", module.exports)
	  }
	}

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(190)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(192),
	  /* template */
	  __webpack_require__(193),
	  /* scopeId */
	  "data-v-7e461eac",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/releaseConcert.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] releaseConcert.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7e461eac", Component.options)
	  } else {
	    hotAPI.reload("data-v-7e461eac", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(191);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("95fdc398", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7e461eac\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./releaseConcert.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7e461eac\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./releaseConcert.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.loading-style[data-v-7e461eac]{\n\n    padding: 0 20px\n}\n.box[data-v-7e461eac]{\n    width:150px;\n}\ninput[type='checkbox'][data-v-7e461eac]{\n    box-shadow: none;\n}\n\n\n", ""]);

	// exports


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _send_form = __webpack_require__(29);

	var _send_form2 = _interopRequireDefault(_send_form);

	var _datepicker = __webpack_require__(178);

	var _datepicker2 = _interopRequireDefault(_datepicker);

	var _timepicker = __webpack_require__(183);

	var _timepicker2 = _interopRequireDefault(_timepicker);

	var _imageInput = __webpack_require__(45);

	var _imageInput2 = _interopRequireDefault(_imageInput);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

	    mixins: [_send_form2.default],

	    components: { timePicker: _timepicker2.default, datePicker: _datepicker2.default, imageInput: _imageInput2.default },

	    data: function data() {
	        return {

	            rowsCount: 15,

	            rowsPrice: new Array(15).fill(),

	            loading: true,

	            loadingProgress: "",

	            concert: {
	                chart: [],
	                title: '',
	                des: '',
	                bg_image: '',
	                image: '',
	                prices_list: []

	            },
	            formUrl: 'api/new_concert',
	            showTimes: this.$root.showTimes

	        };
	    },


	    methods: {
	        save: function save() {

	            this.concert.prices_list = this.rowsPrice;

	            this.sendForm(this.concert, this.formUrl, function () {
	                alert("saved!!!!??");
	            });
	        },
	        priceInput: function priceInput(r, i, e) {

	            var oldval = this.rowsPrice[i];
	            var newval = $(e.target).val();

	            var oi = this.rowsPrice.indexOf(oldval, i);
	            console.log(oi);
	            for (var j = oi + 1; j < this.rowsPrice.length; j++) {
	                if (this.rowsPrice[j] == undefined || this.rowsPrice[j] == "" || this.rowsPrice[j] == oldval) {
	                    this.$set(this.rowsPrice, j, newval);
	                } else {
	                    break;
	                }
	            }

	            this.$set(this.rowsPrice, i, newval);
	        },
	        new_date: function new_date() {

	            this.concert.chart.push({ date: "", times: [] });
	        },
	        remove_date: function remove_date(i) {

	            this.concert.chart.splice(i, 1);
	            // this.$http.get("api/delete_showtime", {params:{ id: }})
	        }
	    },

	    created: function created() {
	        var _this = this;

	        var id = this.$route.query.id;
	        if (id) {
	            setTimeout(function () {
	                _this.$http.get("api/get_concerts?id=" + id).then(function (res) {

	                    _this.loading = false;
	                    _this.concert = res.body;
	                    _this.rowsPrice = _this.concert.prices_list.split(' ');
	                    console.log(res.body);
	                });
	            }, 1000);
	        } else {
	            this.loading = false;
	        }
	    },


	    computed: {
	        header: function header() {
	            return this.$route.query.id ? 'ویرایش ' : 'اضافه کردن ';
	        },

	        is_save: function is_save() {
	            return this.loadingProgress.length > 0;
	        }
	    }
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.loading) ? _c('div', {
	    staticClass: "row"
	  }, [_vm._m(0)]) : _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("مشخصات کنسرت ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('form', {
	    staticClass: "form-horizontal tasi-form",
	    attrs: {
	      "method": "get"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("عنوان کنسرت")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.concert.title),
	      expression: "concert.title"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.concert.title)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.concert.title = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("توضیحات")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.concert.des),
	      expression: "concert.des"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.concert.des)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.concert.des = $event.target.value
	      }
	    }
	  })])])])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-6"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v(" تصویر کاور فیلم ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('imageInput', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.concert.image),
	      expression: "concert.image"
	    }],
	    attrs: {
	      "name": "image"
	    },
	    domProps: {
	      "value": (_vm.concert.image)
	    },
	    on: {
	      "change": _vm.onFileChange,
	      "input": function($event) {
	        _vm.concert.image = $event
	      }
	    }
	  }, [_vm._v("\n                        سایز عکس 20px * 40px\n                   ")])], 1)])]), _vm._v(" "), _c('div', {
	    staticClass: "col-lg-6"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v(" تصویر پسزمینه فیلم ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('imageInput', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.concert.bg_image),
	      expression: "concert.bg_image"
	    }],
	    attrs: {
	      "name": "bgImage"
	    },
	    domProps: {
	      "value": (_vm.concert.bg_image)
	    },
	    on: {
	      "change": _vm.onFileChange,
	      "input": function($event) {
	        _vm.concert.bg_image = $event
	      }
	    }
	  }, [_vm._v("\n                        سایز عکس 100px * 80px\n                    ")])], 1)])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("قیمت صندلی ها")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('form', {
	    staticClass: "form-horizontal tasi-form",
	    attrs: {
	      "method": "get"
	    }
	  }, _vm._l((_vm.rowsCount), function(r, i) {
	    return _c('div', {
	      staticClass: "form-group"
	    }, [_c('label', {
	      staticClass: "col-sm-2 control-label"
	    }, [_c('span', {
	      staticStyle: {
	        "font-weight": "100"
	      }
	    }, [_vm._v("ردیف شماره ")]), _vm._v(_vm._s((15 - r) + 1))]), _vm._v(" "), _c('div', {
	      staticClass: "col-sm-10"
	    }, [_c('input', {
	      staticClass: "form-control",
	      attrs: {
	        "type": "text"
	      },
	      domProps: {
	        "value": _vm.rowsPrice[i]
	      },
	      on: {
	        "input": function($event) {
	          _vm.priceInput(r, i, $event)
	        }
	      }
	    })])])
	  }))])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("تاریخ و سانس")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "w3-row"
	  }, [_c('table', {
	    staticClass: "table table-striped table-advance table-hover"
	  }, [_c('thead', [_c('tr', [_c('th'), _vm._v(" "), _c('th', [_c('i', {
	    staticClass: "icon-bullhorn"
	  }), _vm._v("تاریخ ها")]), _vm._v(" "), _c('th', [_vm._v("سانس ها")])])]), _vm._v(" "), _c('tbody', [(_vm.concert.chart.length == 0) ? _c('tr', {
	    staticClass: "w3-text-grey"
	  }, [_c('td', [_vm._v("هنوز تاریخی ثبت نشده است")])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.concert.chart), function(r, i) {
	    return _c('tr', [_c('td', [_c('button', {
	      staticClass: "btn btn-danger",
	      on: {
	        "click": function($event) {
	          _vm.remove_date(i)
	        }
	      }
	    }, [_c('i', {
	      staticClass: "icon-trash"
	    })])]), _vm._v(" "), _c('td', [_c('datePicker', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (r.date),
	        expression: "r.date"
	      }],
	      domProps: {
	        "value": (r.date)
	      },
	      on: {
	        "input": function($event) {
	          r.date = $event
	        }
	      }
	    })], 1), _vm._v(" "), _c('td', [_c('timePicker', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (r.times),
	        expression: "r.times"
	      }],
	      domProps: {
	        "value": (r.times)
	      },
	      on: {
	        "input": function($event) {
	          r.times = $event
	        }
	      }
	    })], 1)])
	  })], 2)])]), _vm._v(" "), _c('div', {
	    staticClass: "w3-row "
	  }, [_c('button', {
	    staticClass: "w3-right btn btn-primary",
	    on: {
	      "click": function($event) {
	        _vm.new_date()
	      }
	    }
	  }, [_vm._v("+تاریخ جدید")])])])])])])]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-success",
	    attrs: {
	      "type": "button",
	      "disabled": _vm.is_save
	    },
	    on: {
	      "click": function($event) {
	        _vm.save()
	      }
	    }
	  }, [_vm._v("ذخیره \n       \n    ")])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('div', {
	    staticClass: "panel-body"
	  }, [_vm._v("\n                درحال بارگزاری...\n            ")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7e461eac", module.exports)
	  }
	}

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(195)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(197),
	  /* template */
	  __webpack_require__(203),
	  /* scopeId */
	  "data-v-5cab87f9",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/releasePage.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] releasePage.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5cab87f9", Component.options)
	  } else {
	    hotAPI.reload("data-v-5cab87f9", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(196);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("3dee5570", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5cab87f9\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./releasePage.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5cab87f9\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./releasePage.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _send_form = __webpack_require__(29);

	var _send_form2 = _interopRequireDefault(_send_form);

	var _tinymce = __webpack_require__(198);

	var _tinymce2 = _interopRequireDefault(_tinymce);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

	    mixins: [_send_form2.default],

	    components: {
	        tinymce: _tinymce2.default
	    },

	    data: function data() {
	        return {

	            loading: true,

	            page: {

	                title: '',
	                des: '',
	                uri: ''
	            }

	        };
	    },
	    created: function created() {

	        this.get_page_by_id_query();
	    },

	    methods: {

	        get_page_by_id_query: function get_page_by_id_query() {
	            var _this = this;

	            this.loading = true;

	            var id = this.$route.query.id;
	            if (id) {

	                setTimeout(function () {
	                    _this.$http.get("api/get_pages?id=" + id).then(function (res) {

	                        _this.page = res.body;
	                        _this.loading = false;
	                        console.log(_this.page);
	                    });
	                }, 1000);
	            } else {

	                this.loading = false;
	            }
	        },

	        save: function save() {
	            this.$http.post("api/new_page", this.page).then(function (res) {

	                if (res.body.status == "1") {
	                    alert("save");
	                } else {
	                    alert("error");
	                }
	                console.log(res.body);
	            });
	        }
	    }

	};

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(199)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(201),
	  /* template */
	  __webpack_require__(202),
	  /* scopeId */
	  "data-v-0a0ea744",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/com/tinymce.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] tinymce.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0a0ea744", Component.options)
	  } else {
	    hotAPI.reload("data-v-0a0ea744", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(200);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("530f39f2", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0a0ea744\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tinymce.vue", function() {
	     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0a0ea744\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tinymce.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n#tinymce-editor[data-v-0a0ea744]{\n}\n.hidden[data-v-0a0ea744]{display:none;\n}\n\n", ""]);

	// exports


/***/ },
/* 201 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

		props: ["value"],
		data: function data() {
			return {

				randName: "tinymce-" + Math.floor(Math.random() * 1000000000 + 1),
				text: ''
			};
		},

		watch: {
			value: function value(val) {
				this.text = val;
			},
			text: function text(val) {

				this.$emit("input", val);
			}
		},
		created: function created() {

			if (this.value != undefined) this.text = this.value;
		},
		mounted: function mounted() {

			var self = this;
			var el = this.randName;

			setTimeout(function () {

				tinymce.init({
					selector: "#" + el,
					directionality: 'rtl',
					height: 500,
					paste_data_images: true,
					plugins: ["advlist autolink lists link image charmap print preview hr anchor pagebreak", "searchreplace wordcount visualblocks visualchars code fullscreen", "insertdatetime media nonbreaking save table contextmenu directionality", "emoticons template paste textcolor colorpicker textpattern"],
					toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
					images_upload_url: self.$root.rootUrl + 'api/upload_image',
					automatic_uploads: true,
					relative_urls: false,
					valid_elements: '*[*]',
					remove_script_host: false,
					file_picker_callback: function file_picker_callback(callback, value, meta) {
						if (meta.filetype == 'image') {
							$('#upload').trigger('click');
							$('#upload').on('change', function () {
								var file = this.files[0];
								var reader = new FileReader();
								reader.onload = function (e) {
									callback(e.target.result, {
										alt: ''
									});
								};
								reader.readAsDataURL(file);
							});
						}
					},
					setup: function setup(editor) {

						editor.on('init', function () {
							setTimeout(function () {

								tinymce.get(el).setContent(self.text);
							}, 100);
						});

						editor.addButton('upImage', {
							text: 'image',
							icon: false,
							onclick: function onclick() {
								editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
							}
						});

						editor.on('change', function () {

							var new_value = tinymce.get(el).getContent();

							self.text = new_value;
						});
					}
				});
			}, 100);
		}
	};

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('textarea', {
	    attrs: {
	      "id": _vm.randName
	    }
	  }), _vm._v(" "), _c('input', {
	    staticClass: "hidden",
	    attrs: {
	      "name": "image",
	      "type": "file",
	      "id": "upload",
	      "onchange": ""
	    }
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0a0ea744", module.exports)
	  }
	}

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [(_vm.loading) ? _c('div', {
	    staticClass: "row"
	  }, [_vm._m(0)]) : _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v(" اطلاعات صفحه ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('form', {
	    staticClass: "form-horizontal tasi-form",
	    attrs: {
	      "method": "get"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("عنوان")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.page.title),
	      expression: "page.title"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.page.title)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.page.title = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("محتوا")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('tinymce', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.page.des),
	      expression: "page.des"
	    }],
	    domProps: {
	      "value": (_vm.page.des)
	    },
	    on: {
	      "input": function($event) {
	        _vm.page.des = $event
	      }
	    }
	  })], 1)]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("مسیر")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.page.uri),
	      expression: "page.uri"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.page.uri)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.page.uri = $event.target.value
	      }
	    }
	  })])])])])])])]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": _vm.save
	    }
	  }, [_vm._v("ذخیره")])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('div', {
	    staticClass: "panel-body"
	  }, [_vm._v("\n                    درحال بارگزاری...\n                ")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5cab87f9", module.exports)
	  }
	}

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(205)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(207),
	  /* template */
	  __webpack_require__(208),
	  /* scopeId */
	  "data-v-7c94ee3d",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/admin/releaseNews.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] releaseNews.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7c94ee3d", Component.options)
	  } else {
	    hotAPI.reload("data-v-7c94ee3d", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(206);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("088c1af5", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7c94ee3d\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./releaseNews.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7c94ee3d\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./releaseNews.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _send_form = __webpack_require__(29);

	var _send_form2 = _interopRequireDefault(_send_form);

	var _tinymce = __webpack_require__(198);

	var _tinymce2 = _interopRequireDefault(_tinymce);

	var _imageInput = __webpack_require__(45);

	var _imageInput2 = _interopRequireDefault(_imageInput);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    mixins: [_send_form2.default],

	    components: {
	        imageInput: _imageInput2.default,
	        tinymce: _tinymce2.default
	    },

	    data: function data() {
	        return {

	            loading: true,

	            news: {

	                title: '',
	                des: '',
	                image: '',
	                public: '1'
	            },

	            formUrl: 'api/new_news'

	        };
	    },
	    created: function created() {

	        this.get_news_by_id_query();
	    },

	    methods: {
	        progress: function progress(p) {

	            if (p.finish) {
	                alert("save");
	            }
	        },


	        get_news_by_id_query: function get_news_by_id_query() {
	            var _this = this;

	            this.loading = true;

	            var id = this.$route.query.id;
	            if (id) {

	                setTimeout(function () {
	                    _this.$http.get("api/get_news?id=" + id).then(function (res) {

	                        _this.news = res.body;
	                        _this.loading = false;
	                        console.log(_this.news);
	                    });
	                }, 1000);
	            } else {

	                this.loading = false;
	            }
	        }

	    }

	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [(_vm.loading) ? _c('div', {
	    staticClass: "row"
	  }, [_vm._m(0)]) : _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v(" اطلاعات خبر ")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('form', {
	    staticClass: "form-horizontal tasi-form",
	    attrs: {
	      "method": "get"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("عنوان")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.news.title),
	      expression: "news.title"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.news.title)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.news.title = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("متن خبر")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('tinymce', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.news.des),
	      expression: "news.des"
	    }],
	    domProps: {
	      "value": (_vm.news.des)
	    },
	    on: {
	      "input": function($event) {
	        _vm.news.des = $event
	      }
	    }
	  })], 1)]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('label', {
	    staticClass: "col-sm-2 control-label"
	  }, [_vm._v("نمایش")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.news.public),
	      expression: "news.public"
	    }],
	    attrs: {
	      "type": "checkbox"
	    },
	    domProps: {
	      "checked": Array.isArray(_vm.news.public) ? _vm._i(_vm.news.public, null) > -1 : (_vm.news.public)
	    },
	    on: {
	      "click": function($event) {
	        var $$a = _vm.news.public,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = null,
	            $$i = _vm._i($$a, $$v);
	          if ($$c) {
	            $$i < 0 && (_vm.news.public = $$a.concat($$v))
	          } else {
	            $$i > -1 && (_vm.news.public = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          _vm.news.public = $$c
	        }
	      }
	    }
	  }), _vm._v("\n                                    نمایش این خبر به همه\n                                ")])])])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('header', {
	    staticClass: "panel-heading"
	  }, [_vm._v("تصویر خبر")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body form-horizontal tasi-form"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('imageInput', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.news.image),
	      expression: "news.image"
	    }],
	    attrs: {
	      "name": "news_image"
	    },
	    domProps: {
	      "value": (_vm.news.image)
	    },
	    on: {
	      "change": _vm.onFileChange,
	      "input": function($event) {
	        _vm.news.image = $event
	      }
	    }
	  }, [_vm._v("\n                                سایز عکس 50px * 100px\n                            ")])], 1)])])])]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.sendForm(_vm.news, _vm.formUrl, _vm.progress)
	      }
	    }
	  }, [_vm._v("ذخیره")])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-lg-12"
	  }, [_c('section', {
	    staticClass: "panel"
	  }, [_c('div', {
	    staticClass: "panel-body"
	  }, [_vm._v("\n                    درحال بارگزاری...\n                ")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7c94ee3d", module.exports)
	  }
	}

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ticketView = __webpack_require__(210);

	var _ticketView2 = _interopRequireDefault(_ticketView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {

	  components: { ticketView2: _ticketView2.default },

	  data: function data() {
	    return {

	      ticketData: {},
	      ticket: {}

	    };
	  },
	  created: function created() {

	    this.load_ticket_data();
	  },


	  methods: {
	    load_ticket_data: function load_ticket_data() {
	      var _this = this;

	      var fid = SERVER['fid'];
	      var params = { fid: fid };
	      this.$http.get('api/get_ticket', { params: params }).then(function (res) {
	        console.log(res.body);
	        _this.ticket = res.body;
	        if (_this.ticket.code) _this.ticketData = {
	          isConcert: _this.ticket.is_concert,
	          code: _this.ticket.code,
	          spacedCode: _this.spacedCode,
	          date: _this.ticket.date,
	          time: _this.ticket.time,
	          movieName: _this.ticket.movie_name,
	          chairsAlpha: _this.get_chairs_alpha,
	          chairsCount: _this.ticket.chairs.split(' ').length,
	          chairsNumber: _this.ticket.chairs,
	          totalPrice: _this.ticket.total_price
	        };
	      });
	    },
	    printTicket: function printTicket() {

	      window.print();
	    },
	    saveTicket: function saveTicket() {

	      var pdf = new jsPDF('p', 'pt', 'a4');
	      pdf.addHTML($('#ticketView2'), 0, 5, {}, function () {
	        pdf.save('ticket.pdf');
	      });
	    }
	  },

	  computed: {
	    sort_chairs: function sort_chairs() {

	      var chairs = this.ticket.chairs.split(' ');
	      var a = chairs.sort(function (a, b) {
	        a = parseInt(a.split('-').join(''));
	        b = parseInt(b.split('-').join(''));
	        return a > b;
	      });

	      return a;
	    },
	    spacedCode: function spacedCode() {

	      return this.ticket.code.split('').join(' ');
	    },
	    status_msg: function status_msg() {
	      return 'پرداخت انجام ' + (this.status ? 'شد' : 'نشد');
	    },
	    get_chairs_alpha: function get_chairs_alpha() {
	      var rows = [];
	      var text = [];
	      var chairs = this.sort_chairs;
	      chairs.some(function (el) {

	        var x = el.split('-');
	        var r = x[0];
	        var c = x[1];
	        var i = rows.indexOf(parseInt(r));

	        if (i == -1) {

	          rows.push(parseInt(r));
	          text.push('\u0631\u062F\u06CC\u0641 ' + r + ' \u0635\u0646\u062F\u0644\u06CC ' + c + ' ');
	        } else {

	          text[i] += ' , ' + c + ' ';
	        }
	      });

	      return text.join(" ");
	    }
	  }

	};

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(211)
	__webpack_require__(213)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(215),
	  /* template */
	  __webpack_require__(216),
	  /* scopeId */
	  "data-v-455dd8c4",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/ticketView2.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] ticketView2.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-455dd8c4", Component.options)
	  } else {
	    hotAPI.reload("data-v-455dd8c4", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(212);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("21a57302", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-455dd8c4\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ticketView2.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-455dd8c4\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ticketView2.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.red{\n\tcolor:red !important;\n}\n@media print {\n@page {\n\t\tmargin: 20px;\n\t\tpadding: 0;\n}\n#ticketView2 {\n\t\tdisplay: block !important;\n}\nbody * {\n\t\tvisibility: hidden;\n}\n#ticketView2, #ticketView2 * {\n\t\tvisibility: visible;\n}\n#ticketView2 {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: 0;\n}\n.title{\n\t\tvisibility: visible;\n}\n.box{\n     \tfont-size: 20px\n}\n}\n\n", ""]);

	// exports


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(214);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("3fd00c66", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-455dd8c4\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./ticketView2.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-455dd8c4\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./ticketView2.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\ndiv.code[data-v-455dd8c4] {\n  text-align: justify;\n      direction: ltr;\n}\ndiv.code[data-v-455dd8c4]:after {\n  content: \"\";\n  display: inline-block;\n  width: 100%;\n}\n#barcodeImage[data-v-455dd8c4]{\n\theight: 60px;\n\twidth: 100%;\n}\n.box[data-v-455dd8c4]{\n\tpadding: 10px;\n\tbackground: #fbfbfb;\n\twidth: 100%;\n\tdisplay: inline-block;\n\tborder: 1px solid #efefef;\n\tfont-family: 'yekan normal';\n\tfont-size: 16px;\n}\nstrong[data-v-455dd8c4]{\n\tfont-weight: bold;\n}\nh1[data-v-455dd8c4]{\n\tfont-size: 34px;\n\tfont-weight: bold;\n}\n.row[data-v-455dd8c4]{\n\tpadding:10px;\n}\nul[data-v-455dd8c4]{\n\tmargin: 0;\n\tpadding:0;\n}\nli[data-v-455dd8c4]{\n\tlist-style: none;\n\tmargin: 0;padding: 0;\n}\n#ticketView2[data-v-455dd8c4] {\n\twidth: 100%;\n\t    background: #fbfbfb;\n    \n    box-shadow: 0 0 5px #d0d0d0;\n    margin: 10px 0;\n    padding: 20px;\n}\n.title[data-v-455dd8c4]{\n\tvisibility: hidden;\n}\n.left[data-v-455dd8c4]{\n\tdirection: ltr !important\n}\n\n\n\n", ""]);

	// exports


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _jsbarcode = __webpack_require__(84);

	var _jsbarcode2 = _interopRequireDefault(_jsbarcode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

		props: ["value", "show"],
		data: function data() {
			return {
				imgPath: SERVER['base'] + '/assets/img/'
			};
		},
		created: function created() {

			console.log(this.value);
			console.log("ticket View");
		},

		computed: {
			title_msg: function title_msg() {
				return this.value.isConcert ? 'عنوان برنامه' : 'عوان فیلم';
			},
			datetime_msg: function datetime_msg() {
				return this.value.isConcert ? 'اجرا' : 'اکران';
			}
		},
		watch: {

			value: {
				handler: function handler(val) {
					if (val.code) {
						console.log("barcdoe change");
						(0, _jsbarcode2.default)("#barcodeImage", val.code, {
							displayValue: false,
							height: 360,
							width: 14
						});
					}
				},

				deep: true
			}
		}

	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.show),
	      expression: "show"
	    }],
	    attrs: {
	      "id": "ticketView2"
	    }
	  }, [_c('ul', [_c('li', [_c('div', {
	    staticClass: "clearfix"
	  }), _vm._v(" "), _c('div', {
	    attrs: {
	      "id": "container"
	    }
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_vm._m(0), _vm._v(" "), _c('div', {
	    staticClass: "col-xs-4 text-left"
	  }, [_c('img', {
	    attrs: {
	      "id": "barcodeImage"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "code"
	  }, [_c('strong', [_vm._v(_vm._s(_vm.value.spacedCode))])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row "
	  }, [_c('div', {
	    staticClass: "col-xs-5 "
	  }, [_c('span', {
	    staticClass: "box"
	  }, [_vm._v(" " + _vm._s(_vm.title_msg) + " : "), _c('strong', [_vm._v(_vm._s(_vm.value.movieName))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-xs-4 "
	  }, [_c('span', {
	    staticClass: "box"
	  }, [_vm._v("زمان " + _vm._s(_vm.datetime_msg) + " : "), _c('strong', [_vm._v(_vm._s(_vm.value.date) + " -  " + _vm._s(_vm.value.time))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-xs-3 "
	  }, [_c('span', {
	    staticClass: "box"
	  }, [_vm._v("تعداد صندلی ها : "), _c('strong', [_vm._v(_vm._s(_vm.value.chairsCount))])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row "
	  }, [_c('div', {
	    staticClass: "col-xs-12 "
	  }, [_c('span', {
	    staticClass: "box"
	  }, [_vm._v("مکان صندلی ها : "), _c('strong', [_vm._v(_vm._s(_vm.value.chairsAlpha))])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_vm._m(1), _vm._v(" "), _c('div', {
	    staticClass: "col-xs-9 "
	  }, [_c('span', {
	    staticClass: "box"
	  }, [_vm._v("هزینه پرداخت شده  : "), _c('strong', [_vm._v(_vm._s(_vm.value.totalPrice) + " تومان")])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row red"
	  }, [_vm._v("\n\t        \tبا در دست داشتن شماره بليط ( " + _vm._s(_vm.value.code) + " ) مي توانيد با مراجعه با باجه فروش بليط ، بليط خود را چاپ نماييد.\n\n\t        ")])])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-xs-8"
	  }, [_c('h1', {
	    staticClass: "title"
	  }, [_vm._v("سینما ستاره")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-xs-3 "
	  }, [_c('span', {
	    staticClass: "box"
	  }, [_vm._v("تخفیف : "), _c('strong', [_vm._v("0")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-455dd8c4", module.exports)
	  }
	}

/***/ },
/* 217 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {

	  components: {},

	  data: function data() {
	    return {
	      /*   movies :  [],
	         concerts :  [],
	         nextMovie :  {},
	         movieTrailer : {},
	         promotions :  [],
	         setting :  {},
	         news :  [],
	         slider : {},*/

	      mobile: "",
	      mobileMsg: ""

	    };
	  },
	  created: function created() {
	    console.log("index");

	    /*  this.setting = SERVER['setting'] ? JSON.parse(SERVER['setting']) : {}
	      this.promotions = SERVER['promotions'] ? JSON.parse(SERVER['promotions']) : []
	      this.news = SERVER['news'] ? JSON.parse(SERVER['news']) : []
	      this.movieTrailer = SERVER['movie_trailer'] ? JSON.parse(SERVER['movie_trailer']) : {}
	      this.nextMovie = SERVER['next_movie'] ? JSON.parse(SERVER['next_movie']) : {}
	      this.movies = SERVER['movies'] ? SERVER['movies'] : []
	      this.concerts = SERVER['concerts'] ? SERVER['concerts'] : []
	      this.slider = SERVER['slider'] ? JSON.parse(SERVER['slider']) : {slides:[]}
	    */
	  },


	  methods: {
	    sendMobile: function sendMobile() {
	      var _this = this;

	      var el = this.$refs.mobileDialog;
	      el.style.display = "block";

	      this.mobileMsg = "لطفا صبر کنید ...";
	      setTimeout(function () {
	        _this.$http.post("api/new_mobile", { number: _this.mobile }).then(function (res) {
	          var time = 4000;
	          if (res.body.status == "1") {
	            _this.mobileMsg = "شماره شما با موفقیت ثبت شد.";
	            time = 1000;
	          } else {
	            _this.mobileMsg = "مشکلی در ثبت بوجود آمده! <br> لطفا شماره درست را وارد کنید یا بعدا امتحان کنید.";
	          }
	          setTimeout(function () {
	            el.style.display = "none";
	          }, time);
	        });
	      }, 1000);
	    }
	  }

	};

/***/ },
/* 218 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  data: function data() {
	    return {
	      address: "test address",
	      phone: "009898987-876"
	    };
	  },
	  created: function created() {
	    console.log('Page');
	  },


	  components: {}

	};

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chairs = __webpack_require__(138);

	var _chairs2 = _interopRequireDefault(_chairs);

	var _ticketView = __webpack_require__(80);

	var _ticketView2 = _interopRequireDefault(_ticketView);

	var _checkTicket = __webpack_require__(129);

	var _checkTicket2 = _interopRequireDefault(_checkTicket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {

	  components: { chairs: _chairs2.default, ticketView: _ticketView2.default, checkTicketPage: _checkTicket2.default },

	  data: function data() {
	    return {

	      firstShowtime: {},

	      date: '',
	      time: '',
	      currentTicketCode: '',
	      lables: ["اول", "دوم", "سوم", "چهارم", "پنجم", "شیشم", "هفتم", "هشتم", "نهم", "دهم", "یازدهم", "دوازدهم", "سیزدهم", "چهاردهم", "پانزدهم"],

	      movie: {},
	      movies: [],
	      showtime: {},
	      ticketData: {},
	      allShowtimes: [],
	      allMovieShowtimes: [],
	      selectedChairs: [],
	      purchasedChairs: [],

	      loading: true,
	      loadingSans: false,
	      loadingWrapper: false,

	      entity: SERVER['entity']
	    };
	  },


	  watch: {
	    showtime: function showtime(val, oldVal) {
	      var _this = this;

	      if (val.id == oldVal.id) return;

	      this.movie = val.movie;

	      this.loadingSans = true;
	      setTimeout(function () {
	        _this.get_sold_chairs(val.uniqe_id, function () {
	          _this.loadingSans = false;
	        });
	      }, 1000);
	    }
	  },

	  methods: {
	    sansSelect: function sansSelect(s) {

	      if (s.id == this.showtime.id) return;
	      this.showtime = s;
	    },
	    init: function init() {
	      var _this2 = this;

	      var interval;
	      this.movies = [];
	      this.movie = {};
	      this.showtime = {};
	      this.allShowtimes = [];
	      this.allMovieShowtimes = [];
	      this.selectedChairs = [];
	      this.loading = true;
	      this.loadingSans = false;
	      this.loadingWrapper = false;

	      setTimeout(function () {

	        var params = {
	          table: _this2.entity == "concert" ? "concertReserve" : "Reserve",
	          withInfo: true
	        };
	        _this2.$http.get("api/get_next_showtime", { params: params }).then(function (res) {
	          _this2.purchasedChairs = [];
	          if (res.body.chairs_sold != "" && res.body.chairs_sold != "null" && res.body.chairs_sold != undefined) _this2.purchasedChairs = JSON.parse(res.body.chairs_sold);
	          console.log("next");
	          console.log(res.body);
	          _this2.showtime = res.body;
	          _this2.firstShowtime = res.body;
	          _this2.date = res.body.date;
	          _this2.time = res.body.id;

	          if (res.body.m_id || res.body.c_id) {
	            var _params = {
	              table: _this2.entity == "concert" ? "concertReserve" : "Reserve",
	              date: res.body.date,
	              delay: 60,
	              withInfo: true
	            };
	            _this2.$http.get("api/get_showtimes_by_date", { params: _params }).then(function (res) {

	              _this2.allShowtimes = res.body;
	              console.log("by date");
	              console.log(res.body);
	              _this2.loading = false;

	              var getAllShowtimesApiName = _this2.entity == "film" ? 'get_all_movies_showtimes' : 'get_all_concerts_showtimes';
	              _this2.$http.get("api/" + getAllShowtimesApiName).then(function (res) {
	                _this2.allMovieShowtimes = res.body;
	                console.log("res.body");
	                console.log(res.body);
	              });

	              interval = setInterval(function () {
	                console.log("Update Interval");
	                _this2.get_sold_chairs(_this2.showtime.uniqe_id, function (res) {

	                  if (res.status == "0") {
	                    clearInterval(interval);
	                    _this2.init();
	                  }
	                });

	                _this2.$http.get("api/" + getAllShowtimesApiName).then(function (res) {

	                  if (res.body.length == 0) {

	                    clearInterval(interval);
	                    _this2.init();
	                  } else {

	                    console.log("all Movie showtimes:");
	                    console.log(res.body);
	                    var olds = _this2.allMovieShowtimes.length;
	                    var news = res.body.length;
	                    if (news != olds) {
	                      var allSans = res.body;
	                      console.log('allMovieShowtimes is Change');
	                      _this2.$http.get("api/get_next_showtime").then(function (res) {
	                        if (!res.body) {
	                          _this2.init();
	                        } else {
	                          console.log(res.body);
	                          _this2.allMovieShowtimes = allSans;

	                          _this2.firstShowtime = res.body;
	                          _this2.date = _this2.firstShowtime.date;
	                          _this2.time = _this2.firstShowtime.id;
	                          _this2.showtime = _this2.firstShowtime;
	                        }
	                      });
	                    }
	                  }
	                });
	              }, 10000);
	            });
	          } else {
	            _this2.loading = false;
	          }
	        });
	      }, 1000);
	    },
	    sendFactor: function sendFactor() {
	      var _this3 = this;

	      this.loadingWrapper = true;

	      var data = {
	        isConcert: this.entity == "film" ? "" : "1",
	        mid: this.entity == "film" ? this.showtime.m_id : this.showtime.c_id,
	        urid: this.showtime.uniqe_id,
	        uid: "0", // 0 means admin user id
	        chairs: this.selectedChairs,
	        total_price: this.entity == "film" ? this.total_price : this.concert_total_price,
	        discount: "0"
	      };

	      console.log(data);

	      setTimeout(function () {

	        _this3.$http.post('api/new_factor', data).then(function (res) {
	          console.log("Factor :");
	          console.log(res);
	          if (res.body.status == "1") {
	            _this3.get_sold_chairs(_this3.showtime.uniqe_id, function () {
	              _this3.currentTicketCode = "" + res.body.code;
	              _this3.loadingWrapper = false;
	              _this3.printFactor();
	            });
	          } else {
	            alert("بعضی از صندلی های انتخابی شما قبلا رزرو شده اند...لطفا بعد از بروز رسانی دوباره صندلی ها اقدام کنید.");
	          }
	        }, function (response) {
	          alert("مشکلی در ثبت بلیط اتفاق افتاده.");
	        });
	      }, 1000);
	    },
	    printFactor: function printFactor() {
	      var _this4 = this;

	      this.ticketData = {
	        isConcert: this.entity == "film" ? false : true,
	        code: this.currentTicketCode,
	        date: this.showtime.date,
	        time: this.showtime.time,
	        movieName: this.movie.title,
	        chairsAlpha: this.get_chairs_alpha,
	        chairsCount: this.selectedChairs.length,
	        chairsNumber: this.get_chairs_number,
	        totalPrice: this.entity == "film" ? this.total_price : this.concert_total_price
	      };

	      setTimeout(function () {

	        window.print();
	        _this4.selectedChairs = [];
	        _this4.date = _this4.firstShowtime.date;
	        _this4.time = _this4.firstShowtime.id;
	        _this4.showtime = _this4.firstShowtime;
	      }, 1);
	    },
	    get_sold_chairs: function get_sold_chairs(uid, cb) {
	      var _this5 = this;

	      var params = {
	        uid: uid,
	        table: this.entity == "concert" ? "concertReserve" : "Reserve"
	      };

	      this.$http.get('api/get_chairs_sold', { params: params }).then(function (res) {
	        console.log(res.body);
	        _this5.purchasedChairs = [];

	        if (res.body.status == "1" && uid == _this5.showtime.uniqe_id) {

	          if (res.body.chairs_sold != "" && res.body.chairs_sold != "null" && res.body.chairs_sold != undefined) {

	            _this5.purchasedChairs = JSON.parse(res.body.chairs_sold);
	          }
	        }

	        console.log("this.purchasedChairs");
	        console.log(_this5.purchasedChairs);

	        if (cb) cb(res.body);
	      });
	    },
	    sort_chairs: function sort_chairs(chairs) {

	      chairs = chairs.split(' ');
	      var a = chairs.sort(function (a, b) {
	        a = parseInt(a.split('-').join(''));
	        b = parseInt(b.split('-').join(''));
	        return a > b;
	      });

	      return a;
	    }
	  },

	  computed: {
	    title_msg: function title_msg() {
	      return this.entity == 'film' ? 'فیلم' : 'برنامه';
	    },
	    get_dates: function get_dates() {

	      var a = [];
	      this.allMovieShowtimes.some(function (el) {
	        if (a.indexOf(el.date) == -1) a.push(el.date);
	      });

	      return a;
	    },
	    get_times: function get_times() {
	      var _this6 = this;

	      var a = [];
	      this.allMovieShowtimes.some(function (el) {
	        if (el.date == _this6.date) a.push(el);
	      });

	      a.sort(function (a, b) {
	        var at = parseInt(a.time.split(':').join(''));
	        var bt = parseInt(b.time.split(':').join(''));
	        return bt < at;
	      });
	      return a;
	    },
	    total_price: function total_price() {
	      return this.get_movie_price * this.selectedChairs.length;
	    },
	    concert_total_price: function concert_total_price() {
	      var _this7 = this;

	      var sum = 0;
	      this.selectedChairs.some(function (el) {
	        var row = el.id.split('-')[1];
	        var prices = _this7.showtime.movie.prices_list.split(' ');
	        sum += parseInt(prices[row]);
	      });
	      return sum;
	    },
	    get_movie_price: function get_movie_price() {
	      return this.showtime.is_half_price == '1' ? this.movie.half_price : this.movie.price;
	    },
	    get_concert_price: function get_concert_price() {
	      return this.showtime.is_half_price == '1' ? this.movie.half_price : this.movie.price;
	    },
	    get_chairs_number: function get_chairs_number() {
	      var c = '';
	      this.selectedChairs.some(function (el, i) {
	        c += el.name + " ";
	      });
	      return this.sort_chairs(c.trim()).join(' ');
	    },
	    get_chairs_alpha: function get_chairs_alpha() {
	      var rows = [];
	      var text = [];
	      var chairs = this.get_chairs_number.split(' ');
	      chairs.some(function (chair) {

	        var x = chair.split('-');
	        var r = x[0];
	        var c = x[1];
	        var i = rows.indexOf(parseInt(r));

	        if (i == -1) {

	          rows.push(parseInt(r));
	          text.push('\u0631\u062F\u06CC\u0641 ' + r + ' \u0635\u0646\u062F\u0644\u06CC ' + c + ' ');
	        } else {

	          text[i] += ' , ' + c + ' ';
	        }
	      });

	      return text.join(" "); //c.replace(/\/+$/, '');
	    }
	  },

	  created: function created() {
	    console.log('self service');
	    this.init();
	  }
	};

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sandaliha = __webpack_require__(221);

	var _sandaliha2 = _interopRequireDefault(_sandaliha);

	var _sansha = __webpack_require__(226);

	var _sansha2 = _interopRequireDefault(_sansha);

	var _imgPro = __webpack_require__(231);

	var _imgPro2 = _interopRequireDefault(_imgPro);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {

	  components: {
	    sansha: _sansha2.default,
	    sandaliha: _sandaliha2.default,
	    imgPro: _imgPro2.default
	  },

	  data: function data() {
	    return {

	      step: 0,
	      movie: SERVER['movie'],
	      user_id: 0,
	      selectedSans: {},
	      info: { name: '', mobile: '' },
	      selectedChairs: [],
	      purchasedChairs: [],
	      showChairs: false,
	      sms: false,

	      loadingWrapper: false,
	      loadingSoldChairs: false,
	      showFactor: false

	    };
	  },

	  watch: {
	    selectedSans: function selectedSans() {
	      this.selectedChairs = [];
	    }
	  },
	  computed: {
	    formIsComplete: function formIsComplete() {

	      var info = this.info.name != "" && this.info.mobile != "";
	      var selChairs = this.selectedChairs.length > 0;

	      return info && selChairs;
	    },
	    get_scenes: function get_scenes() {
	      var scenes = this.movie.scenes.split(",");
	      var a = [];
	      scenes.some(function (el, i) {
	        a.push(SERVER["root"] + "app/upload/" + el);
	      });
	      return a;
	    },
	    total_price: function total_price() {
	      return this.get_movie_price * this.selectedChairs.length;
	    },
	    get_movie_price: function get_movie_price() {
	      console.log("this.selectedSans");console.log(this.selectedSans);
	      return this.selectedSans.is_half_price == '1' ? this.movie.half_price : this.movie.price;
	    },
	    get_sort_selected_chairs: function get_sort_selected_chairs() {

	      var chairs = this.get_selected_chairs;
	      var a = chairs.sort(function (a, b) {
	        a = parseInt(a.split('-').join(''));
	        b = parseInt(b.split('-').join(''));
	        return a > b;
	      });

	      return a;
	    },
	    get_selected_chairs: function get_selected_chairs() {
	      var a = [];
	      this.selectedChairs.some(function (el) {
	        a.push(el.name);
	      });
	      return a;
	    },
	    get_chairs_alpha: function get_chairs_alpha() {
	      var rows = [];
	      var text = [];
	      var chairs = this.get_sort_selected_chairs;
	      chairs.some(function (chair) {

	        var x = chair.split('-');
	        var r = x[0];
	        var c = x[1];
	        var i = rows.indexOf(parseInt(r));

	        if (i == -1) {

	          rows.push(parseInt(r));
	          text.push('\u0631\u062F\u06CC\u0641 ' + r + ' \u0635\u0646\u062F\u0644\u06CC ' + c + ' ');
	        } else {

	          text[i] += ' , ' + c + ' ';
	        }
	      });

	      return text.join(" ");
	    }
	  },
	  methods: {
	    verify_user_info: function verify_user_info() {

	      if (this.info.name.trim().length == 0) {
	        alert("لطفا نام خود را وارد کنید");
	        return false;
	      }

	      if (this.info.mobile.trim().length == 0 || !(!isNaN(parseInt(this.info.mobile)) && this.info.mobile.length == 11)) {
	        alert("شماره تلفن همراه خود را درست وارد کنید");
	        return false;
	      }
	      return true;
	    },


	    toggleFactor: function toggleFactor() {
	      var _this = this;

	      if (this.verify_user_info()) {

	        this.loadingWrapper = true;

	        var self = this;
	        //this.user_id = this.$cookie.get("cinema-setareh-user-id")
	        if (this.user_id == 0) {

	          // this.info.mobile = 

	          this.$http.post('api/new_user', this.info).then(function (res) {
	            console.log(res);
	            if (res.body.status == "1") {
	              console.log(res);
	              _this.user_id = res.body.user_id;
	              _this.showFactor = !_this.showFactor;

	              if (_this.info.remember == true) _this.$cookie.set("cinema-setareh-user-id", _this.user_id, { expires: '1M' });else _this.$cookie.delete("cinema-setareh-user-id");

	              $('html,body').animate({ scrollTop: $("#app").offset().top }, 1200, function () {
	                self.loadingWrapper = false;
	              });
	            } else {
	              console.log(res.body.status);
	            }
	          });
	        } else {
	          this.showFactor = !this.showFactor;
	          $('html,body').animate({ scrollTop: $("#app").offset().top }, 1200, function () {
	            self.loadingWrapper = false;
	          });
	        }
	      } else {
	        $('html,body').animate({ scrollTop: $("#app").offset().top }, 1200, function () {
	          _this.loadingWrapper = false;
	        });
	      }
	    },

	    sendFactor: function sendFactor() {
	      var _this2 = this;

	      var data = {
	        mid: this.movie.id,
	        urid: this.selectedSans.uniqe_id,
	        uid: this.user_id,
	        chairs: this.selectedChairs,
	        total_price: this.total_price,
	        discount: "20%"
	      };

	      console.log(data);

	      this.$http.post('api/new_factor', data).then(function (res) {
	        console.log(res);
	        if (res.body.status == "1") {
	          window.location.href = "requestPay?fid=" + res.body.factor_id;
	        }if (res.body.status == "CHAIRS_IS_EXIST") {
	          alert("بعضی از صندلی های انتخابی شما توسط کاربر دیگری زودتر به ثبت رسیده است. لطفا از اول صندلی هارا انتخاب کنید.");
	          _this2.selectedChairs = [];
	          _this2.toggleFactor();
	        }
	      }, function (response) {
	        // error callback
	      });
	    },

	    changeInfo: function changeInfo() {

	      this.user_id = 0;
	    }

	  },
	  created: function created() {
	    var _this3 = this;

	    console.log(this.movie);

	    this.user_id = this.$cookie.get("cinema-setareh-user-id");
	    if (this.user_id != "null") {

	      this.$http.get('api/get_users?id=' + this.user_id).then(function (res) {

	        console.log(res.body);

	        if (res.body != "null") {

	          _this3.info.name = res.body.fullName;
	          _this3.info.mobile = res.body.phone;
	          _this3.info.remember = true;
	        } else {

	          _this3.user_id = 0;
	          _this3.$cookie.delete("cinema-setareh-user-id");
	        }
	      });
	    }
	  }
	};

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(222)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(224),
	  /* template */
	  __webpack_require__(225),
	  /* scopeId */
	  "data-v-7f1b01c6",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/ticket/sandaliha.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] sandaliha.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7f1b01c6", Component.options)
	  } else {
	    hotAPI.reload("data-v-7f1b01c6", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(223);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("23a90000", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7f1b01c6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./sandaliha.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7f1b01c6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./sandaliha.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.info[data-v-7f1b01c6]{\n    padding: 10px;\n        display: inline-block;\n    box-shadow: 0 0 5px #e6e6e6;\n    margin-top: 20px;\n    margin-bottom: 20px;\n    background: #a4acb3;\n    border-radius: 7px;\n    text-align: center;\n    color: white;\n}\n#ReserveWindow[data-v-7f1b01c6] { \n\nz-index: 100;\n\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\n\t-webkit-user-select: none;  \n  -moz-user-select: none;    \n  -ms-user-select: none;      \n  user-select: none;\n\n  cursor:default;\n\n  overflow: scroll;\n}\n.content[data-v-7f1b01c6] {\n\n\tdirection: rtl;\n\tpadding:  30px;\n\tpadding-bottom: 10px;\n\tbackground: rgb(246, 246, 246);\n\tmin-width:850px;\n\tmin-height: 85%;\n\tposition:absolute;\n\ttop:20px;\n\tleft: 50%;\n\tmargin-left: -425px;\n\tborder-radius: 15px;\n}\n@media screen and (max-width: 480px) {\n.content[data-v-7f1b01c6]{\n      margin-left: -560px;\n}\n}\n.shadow[data-v-7f1b01c6] {\n\tbackground:rgba(0,0,0,0.5);\n}\n.box[data-v-7f1b01c6]{\n\tpadding:10px;\n\twidth:80%;\n\tmargin:0 auto;\n\tborder: 2px solid #d6d6d6;\n    margin-bottom: 20px;\n    text-align: center;\n}\n\n\n", ""]);

	// exports


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _stringify = __webpack_require__(13);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _chairs = __webpack_require__(138);

	var _chairs2 = _interopRequireDefault(_chairs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

		props: ["show"],

		data: function data() {
			return {
				selectedChairs: []
			};
		},

		watch: {
			show: function show(val) {
				if (val == true) this.selectedChairs = this.$root.selectedChairs.freeze();
			}
		},
		methods: {
			hideWindow: function hideWindow() {
				this.$root.showChairs = false;
			},
			sendChairs: function sendChairs() {
				this.$root.selectedChairs = JSON.parse((0, _stringify2.default)(this.selectedChairs));
				this.hideWindow();
			}
		},

		computed: {
			showWindow: function showWindow() {
				return this.$root.showChairs;
			}
		},
		components: {
			chairs: _chairs2.default
		}

	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.showWindow) ? _c('div', {
	    staticClass: "shadow",
	    attrs: {
	      "id": "ReserveWindow"
	    },
	    on: {
	      "click": function($event) {
	        if ($event.target !== $event.currentTarget) { return; }
	        _vm.hideWindow($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "content"
	  }, [_vm._m(0), _vm._v(" "), _c('chairs', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.selectedChairs),
	      expression: "selectedChairs"
	    }],
	    domProps: {
	      "value": (_vm.selectedChairs)
	    },
	    on: {
	      "input": function($event) {
	        _vm.selectedChairs = $event
	      }
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "row",
	    staticStyle: {
	      "padding": "10px",
	      "text-align": "center"
	    }
	  }, [_c('button', {
	    staticClass: "btn btn-success",
	    on: {
	      "click": function($event) {
	        _vm.sendChairs()
	      }
	    }
	  }, [_vm._v("تایید صندلی ها")])])], 1)]) : _vm._e()
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-md-12  info"
	  }, [_c('div', {
	    staticClass: "col-md-4"
	  }, [_c('strong', [_vm._v("آزاد")])]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-4"
	  }, [_c('strong', [_vm._v(" پرده نمایش")])]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-4"
	  }, [_c('strong', [_vm._v("خانواده")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7f1b01c6", module.exports)
	  }
	}

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(227)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(229),
	  /* template */
	  __webpack_require__(230),
	  /* scopeId */
	  "data-v-197bd1b2",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/ticket/sansha.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] sansha.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-197bd1b2", Component.options)
	  } else {
	    hotAPI.reload("data-v-197bd1b2", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(228);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("84d3031e", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-197bd1b2\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./sansha.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-197bd1b2\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./sansha.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.rows[data-v-197bd1b2]{\n\tpadding:16px;\n}\n.row[data-v-197bd1b2]{\n\n\tpadding: 16px;\n\tbackground: whitesmoke;\n}\n.expire-price[data-v-197bd1b2]{\n\ttext-decoration: line-through;\n\tcolor:red;\n\tfont-size: 1.0em !important;\n}\n.myprice[data-v-197bd1b2]{\n\tfont-size: 1.3em\n}\n.row[data-v-197bd1b2] {\n\tcursor:pointer;\n\tborder:2px dashed transparent;\n\tmargin-bottom:10px;\n}\n.row[data-v-197bd1b2]:not(.active):hover {\n\tborder:2px dashed #ececec;\n}\n.active[data-v-197bd1b2]{\n\tborder:2px dashed #00bcd4;\n}\n.button.btnbuy[data-v-197bd1b2] {\n\tbackground: green !important;\n}\n.button.btncancel[data-v-197bd1b2] {\n\tbackground: red !important;\n}\n", ""]);

	// exports


/***/ },
/* 229 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	exports.default = {

		props: ["movieId"],

		data: function data() {
			return {

				ReserveTableName: 'Reserve',

				date: "",

				sansInfo: [],

				showDateBox: true,

				loading: true,

				si: -1,

				interval: 0

			};
		},
		created: function created() {

			this.load_showtimes();
		},


		watch: {
			movieId: function movieId() {

				this.load_showtimes();
				this.si = -1;
				this.$root.step = 0;
				this.$root.selectedSans = {};
				this.date = "";
			},
			date: function date() {

				this.si = -1;
				this.$root.step = 0;
				this.$root.selectedSans = {};
			}
		},

		computed: {
			filtered_sans: function filtered_sans() {
				var _this = this;

				if (this.date == "") return this.sansInfo;

				return this.sansInfo.filter(function (el) {

					return el.date == _this.date;
				});
			},
			get_dates: function get_dates() {

				var dates = [];
				this.sansInfo.some(function (el, i) {
					if (dates.indexOf(el.date) == -1) dates.push(el.date);
				});
				return dates;
			}
		},

		methods: {
			is_half_price: function is_half_price(date) {

				var msg = void 0;
				this.sansInfo.some(function (el) {
					if (el.date == date) {
						msg = el.is_half_price == "1" ? " - نیم بها" : "";
						return;
					}
				});

				return msg;
			},
			load_showtimes: function load_showtimes() {
				var _this2 = this;

				this.loading = true;

				var id = void 0;
				this.ReserveTableName = "Reserve";

				if (this.movieId && this.movieId != "") id = this.movieId;

				if (SERVER['query']['id']) id = SERVER['query']['id'];

				if (SERVER['query']['cid']) {
					id = SERVER['query']['cid'];
					this.ReserveTableName = "concertReserve";
				}

				var params = {
					id: id,
					table: this.ReserveTableName,
					delay: 60
				};

				this.$http.get('api/get_showtimes', { params: params }).then(function (response) {

					setTimeout(function () {

						var data = response.body;
						_this2.sansInfo = data;
						console.log("FILM LOADING OK");
						console.log(data);
						_this2.loading = false;
					}, 1000);
				}, function (response) {
					console.log("ERROR WHEN GET FILM : ");
					console.log(response);
				});
			},
			selectSans: function selectSans(s, i) {
				var _this3 = this;

				this.$root.selectedSans = { uniqe_id: s.uniqe_id, id: s.id, date: s.date, time: s.time, is_half_price: s.is_half_price };

				this.$root.step = 1;

				var params = {
					uid: s.uniqe_id,
					table: this.ReserveTableName
				};
				this.$root.loadingSoldChairs = true;

				clearInterval(this.interval);

				this.interval = setInterval(function () {

					_this3.$http.get("api/get_chairs_sold", { params: params }).then(function (res) {
						console.log(res);
						if (res.body.chairs_sold == undefined || !res.body.chairs_sold) {
							_this3.$root.purchasedChairs = [];
						} else {

							_this3.$root.purchasedChairs = JSON.parse(res.body.chairs_sold);
						}
						_this3.$root.loadingSoldChairs = false;
					});
				}, 5000);

				this.$http.get("api/get_chairs_sold", { params: params }).then(function (res) {
					console.log(res);
					if (res.body.chairs_sold == undefined || !res.body.chairs_sold) {
						_this3.$root.purchasedChairs = [];
					} else {

						_this3.$root.purchasedChairs = JSON.parse(res.body.chairs_sold);
					}
					_this3.$root.loadingSoldChairs = false;
				});

				if (this.si != -1) {
					this.si = -1;
					this.$root.step = 0;
					this.$root.selectedSans = {};
				} else {
					this.si = i;
					this.$root.step = 1;
				}
			}
		}

	};

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.loading) ? _c('div', [_vm._v("درحال بارگزاری سانس ها...")]) : _c('div', [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.date),
	      expression: "date"
	    }],
	    staticClass: "form-control",
	    on: {
	      "change": function($event) {
	        _vm.date = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        })[0]
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": "",
	      "hidden": ""
	    }
	  }, [_vm._v("تاریخ های اکران")]), _vm._v(" "), _vm._l((_vm.get_dates), function(d) {
	    return _c('option', {
	      domProps: {
	        "value": d
	      }
	    }, [_vm._v(" " + _vm._s(_vm.$root.getFullDay(d)) + " " + _vm._s(_vm.is_half_price(d)))])
	  })], 2), _vm._v(" "), (_vm.date.length > 0) ? _c('div', {
	    staticClass: "rows"
	  }, _vm._l((_vm.filtered_sans), function(s, i) {
	    return _c('div', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.si == i || _vm.si == -1),
	        expression: "si == i || si == -1"
	      }],
	      staticClass: "row ",
	      class: {
	        active: _vm.si == i
	      },
	      on: {
	        "click": function($event) {
	          _vm.selectSans(s, i)
	        }
	      }
	    }, [_c('div', {
	      staticClass: "date col-sm-3"
	    }, [_vm._v(_vm._s(s.date.toFaDigit()))]), _vm._v(" "), _c('div', {
	      staticClass: "date col-sm-3"
	    }, [_vm._v(_vm._s(s.time.toFaDigit()))]), _vm._v(" "), _c('div', {
	      staticClass: "price col-sm-3"
	    }, [(_vm.$root.movie) ? _c('div', [_c('p', {
	      staticClass: "myprice",
	      class: {
	        'expire-price': s.is_half_price == '1'
	      }
	    }, [_vm._v(_vm._s(_vm.$root.movie.price.toFaDigit()) + " تومان")]), _vm._v(" "), (s.is_half_price == '1') ? _c('p', {
	      staticClass: "myprice"
	    }, [_vm._v(_vm._s(_vm.$root.movie.half_price.toFaDigit()) + " تومان")]) : _vm._e()]) : _c('div', [_vm._v("\n\t            \t\t...\n\t            \t")])]), _vm._v(" "), _c('div', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.si == -1),
	        expression: "si == -1"
	      }],
	      staticClass: "btn btn-success col-sm-3"
	    }, [_vm._v("خرید بلیط")]), _vm._v(" "), _c('div', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.si == i),
	        expression: "si == i"
	      }],
	      staticClass: "btn btn-danger col-sm-3"
	    }, [_vm._v("لغو بلیط")]), _vm._v(" "), _c('div', {
	      staticClass: "clearfix"
	    })])
	  })) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-197bd1b2", module.exports)
	  }
	}

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(232)

	var Component = __webpack_require__(27)(
	  /* script */
	  __webpack_require__(234),
	  /* template */
	  __webpack_require__(235),
	  /* scopeId */
	  "data-v-2f035e77",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/var/www/html/sinama/app/src/imgPro.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] imgPro.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2f035e77", Component.options)
	  } else {
	    hotAPI.reload("data-v-2f035e77", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(233);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(25)("5f07d9ae", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-2f035e77\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./imgPro.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-2f035e77\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./imgPro.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.box[data-v-2f035e77]{\n\twidth:150px;\n}\n.noEffect[data-v-2f035e77]{\n\tborder: 0 !important;\n\tbox-shadow: none !important;\n}\n.fileInput[data-v-2f035e77]{\n\tdisplay: none;\n}\n\n", ""]);

	// exports


/***/ },
/* 234 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//


	exports.default = {

		props: ["src"],
		data: function data() {
			return {
				base: SERVER["root"] + "app/",

				noEffect: true
			};
		},
		mounted: function mounted() {

			var el = this.$refs.el;
			var self = this;

			if (this.src != undefined) {

				var img = new Image();
				img.src = this.src;

				img.onload = function () {
					el.src = self.src;
					$(el).css('opacity', 0).animate({ opacity: 1 }, 1000);

					self.noEffect = false;
				}.bind(el);

				img.onerror = function (e) {

					el.src = self.base + "assets/default-placeholder.png";
				};
			}
		}
	};

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('img', {
	    ref: "el",
	    class: {
	      noEffect: _vm.noEffect
	    },
	    attrs: {
	      "src": _vm.base + 'assets/ajax-loader.gif'
	    }
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2f035e77", module.exports)
	  }
	}

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sandaliha = __webpack_require__(221);

	var _sandaliha2 = _interopRequireDefault(_sandaliha);

	var _sansha = __webpack_require__(226);

	var _sansha2 = _interopRequireDefault(_sansha);

	var _imgPro = __webpack_require__(231);

	var _imgPro2 = _interopRequireDefault(_imgPro);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {

	  components: {
	    sansha: _sansha2.default,
	    sandaliha: _sandaliha2.default,
	    imgPro: _imgPro2.default
	  },

	  data: function data() {
	    return {

	      step: 0,
	      concert: SERVER['concert'],
	      user_id: 0,
	      selectedSans: {},
	      info: { name: '', mobile: '' },
	      selectedChairs: [],
	      purchasedChairs: [],
	      showChairs: false,
	      sms: false,

	      loadingWrapper: false,
	      loadingSoldChairs: false,
	      showFactor: false

	    };
	  },

	  watch: {
	    selectedSans: function selectedSans() {
	      this.selectedChairs = [];
	    }
	  },
	  computed: {
	    formIsComplete: function formIsComplete() {

	      var info = this.info.name != "" && this.info.mobile != "";
	      var selChairs = this.selectedChairs.length > 0;

	      return info && selChairs;
	    },

	    /* get_scenes(){
	       let scenes = this.concert.scenes.split(",")
	       let a = []
	       scenes.some((el,i)=>{
	         a.push( SERVER["root"] + "app/upload/" + el )
	       })
	       return a
	     },*/

	    get_concert_prices: function get_concert_prices() {
	      var prices = [];
	      this.selectedChairs.some(function (el) {
	        if (prices.indexOf(el.price) == -1) prices.push(el.price);
	      });
	      return prices.join(" / ");
	    },
	    total_price: function total_price() {
	      var _this = this;

	      var sum = 0;
	      this.selectedChairs.some(function (el) {
	        var row = el.id.split('-')[1];
	        sum += parseInt(_this.concert.prices_list[row]);
	      });
	      return sum;
	    },
	    get_sort_selected_chairs: function get_sort_selected_chairs() {

	      var chairs = this.get_selected_chairs;
	      var a = chairs.sort(function (a, b) {
	        a = parseInt(a.split('-').join(''));
	        b = parseInt(b.split('-').join(''));
	        return a > b;
	      });

	      return a;
	    },
	    get_selected_chairs: function get_selected_chairs() {
	      var a = [];
	      this.selectedChairs.some(function (el) {
	        a.push(el.name);
	      });
	      return a;
	    },
	    get_chairs_alpha: function get_chairs_alpha() {
	      var rows = [];
	      var text = [];
	      var chairs = this.get_sort_selected_chairs;
	      chairs.some(function (chair) {

	        var x = chair.split('-');
	        var r = x[0];
	        var c = x[1];
	        var i = rows.indexOf(parseInt(r));

	        if (i == -1) {

	          rows.push(parseInt(r));
	          text.push('\u0631\u062F\u06CC\u0641 ' + r + ' \u0635\u0646\u062F\u0644\u06CC ' + c + ' ');
	        } else {

	          text[i] += ' , ' + c + ' ';
	        }
	      });

	      return text.join(" ");
	    }
	  },
	  methods: {

	    toggleFactor: function toggleFactor() {
	      var _this2 = this;

	      this.loadingWrapper = true;

	      var self = this;
	      //this.user_id = this.$cookie.get("cinema-setareh-user-id")
	      if (this.user_id == 0) {

	        this.$http.post('api/new_user', this.info).then(function (res) {
	          console.log(res);
	          if (res.body.status == "1") {

	            _this2.user_id = res.body.user_id;
	            _this2.showFactor = !_this2.showFactor;

	            if (_this2.info.remember == true) _this2.$cookie.set("cinema-setareh-user-id", _this2.user_id, { expires: '1M' });else _this2.$cookie.delete("cinema-setareh-user-id");

	            $('html,body').animate({ scrollTop: $("#app").offset().top }, 1200, function () {
	              self.loadingWrapper = false;
	            });
	          } else {
	            console.log(res.body.status);
	          }
	        });
	      } else {
	        this.showFactor = !this.showFactor;
	        $('html,body').animate({ scrollTop: $("#app").offset().top }, 1200, function () {
	          self.loadingWrapper = false;
	        });
	      }
	    },

	    sendFactor: function sendFactor() {
	      var _this3 = this;

	      var data = {
	        isConcert: true,
	        mid: this.concert.id,
	        urid: this.selectedSans.uniqe_id,
	        uid: this.user_id,
	        chairs: this.selectedChairs,
	        total_price: this.total_price,
	        discount: "20%"
	      };

	      console.log(data);

	      this.$http.post('api/new_factor', data).then(function (res) {
	        console.log(res);
	        if (res.body.status == "1") {
	          window.location.href = "requestPay?fid=" + res.body.factor_id;
	        }if (res.body.status == "CHAIRS_IS_EXIST") {
	          alert("بعضی از صندلی های انتخابی شما توسط کاربر دیگری زودتر به ثبت رسیده است. لطفا از اول صندلی هارا انتخاب کنید.");
	          _this3.selectedChairs = [];
	          _this3.toggleFactor();
	        }
	      }, function (response) {
	        // error callback
	      });
	    },

	    changeInfo: function changeInfo() {

	      this.user_id = 0;
	    }

	  },
	  created: function created() {
	    var _this4 = this;

	    this.concert.prices_list = this.concert.prices_list.split(" ");

	    console.log(this.concert);

	    this.user_id = this.$cookie.get("cinema-setareh-user-id");
	    if (this.user_id != "null") {

	      this.$http.get('api/get_users?id=' + this.user_id).then(function (res) {

	        console.log(res.body);

	        if (res.body != "null") {

	          _this4.info.name = res.body.fullName;
	          _this4.info.mobile = res.body.phone;
	          _this4.info.remember = true;
	        } else {

	          _this4.user_id = 0;
	          _this4.$cookie.delete("cinema-setareh-user-id");
	        }
	      });
	    }
	  }
	};

/***/ }
/******/ ]);