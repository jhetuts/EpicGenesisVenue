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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./resources/js/FPTmap.js":
/*!********************************!*\
  !*** ./resources/js/FPTmap.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var FPTmap = [];
module.exports = FPTmap;

/***/ }),

/***/ "./resources/js/HotspotDB.js":
/*!***********************************!*\
  !*** ./resources/js/HotspotDB.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FPTArray = __webpack_require__(/*! ./FPTmap */ "./resources/js/FPTmap.js");

var HotspotDB = /*#__PURE__*/function () {
  function HotspotDB(db) {
    var _this = this;

    _classCallCheck(this, HotspotDB);

    this.db = {};
    db.forEach(function (row) {
      _this.db[row.code] = row;
    });
    this.is_safari = false;
    var ua = navigator.userAgent.toLowerCase();

    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {} else {
        this.is_safari = true;
      }
    }

    this.loadToView = this.loadToView.bind(this);
    this.typeMapFunction = this.typeMapFunction.bind(this);

    this.callback = function () {
      if (typeof url != 'undefined') {
        window.location = url;
      }
    };
  }

  _createClass(HotspotDB, [{
    key: "bootIfNotBooted",
    value: function bootIfNotBooted() {
      if (!this.booted) {
        this.boot();
        this.booted = true;
      }
    }
  }, {
    key: "boot",
    value: function boot() {
      this.container = document.getElementById('full-screen-iframe');
    }
  }, {
    key: "get",
    value: function get(code) {
      return this.db[code];
    }
  }, {
    key: "typeMapFunction",
    value: function typeMapFunction(type) {
      return 'handle' + type.split('-').map(function (item, index) {
        return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      }).join("");
    }
  }, {
    key: "loadToView",
    value: function loadToView(code) {
      var _this2 = this;

      this.bootIfNotBooted();
      var content = this.get(code);
      document.getElementById('scene-container').classList.add('blur');
      clearTimeout(this.unloadTimer);
      this[this.typeMapFunction(content.type)](content);
      this.container.classList.add('active'); //for facebook pixel tracking

      var imgTags = Array.from(document.getElementsByTagName('img'));
      imgTags.forEach(function (imgTag) {
        _this2.sendFPT(imgTag.dataset.fpt, imgTag);
      });
    }
  }, {
    key: "unloadView",
    value: function unloadView() {
      var _this3 = this;

      clearTimeout(this.unloadTimer);
      window.cancelAnimationFrame(this.liveTalkTimer);
      this.unloadTimer = setTimeout(function () {
        _this3.container.innerHTML = '';
      }, 200);
      this.container.classList.remove('active');
      document.getElementById('scene-container').classList.remove('blur');
    }
  }, {
    key: "handleImageVideo",
    value: function handleImageVideo(content) {
      var _this4 = this;

      var background_image_path = content.booth_popup_videos[0].background_image_path;
      var videoDoms = content.booth_popup_videos.map(function (v, i) {
        if (v.video_poster_path) {
          return "<video data-index=\"".concat(i, "\" class=\"item w-full h-full hidden\" src=\"").concat(v.video_path, "\" controls controlsList=\"nodownload\" disablePictureInPicture playsinline ").concat(v.video_poster_path ? "poster=\"".concat(v.video_poster_path, "\"") : '', " ").concat(_this4.is_safari ? "preload=\"none\"" : '', "></video>");
        }

        return "<img data-index=\"".concat(i, "\" class=\"item w-full h-full hidden\" src=\"").concat(v.video_path, "\">");
      }).join('');
      var dot_doms = content.booth_popup_videos.map(function (v, i) {
        return "\n    <div class=\"relative h-full\" data-dot-index=\"".concat(i, "\">\n      <img class=\"h-full w-auto default cursor-pointer\" src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/caace86b-a2db-4e42-9a86-bd248088b6a9\" alt=\"\">\n      <img class=\"h-full w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 selected hidden\" src=\"").concat(v.selected_dot_path, "\" alt=\"\">\n    </div>");
      }).join('');
      this.container.innerHTML = "\n<div class=\"absolute inset-0 w-full h-full flex justify-center items-center\">\n  <div style=\"width: 71%; height: 71%;\" class=\"bg-black\">".concat(videoDoms, "</div>\n</div>\n<img class=\"background pointer-events-none\" src=\"").concat(background_image_path, "\">\n<div class=\"prev absolute top-1/2 left-0 transform translate-x-1/2 -translate-y-1/2 block pointer-events-none opacity-0 cursor-pointer my-auto w-32 h-40 mx-5\">\n  <img src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/64f99469-f04a-4de0-be3c-aa0f00fb493d\" alt=\"\">\n</div>\n<div class=\"next absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 block pointer-events-none opacity-0 cursor-pointer my-auto w-32 h-40 mx-5\">\n  <img src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/be48655d-9f03-41cc-869d-e1370dc51202\" alt=\"\">\n</div>\n<div class=\"dots hidden absolute flex left-1/2 transform -translate-x-1/2\" style=\"bottom: 5rem; height: 3.44rem;\">\n  ").concat(dot_doms, "\n</div>\n");
      this.container.querySelector('.item').classList.remove('hidden');

      if (content.booth_popup_videos.length > 1) {
        this.setupNextPrevEvents();
      }
    }
  }, {
    key: "handleImageOnly",
    value: function handleImageOnly(content) {
      var background_image_path = content.booth_popup_image_onlies[0].background_image_path;
      var image_doms = content.booth_popup_image_onlies.map(function (img, i) {
        return "<div data-index=\"".concat(i, "\" class=\"item hidden w-10/12 h-4/5 overflow-auto custom-scrollbar\">\n        <img src=\"").concat(img.main_image_path, "\" alt=\"\" class=\"w-full\">\n      </div>");
      }).join('');
      var dot_doms = content.booth_popup_image_onlies.map(function (img, i) {
        return "\n    <div class=\"relative h-full\" data-dot-index=\"".concat(i, "\">\n      <img class=\"h-full w-auto default cursor-pointer\" src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/caace86b-a2db-4e42-9a86-bd248088b6a9\" alt=\"\">\n      <img class=\"h-full w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 selected hidden\" src=\"").concat(img.selected_dot_path, "\" alt=\"\">\n    </div>");
      }).join('');
      this.container.innerHTML = "\n<img class=\"background pointer-events-none\" src=\"".concat(background_image_path, "\">\n<div class=\"absolute inset-0 w-full h-full flex justify-center items-center\">\n  <div class=\"flex relative justify-center items-center\" style=\"width: 71%; height: 71%\">\n    <div class=\"prev block pointer-events-none opacity-0 cursor-pointer my-auto w-32 h-40 mx-5\">\n      <img src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/64f99469-f04a-4de0-be3c-aa0f00fb493d\" alt=\"\">\n    </div>\n    ").concat(image_doms, "\n    <div class=\"next block pointer-events-none opacity-0 cursor-pointer my-auto w-32 h-40 mx-5\">\n      <img src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/be48655d-9f03-41cc-869d-e1370dc51202\" alt=\"\">\n    </div>\n  </div>\n  <div class=\"dots hidden absolute flex\" style=\"bottom: 11.25rem; height: 3.44rem;\">\n    ").concat(dot_doms, "\n  </div>\n</div>\n");
      this.container.querySelector('.item').classList.remove('hidden');

      if (content.booth_popup_image_onlies.length > 1) {
        this.setupNextPrevEvents();
      }
    }
  }, {
    key: "handleImageRow",
    value: function handleImageRow(content) {
      var background_image_path = content.booth_popup_image_rows[0].background_image_path;
      var image_rows = content.booth_popup_image_rows.map(function (img, i) {
        return "\n    <div data-index=\"".concat(i, "\" class=\"item relative flex w-10/12 h-4/5 hidden\">\n      <img class=\"w-full h-full\" src=\"").concat(img.main_image_path, "\" alt=\"\">\n      <div class=\"absolute right-0 top-0 w-6/12 px-4 h-full flex flex-col justify-center text-2xl\">\n        ").concat(img.open_quote_path ? "<div class=\"w-full\"><img class=\"w-16\" src=\"".concat(img.open_quote_path, "\" alt=\"\"></div>") : "", "\n        <p class=\"my-4 text-2xl\">").concat(img.description, "</p>\n        ").concat(img.close_quote_path ? "<div class=\"w-full flex justify-end items-center\"><img class=\"w-16\" src=\"".concat(img.close_quote_path, "\" alt=\"\"></div>") : "", "\n      </div>\n    </div>");
      }).join('');
      var dot_doms = content.booth_popup_image_rows.map(function (v, i) {
        return "\n    <div class=\"relative h-full\" data-dot-index=\"".concat(i, "\">\n      <img class=\"h-full w-auto default cursor-pointer\" src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/caace86b-a2db-4e42-9a86-bd248088b6a9\" alt=\"\">\n      <img class=\"h-full w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 selected hidden\" src=\"").concat(v.selected_dot_path, "\" alt=\"\">\n    </div>");
      }).join('');
      this.container.innerHTML = "\n<img class=\"background pointer-events-none\" src=\"".concat(background_image_path, "\">\n<div class=\"absolute inset-0 w-full h-full flex justify-center items-center\">\n  <div class=\"flex relative justify-center items-center\" style=\"width: 71%; height: 71%\">\n    <div class=\"prev block pointer-events-none opacity-0 cursor-pointer my-auto w-32 h-40 mx-5\">\n      <img src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/64f99469-f04a-4de0-be3c-aa0f00fb493d\" alt=\"\">\n    </div>\n    ").concat(image_rows, "\n    <div class=\"next block pointer-events-none opacity-0 cursor-pointer my-auto w-32 h-40 mx-5\">\n      <img src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/be48655d-9f03-41cc-869d-e1370dc51202\" alt=\"\">\n    </div>\n  </div>\n  <div class=\"dots hidden absolute flex\" style=\"bottom: 11.25rem; height: 3.44rem;\">\n    ").concat(dot_doms, "\n  </div>\n</div>\n");
      this.container.querySelector('.item').classList.remove('hidden');

      if (content.booth_popup_image_rows.length > 1) {
        this.setupNextPrevEvents();
      }
    }
  }, {
    key: "handleImageCol",
    value: function handleImageCol(content) {
      var background_image_path = content.booth_popup_image_cols[0].background_image_path;
      var image_rows = content.booth_popup_image_cols.map(function (img, i) {
        return "\n    <div data-index=\"".concat(i, "\" class=\"item relative flex items-start w-10/12 h-4/5 overflow-auto hidden custom-scrollbar\">\n      <img class=\"w-full h-auto\" src=\"").concat(img.main_image_path, "\" alt=\"\">\n      <div style=\"top: 28.125rem;\" class=\"absolute px-12 flex justify-center text-2xl\">\n        ").concat(img.open_quote_path ? "<div class=\"h-full px-8 self-start w-36\"><img src=\"".concat(img.open_quote_path, "\" alt=\"\"></div>") : "", "\n        <div class=\"flex-1 text-2xl text-center\">").concat(img.description, "</div>\n        ").concat(img.close_quote_path ? "<div class=\"h-full px-8 self-end flex flex-col justify-end items-center w-36\"><img src=\"".concat(img.close_quote_path, "\" alt=\"\"></div>") : "", "\n      </div>\n    </div>");
      }).join('');
      var dot_doms = content.booth_popup_image_cols.map(function (v, i) {
        return "\n    <div class=\"relative h-full\" data-dot-index=\"".concat(i, "\">\n      <img class=\"h-full w-auto default cursor-pointer\" src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/caace86b-a2db-4e42-9a86-bd248088b6a9\" alt=\"\">\n      <img class=\"h-full w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 selected hidden\" src=\"").concat(v.selected_dot_path, "\" alt=\"\">\n    </div>");
      }).join('');
      this.container.innerHTML = "\n<img class=\"background pointer-events-none\" src=\"".concat(background_image_path, "\">\n<div class=\"absolute inset-0 w-full h-full flex justify-center items-center\">\n  <div class=\"flex relative justify-center items-center\" style=\"width: 71%; height: 71%\">\n    <div class=\"prev block pointer-events-none opacity-0 cursor-pointer my-auto w-32 h-40 mx-5\">\n      <img src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/64f99469-f04a-4de0-be3c-aa0f00fb493d\" alt=\"\">\n    </div>\n    ").concat(image_rows, "\n    <div class=\"next block pointer-events-none opacity-0 cursor-pointer my-auto w-32 h-40 mx-5\">\n      <img src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/be48655d-9f03-41cc-869d-e1370dc51202\" alt=\"\">\n    </div>\n  </div>\n  <div class=\"dots hidden absolute flex\" style=\"bottom: 11.25rem; height: 3.44rem;\">\n    ").concat(dot_doms, "\n  </div>\n</div>\n");
      this.container.querySelector('.item').classList.remove('hidden');

      if (content.booth_popup_image_cols.length > 1) {
        this.setupNextPrevEvents();
      }
    }
  }, {
    key: "handleImageLiveTalks",
    value: function handleImageLiveTalks(content) {
      var _this5 = this;

      var background_image_path = content.booth_live_talks[0].background_image_path;
      var live_talk_doms = content.booth_live_talks.map(function (lt, i) {
        return "\n    <div data-index=\"".concat(i, "\" class=\"item hidden w-full h-full flex flex-col justify-center items-center\">\n      <div class=\"text-center pb-8\" style=\"font-size: 2rem;\">\n        <p class=\"my-2 text-white text-4xl font-bold\">").concat(lt.title, "</p>\n        <div class=\"flex justify-center\">\n          <p class=\"my-2 text-white font-bold\">").concat(lt.date, " |</p>&nbsp;\n          <p class=\"my-2 text-yellow-400 font-bold\">").concat(lt.time, "</p>\n        </div>\n      </div>\n      <div class=\"flex flex-col relative pt-8 text-center justify-start items-center\" style=\"width: 50rem; height: 26.25rem;\">\n        <p class=\"text-white font-bold text-3xl pb-6\" style=\"color: #0eb2ed;\">").concat(lt.topic, "</p>\n        <p class=\"text-white pb-5\" style=\"font-size: 1.65rem;\">").concat(lt.description, "</p>\n        ").concat(lt.watch_now_link ? "<img class=\"watch-now absolute bottom-0 pb-8 w-72 cursor-pointer\" data-src=\"".concat(lt.watch_now_link, "\" src=\"").concat(lt.watch_now_button, "\" alt=\"\">") : "<a data-book-now-id=\"".concat(lt.id, "\" class=\"absolute bottom-0 pb-8 w-72\" href=\"").concat(lt.webinar_url, "\" target=\"_blank\">\n            <img src=\"").concat(lt.book_now_button, "\" alt=\"\" data-fpt=\"").concat(lt.code, "\">\n          </a>"), "\n      </div>\n    </div>");
      }).join('');
      var dot_doms = content.booth_live_talks.map(function (lt, i) {
        return "\n    <div class=\"relative h-full\" data-dot-index=\"".concat(i, "\">\n      <img class=\"h-full w-auto default cursor-pointer\" src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/caace86b-a2db-4e42-9a86-bd248088b6a9\" alt=\"\">\n      <img class=\"h-full w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 selected hidden\" src=\"").concat(lt.selected_dot_path, "\" alt=\"\">\n    </div>");
      }).join('');
      this.container.innerHTML = "\n<div class=\"video transition-opacity duration-200 opacity-0 pointer-events-none absolute inset-0 w-full h-full flex justify-center items-center\">\n  <div style=\"width: 71%; height: 71%;\">\n    <iframe width=\"100%\" height=\"100%\" src=\"#\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n  </div>\n  <img class=\"background pointer-events-none\" src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/8a6ba106-ccdc-42dd-9b1d-8914b99aef3c\">\n</div>\n<div class=\"live-talks transition-opacity duration-200 absolute inset-0 w-full h-full flex justify-center items-center\">\n  <img class=\"background pointer-events-none\" src=\"".concat(background_image_path, "\">\n  <div class=\"flex relative justify-center items-center\" style=\"width: 71%; height: 71%\">\n    <div class=\"prev block pointer-events-none opacity-0 cursor-pointer my-auto w-36 h-40 mx-5 pt-4\">\n      <img src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/64f99469-f04a-4de0-be3c-aa0f00fb493d\" alt=\"\">\n    </div>\n    ").concat(live_talk_doms, "\n    <div class=\"next block pointer-events-none opacity-0 cursor-pointer my-auto w-36 h-40 mx-5 pt-4\">\n      <img src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/be48655d-9f03-41cc-869d-e1370dc51202\" alt=\"\">\n    </div>\n  </div>\n  <div class=\"dots hidden absolute flex\" style=\"bottom: 11.25rem; height: 3.44rem;\">\n    ").concat(dot_doms, "\n  </div>\n</div>\n");
      this.container.querySelector('.item').classList.remove('hidden');

      if (content.booth_live_talks.length > 1) {
        this.setupNextPrevEvents();
      }

      var videoContainer = this.container.querySelector('.video');
      var liveTalksContainer = this.container.querySelector('.live-talks');
      this.container.querySelectorAll('.watch-now').forEach(function (wn) {
        wn.addEventListener('click', function () {
          videoContainer.querySelector('iframe').setAttribute('src', wn.dataset.src);
          videoContainer.classList.remove('opacity-0', 'pointer-events-none');
          liveTalksContainer.classList.add('opacity-0', 'pointer-events-none');

          _this5.addBack(function () {
            videoContainer.querySelector('iframe').src = "";
            videoContainer.classList.add('opacity-0', 'pointer-events-none');
            liveTalksContainer.classList.remove('opacity-0', 'pointer-events-none');
          });
        });
      });
      var start = -1000;
      var fps = 2;
      var ms = 1000 / fps;
      var booth_live_talks = content.booth_live_talks;

      this.liveTalkTimer = function (timestamp) {
        start = start || timestamp;

        if (timestamp - start > ms) {
          start = timestamp;
          booth_live_talks = booth_live_talks.filter(function (live_talk) {
            if (new Date() > new Date(live_talk.ended_at)) {
              var book_now_button = _this5.container.querySelector("[data-book-now-id=\"".concat(live_talk.id, "\"]"));

              if (book_now_button) {
                book_now_button.classList.add('pointer-events-none', 'opacity-50');
                book_now_button.setAttribute('href', '#');
              }

              return false;
            }

            return true;
          });
        }

        window.requestAnimationFrame(_this5.liveTalkTimer);
      };

      this.liveTalkTimer();
    }
  }, {
    key: "handleImageOnlyCol",
    value: function handleImageOnlyCol(content) {
      var links = '';

      if (content.code == 'ga-ecg-services') {
        links = '<a style="top: 25.94rem; right: 6.56rem; height: 8.125rem; width: 24.69rem;" class="absolute cursor-pointer" href="mailto:ecg@nyp.edu.sg"></a>';
      }

      var background_image_path = content.booth_popup_image_only_cols[0].background_image_path;
      var images = content.booth_popup_image_only_cols.map(function (img, i) {
        return "<img src=\"".concat(img.main_image_path, "\">");
      }).join('');
      this.container.innerHTML = "\n<div class=\"absolute inset-0 w-full h-full flex justify-center items-center\">\n  <div style=\"width: 71%; height: 71%;\" class=\"relative overflow-auto custom-scrollbar\">\n    ".concat(images, "\n    ").concat(links, "\n  </div>\n</div>\n<img class=\"background pointer-events-none\" src=\"").concat(background_image_path, "\">\n");
    }
  }, {
    key: "setupNextPrevEvents",
    value: function setupNextPrevEvents() {
      var _this6 = this;

      this.container.querySelector('.dots').classList.remove('hidden');
      this.container.querySelector('.dots [data-dot-index="0"] .selected').classList.remove('hidden');
      this.container.querySelector('.next').classList.remove('pointer-events-none', 'opacity-0');
      this.container.querySelectorAll('.dots [data-dot-index] .default').forEach(function (dot) {
        dot.addEventListener('click', function (e) {
          var index = parseInt(e.target.parentElement.dataset.dotIndex);

          var current = _this6.container.querySelector('.item:not(.hidden)');

          if (typeof current.pause == 'function') {
            current.pause();
            current.currentTime = 0;
            current.setAttribute('src', current.getAttribute('src'));
          }

          var next = _this6.container.querySelector("[data-index=\"".concat(index + 1, "\"]"));

          var prev = _this6.container.querySelector("[data-index=\"".concat(index - 1, "\"]"));

          if (!next) {
            _this6.container.querySelector('.next').classList.add('pointer-events-none', 'opacity-0');
          } else {
            _this6.container.querySelector('.next').classList.remove('pointer-events-none', 'opacity-0');
          }

          if (!prev) {
            _this6.container.querySelector('.prev').classList.add('pointer-events-none', 'opacity-0');
          } else {
            _this6.container.querySelector('.prev').classList.remove('pointer-events-none', 'opacity-0');
          }

          var clicked = _this6.container.querySelector("[data-index=\"".concat(index, "\"]"));

          current.classList.add('hidden');
          clicked.classList.remove('hidden');
          clicked.setAttribute('src', clicked.getAttribute('src'));

          _this6.container.querySelector(".dots [data-dot-index] .selected:not(.hidden)").classList.add('hidden');

          _this6.container.querySelector(".dots [data-dot-index=\"".concat(index, "\"] .selected")).classList.remove('hidden');
        });
      });
      this.container.querySelector('.next').addEventListener('click', function () {
        var current = _this6.container.querySelector('.item:not(.hidden)');

        if (typeof current.pause == 'function') {
          current.pause();
          current.currentTime = 0;
          current.setAttribute('src', current.getAttribute('src'));
        }

        var index = parseInt(current.dataset.index);

        var next = _this6.container.querySelector("[data-index=\"".concat(index + 1, "\"]"));

        var nextNext = _this6.container.querySelector("[data-index=\"".concat(index + 2, "\"]"));

        if (next) {
          current.classList.add('hidden');
          next.classList.remove('hidden');
          next.setAttribute('src', next.getAttribute('src'));

          _this6.container.querySelector('.prev').classList.remove('pointer-events-none', 'opacity-0');

          _this6.container.querySelector(".dots [data-dot-index=\"".concat(index, "\"] .selected")).classList.add('hidden');

          _this6.container.querySelector(".dots [data-dot-index=\"".concat(index + 1, "\"] .selected")).classList.remove('hidden');
        }

        if (!nextNext) {
          _this6.container.querySelector('.next').classList.add('pointer-events-none', 'opacity-0');
        }
      });
      this.container.querySelector('.prev').addEventListener('click', function () {
        var current = _this6.container.querySelector('.item:not(.hidden)');

        if (typeof current.pause == 'function') {
          current.pause();
          current.currentTime = 0;
          current.setAttribute('src', current.getAttribute('src'));
        }

        var index = parseInt(current.dataset.index);

        var prev = _this6.container.querySelector("[data-index=\"".concat(index - 1, "\"]"));

        var prevPrev = _this6.container.querySelector("[data-index=\"".concat(index - 2, "\"]"));

        if (prev) {
          current.classList.add('hidden');
          prev.classList.remove('hidden');
          prev.setAttribute('src', prev.getAttribute('src'));

          _this6.container.querySelector('.next').classList.remove('pointer-events-none', 'opacity-0');

          _this6.container.querySelector(".dots [data-dot-index=\"".concat(index, "\"] .selected")).classList.add('hidden');

          _this6.container.querySelector(".dots [data-dot-index=\"".concat(index - 1, "\"] .selected")).classList.remove('hidden');
        }

        if (!prevPrev) {
          _this6.container.querySelector('.prev').classList.add('pointer-events-none', 'opacity-0');
        }
      });
    }
  }, {
    key: "sendFPT",
    value: function sendFPT(value, element) {
      var FPTData = this.mapFPT(value);

      if (FPTData != undefined) {
        var stringFunction;

        if (FPTData.type == "ViewContent") {
          stringFunction = "fbq('track', 'ViewContent', {content_ids : '".concat(FPTData.name, "'});");
        } else if (FPTData.type == "Lead") {
          stringFunction = "fbq('track', 'Lead', {content_ids : '".concat(FPTData.name, "'});");
        }

        if (FPTData.gtag != "") {
          stringFunction = stringFunction + "gtag('event', 'conversion', {'send_to': 'AW-983095312/".concat(FPTData.gtag, "', 'event_callback': ").concat(this.callback, " });");
        }

        element.setAttribute('onclick', stringFunction);
      }
    }
  }, {
    key: "mapFPT",
    value: function mapFPT(value) {
      return FPTArray.find(function (x) {
        return x.value == value;
      });
    }
  }]);

  return HotspotDB;
}();

/* harmony default export */ __webpack_exports__["default"] = (HotspotDB);

/***/ }),

/***/ "./resources/js/IframePopup.js":
/*!*************************************!*\
  !*** ./resources/js/IframePopup.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HotspotDB = /*#__PURE__*/function () {
  function HotspotDB() {
    _classCallCheck(this, HotspotDB);

    this.loadToView = this.loadToView.bind(this);
  }

  _createClass(HotspotDB, [{
    key: "bootIfNotBooted",
    value: function bootIfNotBooted() {
      if (!this.booted) {
        this.boot();
        this.booted = true;
      }
    }
  }, {
    key: "boot",
    value: function boot() {
      this.container = document.getElementById('full-screen-iframe');
    }
  }, {
    key: "loadToView",
    value: function loadToView(value) {
      this.bootIfNotBooted();
      document.getElementById('scene-container').classList.add('blur');
      clearTimeout(this.unloadTimer);
      this.container.innerHTML = "\n<div class=\"absolute inset-0 w-full h-full flex justify-center items-center\">\n  <div style=\"width: 71%; height: 71%;\">\n    <iframe src=\"".concat(value, "\" class=\"w-full h-full\"></iframe>\n  </div>\n</div>\n<img class=\"background pointer-events-none\" src=\"https://nyp-oh.s3.ap-southeast-1.amazonaws.com/assets/8a6ba106-ccdc-42dd-9b1d-8914b99aef3c\">\n");
      this.container.classList.add('active');
    }
  }, {
    key: "unloadView",
    value: function unloadView() {
      var _this = this;

      clearTimeout(this.unloadTimer);
      this.unloadTimer = setTimeout(function () {
        _this.container.innerHTML = '';
      }, 200);
      this.container.classList.remove('active');
      document.getElementById('scene-container').classList.remove('blur');
    }
  }]);

  return HotspotDB;
}();

/* harmony default export */ __webpack_exports__["default"] = (HotspotDB);

/***/ }),

/***/ "./resources/js/IframePreloader.js":
/*!*****************************************!*\
  !*** ./resources/js/IframePreloader.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var IframePreloader = /*#__PURE__*/function () {
  function IframePreloader() {
    _classCallCheck(this, IframePreloader);
  }

  _createClass(IframePreloader, [{
    key: "preload",
    value: function preload(url) {
      this.bootIfNotBooted();
      this.createIframe(url);
    }
  }, {
    key: "bootIfNotBooted",
    value: function bootIfNotBooted() {
      if (!this.booted) {
        this.boot();
        this.booted = true;
      }
    }
  }, {
    key: "boot",
    value: function boot() {
      this.iframes = [];
      this.hideTimer = [];
      this.container = document.getElementById('full-screen-iframe');
    }
  }, {
    key: "createIframe",
    value: function createIframe(url) {
      this.iframes[url] = document.createElement('div');
      this.iframes[url].setAttribute('data-url', url);
      this.iframes[url].classList.add('hotspot-content');
      this.iframes[url].classList.add('overflow-auto');
      this.container.appendChild(this.iframes[url]);
    }
  }, {
    key: "show",
    value: function show(url, callback) {
      var _this = this;

      clearTimeout(this.hideTimer[url]);
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(function (_ref) {
        var data = _ref.data;

        if (data.head) {
          var scripts = data.head.match(/<script.*?>(.*?)<\/script>/g) || [];
          scripts.forEach(function (script) {
            var tag = document.createElement('script');
            tag.setAttribute('data-url', url);
            var src = script.match(/src=\"*(.*?)\"/)[1];
            tag.setAttribute('src', src);
            document.body.appendChild(tag);
          });
          var styles = data.head.match(/<link.*?>/g, '') || [];
          styles.forEach(function (style) {
            var tag = document.createElement('link');
            tag.setAttribute('data-url', url);
            var href = style.match(/href=\"*(.*?)\"/)[1];
            var rel = style.match(/rel=\"*(.*?)\"/)[1];
            tag.setAttribute('rel', rel);
            tag.setAttribute('href', href);
            document.body.appendChild(tag);
          });
        }

        if (data.body) {
          _this.iframes[url].innerHTML = data.body;
          Array.from(_this.iframes[url].querySelectorAll('img,video')).forEach(function (media) {
            media.setAttribute('draggable', false);
          });
        }

        window.dispatchEvent(new CustomEvent("scene-loaded", {
          detail: {
            hotspots: _this.iframes[url].querySelectorAll('.hotspot')
          }
        }));
        window.dispatchEvent(new CustomEvent("link-added", {
          detail: {
            parent: _this.iframes[url]
          }
        }));

        _this.iframes[url].classList.add('active');

        callback();
      });
    }
  }, {
    key: "hide",
    value: function hide(url) {
      var _this2 = this;

      this.iframes[url].classList.remove('active');
      clearTimeout(this.hideTimer[url]);
      this.hideTimer[url] = setTimeout(function () {
        _this2.iframes[url].remove();

        document.querySelectorAll("script[data-url=\"".concat(url, "\"]")).forEach(function (el) {
          return el.remove();
        });
        document.querySelectorAll("link[data-url=\"".concat(url, "\"]")).forEach(function (el) {
          return el.remove();
        });
      }, 200);
    }
  }]);

  return IframePreloader;
}();

/* harmony default export */ __webpack_exports__["default"] = (new IframePreloader());

/***/ }),

/***/ "./resources/js/scene2d-hotspot-loader.js":
/*!************************************************!*\
  !*** ./resources/js/scene2d-hotspot-loader.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IframePreloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IframePreloader */ "./resources/js/IframePreloader.js");
/* harmony import */ var _HotspotDB__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HotspotDB */ "./resources/js/HotspotDB.js");
/* harmony import */ var _IframePopup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IframePopup */ "./resources/js/IframePopup.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var FPTArray = __webpack_require__(/*! ./FPTmap */ "./resources/js/FPTmap.js");

window.addEventListener('DOMContentLoaded', function () {
  Array.from(document.querySelectorAll('img,video')).forEach(function (media) {
    media.setAttribute('draggable', false);
  });
  window.dispatchEvent(new CustomEvent("scene-loaded", {
    detail: {
      hotspots: document.getElementsByClassName('hotspot')
    }
  }));
});
window.addEventListener("scene-loaded", function (e) {
  var hotspots = e.detail.hotspots;
  var db = new _HotspotDB__WEBPACK_IMPORTED_MODULE_1__["default"]([]);
  var iframe = new _IframePopup__WEBPACK_IMPORTED_MODULE_2__["default"]();

  if (document.getElementById('hotspot-data')) {
    db = new _HotspotDB__WEBPACK_IMPORTED_MODULE_1__["default"](JSON.parse(document.getElementById('hotspot-data').value));
  }

  Array.from(hotspots).forEach(function (hotspot) {
    var json_name = hotspot.dataset.jsonName;
    var hotspotData = {
      name: hotspot.dataset.hotspotName,
      meta: hotspot.dataset.meta
    };
    window.dispatchEvent(new CustomEvent("hotspot-loaded", {
      detail: {
        hotspot: hotspot,
        data: hotspotData,
        json_name: json_name,
        db: db,
        iframe: iframe
      }
    }));
  });
});
window.addEventListener("hotspot-loaded", function (e) {
  var _e$detail = e.detail,
      hotspot = _e$detail.hotspot,
      data = _e$detail.data,
      json_name = _e$detail.json_name,
      db = _e$detail.db,
      iframe = _e$detail.iframe;
  var hh = new HotspotHandler(hotspot, data, json_name, db, iframe);
  hh.setup();

  if (window.default_hotspot && data.name == window.default_hotspot) {
    hh.handle();
  }
});

var HotspotHandler = /*#__PURE__*/function () {
  function HotspotHandler(dom, data, json_name, db, iframe) {
    _classCallCheck(this, HotspotHandler);

    this.dom = dom;
    this.data = data;
    this.json_name = json_name;
    this.db = db;
    this.db.addBack = this.addBack;
    this.iframe = iframe;

    this.callback = function () {
      if (typeof url != 'undefined') {
        window.location = url;
      }
    };
  }

  _createClass(HotspotHandler, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      var _this$data$meta$split = this.data.meta.split(',')[0].split(/:(.+)/),
          _this$data$meta$split2 = _slicedToArray(_this$data$meta$split, 2),
          key = _this$data$meta$split2[0],
          value = _this$data$meta$split2[1];

      if (key == 'url') this.handleUrl(value);else if (key == 'full-page') this.handleFullPage(value);else if (key == 'full-screen-iframe') this.handleFullScreenIframe(value);else if (key == 'static-content') this.handleStaticContentIframe();else if (key == 'new-tab') this.handleNewTab(value);else if (key == 'download') this.handleDownload(value);else if (key == 'sharable') this.handleSharable(value);else if (key == 'db') this.handleLoadFromDB(value);else if (key == 'iframe-popup') this.handleLoadIframePopup(value);else this.handleException();
      var close_btn = document.getElementById('close-popup');
      this.dom.addEventListener('click', function () {
        _this.handle();

        switch (key) {
          case 'db':
          case 'iframe-popup':
            close_btn.classList.remove('hidden');
            break;

          case 'full-screen-iframe':
            if (value == 'cdw') {
              close_btn.classList.remove('hidden');
            }

        }
      });
    }
  }, {
    key: "handleUrl",
    value: function handleUrl(value) {
      var _this2 = this;

      this.handle = function () {
        document.getElementById('loading').classList.add('active');
        window.location.href = value || _this2.data.name;
      };
    }
  }, {
    key: "handleFullPage",
    value: function handleFullPage(value) {
      var _this3 = this;

      this.handle = function () {
        value = "/open-house/" + value;
        window.location.href = value || _this3.data.name;
      };
    }
  }, {
    key: "handleStaticContentIframe",
    value: function handleStaticContentIframe() {
      this.handleFullScreenIframe("static-content/".concat(this.json_name, "/").concat(this.data.name));
    }
  }, {
    key: "handleFullScreenIframe",
    value: function handleFullScreenIframe(value) {
      var _this4 = this;

      this.handle = function () {
        _IframePreloader__WEBPACK_IMPORTED_MODULE_0__["default"].preload("/iframe/".concat(value));
        _this4.fullScreenIframe = _this4.fullScreenIframe || document.getElementById('full-screen-iframe');

        if (_this4.fullScreenIframe) {
          var previousEl = document.querySelector('.hotspot-content.active');
          document.getElementById('scene-container').classList.add('blur');
          _IframePreloader__WEBPACK_IMPORTED_MODULE_0__["default"].show("/iframe/".concat(value), function () {
            if (!previousEl) {
              previousEl = document.querySelector('#scene-container');
            } //for facebook pixel tracking


            var imgTags = Array.from(document.getElementsByTagName('img'));
            imgTags.forEach(function (imgTag) {
              _this4.sendFPT(imgTag.dataset.fpt, imgTag);
            });
            previousEl.classList.remove('active');

            _this4.fullScreenIframe.classList.add('active');

            _this4.addBack(function () {
              document.getElementById('scene-container').classList.remove('blur');
              _IframePreloader__WEBPACK_IMPORTED_MODULE_0__["default"].hide("/iframe/".concat(value));

              if (previousEl.getAttribute('id') == 'scene-container') {
                _this4.fullScreenIframe.classList.remove('active');
              }

              previousEl.classList.add('active');
            });
          });
        }
      };
    }
  }, {
    key: "handleNewTab",
    value: function handleNewTab(value) {
      this.handle = function () {
        var a = document.createElement("a");
        a.setAttribute('href', value);
        a.setAttribute('target', '_blank');
        window.dispatchEvent(new CustomEvent("link-added", {
          detail: {
            a: a
          }
        }));
        document.body.appendChild(a);
        a.click();
        a.remove();
      };
    }
  }, {
    key: "handleDownload",
    value: function handleDownload(value) {
      var _this5 = this;

      this.handle = function () {
        var a = document.createElement("a");
        var fileName = value.split("/").pop();
        a.setAttribute('href', value);
        a.setAttribute('download', _this5.data.name || fileName);
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(value);
        a.remove();
      };
    }
  }, {
    key: "handleSharable",
    value: function handleSharable(value) {
      this.handle = function () {
        addthis.update('share', 'url', value);
        addthis.url = value;
        addthis.toolbox(".addthis_inline_share_toolbox");
        document.getElementById('sharable').classList.add('active');
      };
    }
  }, {
    key: "handleLoadFromDB",
    value: function handleLoadFromDB(value) {
      var _this6 = this;

      this.handle = function () {
        _this6.db.loadToView(value);

        _this6.addBack(function () {
          _this6.db.unloadView();
        });
      };
    }
  }, {
    key: "handleLoadIframePopup",
    value: function handleLoadIframePopup(value) {
      var _this7 = this;

      this.handle = function () {
        _this7.iframe.loadToView(value);

        _this7.addBack(function () {
          _this7.iframe.unloadView();
        });
      };
    }
  }, {
    key: "handleException",
    value: function handleException() {
      var dom = this.dom,
          data = this.data;

      this.handle = function () {
        return window.dispatchEvent(new CustomEvent("hotspot-clicked", {
          detail: {
            hotspot: {
              dom: dom,
              data: data
            }
          }
        }));
      };
    }
  }, {
    key: "addBack",
    value: function addBack(back) {
      if (window.parent) {
        window.parent.dispatchEvent(new CustomEvent("backable-added", {
          detail: {
            back: back
          }
        }));
      } else {
        window.dispatchEvent(new CustomEvent("backable-added", {
          detail: {
            back: back
          }
        }));
      }
    }
  }, {
    key: "sendFPT",
    value: function sendFPT(value, element) {
      var FPTData = this.mapFPT(value);

      if (FPTData != undefined) {
        var stringFunction;

        if (FPTData.type == "ViewContent") {
          stringFunction = "fbq('track', 'ViewContent', {content_ids : '".concat(FPTData.name, "'});");
        } else if (FPTData.type == "Lead") {
          stringFunction = "fbq('track', 'Lead', {content_ids : '".concat(FPTData.name, "'});");
        }

        if (FPTData.gtag != "") {
          stringFunction = stringFunction + "gtag('event', 'conversion', {'send_to': 'AW-983095312/".concat(FPTData.gtag, "', 'event_callback': ").concat(this.callback, " });");
        }

        element.setAttribute('onclick', stringFunction);
      }
    }
  }, {
    key: "mapFPT",
    value: function mapFPT(value) {
      return FPTArray.find(function (x) {
        return x.value == value;
      });
    }
  }]);

  return HotspotHandler;
}();

/***/ }),

/***/ 2:
/*!******************************************************!*\
  !*** multi ./resources/js/scene2d-hotspot-loader.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\bkmx\Desktop\Projects\herbalife\resources\js\scene2d-hotspot-loader.js */"./resources/js/scene2d-hotspot-loader.js");


/***/ })

/******/ });