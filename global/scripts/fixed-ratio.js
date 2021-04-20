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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/fixed-ratio.js":
/*!*************************************!*\
  !*** ./resources/js/fixed-ratio.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var start = function start() {
  Array.from(document.querySelectorAll('img,video')).forEach(function (media) {
    media.setAttribute('draggable', false);
  });
  var dom = document.querySelectorAll('.fixed-ratio');
  var fullScreens = document.querySelectorAll('.full-screen');
  var cover = window.localStorage.getItem('cover') == 'true' || false;
  var viewportmeta = document.querySelector('meta[name="viewport"]');
  if (document.getElementById('measurer')) return;
  var measurer = document.createElement('div');
  measurer.setAttribute('id', 'measurer');
  measurer.style.setProperty('position', 'fixed');
  measurer.style.setProperty('z-index', '-100');
  measurer.style.setProperty('width', '100%');
  document.body.append(measurer);

  var fit = function fit() {
    dom.forEach(function (fr) {
      var width, height;

      if (window.innerHeight / window.innerWidth < 0.5625) {
        height = window.innerHeight;
        width = height / 0.5625;
      } else {
        width = window.innerWidth;
        height = width * 0.5625;
      }

      fr.style.setProperty('--width', width + 'px');
      fr.style.setProperty('--height', height + 'px');
    });
    var height = window.innerHeight / 100;
    fullScreens.forEach(function (fs) {
      fs.style.setProperty('--vh', height + 'px');
    });
    document.documentElement.style.setProperty('--vh', height + 'px');
    dom.forEach(function (d) {
      var parentWidth = d.clientWidth,
          parentHeight = d.clientHeight;
      Array.from(d.children).forEach(function (child) {
        var childWidth = child.clientWidth,
            childHeight = child.clientHeight;
        var widthRatio = parentWidth / childWidth;
        var heightRatio = parentHeight / childHeight;
        var ratio;
        ratio = widthRatio < heightRatio ? widthRatio : heightRatio;
        window.localStorage.setItem('--width-ratio', widthRatio);
        window.localStorage.setItem('--height-ratio', heightRatio);
        window.localStorage.setItem('--ratio', ratio);
        child.style.setProperty('--ratio', ratio);
      });
    });
  };

  fit();

  if (!window.isIframe) {
    var orientationchange = false;
    var resized = true;
    window.addEventListener('orientationchange', function () {
      if (!resized) {
        setTimeout(function () {
          fit();
        }, 150);
        resized = true;
      } else {
        orientationchange = true;
      }
    });
    window.addEventListener('resize', function () {
      if (orientationchange || window.isDesktop) {
        setTimeout(function () {
          fit();
        }, 100);
        orientationchange = false;
      } else {
        resized = false;
      }
    });
  }
};

function iOS() {
  return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) // iPad on iOS 13 detection
  || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}

if (document.readyState == 'loading') {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

/***/ }),

/***/ 1:
/*!*******************************************!*\
  !*** multi ./resources/js/fixed-ratio.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\bkmx\Desktop\Projects\herbalife\resources\js\fixed-ratio.js */"./resources/js/fixed-ratio.js");


/***/ })

/******/ });