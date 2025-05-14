/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })
/******/ 	]);
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_global_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _scss_login_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


var $loginBtn = document.getElementById("login");
var $password = document.getElementById("password");
var $userName = document.getElementById("username");
if (localStorage.getItem("token") === "123123") {
  window.location.href = "mainscreen.html";
}
function handleEnter(e) {
  if (e.key === "Enter") {
    tryToLogin();
  }
}
function tryToLogin() {
  fetch("https://login-api-ussm.onrender.com/login", {
    method: "POST",
    mode: "cors",
    // CORS set on API side
    headers: {
      "Content-Type": "application/json" // Required with CORS mode to POST
    },
    body: JSON.stringify({
      name: $userName.value,
      password: $password.value
    })
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    console.log(response.message);
    if (response.isLogged) {
      localStorage.setItem("token", "123123");
      window.location.href = "mainscreen.html";
    } else {
      alert("Login failed: Wrong username or password");
    }
  });
}
$userName.addEventListener("keydown", handleEnter);
$password.addEventListener("keydown", handleEnter);
$loginBtn.addEventListener("click", tryToLogin);
$password.addEventListener("mouseover", function () {
  $password.type = "text";
});
$password.addEventListener("mouseout", function () {
  $password.type = "password";
});
})();

/******/ })()
;