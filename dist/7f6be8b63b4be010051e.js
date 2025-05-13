/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/login.js":
/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_global_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/global.scss */ \"./src/scss/global.scss\");\n/* harmony import */ var _scss_login_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/login.scss */ \"./src/scss/login.scss\");\n\n\nvar $loginBtn = document.getElementById(\"login\");\nvar $password = document.getElementById(\"password\");\nvar $userName = document.getElementById(\"username\");\nif (localStorage.getItem(\"token\") === \"123123\") {\n  window.location.href = \"mainscreen.html\";\n}\nfunction handleEnter(e) {\n  if (e.key === \"Enter\") {\n    tryToLogin();\n  }\n}\nfunction tryToLogin() {\n  fetch(\"https://login-api-ussm.onrender.com/login\", {\n    method: \"POST\",\n    mode: \"cors\",\n    // CORS set on API side\n    headers: {\n      \"Content-Type\": \"application/json\" // Required with CORS mode to POST\n    },\n    body: JSON.stringify({\n      name: $userName.value,\n      password: $password.value\n    })\n  }).then(function (response) {\n    return response.json();\n  }).then(function (response) {\n    console.log(response.message);\n    if (response.isLogged) {\n      localStorage.setItem(\"token\", \"123123\");\n      window.location.href = \"mainscreen.html\";\n    } else {\n      alert(\"Login failed: Wrong username or password\");\n    }\n  });\n}\n$userName.addEventListener(\"keydown\", handleEnter);\n$password.addEventListener(\"keydown\", handleEnter);\n$loginBtn.addEventListener(\"click\", tryToLogin);\n$password.addEventListener(\"mouseover\", function () {\n  $password.type = \"text\";\n});\n$password.addEventListener(\"mouseout\", function () {\n  $password.type = \"password\";\n});\n\n//# sourceURL=webpack://car_reservation/./src/login.js?");

/***/ }),

/***/ "./src/scss/global.scss":
/*!******************************!*\
  !*** ./src/scss/global.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://car_reservation/./src/scss/global.scss?");

/***/ }),

/***/ "./src/scss/login.scss":
/*!*****************************!*\
  !*** ./src/scss/login.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://car_reservation/./src/scss/login.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/login.js");
/******/ 	
/******/ })()
;