/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
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
/* harmony import */ var _scss_mainScreen_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


if (localStorage.getItem("token") !== "123123") {
  window.location.href = "index.html";
}
var $logoutBtn = document.getElementById("logout");
var $dataContainer = document.querySelector(".dataContainer");
var $dropdown = document.getElementById("carTypeDropdown");
var $carsDiv = document.getElementById("cars");
var $formDiv = document.getElementById("form");
var $confirmDiv = document.getElementById("confirm");
var $selectedCarDetails = document.getElementById("selectedCarDetails");
var $backButton = document.querySelector('#deliveryForm button[type="button"]');
var $submitButton = document.querySelector('#deliveryForm button[type="submit"]');
var $mainScreen = document.querySelector(".mainScreen");
window.addEventListener("load", function () {
  loadVisibilityState();
  loadSelectedCar();
  loadFormData();
  fetchAndDisplayCars($dropdown.value);
});
document.getElementById("fullName").addEventListener("input", saveFormData);
document.getElementById("deliveryPlace").addEventListener("input", saveFormData);
document.getElementById("deliveryDate").addEventListener("change", saveFormData);
var paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');
paymentMethodInputs.forEach(function (input) {
  input.addEventListener("change", saveFormData);
});
var accessoryCheckboxes = document.querySelectorAll('input[name="accessories"]');
accessoryCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    var savedCar = localStorage.getItem("selectedCar");
    if (savedCar) {
      var car = JSON.parse(savedCar);
      updatePrice(car.Price || 0, car.Currency || "");
    }
    saveFormData();
  });
});
function saveVisibilityState() {
  var formState = $formDiv.style.display || "none";
  var carsState = $carsDiv.style.display || "block";
  localStorage.setItem("formState", formState);
  localStorage.setItem("carsState", carsState);
}
function loadVisibilityState() {
  var formState = localStorage.getItem("formState") || "none";
  var carsState = localStorage.getItem("carsState") || "block";
  $formDiv.style.display = formState;
  $carsDiv.style.display = carsState;
}
function fetchAndDisplayCars(type) {
  fetch("https://db-api-0s2o.onrender.com/cars?type=".concat(type), {
    method: "GET",
    mode: "cors"
  }).then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP error! Status: ".concat(response.status));
    }
    return response.json();
  }).then(function (data) {
    console.log("API Response:", data);
    $dataContainer.innerHTML = "";
    populateBrandFilter(data);
    displayCars(data);
  })["catch"](function (error) {
    console.error("Error connecting to the API:", error);
  });
}
document.getElementById("brandFilter").addEventListener("change", function (event) {
  var selectedBrand = event.target.value;
  fetch("https://db-api-0s2o.onrender.com/cars?type=".concat($dropdown.value), {
    method: "GET",
    mode: "cors"
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    var filteredCars = selectedBrand === "all" ? data : data.filter(function (car) {
      return car.Brand === selectedBrand;
    });
    $dataContainer.innerHTML = "";
    displayCars(filteredCars);
  })["catch"](function (error) {
    console.error("Error filtering cars:", error);
  });
});
function populateBrandFilter(cars) {
  var brandFilter = document.getElementById("brandFilter");
  var uniqueBrands = _toConsumableArray(new Set(cars.map(function (car) {
    return car.Brand;
  })));
  brandFilter.innerHTML = '<option value="all">All Brands</option>';
  uniqueBrands.forEach(function (brand) {
    var option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });
}
function displayCars(cars) {
  cars.forEach(function (car) {
    var carContainer = document.createElement("div");
    carContainer.classList.add("carContainer");
    carContainer.innerHTML = "\n          <div class=\"carDetails\">\n            <h3>".concat(car.Brand, " ").concat(car.Model, "</h3>\n            <p>Year: ").concat(car.Year, "</p>\n            <p>Power: ").concat(car.Power, "</p>\n            <p>Mileage: ").concat(car.Mileage, " km</p>\n            <p>Price: ").concat(car.Price, " ").concat(car.Currency, "</p>\n            <button class=\"selectCarBtn\">Select</button>\n          </div>\n          <img src=\"").concat(car.Picture ? "data:image/jpeg;base64,".concat(car.Picture) : "https://via.placeholder.com/100x100?text=No+Image", "\" alt=\"").concat(car.Brand || "Unknown", " ").concat(car.Model || "Car", "\" class=\"carImage\" />\n        ");
    var selectButton = carContainer.querySelector(".selectCarBtn");
    selectButton.addEventListener("click", function () {
      selectCar(car);
    });
    $dataContainer.appendChild(carContainer);
  });
}
function selectCar(car) {
  var isConfirmed = confirm("Please approve Your choice: ".concat(car.Brand, " ").concat(car.Model, "?"));
  if (isConfirmed) {
    localStorage.setItem("selectedCar", JSON.stringify(car));
    $carsDiv.style.display = "none";
    $formDiv.style.display = "block";
    saveVisibilityState();
    setDefaultDeliveryDate();
    saveFormData();
    var basePrice = car.Price || 0;
    $selectedCarDetails.innerHTML = "\n      <p><strong>".concat(car.Brand, " ").concat(car.Model, " ").concat(car.Year, "</strong></p>\n      <p id=\"carPrice\">Total Price: ").concat(basePrice, " ").concat(car.Currency, "</p>\n    ");
    console.log("Car selected:", car);
  } else {
    console.log("Car selection canceled.");
  }
}
function setDefaultDeliveryDate() {
  var deliveryDateInput = document.getElementById("deliveryDate");
  if (deliveryDateInput) {
    var today = new Date();
    var defaultDate = new Date(today);
    defaultDate.setDate(today.getDate() + 14);
    var year = defaultDate.getFullYear();
    var month = String(defaultDate.getMonth() + 1).padStart(2, "0");
    var day = String(defaultDate.getDate()).padStart(2, "0");
    deliveryDateInput.value = "".concat(year, "-").concat(month, "-").concat(day);
  }
}
function updatePrice(basePrice, currency) {
  basePrice = Number(basePrice);
  var selectedAccessories = Array.from(document.querySelectorAll('input[name="accessories"]:checked'));
  var accessoryPrices = {
    "Additional Guarantee": 4000,
    "Winter Tires": 1200
  };
  var totalPrice = basePrice;
  selectedAccessories.forEach(function (checkbox) {
    totalPrice += Number(accessoryPrices[checkbox.value]);
  });
  var $carPrice = document.getElementById("carPrice");
  $carPrice.textContent = "Total Price: ".concat(totalPrice.toFixed(2), " ").concat(currency);
  var savedFormData = JSON.parse(localStorage.getItem("formData")) || {};
  savedFormData.totalPrice = totalPrice.toFixed(2);
  localStorage.setItem("formData", JSON.stringify(savedFormData));
}
function validateFullName(fullName) {
  var fullNameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
  return fullNameRegex.test(fullName);
}
function saveFormData() {
  var fullNameInput = document.getElementById("fullName").value.trim();
  var deliveryPlaceInput = document.getElementById("deliveryPlace").value.trim();
  var deliveryDateInput = document.getElementById("deliveryDate").value;
  var selectedAccessories = Array.from(document.querySelectorAll('input[name="accessories"]:checked')).map(function (checkbox) {
    return checkbox.value;
  });
  var savedFormData = JSON.parse(localStorage.getItem("formData")) || {};
  savedFormData.fullName = fullNameInput;
  savedFormData.deliveryPlace = deliveryPlaceInput;
  savedFormData.deliveryDate = deliveryDateInput;
  savedFormData.paymentMethod = document.querySelector('input[name="paymentMethod"]:checked') ? document.querySelector('input[name="paymentMethod"]:checked').value : null;
  savedFormData.accessories = selectedAccessories;
  localStorage.setItem("formData", JSON.stringify(savedFormData));
}
function loadFormData() {
  var savedFormData = localStorage.getItem("formData");
  if (savedFormData) {
    var _JSON$parse = JSON.parse(savedFormData),
      fullName = _JSON$parse.fullName,
      deliveryPlace = _JSON$parse.deliveryPlace,
      deliveryDate = _JSON$parse.deliveryDate,
      paymentMethod = _JSON$parse.paymentMethod,
      accessories = _JSON$parse.accessories,
      totalPrice = _JSON$parse.totalPrice;
    document.getElementById("fullName").value = fullName || "";
    document.getElementById("deliveryPlace").value = deliveryPlace || "";
    document.getElementById("deliveryDate").value = deliveryDate || "";
    if (!deliveryDate) {
      setDefaultDeliveryDate();
    }
    if (paymentMethod) {
      var paymentMethodInput = document.querySelector("input[name=\"paymentMethod\"][value=\"".concat(paymentMethod, "\"]"));
      if (paymentMethodInput) {
        paymentMethodInput.checked = true;
      }
    }
    if (accessories && accessories.length > 0) {
      var _accessoryCheckboxes = document.querySelectorAll('input[name="accessories"]');
      _accessoryCheckboxes.forEach(function (checkbox) {
        if (accessories.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
    }
    if (totalPrice) {
      var $carPrice = document.getElementById("carPrice");
      if ($carPrice) {
        $carPrice.textContent = "Total Price: ".concat(totalPrice, " PLN");
      }
    }
  }
}
function loadSelectedCar() {
  var savedCar = localStorage.getItem("selectedCar");
  if (savedCar) {
    var car = JSON.parse(savedCar);
    var basePrice = car.Price || 0;
    $selectedCarDetails.innerHTML = "\n      <p><strong>".concat(car.Brand, " ").concat(car.Model, " ").concat(car.Year, "</strong></p>\n      <p id=\"carPrice\">Total Price: ").concat(basePrice, " ").concat(car.Currency || "", "</p>\n    ");
    console.log("Loaded selected car:", car);
  }
}
$dropdown.addEventListener("change", function (event) {
  var selectedType = event.target.value;
  fetchAndDisplayCars(selectedType);
});
$backButton.addEventListener("click", function () {
  document.getElementById("fullName").value = "";
  document.getElementById("deliveryPlace").value = "";
  var paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');
  paymentMethodInputs.forEach(function (input) {
    input.checked = false;
  });
  var accessoryCheckboxes = document.querySelectorAll('input[name="accessories"]');
  accessoryCheckboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });
  localStorage.removeItem("formData");
  $formDiv.style.display = "none";
  $carsDiv.style.display = "block";
  saveVisibilityState();
});
$logoutBtn.addEventListener("click", function () {
  localStorage.setItem("token", "");
  window.location.href = "index.html";
});
$submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var fullNameInput = document.getElementById("fullName").value.trim();
  var deliveryPlaceInput = document.getElementById("deliveryPlace").value.trim();
  var deliveryDateInput = document.getElementById("deliveryDate").value;
  var paymentMethodInput = document.querySelector('input[name="paymentMethod"]:checked');
  if (!validateFullName(fullNameInput)) {
    alert("Please enter a Name and Surname in correct format");
    return;
  }
  if (!deliveryPlaceInput) {
    alert("Delivery Place is required.");
    return;
  }
  var today = new Date();
  var selectedDate = new Date(deliveryDateInput);
  var minDate = new Date(today);
  minDate.setDate(today.getDate() + 13);
  if (selectedDate < minDate) {
    alert("Delivery date must be at least 14 days from today.");
    return;
  }
  if (!paymentMethodInput) {
    alert("Please select a Payment Method.");
    return;
  }
  var savedCar = localStorage.getItem("selectedCar");
  var car = savedCar ? JSON.parse(savedCar) : null;
  var selectedAccessories = Array.from(document.querySelectorAll('input[name="accessories"]:checked')).map(function (checkbox) {
    return checkbox.value;
  });

  // Retrieve total price from localStorage
  var savedFormData = JSON.parse(localStorage.getItem("formData")) || {};
  var totalPrice = savedFormData.totalPrice || "N/A";
  $carsDiv.style.display = "none";
  $formDiv.style.display = "none";
  $confirmDiv.style.display = "block";
  $confirmDiv.querySelector("div").innerHTML = "\n    <h2>Thank you!</h2>\n    <p>Your delivery has been confirmed.</p>\n    <p><strong>Car:</strong> ".concat(car ? "".concat(car.Brand, " ").concat(car.Model) : "N/A", "</p>\n    <p><strong>Total Price:</strong> ").concat(totalPrice, " ").concat(car ? car.Currency || "" : "", "</p>\n    <p><strong>Delivery Date:</strong> ").concat(deliveryDateInput || "N/A", "</p>\n    <p><strong>Accessories:</strong> ").concat(selectedAccessories.length > 0 ? selectedAccessories.join(", ") : "None", "</p>\n    <img src=\"").concat(car && car.Picture ? "data:image/jpeg;base64,".concat(car.Picture) : "https://via.placeholder.com/300x200?text=No+Image", "\" alt=\"").concat(car ? "".concat(car.Brand, " ").concat(car.Model) : "Car", "\" style=\"max-width: 300px; margin-top: 10px;\" />\n  ");
  $logoutBtn.style.display = "none";
  localStorage.clear();
});
})();

/******/ })()
;