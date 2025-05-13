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

/***/ "./src/mainscreen.js":
/*!***************************!*\
  !*** ./src/mainscreen.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_global_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/global.scss */ \"./src/scss/global.scss\");\n/* harmony import */ var _scss_mainScreen_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/mainScreen.scss */ \"./src/scss/mainScreen.scss\");\n\n\nif (localStorage.getItem(\"token\") !== \"123123\") {\n  window.location.href = \"index.html\";\n}\nvar $logoutBtn = document.getElementById(\"logout\");\nvar $dataContainer = document.querySelector(\".dataContainer\");\nvar $dropdown = document.getElementById(\"carTypeDropdown\");\nfunction fetchAndDisplayCars(type) {\n  fetch(\"https://db-api-0s2o.onrender.com/cars?type=\".concat(type), {\n    method: \"GET\",\n    mode: \"cors\"\n  }).then(function (response) {\n    if (!response.ok) {\n      throw new Error(\"HTTP error! Status: \".concat(response.status));\n    }\n    return response.json();\n  }).then(function (data) {\n    console.log(\"API Response:\", data);\n    $dataContainer.innerHTML = \"\";\n    displayCars(data);\n  })[\"catch\"](function (error) {\n    console.error(\"Error connecting to the API:\", error);\n  });\n}\n$dropdown.addEventListener(\"change\", function (event) {\n  var selectedType = event.target.value;\n  if (selectedType === \"X\") {\n    $dataContainer.innerHTML = \"\";\n    return;\n  }\n  fetchAndDisplayCars(selectedType);\n});\n$logoutBtn.addEventListener(\"click\", function () {\n  localStorage.setItem(\"token\", \"\");\n  window.location.href = \"index.html\";\n});\nfunction displayCars(cars) {\n  cars.forEach(function (car) {\n    var carContainer = document.createElement(\"div\");\n    carContainer.classList.add(\"carContainer\");\n    carContainer.innerHTML = \"\\n          <div class=\\\"carDetails\\\">\\n            <h3>\".concat(car.Brand || \"Unknown\", \" \").concat(car.Model || \"Car\", \"</h3>\\n            <p>Year: \").concat(car.Year || \"N/A\", \"</p>\\n            <p>Power: \").concat(car.Power || \"N/A\", \" HP</p>\\n            <p>Mileage: \").concat(car.Mileage || \"N/A\", \" km</p>\\n            <button class=\\\"selectCarBtn\\\">Select</button> <!-- Add a button to select the car -->\\n          </div>\\n          <img src=\\\"\").concat(car.Picture ? \"data:image/jpeg;base64,\".concat(car.Picture) : \"https://via.placeholder.com/100x100?text=No+Image\", \"\\\" alt=\\\"\").concat(car.Brand || \"Unknown\", \" \").concat(car.Model || \"Car\", \"\\\" class=\\\"carImage\\\" />\\n        \");\n    var selectButton = carContainer.querySelector(\".selectCarBtn\");\n    selectButton.addEventListener(\"click\", function () {\n      selectCar(car);\n    });\n    $dataContainer.appendChild(carContainer);\n  });\n}\nfunction selectCar(car) {\n  var isConfirmed = confirm(\"Please approve Your choice: \".concat(car.Brand, \" \").concat(car.Model, \"?\"));\n  if (isConfirmed) {\n    console.log(\"Car selected:\", car);\n  } else {\n    console.log(\"Car selection canceled.\");\n  }\n}\n\n//# sourceURL=webpack://car_reservation/./src/mainscreen.js?");

/***/ }),

/***/ "./src/scss/global.scss":
/*!******************************!*\
  !*** ./src/scss/global.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://car_reservation/./src/scss/global.scss?");

/***/ }),

/***/ "./src/scss/mainScreen.scss":
/*!**********************************!*\
  !*** ./src/scss/mainScreen.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://car_reservation/./src/scss/mainScreen.scss?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/mainscreen.js");
/******/ 	
/******/ })()
;