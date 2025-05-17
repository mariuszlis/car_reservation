import global_style from "./scss/global.scss";
import style from "./scss/mainScreen.scss";

if (!localStorage.getItem("token")) {
  window.location.href = "index.html";
}

const $logoutBtn = document.getElementById("logout");
const $dataContainer = document.querySelector(".dataContainer");
const $dropdown = document.getElementById("carTypeDropdown");
const $carsDiv = document.getElementById("cars");
const $formDiv = document.getElementById("form");
const $confirmDiv = document.getElementById("confirm");
const $selectedCarDetails = document.getElementById("selectedCarDetails");
const $backButton = document.querySelector(
  '#deliveryForm button[type="button"]'
);
const $submitButton = document.querySelector(
  '#deliveryForm button[type="submit"]'
);
const $mainScreen = document.querySelector(".mainScreen");

function saveVisibilityState() {
  localStorage.setItem("carsHidden", $carsDiv.classList.contains("hidden"));
  localStorage.setItem("formHidden", $formDiv.classList.contains("hidden"));
  localStorage.setItem(
    "confirmHidden",
    $confirmDiv.classList.contains("hidden")
  );
}

function loadVisibilityState() {
  if (localStorage.getItem("carsHidden") !== null) {
    $carsDiv.classList.toggle(
      "hidden",
      localStorage.getItem("carsHidden") === "true"
    );
  }
  if (localStorage.getItem("formHidden") !== null) {
    $formDiv.classList.toggle(
      "hidden",
      localStorage.getItem("formHidden") === "true"
    );
  }
  if (localStorage.getItem("confirmHidden") !== null) {
    $confirmDiv.classList.toggle(
      "hidden",
      localStorage.getItem("confirmHidden") === "true"
    );
  }
}

window.addEventListener("load", () => {
  loadVisibilityState();
  loadSelectedCar();
  loadFormData();
  fetchAndDisplayCars($dropdown.value);
});

document.getElementById("fullName").addEventListener("input", saveFormData);
document
  .getElementById("deliveryPlace")
  .addEventListener("input", saveFormData);
document
  .getElementById("deliveryDate")
  .addEventListener("change", saveFormData);

const paymentMethodInputs = document.querySelectorAll(
  'input[name="paymentMethod"]'
);
paymentMethodInputs.forEach((input) => {
  input.addEventListener("change", saveFormData);
});

const accessoryCheckboxes = document.querySelectorAll(
  'input[name="accessories"]'
);
accessoryCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const savedCar = localStorage.getItem("selectedCar");
    if (savedCar) {
      const car = JSON.parse(savedCar);
      updatePrice(car.Price || 0, car.Currency || "");
    }
    saveFormData();
  });
});

function fetchAndDisplayCars(type) {
  fetch(`https://db-api-0s2o.onrender.com/cars?type=${type}`, {
    method: "GET",
    mode: "cors",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      $dataContainer.innerHTML = "";

      populateBrandFilter(data);
      displayCars(data);
    })
    .catch((error) => {
      console.error("Error connecting to the API:", error);
    });
}

document.getElementById("brandFilter").addEventListener("change", (event) => {
  const selectedBrand = event.target.value;

  fetch(`https://db-api-0s2o.onrender.com/cars?type=${$dropdown.value}`, {
    method: "GET",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      const filteredCars =
        selectedBrand === "all"
          ? data
          : data.filter((car) => car.Brand === selectedBrand);
      $dataContainer.innerHTML = "";
      displayCars(filteredCars);
    })
    .catch((error) => {
      console.error("Error filtering cars:", error);
    });
});

function populateBrandFilter(cars) {
  const brandFilter = document.getElementById("brandFilter");
  const uniqueBrands = [...new Set(cars.map((car) => car.Brand))];

  brandFilter.innerHTML = '<option value="all">All Brands</option>';
  uniqueBrands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });
}

function displayCars(cars) {
  cars.forEach((car) => {
    const carContainer = document.createElement("div");
    carContainer.classList.add("carContainer");

    carContainer.innerHTML = `
          <div class="carDetails">
            <h3>${car.Brand} ${car.Model}</h3>
            <p>Year: ${car.Year}</p>
            <p>Power: ${car.Power}</p>
            <p>Mileage: ${car.Mileage} km</p>
            <p>Price: ${car.Price} ${car.Currency}</p>
            <button class="selectCarBtn">Select</button>
          </div>
          <img src="${
            car.Picture
              ? `data:image/jpeg;base64,${car.Picture}`
              : "https://via.placeholder.com/100x100?text=No+Image"
          }" alt="${car.Brand || "Unknown"} ${
      car.Model || "Car"
    }" class="carImage" />
        `;

    const selectButton = carContainer.querySelector(".selectCarBtn");
    selectButton.addEventListener("click", () => {
      selectCar(car);
    });
    $dataContainer.appendChild(carContainer);
  });
}

function selectCar(car) {
  const isConfirmed = confirm(
    `Please approve Your choice: ${car.Brand} ${car.Model}?`
  );
  if (isConfirmed) {
    localStorage.setItem("selectedCar", JSON.stringify(car));
    setDefaultDeliveryDate();
    saveFormData();

    let basePrice = car.Price || 0;
    $selectedCarDetails.innerHTML = `
      <p><strong>${car.Brand} ${car.Model} ${car.Year}</strong></p>
      <p id="carPrice">Total Price: ${basePrice} ${car.Currency}</p>
    `;

    $carsDiv.classList.add("hidden");
    $formDiv.classList.remove("hidden");
    $confirmDiv.classList.add("hidden");
    saveVisibilityState();
  }
}

function setDefaultDeliveryDate() {
  const deliveryDateInput = document.getElementById("deliveryDate");
  if (deliveryDateInput) {
    const today = new Date();
    const defaultDate = new Date(today);
    defaultDate.setDate(today.getDate() + 14);

    const year = defaultDate.getFullYear();
    const month = String(defaultDate.getMonth() + 1).padStart(2, "0");
    const day = String(defaultDate.getDate()).padStart(2, "0");

    deliveryDateInput.value = `${year}-${month}-${day}`;
  }
}

function updatePrice(basePrice, currency) {
  basePrice = Number(basePrice);

  const selectedAccessories = Array.from(
    document.querySelectorAll('input[name="accessories"]:checked')
  );

  const accessoryPrices = {
    "Additional Guarantee": 4000,
    "Winter Tires": 1200,
  };

  let totalPrice = basePrice;
  selectedAccessories.forEach((checkbox) => {
    totalPrice += Number(accessoryPrices[checkbox.value]);
  });

  const $carPrice = document.getElementById("carPrice");
  $carPrice.textContent = `Total Price: ${totalPrice.toFixed(2)} ${currency}`;

  const savedFormData = JSON.parse(localStorage.getItem("formData")) || {};
  savedFormData.totalPrice = totalPrice.toFixed(2);
  localStorage.setItem("formData", JSON.stringify(savedFormData));
}

function validateFullName(fullName) {
  const fullNameRegex =
    /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+[\s-][A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/u;
  return fullNameRegex.test(fullName);
}

function saveFormData() {
  const fullNameInput = document.getElementById("fullName").value.trim();
  const deliveryPlaceInput = document
    .getElementById("deliveryPlace")
    .value.trim();
  const deliveryDateInput = document.getElementById("deliveryDate").value;

  const selectedAccessories = Array.from(
    document.querySelectorAll('input[name="accessories"]:checked')
  ).map((checkbox) => checkbox.value);

  const savedFormData = JSON.parse(localStorage.getItem("formData")) || {};
  savedFormData.fullName = fullNameInput;
  savedFormData.deliveryPlace = deliveryPlaceInput;
  savedFormData.deliveryDate = deliveryDateInput;
  savedFormData.paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  )
    ? document.querySelector('input[name="paymentMethod"]:checked').value
    : null;
  savedFormData.accessories = selectedAccessories;

  localStorage.setItem("formData", JSON.stringify(savedFormData));
}

function loadFormData() {
  const savedFormData = localStorage.getItem("formData");
  if (savedFormData) {
    const {
      fullName,
      deliveryPlace,
      deliveryDate,
      paymentMethod,
      accessories,
      totalPrice,
    } = JSON.parse(savedFormData);

    document.getElementById("fullName").value = fullName || "";
    document.getElementById("deliveryPlace").value = deliveryPlace || "";
    document.getElementById("deliveryDate").value = deliveryDate || "";

    if (!deliveryDate) {
      setDefaultDeliveryDate();
    }

    if (paymentMethod) {
      const paymentMethodInput = document.querySelector(
        `input[name="paymentMethod"][value="${paymentMethod}"]`
      );
      if (paymentMethodInput) {
        paymentMethodInput.checked = true;
      }
    }

    if (accessories && accessories.length > 0) {
      const accessoryCheckboxes = document.querySelectorAll(
        'input[name="accessories"]'
      );
      accessoryCheckboxes.forEach((checkbox) => {
        if (accessories.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
    }

    if (totalPrice) {
      const $carPrice = document.getElementById("carPrice");
      if ($carPrice) {
        const savedCar = localStorage.getItem("selectedCar");
        const car = savedCar ? JSON.parse(savedCar) : null;
        const currency = car ? car.Currency || "" : "PLN";
        $carPrice.textContent = `Total Price: ${totalPrice} ${currency}`;
      }
    }
  }
}

function loadSelectedCar() {
  const savedCar = localStorage.getItem("selectedCar");
  if (savedCar) {
    const car = JSON.parse(savedCar);
    let basePrice = car.Price || 0;
    $selectedCarDetails.innerHTML = `
      <p><strong>${car.Brand} ${car.Model} ${car.Year}</strong></p>
      <p id="carPrice">Total Price: ${basePrice} ${car.Currency || ""}</p>
    `;
  }
}

$dropdown.addEventListener("change", (event) => {
  const selectedType = event.target.value;
  fetchAndDisplayCars(selectedType);
});

$backButton.addEventListener("click", () => {
  document.getElementById("fullName").value = "";
  document.getElementById("deliveryPlace").value = "";
  const paymentMethodInputs = document.querySelectorAll(
    'input[name="paymentMethod"]'
  );
  paymentMethodInputs.forEach((input) => {
    input.checked = false;
  });
  const accessoryCheckboxes = document.querySelectorAll(
    'input[name="accessories"]'
  );
  accessoryCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  localStorage.removeItem("formData");

  $carsDiv.classList.remove("hidden");
  $formDiv.classList.add("hidden");
  $confirmDiv.classList.add("hidden");
  saveVisibilityState();
});

$logoutBtn.addEventListener("click", () => {
  localStorage.setItem("token", "");
  window.location.href = "index.html";
});

$submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const fullNameInput = document.getElementById("fullName").value.trim();
  const deliveryPlaceInput = document
    .getElementById("deliveryPlace")
    .value.trim();
  const deliveryDateInput = document.getElementById("deliveryDate").value;
  const paymentMethodInput = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );

  if (!validateFullName(fullNameInput)) {
    alert("Please enter a Name and Surname in correct format");
    return;
  }

  if (!deliveryPlaceInput) {
    alert("Delivery Place is required.");
    return;
  }

  const today = new Date();
  const selectedDate = new Date(deliveryDateInput);
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 13);

  if (selectedDate < minDate) {
    alert("Delivery date must be at least 14 days from today.");
    return;
  }

  if (!paymentMethodInput) {
    alert("Please select a Payment Method.");
    return;
  }

  const savedCar = localStorage.getItem("selectedCar");
  const car = savedCar ? JSON.parse(savedCar) : null;
  const selectedAccessories = Array.from(
    document.querySelectorAll('input[name="accessories"]:checked')
  ).map((checkbox) => checkbox.value);

  const savedFormData = JSON.parse(localStorage.getItem("formData")) || {};
  const totalPrice = savedFormData.totalPrice || "N/A";

  $formDiv.classList.add("hidden");
  $confirmDiv.classList.remove("hidden");
  $carsDiv.classList.add("hidden");

  $confirmDiv.querySelector("div").innerHTML = `
    <h2>Thank you!</h2>
    <p>Your delivery has been confirmed.</p>
    <p><strong>Car:</strong> ${car ? `${car.Brand} ${car.Model}` : "N/A"}</p>
    <p><strong>Total Price:</strong> ${totalPrice} ${
    car ? car.Currency || "" : ""
  }</p>
    <p><strong>Delivery Date:</strong> ${deliveryDateInput || "N/A"}</p>
    <p><strong>Accessories:</strong> ${
      selectedAccessories.length > 0 ? selectedAccessories.join(", ") : "None"
    }</p>
    <img src="${
      car && car.Picture
        ? `data:image/jpeg;base64,${car.Picture}`
        : "https://via.placeholder.com/300x200?text=No+Image"
    }" alt="${
    car ? `${car.Brand} ${car.Model}` : "Car"
  }" style="max-width: 300px; margin-top: 10px;" />
  `;

  $logoutBtn.style.display = "none";
  localStorage.clear();
});
